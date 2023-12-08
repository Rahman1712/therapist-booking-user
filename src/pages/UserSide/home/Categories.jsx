import { useEffect, useState } from 'react';
import { therapistsAxiosApi } from '../../../config/axiosConfig';
import { THERAPIST_PUBLIC_API } from "../../../constants";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CategoryCard from './CategoryCard';
import { useNavigate } from 'react-router';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  var settings = {
    dots: true,
    infinite: true,
    speed: 50,
    slidesToShow: 4,
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

  useEffect(() => {
    therapistsAxiosApi.get(THERAPIST_PUBLIC_API + "/categories-by-frequency").then((response) => {
      setCategories(response.data);
    }, (error) => {
      console.log(error);
    }
    )
  }, []);

  return (
    <section className="bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto py-8 relative">
        <h2 className="text-3xl mb-4 font-bold uppercase text-blue-950">OUR SPECIALIZATIONS</h2>

        <Slider {...settings} className="my-4">
          {categories.slice(0, 10).map((category, index) => (
            <div key={index} className="px-2">
              <CategoryCard category={category} />
            </div>
          ))}
        </Slider>

        <div className='text-center m-10 mt-15'>
          <button type="button" className="text-white bg-cyan-800 shadow-xl hover:bg-slate-200 hover:text-cyan-800  font-medium rounded-lg text-sm px-3 py-2.5 text-center mr-2 mb-2 min-w-[100px]"
            onClick={() => {
              navigate(`/categories`);
            }}
          >More Specializations</button>
        </div>
      </div>
    </section>
  );
};

export default Categories;
