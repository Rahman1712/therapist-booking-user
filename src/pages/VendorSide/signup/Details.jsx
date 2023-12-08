import Navbar from "../../../components/VendorComponents/navbar/Navbar";
import Footer from "../../../components/CommonComponents/footer/Footer";
import { useState, useRef } from "react";
import { therapistsAxiosApi } from "../../../config/axiosConfig";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import languagesData from "../../../constants/languages.json";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import ImageView from "./ImageView";
import { BiEdit } from "react-icons/bi";
import Select from 'react-select'
import FileUpload from "../../../components/CommonComponents/file/FileUpload";
import { authActions } from "../../../store/auth-slice";

const Details = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id, username, imageUrl: currentImageUrl } = useSelector((state) => state.auth);
  const [image, setImage] = useState("");
  // const [imageUrl, setImageUrl] = useState('');
  const [imageUrl, setImageUrl] = useState(currentImageUrl);
  const profileImageRef = useRef();
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  // const languageNames = languagesData.map((language) => language.name);
  const languageNames = languagesData.map((language) => ({
    label: language.name,
    value: language.name,
  }));
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    bio: "",
    categories: [],
    languages: [],
    experience_years: "",
    hourly_rate: "",
    is_certified: true,
    qualification: "",
    address: {
      building: "",
      street: "",
      district: "",
      state: "",
      zipcode: "",
    },
  });

  const [certificates, setCertificates] = useState({
    educationalCertificate: null,
    experienceCertificate: null,
    additionalCertificate: null,
  });

  useEffect(() => {
    therapistsAxiosApi
      .get("/api/v1/public/all-categories")
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

      if(currentImageUrl){
        setIsImageUploaded(true);  ///---
      }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    let updatedValue = value;

    // If it's a file input, get the file
    if (type === "file") {
      updatedValue = e.target.files[0]; // Get the file object
    }

    setFormData({
      ...formData,
      [name]: updatedValue,
    });
  };

  /*
  const handleCertificateFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    setCertificates({
      ...certificates,
      [name]: file,
    });
  };
  */

  const handleFileSelect = (inputName, files) => {
    let file = null;
    if (files != null) {
      file = files[0];
    }
    setCertificates({
      ...certificates,
      [inputName]: file,
    });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;

    // Update the address in the form data
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        [name]: value,
      },
    });
  };

  /*
    const handleSelectChange = (e) => {
      const { name, options } = e.target;
  
      const selectedItems = [];
      for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
          selectedItems.push(options[i].value);
        }
      }
  
      setFormData({
        ...formData,
        [name]: selectedItems,
      });
    };
    */

  const handleLanguageChange = (selectedOptions) => {
    const selectedLanguageValues = selectedOptions.map((option) => option.value);
    setFormData({
      ...formData,
      languages: selectedLanguageValues,
    });
  }
  const handleCategoryChange = (selectedOptions) => {
    const selectedCategoryValues = selectedOptions.map((option) => option.value);
    setFormData({
      ...formData,
      categories: selectedCategoryValues,
    });
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

  const openImageUpload = () => {
    profileImageRef.current.click();
  }

  const popupToast = (toastType, toastMessage, duration = 1000) => {
    switch (toastType) {
      case "success":
        toast.success(toastMessage, { position: "bottom-center" });
        break;
      case "error":
        toast.error(toastMessage, { position: "bottom-center", duration: duration });
        break;
      case "warning":
        toast.error(toastMessage, { position: "bottom-center", duration: duration, style: { background: '#FFC107', color: 'red' }, icon: '⚠️' });
        break;
      default:
        toast.error("Error occurred...!");
        break;
    }
  };

  const handleImageSubmit = async (event) => {
    event.preventDefault();
    if (!image) {
      popupToast("error", "Please select image", 2000);
      return;
    }
    try {
      const formData = new FormData();

      formData.append("image", image);
      const response = await therapistsAxiosApi.put(`/api/v1/private/profile-image/byId/${id}`, formData);
      console.log(response);
      setIsImageUploaded(true);
      popupToast("success", "image uploaded", 3000);
    } catch (error) {
      const errorData = error.response.data;
      popupToast("error", errorData.errorMessage, 3000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isImageUploaded) {
      popupToast("warning", "Please upload image", 2000);
      return;
    }
    if (certificates.educationalCertificate == null ||
      certificates.experienceCertificate == null) {
      popupToast("error", "Please upload mandatory certificates", 2000);
      return;
    }

    const formDataToSend = new FormData();

    const json = JSON.stringify(formData);
    const blob = new Blob([json], {
      type: 'application/json'
    });
    formDataToSend.append("infoRequest", blob);
    formDataToSend.append("educationalCertificate", certificates.educationalCertificate);
    formDataToSend.append("experienceCertificate", certificates.experienceCertificate);
    formDataToSend.append("additionalCertificate", certificates.additionalCertificate);

    try {
      const response = await therapistsAxiosApi.post(`/api/v1/private/therapist-info/by-therapistid/${id}`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        // withCredentials: true,
      });

      dispatch(authActions.setSubmited({submited: true}));
      console.log("Therapist info added successfully:", response.data);
      popupToast("success", "Therapist Info added 😀", 2000);
      navigate(`/vendor/success`);
    } catch (error) {
      console.error("Error adding therapist:", error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="
      text-gray-900 bg-gradient-to-r from-teal-100 to-lime-100 hover:bg-gradient-to-l hover:from-teal-100 hover:to-lime-100 focus:ring-4 focus:outline-none focus:ring-lime-100 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
        <div className="w-full">
          <h2 className="font-extrabold text-[20px] mt-2 underline underline-offset-4 text-slate-600">Personal Details</h2>
        </div>

        <div className="flex flex-col md:flex-row md:p-6 md:pt-2">
          <div className="md:w-1/3 p-12 mt-5 rounded-lg">
            <div className="w-full shadow-lg rounded-lg">
              <div className="p-5 border rounded-lg min-h-[400px] flex flex-col justify-center items-center">
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
              </div>
            </div>
          </div>


          <div className="md:w-2/3 p-12 mt-5 rounded-lg">
            <div className="w-full shadow-lg rounded-lg">
              <div className="p-5 border rounded-lg">
                <form onSubmit={handleSubmit} className="space-y-4">

                  <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-600">
                      Username : <span id="username" className="font-bold text-gray-900">{username}</span>
                    </label>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-800">
                      BioData (describe in details)
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      rows="5"
                      value={formData.bio}
                      onChange={handleInputChange}
                      className="mt-1 p-2 w-full border border-gray-400 rounded-md"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="categories" className="block text-sm font-medium text-gray-800">
                      Specializations
                    </label>
                    {/* <select
                    id="categories"
                    name="categories"
                    value={formData.categories}
                    onChange={handleSelectChange}
                    multiple
                    className="mt-1 p-2 w-full border rounded-md"
                  >
                    {catogeries.map((catogery, index) => (
                      <option key={index} value={catogery}>
                        {catogery}
                      </option>
                    ))}
                  </select> */}
                    <Select
                      isMulti
                      name="categories"
                      options={categories}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      onChange={handleCategoryChange}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="languages" className="block text-sm font-medium text-gray-800">
                      Languages
                    </label>
                    {/* <select
                    id="languages"
                    name="languages"
                    value={formData.languages}
                    onChange={handleSelectChange}
                    multiple
                    className="mt-1 p-2 w-full border rounded-md"
                  >
                    {languageNames.map((language, index) => (
                      <option key={index} value={language}>
                        {language}
                      </option>
                    ))}
                  </select> */}
                    <Select
                      isMulti
                      name="languages"
                      options={languageNames}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      onChange={handleLanguageChange}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="qualification" className="block text-sm font-medium text-gray-800">
                      Qualification
                    </label>

                    <input
                        type="text"
                        id="qualification"
                        name="qualification"
                        value={formData.qualification}
                        onChange={handleInputChange}
                        className="mt-1 p-2 w-full border border-gray-400 rounded-md"
                      />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="mb-4">
                      <label htmlFor="experienceYears" className="block text-sm font-medium text-gray-800">
                        Experience Years
                      </label>
                      <input
                        type="text"
                        id="experience_years"
                        name="experience_years"
                        value={formData.experience_years}
                        onChange={handleInputChange}
                        className="mt-1 p-2 w-full border border-gray-400 rounded-md"
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-800">
                        Hourly Rate
                      </label>
                      <input
                        type="text"
                        id="hourly_rate"
                        name="hourly_rate"
                        value={formData.hourly_rate}
                        onChange={handleInputChange}
                        className="mt-1 p-2 w-full border border-gray-400 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 border border-gray-300 p-5 rounded-xl shadow-lg">
                    <label className="block text-sm font-medium text-gray-800 underline">Address</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="building" className="block text-sm font-medium text-gray-800">
                          Building
                        </label>
                        <input
                          type="text"
                          id="building"
                          name="building"
                          value={formData.address.building}
                          onChange={handleAddressChange}
                          className="mt-1 p-2 w-full border border-gray-400 rounded-md "
                        />
                      </div>

                      <div>
                        <label htmlFor="street" className="block text-sm font-medium text-gray-800">
                          Street
                        </label>
                        <input
                          type="text"
                          id="street"
                          name="street"
                          value={formData.address.street}
                          onChange={handleAddressChange}
                          className="mt-1 p-2 w-full border border-gray-400 rounded-md"
                        />
                      </div>

                      <div>
                        <label htmlFor="district" className="block text-sm font-medium text-gray-800">
                          District
                        </label>
                        <input
                          type="text"
                          id="district"
                          name="district"
                          value={formData.address.district}
                          onChange={handleAddressChange}
                          className="mt-1 p-2 w-full border border-gray-400 rounded-md"
                        />
                      </div>

                      <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-800">
                          State
                        </label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={formData.address.state}
                          onChange={handleAddressChange}
                          className="mt-1 p-2 w-full border border-gray-400 rounded-md"
                        />
                      </div>

                      <div>
                        <label htmlFor="zipcode" className="block text-sm font-medium text-gray-800">
                          Zipcode
                        </label>
                        <input
                          type="text"
                          id="zipcode"
                          name="zipcode"
                          value={formData.address.zipcode}
                          onChange={handleAddressChange}
                          className="mt-1 p-2 w-full border border-gray-400 rounded-md"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 border border-gray-300 p-5 rounded-xl shadow-lg">
                    <label className="block text-sm font-medium text-gray-800 underline">Certificates</label>
                    <div className="mb-4 border border-gray-400 p-5 rounded-xl shadow-sm border-opacity-80">
                      <label htmlFor="educationalCertificate" className="block text-sm font-medium text-gray-800">
                        Educational Certificate (mandatory)
                      </label>
                      <FileUpload inputId="educationalCertificate" inputName="educationalCertificate" accept={".pdf,.doc,.docx"} acceptTypes={"PDF, DOC, DOCX (MAX. 1MB)"} handleFileSelect={handleFileSelect} />
                    </div>

                    <div className="mb-4 border border-gray-400 p-5 rounded-xl shadow-sm border-opacity-80">
                      <label htmlFor="experienceCertificate" className="block text-sm font-medium text-gray-800">
                        Experience Certificate (mandatory)
                      </label>
                      <FileUpload inputId="experienceCertificate" inputName="experienceCertificate" accept={".pdf,.doc,.docx"} acceptTypes={"PDF, DOC, DOCX (MAX. 1MB)"} handleFileSelect={handleFileSelect} />
                    </div>

                    <div className="mb-4 border border-gray-400 p-5 rounded-xl shadow-sm border-opacity-80">
                      <label htmlFor="additionalCertificate" className="block text-sm font-medium text-gray-800">
                        Additional Certificate (optional)
                      </label>
                      <FileUpload inputId="additionalCertificate" inputName="additionalCertificate" accept={".pdf,.doc,.docx"} acceptTypes={"PDF, DOC, DOCX (MAX. 1MB)"} handleFileSelect={handleFileSelect} />
                    </div>
                  </div>




                  <div className="mt-4">
                    <button
                      type="submit"
                      className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Toaster />

      <Footer />
    </>
  );
};

export default Details;
