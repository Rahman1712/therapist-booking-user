import Footer from "../../../components/CommonComponents/footer/Footer";
import Navbar from "../../../components/UserComponents/navbar/Navbar";
import TherapistList from './TherapistList';
import FilterOptions from './FilterOptions';
import { useEffect, useState } from "react";
import { therapistsAxiosApi } from "../../../config/axiosConfig";
import { THERAPIST_PUBLIC_API } from "../../../constants";

const Therapists = () => {

  const [therapistsData, setTherapistsData] = useState([]);

  useEffect(() => {
    therapistsAxiosApi.get(THERAPIST_PUBLIC_API + "/to-user/all-therapists").then((response) => {
      setTherapistsData(response.data)
      console.log(response.data);
    })
  }, []);

  return (
    <>
      <Navbar />

      <>
        <div className="relative bg-cover bg-center h-80">
          <div className="absolute inset-0 bg-red bg-medi1 opacity-90"></div>
          <div className="absolute inset-0 flex items-center justify-start ml-10">
            <div className="text-white">
              <h1 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
                We have the best professionals <br /> Qualified and verified, who can help you heal!

              </h1>

            </div>
          </div>
        </div>

        {/* <FilterOptions /> */}

        <div className="container bg-cyan-50 dark:bg-gray-800 p-4 px-10 min-w-full min-h-screen">
          <h1 className="text-3xl font-semibold mb-4 dark:text-white">Therapists</h1>
          <TherapistList therapists={therapistsData} />
        </div>
      </>

      <Footer />
    </>
  )
}

export default Therapists




