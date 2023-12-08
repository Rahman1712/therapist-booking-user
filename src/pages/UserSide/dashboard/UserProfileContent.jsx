import { useSelector } from "react-redux";
import { getFirstLetter } from "../../../utils/AvatarUtils";
import { useNavigate } from "react-router";
import { userAxiosApi } from "../../../config/axiosConfig";
import { USER_API } from "../../../constants";
import { popupToast } from "../../../utils/AlertUtils";
import { useEffect, useState } from "react";

const UserProfileContent = () => {
  const { id, username, fullname, email, mobile, imageUrl } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [imageBytes, setImageBytes] = useState(null);

  const handleEdit = () => {
    navigate("/user-profile-edit");
  };

    
  const userProfilePictureUrl = async (userId) => {
    try {
      const response = await userAxiosApi.get(USER_API+`/${userId}/profile-image`); 
      setImageBytes(response.data);
    } catch (error) {
      popupToast("error", "Error in loading image", 3000);
    }
  }

  const getUserAvatar = (fullname, imageUrl) => {
    if (imageUrl) {
      return <img src={imageUrl} alt={fullname} className="rounded-full w-36 mx-auto" />;
      // return <img src={`data:image/png;base64,${imageBytes}`} alt={fullname} className="rounded-full w-36 mx-auto" />;
    } else {
      return (
        <div
          className={`w-24 h-24 rounded-full mx-auto text-white bg-cyan-900 flex justify-center items-center font-bold text-5xl m-2 font-roboto`}
        >
          {getFirstLetter(fullname)}
        </div>
      );
    }
  };

  const userAvatar = getUserAvatar(fullname, imageUrl);

  useEffect(() =>{
    // userProfilePictureUrl(id);
  }, []) 


  return (
    <section className="bg-gray-200 w-full px-5 font-roboto">
      <div className="container mx-auto py-5">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          <div className="lg:col-span-1 bg-white rounded-md shadow-md ">
            <div className="text-center p-4">
              {userAvatar}
              <p className="text-gray-500 mt-2 mb-1">Userid: #{id}</p>
              <p className="text-gray-500 mb-4">{username}</p>
              {/* Edit button */}
              <button onClick={handleEdit} className="text-white bg-cyan-800 shadow-xl hover:bg-slate-200 hover:text-cyan-800  font-medium rounded-lg text-sm px-3 py-2.5 text-center mr-2 mb-2 min-w-[100px]">Edit</button>
            </div>
          </div>

          <div className="lg:col-span-2 ">
            <div className="mb-4">
              <div className="bg-white rounded-md shadow-md p-4">
                <div className="flex flex-col mb-4 mt-5">
                  <div className="flex mb-5">
                    <p className="w-1/3">Full Name</p>
                    <p className="text-gray-500">{fullname}</p>
                  </div>
                  <hr />
                  <div className="flex mb-5">
                    <p className="w-1/3">Email</p>
                    <p className="text-gray-500">{email}</p>
                  </div>
                  <hr />
                  <div className="flex mb-5">
                    <p className="w-1/3">Mobile</p>
                    <p className="text-gray-500">{mobile}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default UserProfileContent;
