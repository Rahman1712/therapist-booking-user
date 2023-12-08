import { useState, useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { themeActions } from "../../../store/theme-slice";
import { BiLogIn, BiLogOut } from 'react-icons/bi'
import { FaRegUser } from 'react-icons/fa'
import { useNavigate } from "react-router";
import { therapistsAxiosApi } from '../../../config/axiosConfig';
import { authActions } from "../../../store/auth-slice";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import './Navbar.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);  
  const { isLoggedIn, access_token } = useSelector((state) => state.auth);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleThemeToggle = () => {
    dispatch(themeActions.toggleTheme());
  };

  const registerHandler = () => {
    navigate("/vendor/signup");
  }

  const loginHandler = () => {
    navigate("/vendor/login");
  }

  const logoutHandler = async () => {
    try {
      await therapistsAxiosApi.post("/api/v1/auth/logout", {
        headers: {
          'Authorization': `Bearer ${access_token}`
        },
      });

      dispatch(authActions.logout());
      successToast("Successfully Logged Out 🙂");
    } catch (error) {
      dispatch(authActions.logout());
      errorToast(error.response.data.errorMessage);
    } finally {
      setTimeout(() => {
        navigate("/vendor/login");
      }, 500);
    }
  }

  const errorToast = (errorData) => {
    toast.error(errorData);
  }
  const successToast = (success) => {
    toast.success(success, { position: 'bottom-center' });
  }

  // Add a useEffect to set the document class for dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <nav className="dark:bg-gray-900 bg-gray-100 p-4 shadow-lg z-10 border-b">

      <div className="container mx-auto flex justify-between items-center">
        <Link to="/vendor/home" className="dark:text-blue-400 text-blue-950 text-2xl font-bold">
          medicare 💙
        </Link>
        <div className="lg:flex space-x-4 hidden">
          <Link to="/vendor/profile" className="text-cyan-700 dark:text-blue-600 hover:text-gray-700 dark:hover:text-red-200 font-semibold">
            <span className="link link-underline link-underline-normal dark:link-underline-dark"> Profile </span>
          </Link>
          <Link to="/vendor/blogs" href="#" className="text-cyan-700 dark:text-blue-600 hover:text-gray-700 dark:hover:text-red-200 font-semibold">
          <span className="link link-underline link-underline-normal dark:link-underline-dark"> Blogs </span>
          </Link>
          <Link to="/about" className="text-cyan-700 dark:text-blue-600 hover:text-gray-700 dark:hover:text-red-200 font-semibold">
          <span className="link link-underline link-underline-normal dark:link-underline-dark"> About </span>
          </Link>
          <Link to="/contact" className="text-cyan-700 dark:text-blue-600 hover:text-gray-700 dark:hover:text-red-200 font-semibold">
          <span className="link link-underline link-underline-normal dark:link-underline-dark"> Contact </span>
          </Link>
          <Link to="/vendor/features" className="text-cyan-700 dark:text-blue-600 hover:text-gray-700 dark:hover:text-red-200 font-semibold">
          <span className="link link-underline link-underline-normal dark:link-underline-dark"> Features </span>
            {/* <button onClick={() => navigate("/demo")}>Demo</button> */}
          </Link>
        </div>
        <div className={`lg:hidden`}>
          <button
            onClick={toggleMenu}
            className="text-blue-4 dark:text-blue-600 hover:text-gray-300 dark:hover:text-blue-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
        {isMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 w-full bg-gray-900 dark:bg-gray-100 p-4 rounded-b-md">
            <a href="#" className="block text-blue-400 dark:text-blue-600 hover:text-gray-300 dark:hover:text-blue-200 my-2">
              About
            </a>
            <a href="#" className="block text-blue-400 dark:text-blue-600 hover:text-gray-300 dark:hover:text-blue-200 my-2">
              Profile
            </a>
            <a href="#" className="block text-blue-400 dark:text-blue-600 hover:text-gray-300 dark:hover:text-blue-200 my-2">
              Contact
            </a>
            <a href="#" className="block text-blue-400 dark:text-blue-600 hover:text-gray-300 dark:hover:text-blue-200 my-2">
              Features
            </a>
            <a href="#" className="block text-blue-400 dark:text-blue-600 hover:text-gray-300 dark:hover:text-blue-200 my-2">
              Therapists
            </a>
          </div>
        )}
        <div className="space-x-4 flex items-center text-blue-600 dark:text-blue-400">
          <button onClick={handleThemeToggle}>
            {isDarkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
          </button>

          <>
            {!isLoggedIn &&
              <button
                type="button"
                onClick={registerHandler}
                className={isDarkMode ? 'inline-block rounded-full bg-cyan-700 dark:bg-neutral-50 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white dark:text-neutral-800 shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out hover:bg-cyan-600 dark:hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(251,251,251,0.3)] dark:hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)]' :
                  'inline-block rounded-full bg-cyan-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-cyan-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-cyan-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-cyan-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]'}
              >
                <span className="flex items-center gap-1">register <FaRegUser /></span>
              </button>
            }
          </>


          <button
            type="button"
            onClick={isLoggedIn ? logoutHandler : loginHandler}
            className="inline-block rounded-full bg-cyan-800 dark:bg-neutral-50 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white dark:text-neutral-800 shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-cyan-600 dark:hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-cyan-600 dark:focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:outline-none focus:ring-0 active:bg-cyan-700 dark:active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(251,251,251,0.3)] dark:hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)]"
          >
            {isLoggedIn ?
              <>
                <span className="flex items-center gap-1">logout <BiLogOut /></span>
              </>
              :
              <>
                <span className="flex items-center gap-1">login <BiLogIn /></span>
              </>
            }
          </button>


        </div>
      </div>
      <Toaster />
    </nav>
  );
}

export default Navbar;
