import Footer from "../../../components/CommonComponents/footer/Footer";
import Navbar from "../../../components/VendorComponents/navbar/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router";
import { therapistsAxiosApi } from '../../../config/axiosConfig';
import toast, { Toaster } from "react-hot-toast";
import Spinner from "../../../utils/Spinner/Spinner";
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/auth-slice";
import { Link } from "react-router-dom";

const TherapistSignup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorFields, setErrorFields] = useState([]);
  const [isPassShow, setPassShow] = useState(false);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullname: "",
    mobile: "",
    email: "",
    username: "",
    password: "",
    rePassword: ""
  });

  const handleChangeForm = (e) => {
    setIsError(false);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const loginHandle = () => {
    navigate("/vendor/login");
  };

  const registerHandle = async (event) => {
    event.preventDefault();

    if (formData.password !== formData.rePassword) {
      popupToast("error", "Password and ReEnter Password are incorrect", 2000);
      return;
    }
    setLoading(true);

    try {

      const response = await therapistsAxiosApi.post("/api/v1/auth/register", {
        ...formData
      });
      console.log("Register successful:", response.data);
      popupToast("success", "Register successful ✅, Otp sended to your email ✉️ please check it 🔑.");

      setLoading(false);
      //dispatch(authActions.signup({...formData}));
      dispatch(authActions.setUsername({ ...formData }));
      dispatch(authActions.setEmail({ ...formData }));
      dispatch(authActions.setRole({ role: "THERAPIST" }));

      setTimeout(() => {
        navigate("/vendor/otp-verify");
        // navigate("/vendor/detail/" + formData.username);
      }, 500);
    } catch (error) {
      const errorData = error.response.data;
      console.log(errorData);
      setLoading(false);

      setErrorFields([]);
      if (Array.isArray(errorData) || (typeof errorData === 'object' && !Array.isArray(errorData))) {
        if (Array.isArray(errorData)) {
          errorData.forEach((item) => {
            setErrorFields([...errorFields, item.fieldName]);
            popupToast("error", item.errorMessage, 3000);
          });
          setIsError(true);
        } else {
          popupToast("error", errorData.errorMessage, 3000);
        }
      } else {
        popupToast("error", errorData);
      }

      /* if (errorData && Array.isArray(errorData)) {
         errorData.forEach((item) => {
           setErrorFields([...errorFields, item.fieldName]);
           popupToast("error", item.errorMessage, 3000);
         });
         setIsError(true);
       } else {
         popupToast("error", errorData);
       }
       */
    }
  };

  const passwordShowHandler = () => {
    setPassShow(!isPassShow);
  }

  const popupToast = (toastType, toastMessage, duration = 1000) => {
    switch (toastType) {
      case "success":
        toast.success(toastMessage, { position: "bottom-center" });
        break;
      case "error":
        toast.error(toastMessage, { position: "bottom-center", duration: duration });
        break;
      default:
        toast.error("Error occurred...!");
        break;
    }
  };

  const fieldBgColor = (field) => {
    return errorFields.find((item) => item === field);
  };

  return (
    <>
      <Navbar />

      <section className="bg-gray-50 min-h-screen flex items-center justify-center py-5">
        {loading && <Spinner />}
        <div className="flex max-w-3xl">

          {/* Left Side */}
          <div className="md:block hidden w-3/4 py-1">
            <div className="rounded-[30px] shadow-sm  p-10">
              <img
                className="w-full h-auto rounded-lg"
                src="/heart_1.webp"
                alt="Login Icon"
              />
              <p className="text-sm text-[#002D74] mt-4 font-bold text-center">
                Wellness In Your Hands
              </p>
            </div>
          </div>

          <div className="md:w-3/4 px-8 md:px-16">
            <h2 className="font-bold text-2xl text-[#002D74]">Therapist Registration</h2>
            <p className="text-xs mt-4 text-[#002D74]">If you are a new member, easily sign up</p>

            <div className="mt-1 text-xs py-1 text-[#002D74]">
              <span className='mr-2 font-semibold text-[#1f3e71]'>Register as User ?</span>
              <Link className='underline font-bold' to="/signup">click here</Link>
            </div>

            <form action="" className="flex flex-col gap-2" onSubmit={registerHandle}>
              <input
                className={`p-2 mt-5 rounded-xl border ${isError && fieldBgColor("fullname") ? "bg-red-200 placeholder:text-red-900" : ""}`}
                type="text"
                name="fullname"
                placeholder={`${isError && fieldBgColor("fullname") ? "Invalid Fullname" : "Fullname"}`}
                onChange={handleChangeForm}
                required
              />

              <input
                className={`p-2 mt-1 rounded-xl border ${isError && fieldBgColor("mobile") ? "bg-red-200 placeholder:text-red-900" : ""}`}
                type="text"
                name="mobile"
                placeholder={`${isError && fieldBgColor("mobile") ? "Invalid Mobile" : "Mobile"}`}
                onChange={handleChangeForm}
                required
              />

              <input
                className={`p-2 mt-1 rounded-xl border ${isError && fieldBgColor("email") ? "bg-red-200 placeholder:text-red-900" : ""}`}
                type="email"
                name="email"
                placeholder={`${isError && fieldBgColor("email") ? "Invalid Email" : "Email"}`}
                onChange={handleChangeForm}
                required
              />

              <input
                className={`p-2 mt-1 rounded-xl border ${isError && fieldBgColor("username") ? "bg-red-200 placeholder:text-red-900" : ""}`}
                type="text"
                name="username"
                placeholder={`${isError && fieldBgColor("username") ? "Invalid Username" : "Username"}`}
                onChange={handleChangeForm}
                required
              />

              <div className="relative">
                <input
                  className={`p-2 mt-1 rounded-xl border w-full ${isError && fieldBgColor("password") ? "bg-red-200 placeholder:text-red-900" : ""}`}
                  type={isPassShow ? "text" : "password"}
                  name="password"
                  placeholder={`${isError && fieldBgColor("password") ? "Invalid Password" : "Password"}`}
                  onChange={handleChangeForm}
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
                  onChange={handleChangeForm}
                  required
                />
                {!isPassShow ?
                  <BsEye onClick={passwordShowHandler} className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer w-4 h-4 text-gray-500 hover:text-gray-800" />
                  :
                  <BsEyeSlash onClick={passwordShowHandler} className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer w-4 h-4 text-gray-500 hover:text-gray-800" />
                }
              </div>


              <button className="bg-[#002D74] mt-2 rounded-xl text-white py-2 hover:scale-105 duration-300">Register</button>
            </form>

            <div className="mt-6 items-center text-gray-400">
              <hr className="border-gray-400" />
            </div>

            <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
              <p>Already have an account?</p>
              <button onClick={loginHandle} className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">Login</button>
            </div>
          </div>
        </div>
        <Toaster />
      </section>

      <Footer />
    </>
  )
}

export default TherapistSignup