import Footer from "../../../components/CommonComponents/footer/Footer";
import Navbar from "../../../components/UserComponents/navbar/Navbar";
import { useDispatch } from "react-redux";
import Spinner from "../../../utils/Spinner/Spinner";
import { useNavigate } from "react-router";
import { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { userAxiosApi } from '../../../config/axiosConfig';
import { BiSend } from "react-icons/bi";
import { authActions } from "../../../store/auth-slice";

function Forgot() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSendOtp, setIsSendOtp] = useState(false);
  const dispatch = useDispatch();

  const inputRef = useRef(null);
  const emailRef = useRef(null);

  const [otpInput, setOtpInput] = useState({
    one: "",
    two: "",
    three: "",
    four: ""
  });

  const handleOtpChangeHandler = (e) => {
    setIsError(false);
    if (e.target.value.length > 1 || !/^[0-9]$/.test(e.target.value)) {
      e.target.value = e.target.value.slice(0, -1);
      return;
    }
    if (e.target.value.length === 1 && /^[0-9]$/.test(e.target.value)) {
      setOtpInput({
        ...otpInput,
        [e.target.name]: e.target.value
      });
      const inputNames = ["one", "two", "three", "four"];
      const currentIndex = inputNames.indexOf(e.target.name);
      if (currentIndex < 3) {
        const nextInputName = inputNames[currentIndex + 1];
        inputRef.current.querySelector(`[name=${nextInputName}]`).focus();
      }
    }
  };

  const otpSubmitHandle = async (event) => {
    event.preventDefault();

    const otpValue = Object.values(otpInput).join("");
    if (otpValue.length !== 4 || !/^[0-9]{4}$/.test(otpValue)) {
      popupToast("error", "Please enter a valid 4-digit OTP");
      setIsError(true);
      return;
    }
    console.log(otpValue);
    setLoading(true);

    try {
      const email = emailRef.current.value;
      const formData = new FormData();
      formData.append("email", email);
      formData.append("otp", otpValue);
      const response = await userAxiosApi.post("/api/v1/auth/verify-forgot-otp", formData);

      const access_token = response.data;
      dispatch(authActions.setAccessToken({ access_token }));

      popupToast("success", "OTP verified successfully ✅.", 3000, "top-center");

      setLoading(false);
      setTimeout(() => {
        navigate("/reset-password");
      }, 2000);
    } catch (error) {
      const errorData = error.response.data;
      console.log(errorData);
      setLoading(false);

      popupToast("error", errorData.errorMessage, 2000);
    }
  };

  const otpResendHandle = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    const email = emailRef.current.value;
    formData.append("email", email);
    try {
      // console.log(email);
      const response = await userAxiosApi.put("/api/v1/auth/resend-otp", formData);
      popupToast("success", response.data, 3000, "top-center");
      setLoading(false);
    } catch (error) {
      const errorData = error.response.data;
      console.log(errorData);
      setLoading(false);
      popupToast("error", errorData.errorMessage, 2000, "top-center");
    }
  };

  const mailSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    const email = emailRef.current.value;

    if (!isValidEmail(email)) {
      popupToast("error", "Please enter a valid email", 4000, "top-center");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("email", email);
      const response = await userAxiosApi.post("/api/v1/auth/mail-reset-otp", formData);

      //console.log(response.data);
      popupToast("success", response.data, 3000, "top-center");

      setIsSendOtp(true);
      setLoading(false);
    } catch (error) {
      const errorData = error.response.data;
      setLoading(false);
      popupToast("error", errorData.errorMessage, 3000);
    }

  }

  const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
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



  return (
    <>
      <Navbar />

      <section className="bg-gray-50 min-h-screen flex items-center justify-center pb-5">
        {loading && <Spinner />}
        <div className="max-w-5xl grid grid-cols-1 md:grid-cols-2">
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
          <div className="w-full py-2 md:py-16 px-4 md:px-4 flex flex-col justify-center items-center md:justify-start md:items-start">
            <h2 className="font-bold text-2xl text-[#002D74]" style={{ fontFamily: `'Roboto', sans-serif`, }}>Forgot Password 🔐</h2>
            <p className="text-xs mt-4 text-[#002D74]">
              To reset password enter registered email ✉️
            </p>

            <form ref={inputRef} className="w-full mt-2">
              <div className="flex flex-row gap-1 justify-center items-center">
                <div className="flex-grow">
                  <input className="w-full p-2 mt-3 mb-3 rounded-xl border" type="email" name="email" placeholder="Registered Email" required ref={emailRef} />
                </div>
                <div className="">
                  <button onClick={mailSubmitHandler} type="submit" className="bg-[#002D74] p-2 pl-3 rounded-lg text-white hover:scale-105 duration-300" >
                    <BiSend />
                  </button>
                </div>
              </div>
            </form>


            {isSendOtp &&
              <>
                <div className="flex flex-col mt-5">
                  <p className="text-xs mt-4 text-[#002D74]">
                    Otp 🔑 sended. Please check your email ✉️
                  </p>
                  <form action="" className="flex flex-col gap-2" ref={inputRef}>
                    <div className="flex flex-row gap-4 justify-center">
                      <input
                        className={`p-2 mt-8 rounded-xl text-center border font-bold border-gray-500 ${isError ? 'border-red-500' : ''} focus:bg-violet-200`}
                        style={{ width: "40px", fontFamily: `'Orbitron', sans-serif`, caretColor: 'transparent' }}
                        type="text"
                        inputMode="numeric"
                        name="one"
                        placeholder="-"
                        onChange={handleOtpChangeHandler}
                        autoFocus
                        required
                        autoComplete="off"
                      />
                      <input
                        className={`p-2 mt-8 rounded-xl text-center border font-bold border-gray-500 ${isError ? 'border-red-500' : ''} focus:bg-violet-200`}
                        style={{ width: "40px", fontFamily: `'Orbitron', sans-serif`, caretColor: 'transparent' }}
                        type="text"
                        name="two"
                        inputMode="numeric"
                        placeholder="-"
                        onChange={handleOtpChangeHandler}
                        required
                        autoComplete="off"
                      />
                      <input
                        className={`p-2 mt-8 rounded-xl text-center border font-bold border-gray-500 ${isError ? 'border-red-500' : ''} focus:bg-violet-200`}
                        style={{ width: "40px", fontFamily: `'Orbitron', sans-serif`, caretColor: 'transparent' }}
                        type="text"
                        inputMode="numeric"
                        name="three"
                        placeholder="-"
                        onChange={handleOtpChangeHandler}
                        required
                        autoComplete="off"
                      />
                      <input
                        className={`p-2 mt-8 rounded-xl text-center border font-bold border-gray-500 ${isError ? 'border-red-500' : ''} focus:bg-violet-200`}
                        style={{ width: "40px", fontFamily: `'Orbitron', sans-serif`, caretColor: 'transparent' }}
                        type="text"
                        inputMode="numeric"
                        name="four"
                        placeholder="-"
                        onChange={handleOtpChangeHandler}
                        required
                        autoComplete="off"
                      />
                    </div>

                    <button onClick={otpSubmitHandle} type="submit" className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">
                      reset
                    </button>
                  </form>
                </div>

                <div className="mt-6 grid grid-cols  items-center text-gray-400">
                  <hr className="border-gray-400" />
                </div>

                <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
                  <p className="mx-2">Did not receive OTP?</p>
                  <a
                    onClick={otpResendHandle}
                    className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300 cursor-pointer"
                  >
                    Resend
                  </a>
                </div>
              </>
            }

          </div>
        </div>
        <Toaster />
      </section>

      <Footer />
    </>
  );
}

export default Forgot;