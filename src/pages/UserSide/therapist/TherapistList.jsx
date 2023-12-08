/* eslint-disable react/prop-types */
// TherapistList.js
import { useState } from 'react';
import TherapistCard from './TherapistCard';

const TherapistList = ({ therapists }) => {
  const [showLimit, setShowLimit] = useState(8);

  const handleShowLimit = () => {
    if (showLimit < therapists.length) {
      setShowLimit(prev => prev + 8);
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {therapists.slice(0, showLimit).map((therapist, index) => (
          <TherapistCard key={index} therapist={therapist} />
        ))}


      </div>

      {showLimit < therapists.length &&
        <div className='text-center m-10 mt-15'>
          <button type="button" className="text-white bg-cyan-800 shadow-xl hover:bg-slate-200 hover:text-cyan-800  font-medium rounded-full text-sm px-3 py-2.5 text-center mr-2 mb-2 min-w-[200px] h-[50px]"
            onClick={() => {
              handleShowLimit();
            }}
          >Show More</button>
        </div>
      }
    </>
  );
};

export default TherapistList;
