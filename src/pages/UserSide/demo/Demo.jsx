import Footer from "../../../components/CommonComponents/footer/Footer";
import Navbar from "../../../components/UserComponents/navbar/Navbar";
import { useState } from "react";
import { userAxiosApi } from '../../../config/axiosConfig';
import { useSelector } from "react-redux";
// import axios from "axios";
// axios.defaults.withCredentials = true

function Forgot() {

  const [demo, setDemo] = useState(null);
  const access_token = useSelector((state) => state.auth.access_token);

  // useEffect(() => {
  //   api.get('/api/v1/demo/usersd', {
  //     headers: {
  //         'Authorization' : `Bearer ${localStorage.getItem("access_token")}`
  //     },
  //   })
  //   .then((response) => {
  //       console.log(response.data);
  //       setDemo(response.data)
  //   })
  //   .catch((error) => {
  //       console.error('Error fetching data', error);
  //   });
  // }, []);
  // useEffect(() => {
  // api.get('/api/v1/auth/set')
  // .then((response) => {
  //     console.log(response.data);
  //     setDemo(response.data)
  // })
  // .catch((error) => {
  //     console.error('Error fetching data', error);
  // });
  // }, []);

  const setCookie = async () => {
    // axios.get('http://localhost:8080/api/v1/auth/set' , {withCredentials: true})
    userAxiosApi.get('/api/v1/auth/set', { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        setDemo(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data', error);
      });
  }
  const getCookie = async () => {
    // axios.get('http://localhost:8080/api/v1/auth/get')
    userAxiosApi.get('/api/v1/auth/get', { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        setDemo(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data', error);
      });
  }
  // const getSecureData = async () =>{
  //   console.log(access_token);
  //   // axios.get('http://localhost:8080/api/v1/auth/get')
  //   api.get('/api/v1/demo', {
  //     withCredentials: true, 
  //     headers : {
  //       'Authorization' : `Bearer ${access_token}`
  //     },
  //   })
  //   .then((response) => {
  //       console.log(response.data);
  //       setDemo(response.data)
  //   })
  //   .catch((error) => {
  //     console.error('Error fetching data', error);
  //     console.log(error.response.status === 401);
  //   });
  // }
  const getSecureData = async () => {
    console.log(access_token);
    // axios.get('http://localhost:8080/api/v1/auth/get')
    userAxiosApi.get('/api/v1/demo', {
      withCredentials: true
    })
      .then((response) => {
        console.log(response.data);
        setDemo(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data', error);
        console.log(error.response.status === 401);
      });
  }
  const getPublicData = async () => {
    userAxiosApi.get('/api/v1/auth/work')
      .then((response) => {
        console.log(response.data);
        setDemo(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data', error);
        console.log(error.response.status === 401);
      });
  }

  return (
    <>
      <Navbar />

      <div>
        <p>Demo Value</p>
        <p>{demo}</p>
        <p>{demo}</p>
        <button className="bg-green-300" onClick={setCookie}>set cookie</button>
        <button className="bg-red-300" onClick={getCookie}>get cookie</button>
        <button className="bg-blue-300" onClick={getPublicData}>get Public Data</button>
        <button className="bg-yellow-300" onClick={getSecureData}>get Secure Data</button>
      </div>

      <Footer />
    </>
  );
}

export default Forgot;