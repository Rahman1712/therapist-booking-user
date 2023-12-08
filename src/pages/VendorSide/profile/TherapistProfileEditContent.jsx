/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { popupToast } from "../../../utils/AlertUtils";
import { therapistsAxiosApi } from "../../../config/axiosConfig";
import { THERAPIST_PRIVATE_API } from "../../../constants";
import { authActions } from "../../../store/auth-slice";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import Select from 'react-select'
import FileUpload from "../../../components/CommonComponents/file/FileUpload";
import TherapistCertificateView from "./TherapistCertificateView";

const TherapistProfileEditContent = () => {
  const dispatch = useDispatch();
  const { id} = useSelector((state) => state.auth);
  const [therapist, setTherapist] = useState(null);
  
  const [fullname, setFullname] = useState("");
  const [mobile, setMobile] = useState("");
  const [isPassShow, setPassShow] = useState(false);
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [image, setImage] = useState("");
  const profileImageRef = useRef();

  const [about, setAbout] = useState("");
  
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(null);
  const [isCategoryChanged, setIsCategoryChanged] = useState(false);
  
  const [additionalCert, setAdditionalCert] = useState(null);
  const [isCertificateViewOpen, setCertificateViewOpen] = useState(false);
  const [isCertChanged, setIsCertChanged] = useState(false);
  const [docData, setDocData] = useState({
    docName: '',
    docUrl: null,
  });

  useEffect(() => {
    getTherapistById(id);
    getCategories();
  }, [id])

  const getTherapistById = async (id) => {
    try {
      const response = await therapistsAxiosApi.get(THERAPIST_PRIVATE_API + `/getbyid/${id}`);
      if (response.status === 200) {
        const therapistData = response.data;
        console.log(therapistData);
        setTherapist(therapistData);
        setFullname(therapistData.fullname);
        setMobile(therapistData.mobile);
        setImageUrl(therapistData.imageUrl);
        if(therapistData.therapistInfoDto){
          setAbout(therapistData.therapistInfoDto.bio);
        }
      } else {
        console.error('Request failed with status:', response.status);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const getCategories = () => {
    therapistsAxiosApi.get("/api/v1/public/all-categories")
    .then((response) => {
      // const categoriesNames = response.data.map((category) => category.name);
      const categoriesNames = response.data.map((category) => ({
        label: category.name,
        value: category.name,
      }));
      setCategories(categoriesNames);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  };

  const handleCategoryChange = (selectedOptions) => {
    const selectedCategoryValues = selectedOptions.map((option) => option.value);
    setSelectedCategories(selectedCategoryValues);
    setIsCategoryChanged(true);
  }

  const passwordShowHandler = () => {
    setPassShow(!isPassShow);
  }

  const openImageUpload = () => {
    profileImageRef.current.click();
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Check if the file is an image (you can customize this check further)
      if (file.type.startsWith('image/')) {
        if (file.size <= 200 * 1024) {
          // Create a Blob from the selected file
          const blob = new Blob([file], { type: file.type });
          // Create a data URL from the Blob
          const url = URL.createObjectURL(blob);
          // Set the selected image and its URL
          setImage(file);
          setImageUrl(url);
        } else {
          popupToast("warning", "Please select image below 200kb", 2000);
        }
      } else {
        popupToast("error", "Please select image file only", 2000);
      }
    }
  };

  //------------------DOC--------------------------
  async function getDocUrl(docBytes, docType) {
    const binaryString = atob(docBytes);
    const byteArray = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      byteArray[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([byteArray], { type: docType });
    const docUrl = URL.createObjectURL(blob);
    return docUrl;
  }

  const certificateViewOpenHandle = async () =>{
    const addCertBytes = therapist.therapistInfoDto.additionalCertificate;
    const addCertType = therapist.therapistInfoDto.additionalCertificateType;
    const addUrl = await getDocUrl(addCertBytes, addCertType);
 
    setDocData(
      {
        docName : "Additional Certificate", 
        docUrl: addUrl,
      }
    );
    setCertificateViewOpen(true);
  }

  const handleFileSelect = (inputName, files) => {
    let file = null;
    if (files != null) {
      file = files[0];
    }
    setAdditionalCert(file);
    setIsCertChanged(true);
  };
//---------------------------------------------------


  const handleImageSubmit = async (event) => {
    event.preventDefault();
    if (!image) {
      popupToast("error", "Please select image", 2000);
      return;
    }
    try {
      const formData = new FormData();

      formData.append("image", image);
      const response = await therapistsAxiosApi.put(THERAPIST_PRIVATE_API+`/profile-image/byId/${id}`, formData, { 'Content-Type': 'multipart/form-data' });
      console.log(response);
      dispatch(authActions.setImageUrl({ imageUrl: response.data }));
      popupToast("success", "image uploaded successfully", 3000);
    } catch (error) {
      const errorData = error.response.data;
      popupToast("error", errorData.errorMessage, 3000);
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();
    if (password !== rePassword) {
      popupToast("error", "Password and ReEnter Password are incorrect", 2000);
      return;
    }

    const updatedData = {
      fullname,
      password,
      mobile,
    };

    therapistsAxiosApi.put(THERAPIST_PRIVATE_API + `/update/profile-data/byid/${id}`, updatedData)
      .then(response => {
        console.log('Profile data updated:', response.data);
        dispatch(authActions.setFullname({ ...response.data }));
        dispatch(authActions.setMobile({ ...response.data }));
        popupToast("success", "Profile data updated successfully", 3000);
      })
      .catch(error => {
        console.error('Error updating profile data:', error);
        popupToast("error", 'Error updating profile data', 3000);
      });
  };

  const handleCategoryUpdate = async (event) => {
    event.preventDefault();
    const therapistInfoId = therapist.therapistInfoDto.id;
    if (!isCategoryChanged || selectedCategories == null) {
      return;
    }

    try {
      const response = await therapistsAxiosApi.put(THERAPIST_PRIVATE_API+`/update-categories/byid/${therapistInfoId}` , selectedCategories);
      console.log(response.data);
      setIsCategoryChanged(false);
      popupToast("success", "Specializations updated successfully", 3000);
    } catch (error) {
      const errorData = error.response.data;
      popupToast("error", errorData.errorMessage, 3000);
    }
  };

  const handleAboutUpdate = async (event) => {
    event.preventDefault();
    const therapistInfoId = therapist.therapistInfoDto.id;
    if (about && about.length < 100) {
      popupToast("error", "Add Minimum 50 words", 3000);
      return;
    }

    try {
      const response = await therapistsAxiosApi.put(THERAPIST_PRIVATE_API+`/update-about/byId/${therapistInfoId}` ,null, {params : { about }});
      console.log(response.data);
      popupToast("success", "Profile About updated successfully", 3000);
      getTherapistById(id);
    } catch (error) {
      const errorData = error.response.data;
      popupToast("error", errorData.errorMessage, 3000);
    }
  };

  const handleAdditionalDocSubmit = async (event) => {
    event.preventDefault();
    const therapistInfoId = therapist.therapistInfoDto.id;
    if (!additionalCert) {
      popupToast("error", "Please select document", 2000);
      return;
    }

    try {
      const formData = new FormData();

      formData.append("file", additionalCert);
      const response = await therapistsAxiosApi.put(THERAPIST_PRIVATE_API+`/update-additional-doc/byId/${therapistInfoId}`, formData, { 'Content-Type': 'multipart/form-data' });
      console.log(response);
      popupToast("success", "document uploaded successfully", 3000);
      setIsCertChanged(false);
      getTherapistById(id);  /// --- 
    } catch (error) {
      const errorData = error.response.data;
      popupToast("error", errorData.errorMessage, 3000);
    }
  };



  return (
    <section className="bg-gray-200 w-full px-5 font-roboto">
      <div className="container mx-auto py-5">
        <h1 className="font-roboto-mono font-bold mb-5 underline underline-offset-2 text-xl text-cyan-900">Edit Profile</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 ">

          <div className="lg:col-span-1">
            <div className="text-center p-4 bg-white rounded-md shadow-md ">
              {/* {userAvatar} */}
              <form onSubmit={handleImageSubmit}>
                <div className="mb-4">
                  <label htmlFor="profileImage" className="block text-sm font-medium text-gray-600">
                    Profile Image
                  </label>
                  <div className="flex justify-center relative mt-5">
                    <ImageView imageUrl={imageUrl} />
                    <BiEdit className="absolute top-0 right-0 font-bold bg-slate-50 text-gray-600 rounded-md cursor-pointer text-[25px] hover:bg-lime-200 hover:text-blue-900" onClick={openImageUpload} />
                  </div>
                  <input
                    type="file"
                    accept="image/jpeg, image/png"
                    id="profileImage"
                    name="profileImage"
                    ref={profileImageRef}
                    onChange={handleImageChange}
                    className="mt-1 p-2 w-full border rounded-md hidden"
                  />
                </div>
                <div className="flex flex-col items-center">
                  <button
                    type="submit"
                    className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
                  >
                    Upload
                  </button>
                </div>
              </form>
              {/* <div className="mb-4">
                <label htmlFor="image">Profile Image:</label>
                <input type="file" id="image" onChange={handleImageChange} />
              </div> */}
              <p className="text-gray-500 mb-1">Userid: #{id}</p>
              <p className="text-gray-500 mb-4">{therapist && therapist.username}</p>

            </div>
          </div>

          <div className="lg:col-span-2 bg-white rounded-md shadow-md ">
            <div className="mb-4">
              <div className="bg-white rounded-md shadow-md p-4 m-4">

                <form onSubmit={handleSave} className="flex flex-col">
                  <div className="flex flex-col mb-4 mt-5">

                    <div className="flex items-center mb-5">
                      <label htmlFor="fullname" className="w-52">Full Name:</label>
                      <input 
                        type="text" 
                        id="fullname"
                        className="p-2 mt-1 rounded-xl border w-full"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        minLength={3}
                        title="Please enter minimum 3 character"
                        required
                      />
                    </div>

                    <div className="flex items-center mb-5">
                      <label htmlFor="mobile" className="w-52">Mobile:</label>
                      <input 
                        type="text" 
                        id="mobile" 
                        value={mobile}
                        className="p-2 mt-1 rounded-xl border w-full"
                        onChange={(e) => setMobile(e.target.value)}
                        pattern="[0-9]{10}"
                        title="Please enter a 10-digit number"
                        required
                      />
                    </div>

                    <div className="flex items-center  mb-5 relative">
                      <label htmlFor="password" className="w-52">Password:</label>
                      <input 
                        type={isPassShow ? "text" : "password"}
                        id="password" value={password}
                        className="p-2 mt-1 rounded-xl border w-full"
                        onChange={(e) => setPassword(e.target.value)}
                        pattern=".{5,15}"
                        title="Password must be between 5 and 15 characters"
                        required
                      />
                      {!isPassShow ?
                        <BsEye onClick={passwordShowHandler} className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer w-4 h-4 text-gray-500 hover:text-gray-800" />
                        :
                        <BsEyeSlash onClick={passwordShowHandler} className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer w-4 h-4 text-gray-500 hover:text-gray-800" />
                      }
                    </div>

                    <div className="flex items-center mb-5 relative">
                      <label htmlFor="rePassword" className="w-52">Re-enter Password:</label>
                      <input
                        type={isPassShow ? "text" : "password"}
                        id="rePassword"
                        className="p-2 mt-1 rounded-xl border w-full"
                        value={rePassword}
                        onChange={(e) => setRePassword(e.target.value)}
                        pattern=".{5,15}"
                        title="Password must be between 5 and 15 characters"
                        required
                      />
                      {!isPassShow ?
                        <BsEye onClick={passwordShowHandler} className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer w-4 h-4 text-gray-500 hover:text-gray-800" />
                        :
                        <BsEyeSlash onClick={passwordShowHandler} className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer w-4 h-4 text-gray-500 hover:text-gray-800" />
                      }
                    </div>


                    <div className="flex mb-5">
                      <button type="submit" className="text-white bg-cyan-800 shadow-xl hover:bg-slate-200 hover:text-cyan-800  font-medium rounded-lg text-sm px-3 py-2.5 text-center mr-2 mb-2 min-w-[100px]">Save</button>
                    </div>

                  </div>
                </form>
                
              </div>
            </div>

            {therapist && therapist.therapistInfoDto && (
            <div className="mb-4">
              <div className="bg-white rounded-md shadow-md p-4 m-4">
                <h4 className="font-roboto-mono mb-5 underline underline-offset-2 text-md text-cyan-900">Specializations</h4>

                <Select
                  isMulti
                  name="categories"
                  defaultValue={therapist.therapistInfoDto.categories.map((category) => (
                    {
                      label: category.name,
                      value: category.name,
                    }
                  ))}
                  options={categories}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={handleCategoryChange}
                />

                <div className="flex mt-5">
                  <button type="button" 
                  onClick={handleCategoryUpdate}
                  className={`text-white ${isCategoryChanged ? 'bg-rose-500 hover:bg-slate-200 hover:text-rose-800  ' : 'bg-cyan-800 hover:bg-slate-200 hover:text-cyan-800  '} shadow-xl font-medium rounded-lg text-sm px-3 py-2.5 text-center mr-2 mb-2 min-w-[100px]`}>update</button>
                </div>
              </div>
            </div>
            )}

            
            {therapist && therapist.therapistInfoDto && (
            <div className="mb-4">
              <div className="bg-white rounded-md shadow-md p-4 m-4">
                <h4 className="font-roboto-mono mb-5 underline underline-offset-2 text-md text-cyan-900">
                  About
                </h4>

                <textarea
                      id="bio"
                      name="bio"
                      rows="10"
                      minLength={50}
                      maxLength={950}
                      value={about}
                      onChange={(e) => { setAbout(e.target.value); }}
                      className="mt-1 p-2 w-full border border-gray-400 rounded-md font-roboto-mono"
                />

                <div className="flex mt-5">
                  <button type="button" 
                  onClick={handleAboutUpdate}
                  className={`text-white ${about !== therapist.therapistInfoDto.bio ? 'bg-rose-500 hover:bg-slate-200 hover:text-rose-800  ' : 'bg-cyan-800 hover:bg-slate-200 hover:text-cyan-800  '} shadow-xl font-medium rounded-lg text-sm px-3 py-2.5 text-center mr-2 mb-2 min-w-[100px]`}>update</button>
                </div>
              </div>
            </div>
            )}

            {therapist && therapist.therapistInfoDto && (
            <div className="mb-4">
              <div className="bg-white rounded-md shadow-md p-4 m-4">
                <h4 className="font-roboto-mono mb-5 underline underline-offset-2 text-md text-cyan-900">
                  Additional Document
                </h4>

                <FileUpload inputId="additionalCertificate" inputName="additionalCertificate" accept={".pdf,.doc,.docx"} acceptTypes={"PDF, DOC, DOCX (MAX. 1MB)"} handleFileSelect={handleFileSelect} />

                <div className="flex flex-col mt-5">
                  {therapist.therapistInfoDto.additionalCertificate && (
                    <div className="mb-5 font-poppins">
                      <p className="text-cyan-500">additional certificate already uploaded</p>
                      <p className="text-cyan-500">please 
                      <span 
                      className="mx-2 underline cursor-pointer text-cyan-600 hover:text-cyan-800 " 
                      onClick={certificateViewOpenHandle}
                      > click here 📄
                      </span> 
                      to view uploaded document
                      </p>
                    </div>
                  )}
                  <button type="button" 
                  onClick={handleAdditionalDocSubmit}
                  className={`text-white ${isCertChanged ? 'bg-rose-500 hover:bg-slate-200 hover:text-rose-800  ' : 'bg-cyan-800 hover:bg-slate-200 hover:text-cyan-800  '} shadow-xl font-medium rounded-lg text-sm px-3 py-2.5 text-center mr-2 mb-2 w-[100px]`}>update</button>
                </div>
              </div>
            </div>
            )}

          </div>

        </div>
      </div>

      {isCertificateViewOpen &&
        <TherapistCertificateView
          isOpen={isCertificateViewOpen}
          onClose={() => setCertificateViewOpen(false)}
          docData={docData}
          className="z-50"
        />
      }
    </section>

  );
};

export default TherapistProfileEditContent;

//=================================================
export const ImageView = (props) => {
  const { imageUrl } = props;

  console.log();

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(imageUrl);
    };

  }, [imageUrl]);

  return (
    <>
      {
        imageUrl ?
          <img
            src={imageUrl}
            alt="Profile Image"
            className={`w-52 h-52 mb-3 rounded-lg shadow-lg flex justify-center items-center text-center`}
            onError={() => {
              console.log("Error loading image");
            }}
          />
          :
          <img src="/Upload2.png" alt="No Image" />
      }
    </>
  );
};
