import React, { useState } from 'react';
import Navbar from "../../../components/UserComponents/navbar/Navbar";
import Footer from "../../../components/CommonComponents/footer/Footer";
import { useNavigate, useParams } from 'react-router';
import { useEffect } from 'react';
import { therapistsAxiosApi } from '../../../config/axiosConfig';
import { THERAPIST_PUBLIC_API } from '../../../constants';

const TherapistBooking = () => {
  const { therapistId } = useParams();
  const [therapist, setTherapist] = useState(null);
  const [therapistSlots, setTherapistSlots] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  // const navigate = useNavigate();

  useEffect(() => {
    if (therapistId !== 'undefined' && therapistId !== null) {
      therapistsAxiosApi.get(THERAPIST_PUBLIC_API + `/to-user/therapist/by-id/${therapistId}`).then((response) => {
        console.log(response.data);
        console.log("===");
        setTherapist(response.data);
      });

      therapistsAxiosApi.get(THERAPIST_PUBLIC_API + `/get-upcoming-by-therapist/${therapistId}`).then((response) => {
        console.log(response.data);
        setTherapistSlots(response.data);
      });
    }
  }, [therapistId]);

  function getImageUrl(imageByte, imageType) {
    const binaryString = atob(imageByte);
    const byteArray = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      byteArray[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([byteArray], { type: imageType });
    const imageUrl = URL.createObjectURL(blob);
    return imageUrl;
  }

  const [selectedDate, setSelectedDate] = useState(null);

  // Sample function to load available times for a selected date
  const loadAvailableTimes = (date) => {
    // You can fetch available times for the selected date here
    // and update the state with the available times
  };



  const handleDateSelection = (date) => {
    setSelectedDate(date);
    loadAvailableTimes(date);
  };

  return (
    <>

      <Navbar />
      <div className='bg-gradient-to-r from-cyan-50 to-blue-50 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-50 dark:focus:ring-cyan-800 font-roboto'>

        <div className="container mx-auto p-4 ">
          <h1 className="text-3xl font-semibold text-center my-8 dark:text-white font-orbitron">
            Book Therapist
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">

            <div className="col-span-1 md:col-span-1 ">
              <div className="rounded-lg shadow-lg p-4 bg-gradient-to-br from-pink-50 to-orange-50 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-50 dark:focus:ring-pink-800">
              <img
                  //src={therapist.image ? getImageUrl(therapist.image, therapist.imageType) : ''}
                  alt={therapist?.fullname}
                  className="w-32 h-auto object-cover rounded-lg"
                />
                <h3 className="text-xl font-semibold dark:text-white">
                  Profile
                </h3>
                <p className="mb-4 dark:text-gray-400">
                  {therapist?.is_certified ? 'Certified' : 'Not Certified'}
                </p>
                <p className="dark:text-gray-400">
                  Specializations: {therapist?.categories ? therapist.categories.join(', ') : 'N/A'}
                </p>
              </div>
            </div>

            <div className="col-span-1 md:col-span-1 ">

              <div className="rounded-lg shadow-lg p-4 bg-gradient-to-r from-red-50 via-red-50 to-yellow-50 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-50 dark:focus:ring-red-400">
                <h3 className="text-xl font-semibold dark:text-white">Available Dates</h3>
                <div className="flex flex-wrap -m-1 ">
                  {therapistSlots.map((slotInfo) => (
                    <div key={slotInfo.date} className="m-1 rounded-lg shadow-lg p-5">
                      <button
                        onClick={() => handleDateSelection(slotInfo.date)}
                        className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
                      >
                        {slotInfo.date}
                      </button>
                      <p className="dark:text-gray-400 text-xs mt-1">
                        Slots: {slotInfo.time_slots.filter((t) => t.booked).length}, Booked: {slotInfo.time_slots.filter((t) => !t.booked).length}
                      </p>
                    </div>
                  ))}
                </div>
              </div>


              <div className="mt-8 rounded-lg shadow-lg p-5 bg-gradient-to-r from-teal-50 to-lime-50 hover:bg-gradient-to-l hover:from-teal-50 hover:to-lime-50 focus:ring-4 focus:outline-none focus:ring-lime-50 dark:focus:ring-teal-700">
                {selectedDate && (
                  <div>
                    <h3 className="text-xl font-semibold dark:text-white m-3">Available Times on {selectedDate}</h3>
                    <div className="flex flex-wrap -m-1">
                      {availableTimes.map((time) => (
                        <div key={time.time} className="m-1">
                          <input
                            type="radio"
                            name="availableTimes"
                            id={time.time}
                            value={time.time}
                            disabled={time.isBooked}
                            className="hidden"
                          />
                          <label
                            htmlFor={time.time}
                            className={`text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 cursor-pointer ${time.isBooked && 'opacity-50'}`}
                          >
                            {time.time}
                          </label>
                          {/* <label
                            htmlFor={time.time}
                            className={`bg-white dark:text-gray-400 border border-gray-300 px-3 py-1 rounded-full hover:bg-gray-100 focus:outline-none ${time.isBooked && 'opacity-50'}`}
                          >
                            {time.time}
                          </label> */}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className='my-10 flex justify-center'>
                <button
                  className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >
                  Confirm Booking
                </button>
              </div>

            </div>

          </div>


        </div>

      </div>

      <Footer />
    </>
  );
};

export default TherapistBooking;
