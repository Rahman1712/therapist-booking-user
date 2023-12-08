import { useEffect, useState } from "react";
import { therapistsAxiosApi } from "../../../config/axiosConfig";
import { THERAPIST_PUBLIC_API } from "../../../constants";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TherapistCard from "../therapist/TherapistCard";
import { useNavigate } from "react-router";

const Doctors = () => {
  const [therapistsData, setTherapistsData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    therapistsAxiosApi.get(THERAPIST_PUBLIC_API + "/to-user/all-therapists").then((response) => {
      setTherapistsData(response.data)
      console.log(response.data);
    })
  }, []);


  var settings = {
    dots: true,
    infinite: true,
    speed: 50,
    slidesToShow: 3,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        }
      },
    ]
  };


  return (
    <section className="bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto py-8">
        <h2 className="text-3xl mb-4 text-cyan-600 font-bold font-poppins">OUR THERAPISTS</h2>
        <Slider {...settings} className="my-4">
          {therapistsData.slice(0, 8).map((therapist, index) => (
            <div key={index} className="px-2">
              <TherapistCard key={index} therapist={therapist} />
            </div>
          ))}
        </Slider>
        <div className='text-center m-10'>
          <button type="button" className="text-white bg-cyan-800 shadow-xl hover:bg-slate-200 hover:text-cyan-800  font-medium rounded-lg text-sm px-3 py-2.5 text-center mr-2 mb-2 min-w-[100px]"
            onClick={() => {
              navigate(`/therapists`);
            }}
          >More Therapists</button>
        </div>
      </div>

    </section>
  );
};

export default Doctors;
