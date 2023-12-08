import Footer from "../../../components/CommonComponents/footer/Footer";
import Navbar from "../../../components/UserComponents/navbar/Navbar";
import TherapistList from './TherapistList';
import FilterOptions from './FilterOptions';
import { useEffect, useState } from "react";
import { therapistsAxiosApi } from "../../../config/axiosConfig";
import { THERAPIST_PUBLIC_API } from "../../../constants";
import { useParams } from "react-router";

const TherapistsByCategory = () => {
  const { categoryName } = useParams();
  const [therapistsData, setTherapistsData] = useState([]);

  useEffect(() => {
    therapistsAxiosApi.get(THERAPIST_PUBLIC_API + `/therapists/by-category/${categoryName}`).then((response) => {
      setTherapistsData(response.data)
      console.log(response.data);
    })
  }, [categoryName]);

  return (
    <>
      <Navbar />

      <>
        <div className="relative bg-cover bg-center h-80">
          <div className="absolute inset-0 bg-red bg-therapists opacity-90"></div>
          <div className="absolute inset-0 flex items-center justify-start ml-10">
            <div className="text-white bg-slate-50 bg-opacity-80 p-5 rounded-lg">
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-400 inline-block text-transparent bg-clip-text pb-1">
                Therapists <br /> {categoryName}
              </h1>
            </div>
          </div>
        </div>

        <FilterOptions />

        <div className="container bg-cyan-50 dark:bg-gray-800 p-4 px-10 min-w-full min-h-screen">
          <TherapistList therapists={therapistsData} />
        </div>
      </>

      <Footer />
    </>
  )
}

export default TherapistsByCategory




