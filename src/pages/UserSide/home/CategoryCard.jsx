/* eslint-disable react/prop-types */
import { useNavigate } from "react-router";

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();

  return (
    <div >
      <div className="card relative overflow-hidden rounded-lg shadow-lg bg-white p-5">
        <div className="card-top">
          <img
            onClick={() => navigate(`/therapists-by-category/${category.name}`)}
            src={category.imageUrl}
            alt={category.name}
            className="object-cover w-full h-full rounded-lg border border-cyan-100 cursor-pointer"
            style={{ aspectRatio: "1/1" }} // Maintain aspect ratio for the container
          />
        </div>
        <div className="card-bottom text-center py-2">
          {category.name}
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
