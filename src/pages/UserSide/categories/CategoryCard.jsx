/* eslint-disable react/prop-types */
import { useNavigate } from "react-router";

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();

  return (
    <div className="rounded-md shadow-md overflow-hidden bg-slate-50 hover:bg-slate-100 focus:ring-4 focus:outline-none focus:ring-lime-100 dark:focus:ring-teal-700">

      <div className="card relative overflow-hidden p-5" style={{ userSelect: 'none' }}>
      <img
            onClick={() => navigate(`/therapists-by-category/${category.name}`)}
            src={category.imageUrl} alt={category.fullname}
            className="object-cover w-full h-full rounded-lg border border-cyan-100 cursor-pointer"
            style={{ aspectRatio: "1/1" }}
          />
      </div>
      <div className="p-4 font-poppins">
        <div className="flex flex-col justify-center items-center mb-3">
          <h4 className="text-lg font-bold text-center text-gray-900">
            {category.name}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;



/*
import { useNavigate } from "react-router";

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();

  return (

    <div className="mb-5 mb-md-0 flex items-stretch">
      <div className="rounded-md shadow-md overflow-hidden
      bg-slate-50 hover:bg-slate-100 focus:ring-4 focus:outline-none focus:ring-lime-100 dark:focus:ring-teal-700
      ">
        <div className="h-[100px] rounded-tl-md rounded-tr-md 
        bg-transparent focus:ring-4 focus:outline-none focus:ring-blue-100 dark:focus:ring-blue-400
        "></div>
        <div className="w-[110px] -mt-[60px] overflow-hidden rounded-lg border-[3px] border-solid border-cyan-100 mx-auto bg-white" style={{ userSelect: 'none' }}>
          <img
            onClick={() => navigate(`/therapists-by-category/${category.name}`)}
            src={category.imageUrl} alt={category.fullname}
            className="object-cover w-full h-full rounded-lg border border-cyan-100 cursor-pointer"
            style={{ aspectRatio: "1/1" }}
          />
        </div>
        <div className="p-4 font-poppins">
          <div className="flex flex-col justify-center items-center mb-3">
            <h4 className="text-lg font-bold text-center text-gray-900">
              {category.name}
            </h4>
          </div>
        </div>
      </div>
    </div>

  );
};

export default CategoryCard;

*/
