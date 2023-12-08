/* eslint-disable react/prop-types */
import CategoryCard from './CategoryCard';

const CategoriesList = ({ categories }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories.map((category, index) => (
        <CategoryCard key={index} category={category} />
      ))}
    </div>
  );
};

export default CategoriesList;
