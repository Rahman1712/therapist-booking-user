import Footer from "../../../components/CommonComponents/footer/Footer";
import Navbar from "../../../components/UserComponents/navbar/Navbar";
import CategoriesList from './CategoriesList';
import { useEffect, useState } from "react";
import { therapistsAxiosApi } from "../../../config/axiosConfig";
import { THERAPIST_PUBLIC_API } from "../../../constants";

const Categories = () => {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    therapistsAxiosApi.get(THERAPIST_PUBLIC_API + "/categories-by-frequency").then((response) => {
      setCategories(response.data);
    }, (error) => {
      console.log(error);
    }
    )
  }, []);

  return (
    <>
      <Navbar />

      <>
        <div className="relative bg-cover bg-center h-80" style={{backgroundImage: "url('/categories.jpg')" }}>
          <div className="absolute inset-0 bg-red bg-categories opacity-20" ></div>
          <div className="absolute inset-0 flex items-center justify-start ml-10">
            <div className="text-white">
              <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-300 via-cyan-500 to-cyan-200 inline-block text-transparent bg-clip-text">
               Specializations
              </h1>

            </div>
          </div>
        </div>

        <div className="container bg-cyan-50 dark:bg-gray-800 p-4 px-10 min-w-full min-h-screen">
          <h1 className="text-3xl font-semibold mb-4 dark:text-white mt-5">
            {/* Specializations */}
          </h1>
          <CategoriesList categories={categories} />
        </div>
      </>

      <Footer />
    </>
  )
}

export default Categories


