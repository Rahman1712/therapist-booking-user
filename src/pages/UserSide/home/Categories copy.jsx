import { useEffect, useState } from 'react';
import './Categories.css';
import { therapistsAxiosApi } from '../../../config/axiosConfig';
import { THERAPIST_PUBLIC_API } from "../../../constants";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CategoryCard from './CategoryCard';

const Categories = () => {
  const [categories, setCategories] = useState([]);

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

  useEffect(() => {
    therapistsAxiosApi.get(THERAPIST_PUBLIC_API + "/categories-by-frequency").then((response) => {
      // console.log(response.data);
      setCategories(response.data);
    }, (error) => {
      console.log(error);
    }
    )
  }, []);


  return (
    <section className="bg-gray-100 dark:bg-gray-900 ">



      <div className="container mx-auto py-8 relative">
        {/* <div className="bg-holder bg-size "></div> */}
        <h2 className="text-3xl mb-4 font-bold uppercase text-blue-950">OUR SPECIALIZATIONS</h2>

        <Slider {...settings}>
          {categories.slice(0, 5).map((category, index) => (
            // <div key={index} className='rounded-sm shadow-lg bg-red-400 p-2 mx-10 w-auto h-72 relative'>
            //   <img src={category.imageUrl} alt={category.name} className="mb-4 " />
            //   <p className="text-center">{category.name}</p>
            // </div>
            <CategoryCard key={index} category={category} />
          ))}
          </Slider>

        {/* <div className="flex flex-row space-x-4 overflow-x-auto">
          {categories.slice(0, 5).map((category, index) => (
            <div key={index} className="max-w-sm bg-white p-4 rounded-lg shadow">
              <img src={category.imageUrl} alt={category.name} className="w-24 h-24 mx-auto mb-4" />
              <p className="text-center">{category.name}</p>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default Categories;
