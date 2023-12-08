import Navbar from "../../../components/VendorComponents/navbar/Navbar";
import Footer from "../../../components/CommonComponents/footer/Footer";
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { therapistsAxiosApi } from '../../../config/axiosConfig';
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from 'react-redux';
import Spinner from '../../../utils/Spinner/Spinner';
import { authActions } from '../../../store/auth-slice';
import { Link } from 'react-router-dom';

const TherapistLogin = () => {

  const navigate = useNavigate();
  const passwordInput = useRef();
  const [isPassShow, setPassShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const handleChangeForm = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const singupHandle = () => {
    navigate("/vendor/signup");
  }

  const passwordShowHandler = () => {
    setPassShow(!isPassShow);
  }

  const loginHandle = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await therapistsAxiosApi.post("/api/v1/auth/authenticate", {
        ...formData
      });
      const responseData = response.data;

      dispatch(authActions.login({ ...responseData }));
      successToast("Successfully Logged In 🙂");
      setTimeout(() => {
        setLoading(false);
        navigate("/vendor/home")
      }, 500);
    } catch (error) {
      setLoading(false);
      errorToast(error.response.data.errorMessage);
    }
  };

  // const errorToast = () => toast.error("Password or Username invalid!!");
  const errorToast = (errorData) => {
    toast.error(errorData);
  }
  const successToast = (success) => {
    toast.success(success, { position: 'bottom-center' });
  }

  return (
    <>
      <Navbar />

      <section className="bg-gray-50 min-h-screen flex items-center justify-center">
        {loading && <Spinner />}
        <div className="max-w-3xl flex">
          {/* Right Side (SVG Icon) */}
          <div className="md:block hidden w-1/2 py-16">
            <div className="rounded-[30px] shadow-sm  p-10">
              <img
                className="w-full h-auto rounded-lg"
                src="/heart_1.webp"
                alt="Login Icon"
              />
              <p className="text-sm w-full text-center text-[#002D74] mt-4 font-bold">
                Wellness In Your hands
              </p>
            </div>
          </div>


          {/* Left Side (Credentials Input) */}
          <div className="w-full py-2 md:py-16  md:w-1/2 px-8 md:px-16">
            <h2 className="font-bold text-2xl text-[#002D74] ">Therapist Login</h2>
            <p className="text-xs mt-4 text-[#002D74] ">If you are already a member, easily log in</p>
            <form action="" className="flex flex-col gap-4" onSubmit={loginHandle}>
              <input className="p-2 mt-8 rounded-xl border" type="text" name="username" placeholder="Username" onChange={handleChangeForm} required />
              <div className="relative">
                <input className="p-2 rounded-xl border w-full" type={isPassShow ? "text" : "password"} name="password" placeholder="Password" onChange={handleChangeForm} ref={passwordInput} required />
                {!isPassShow ?
                  <BsEye onClick={passwordShowHandler} className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer w-4 h-4 text-gray-500 hover:text-gray-800" />
                  :
                  <BsEyeSlash onClick={passwordShowHandler} className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer w-4 h-4 text-gray-500 hover:text-gray-800" />
                }
              </div>

              <button className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">Login</button>
            </form>

            <div className="mt-1 text-xs py-3 text-[#002D74] text-center">
              <span className='mr-2 font-semibold text-[#1f3e71]'>Login as User ?</span>
              <Link className='underline font-bold' to="/login">click here</Link>
            </div>

            <div className="mt-3 grid grid-cols-3 items-center text-gray-400">
              <hr className="border-gray-400" />
              <p className="text-center text-sm">OR</p>
              <hr className="border-gray-400" />
            </div>


            <div className="mt-1 text-xs border-b border-[#002D74] py-4 text-[#002D74] text-center">
              <Link to="/forgot-password">Forgot your password?</Link>
            </div>

            <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
              <p> Dont have an account? </p>
              <button onClick={singupHandle} className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">Register</button>
            </div>
          </div>


        </div>
        <Toaster />
      </section>

      <Footer />
    </>
  )
}

export default TherapistLogin;