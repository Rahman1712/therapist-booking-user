import Footer from "../../../components/CommonComponents/footer/Footer"
import Navbar from "../../../components/UserComponents/navbar/Navbar"
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../utils/Spinner/Spinner";
import { useNavigate } from "react-router";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { userAxiosApi } from '../../../config/axiosConfig';
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { authActions } from "../../../store/auth-slice";

const PasswordReset = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isPassShow, setPassShow] = useState(false);
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const { username, access_token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const updatePasswordHandle = async (event) => {
    event.preventDefault();

    if (password !== rePassword) {
      popupToast("error", "Password and ReEnter Password are incorrect", 2000);
      return;
    }
    if (password.length < 5) {
      popupToast("error", "Password must be 5 character minimum", 2000);
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("username", username);
    formData.append("newPassword", password);
    formData.append("token", access_token);

    try {
      console.log(username);
      const response = await userAxiosApi.put("/api/v1/auth/update-password", formData);
      popupToast("success", `${response.data} Please login`, 3000, "top-center");


      dispatch(authActions.logout());

      setTimeout(() => {
        setLoading(false);
        navigate("/login");
      }, 500);
    } catch (error) {
      const errorData = error.response.data;
      console.log(errorData);
      setLoading(false);
      popupToast("error", errorData.errorMessage, 2000, "top-center");
    }
  };


  const popupToast = (toastType, toastMessage, duration = 1000, position = "bottom-center") => {
    switch (toastType) {
      case "success":
        toast.success(toastMessage, { duration: duration, position: position });
        break;
      case "error":
        toast.error(toastMessage, { position: position, duration: duration });
        break;
      default:
        toast.error("An error occurred...!");
        break;
    }
  };

  const passwordShowHandler = () => {
    setPassShow(!isPassShow);
  }


  return (
    <>
      <Navbar />

      <section className="bg-gray-50 min-h-screen flex items-center justify-center pb-5 mb-5">
        {loading && <Spinner />}
        <div className="max-w-3xl grid grid-cols-1 md:grid-cols-2">
          {/* LEft Side */}
          <div className="flex items-center justify-center w-full md:w-full py-1 rounded-[30px] shadow-sm">
            <div className="p-10">
              <img
                className="w-[80%] h-auto"
                src="heart_6.png"
                alt="Login Icon"
              />
              <p className="text-sm text-[#002D74] mt-4 font-bold">
                Your Path to Wellness Starts Here
              </p>
            </div>
          </div>

          {/* Right Side (OTP Input) */}
          <div className="w-full py-2 md:py-16 px-16 md:px-10 flex flex-col justify-center items-center md:justify-start md:items-start">
            <h2 className="font-bold text-2xl text-[#002D74] mb-5" style={{ fontFamily: `'Roboto', sans-serif`, }}>Reset Password 🔏</h2>

            <form className="w-full flex flex-col gap-4" onSubmit={updatePasswordHandle}>

              <div className="relative">
                <input
                  className="p-2 mt-1 rounded-xl border w-full"
                  type={isPassShow ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  onChange={(e) => { setPassword(e.target.value) }}
                  required
                />
                {!isPassShow ?
                  <BsEye onClick={passwordShowHandler} className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer w-4 h-4 text-gray-500 hover:text-gray-800" />
                  :
                  <BsEyeSlash onClick={passwordShowHandler} className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer w-4 h-4 text-gray-500 hover:text-gray-800" />
                }
              </div>

              <div className="relative">
                <input
                  className="p-2 mt-1 rounded-xl border w-full"
                  type={isPassShow ? "text" : "password"}
                  name="rePassword"
                  placeholder="ReEnter Password"
                  onChange={(e) => { setRePassword(e.target.value) }}
                  required
                />
                {!isPassShow ?
                  <BsEye onClick={passwordShowHandler} className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer w-4 h-4 text-gray-500 hover:text-gray-800" />
                  :
                  <BsEyeSlash onClick={passwordShowHandler} className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer w-4 h-4 text-gray-500 hover:text-gray-800" />
                }
              </div>

              <button className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">Update</button>
            </form>

          </div>
        </div>
        <Toaster />
      </section>

      <Footer />
    </>
  )
}

export default PasswordReset