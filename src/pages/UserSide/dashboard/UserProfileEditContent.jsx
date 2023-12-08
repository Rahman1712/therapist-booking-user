/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { popupToast } from "../../../utils/AlertUtils";
import { userAxiosApi } from "../../../config/axiosConfig";
import { USER_API } from "../../../constants";
import { authActions } from "../../../store/auth-slice";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const UserProfileEditContent = () => {
  const dispatch = useDispatch();
  const { id, username, fullname: currentFullname, mobile: currentMobile, imageUrl: currentImageUrl } = useSelector((state) => state.auth);

  const [fullname, setFullname] = useState(currentFullname);
  const [mobile, setMobile] = useState(currentMobile);
  const [imageUrl, setImageUrl] = useState(currentImageUrl);
  const [isPassShow, setPassShow] = useState(false);

  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const profileImageRef = useRef();

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

  const handleImageSubmit = async (event) => {
    event.preventDefault();
    if (!image) {
      popupToast("error", "Please select image", 2000);
      return;
    }
    try {
      const formData = new FormData();

      formData.append("file", image);
      const response = await userAxiosApi.put(USER_API + `/update/profile-image/byId/${id}`, formData, { 'Content-Type': 'multipart/form-data' });
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

    userAxiosApi.put(USER_API + `/update/profile-data/byid/${id}`, updatedData)
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


  return (
    <section className="bg-gray-200 w-full px-5 font-roboto">
      <div className="container mx-auto py-5">
        <h1 className="font-roboto-mono font-bold mb-5 underline underline-offset-2 text-xl text-cyan-900">Edit Profile</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 ">

          <div className="lg:col-span-1 bg-white rounded-md shadow-md ">
            <div className="text-center p-4">
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
              <p className="text-gray-500 mb-4">{username}</p>

            </div>
          </div>

          <div className="lg:col-span-2 ">
            <div className="mb-4">
              <div className="bg-white rounded-md shadow-md p-4">

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
          </div>

        </div>
      </div>
    </section>

  );
};

export default UserProfileEditContent;

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
