import Navbar from '../../../components/UserComponents/navbar/Navbar'
import Footer from '../../../components/CommonComponents/footer/Footer'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAxiosApi } from '../../../config/axiosConfig';
import toast, { Toaster } from "react-hot-toast";
import { LinearProgress } from '@mui/material';
import { authActions } from '../../../store/auth-slice';
import { useDispatch } from 'react-redux';

const OAuth = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isProgress, setProgress] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // Extract token or error message from the URI
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get('token');
    console.log(token);
    // Use the getUrlParameter function to extract the error parameter
    const errorMessage = getUrlParameter('error');

    if (token) {
      // Handle success case (token found)
      fetchToken(token);
    } else if (errorMessage) {
      // Handle error case (error message found)
      // Decode the error message
      const decodedErrorMessage = decodeURIComponent(errorMessage);
      setError({ type: "Authorization Error", message: decodedErrorMessage, logo: "/google.png" });
    } else {
      // Neither token nor error message found in the URI, handle this case accordingly
      setError({ type: "Forbidden", message: 'Unknown error occurred.', logo: "/http-403.webp" });
    }
  }, []);

  // Define the getUrlParameter function as a helper function
  function getUrlParameter(name) {
    name = name.replace(/[[]/, '[').replace(/[\]]/, ']');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(window.location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

  const fetchToken = (token) => {
    console.log(token);
    // Send a request to localhost:8080/getToken with the token using Axios
    userAxiosApi.post('/api/v1/auth/validate-token/oauth2-token', { token }, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        setProgress(true);
        const responseData = response.data;

        console.log(responseData);

        // Cookies.set('refresh_token', responseData.refresh_token, {  expires: 7 }); 
        dispatch(authActions.login({ ...responseData }));

        setTimeout(() => {
          navigate("/");
        }, 500);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        // Handle errors as needed, e.g., set error state
        setError({ type: "Forbidden", message: 'Error fetching data: ' + error.message, logo: "/http-403.webp" });
        errorToast(error.response.data);
      });
  };

  const errorToast = (e) => toast.error(e, { position: 'bottom-center' });


  return (
    <>
      <Navbar />

      <>

        <div className="min-h-[80vh] flex items-center justify-center bg-gray-100 mx-10">
          {isProgress &&
            <div className="text-center w-full px-20">
              <p className='text-xl my-3 font-bold text-blue-950'>
                <span className='animate-pulse'>proccessing please wait</span>
                <span className='mx-2 text-blue-400 animate-ping'>.....</span>
              </p>
              <LinearProgress color="secondary" />
            </div>
          }
          {error &&
            <div className="max-w-md w-full px-6">
              <div className="text-center">
                <img src={error?.logo} alt="Error Logo" className="mx-auto h-12 w-24" />
                <h2 className="mb-1 text-3xl font-extrabold text-gray-900">{error?.type}</h2>
                <p className="mt-2 text-sm text-gray-600">{error?.message}</p>
              </div>
            </div>
          }
        </div>
        <Toaster />
      </>

      <Footer />
    </>
  )
}

export default OAuth



/*
http://localhost:5173/oauth2/redirect?token=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkb25yYWhtYW42QGdtYWlsLmNvbSIsImlhdCI6MTY5Njc1ODI2NCwiZXhwIjoxNjk2ODQ0NjY0fQ.h_TBuRPIfhm2TQQv4ZoxdwtP5zTQ1H9vd_0r1_XyIY8
*/

/*
http://localhost:5173/oauth2/redirect?error=[invalid_token_response]%20An%20error%20occurred%20while%20attempting%20to%20retrieve%20the%20OAuth%202.0%20Access%20Token%20Response:%20401%20Unauthorized:%20[no%20body]
*/
