/* eslint-disable no-inner-declarations */
import { useState } from 'react';
import Navbar from "../../../components/UserComponents/navbar/Navbar";
import Footer from "../../../components/CommonComponents/footer/Footer";
import { useNavigate, useParams } from 'react-router';
import { useEffect } from 'react';
import { therapistsAxiosApi, userAxiosApi } from '../../../config/axiosConfig';
import { THERAPIST_PUBLIC_API, USER_BOOKING_API } from '../../../constants';
import { LuBadgeAlert, LuBadgeCheck } from 'react-icons/lu';
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { popupToast } from '../../../utils/AlertUtils';
import { AiOutlineTablet } from 'react-icons/ai';
import { FaUserDoctor } from 'react-icons/fa6';
import { bookActions } from '../../../store/book-slice';

const TherapistBookingReschedule = () => {
  const { bookingId, therapistId } = useParams()
  const [therapist, setTherapist] = useState("");
  const [therapistSlots, setTherapistSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const navigate = useNavigate();
  const [availableTimes, setAvailableTimes] = useState([]);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [selectedStatus, setSelectedStatus] = useState('ONLINE'); // Initialize with 'ONLINE'
  const [slotId, setSelectedSlotId] = useState(null);
  const [notes, setNotes] = useState(null);
  const dispatch = useDispatch();
  const [bookingDetail, setBookingDetail] = useState(null);

  useEffect(() => {
    if (therapistId !== 'undefined' && therapistId !== null &&
      bookingId !== 'undefined' && bookingId !== null
    ) {

      async function fetchData() {
        try {
          const res1 = await therapistsAxiosApi.get(THERAPIST_PUBLIC_API + `/to-user/therapist/by-id/${therapistId}`);
          const therapistData = res1.data;
          setTherapist(therapistData);
          dispatch(bookActions.setTherapistData(therapistData));

          const res2 = await therapistsAxiosApi.get(THERAPIST_PUBLIC_API + `/get-upcoming-by-therapist/${therapistId}`);
          const therapistSlotData = res2.data;
          console.log(therapistSlotData);
          setTherapistSlots(therapistSlotData);

          const res3 = await userAxiosApi.get(USER_BOOKING_API + `/booking-byid/${bookingId}`);
          const bookingData = res3.data;
          console.log(bookingData);
          setBookingDetail(bookingData);

          console.log("rrrrrrrrrrrr");
          const findSlot = await therapistSlotData.find((slot) => slot.date == bookingData.date);
          
          handleDateSelection(bookingData.date, findSlot.time_slots)
          setSelectedDate(bookingData.date);
          setSelectedTime(bookingData.timeSlot.time);
          setNotes(bookingData.notes);
          setSelectedStatus(bookingData.bookingType);

        } catch (error) {
          console.error(error);
        }
      }

      fetchData();
    }
  }, [bookingId, therapistId]);

  const loadAvailableTimes = (time_slots) => {
    const allTimes = time_slots.map((t) => t);
    setAvailableTimes(allTimes);
  };

  const handleDateSelection = (date, time_slots) => {
    setSelectedTime(null);
    setSelectedDate(date);
    loadAvailableTimes(time_slots);
  };

  const handleTimeSelection = (time) => {
    setSelectedSlotId(time.tid);
    setSelectedTime(time.time);
  };


  function convertToAMPM(time24) {
    // Split the time into hours and minutes
    const [hours, minutes] = time24.split(':');

    // Determine whether it's AM or PM
    const period = hours >= 12 ? 'PM' : 'AM';

    // Convert hours to 12-hour format
    const hours12 = (hours % 12) || 12; // 0 should become 12 in 12-hour format

    // Calculate the end time in 12-hour format
    const endHours12 = ((hours12 + 1) % 12) || 12;

    // Create the AM/PM formatted time
    const time12 = `${hours12}.${minutes} ${period} to ${endHours12}.${minutes} ${period}`;

    return time12;
  }

  function convertToDateMode(dateString) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric', weekday: 'long' };
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day); // Months are 0-based in JavaScript
    return date.toLocaleDateString(undefined, options);
  }

  const handleStatusToggle = (status) => {
    setSelectedStatus(status);
  };

  const handleBooking = async () => {

    if (!isLoggedIn) {
      popupToast("error", "Please logged in", 2000);
      navigate("/login");
      return;
    }
    if (selectedDate == null || selectedTime == null) {
      popupToast("error", "Please select date and time", 2000);
      return;
    }
    if (selectedDate == bookingDetail.date && 
        selectedTime == bookingDetail.timeSlot.time && 
        selectedStatus == bookingDetail.bookingType) {
      popupToast("warning", "Already booked in same date and time", 5000);
      return;
    }

    const rescheduleRequest = {
      rescheduleDateTime: null,
      date: selectedDate,
      notes: notes,
      timeSlotId: slotId,
      bookingType: selectedStatus,
    };

    try {
      const response = await userAxiosApi.put(USER_BOOKING_API + `/book-reschedule/byid/${bookingId}`, rescheduleRequest);
      console.log(response.data);
      dispatch(bookActions.setBookingResult(response.data));
      if(bookingDetail.paymentStatus == "PAID"){
        navigate("/user-book/"+bookingId);
      }else{
        navigate("/payment/" + response.data.id);
      }
    } catch (error) {
      popupToast('error', 'Error booking appointment : Check Already booked in the Date', 2000);
    }
  };

  return (
    <>

      <Navbar />
      <div className='bg-gradient-to-r from-cyan-50 to-blue-50 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-50 dark:focus:ring-cyan-800 font-roboto'>

        <div className="container mx-auto p-4 ">
          <h1 className="text-3xl font-semibold text-center my-8 dark:text-white font-orbitron">
            Book Therapist
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">

            <div className="col-span-1 md:col-span-1 ">
              <div className="rounded-lg shadow-lg p-4 bg-gradient-to-br from-pink-50 to-orange-50 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-50 dark:focus:ring-pink-800">
                <div className="flex flex-col justify-center items-center">
                  <img
                    src={therapist.imageUrl ? therapist.imageUrl : ''}
                    alt={therapist.fullname}
                    className="w-32 h-auto object-cover rounded-lg"
                  />
                  <h3 className="text-xl font-semibold dark:text-white">
                    {therapist.fullname}
                  </h3>
                  <p className={`flex flex-row gap-1 text-center justify-center items-center mb-4 text-xs font-medium mr-2 px-2.5 py-0.5 rounded  ${therapist.is_certified ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}`}>
                    <span className={`inline-flex items-center justify-center w-6 h-6 mr-2 text-sm font-semibold rounded-full dark:bg-gray-700 ${therapist.is_certified ? 'text-green-800 bg-green-100  dark:text-green-400' : 'text-red-800 bg-red-100 dark:text-red-400'}`}>
                      {therapist.is_certified ? <LuBadgeCheck /> : <LuBadgeAlert />}
                    </span>
                    <span>{therapist.is_certified ? 'Certified' : 'Not Certified'}</span>
                  </p>
                  <div className="dark:text-gray-400 rounded-lg shadow-sm p-5 flex flex-col flex-wrap justify-center">
                    <span className='text-sm text-center font-bold m-1'>Specializations</span>
                    <div>
                      {therapist.categories ? therapist.categories.map((cat) =>
                        <span key={cat} className="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300">{cat}</span>
                      ) : 'N/A'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-1 md:col-span-2 font-roboto">
              {therapistSlots.length !== 0 ?
                <div className="rounded-lg shadow-lg p-4 bg-gradient-to-r from-red-50 via-red-50 to-yellow-50 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-50 dark:focus:ring-red-400">
                  <h3 className="text-xl font-semibold dark:text-white">Available Dates</h3>
                  <div className="flex flex-wrap gap-y-3">
                    {therapistSlots.map((slotInfo) => (
                      <div key={slotInfo.date} className="m-1 rounded-lg shadow-lg p-5">

                        <button
                          onClick={() => handleDateSelection(slotInfo.date, slotInfo.time_slots)}
                          className={`${slotInfo.date == selectedDate ?
                            'text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2'
                            :
                            'relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-full group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800'
                            }`}>
                          {slotInfo.date == selectedDate ?
                            <span>{convertToDateMode(slotInfo.date)}</span>
                            :
                            <span className="relative px-5 py-2.5 bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0">
                              {convertToDateMode(slotInfo.date)}
                            </span>
                          }
                        </button>

                        <p className="dark:text-gray-400 text-xs mt-1">
                          Slots: {slotInfo.time_slots.length}
                          <br />
                          Booked: {slotInfo.time_slots.filter((t) => t.booked).length}
                          <br />
                          <span className='font-bold'>Available: {slotInfo.time_slots.filter((t) => !t.booked).length}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                :
                <div className='mt-3 rounded-lg shadow-lg p-5 bg-gradient-to-r from-teal-50 to-lime-50 hover:bg-gradient-to-l hover:from-teal-50 hover:to-lime-50 focus:ring-4 focus:outline-none focus:ring-lime-50 dark:focus:ring-teal-700 text-center  font-bold font-roboto text-[25px] text-gray-500'>
                  No Dates Available
                </div>
              }

              {availableTimes.length > 0 ?
                <div className="mt-3 rounded-lg shadow-lg p-5 bg-gradient-to-r from-teal-50 to-lime-50 hover:bg-gradient-to-l hover:from-teal-50 hover:to-lime-50 focus:ring-4 focus:outline-none focus:ring-lime-50 dark:focus:ring-teal-700">
                  {selectedDate && (
                    <div>
                      <h3 className="text-lg font-semibold dark:text-white m-3">Available Times on <span className='text-blue-600 dark:text-blue-400'> {convertToDateMode(selectedDate)} </span></h3>
                      <div className="flex flex-wrap gap-y-5">
                        {availableTimes.map((time, i) => (
                          <div key={`${time.tid}+${i}`} className="m-1">
                            <input
                              type="radio"
                              name="availableTimes"
                              id={time.time}
                              value={time.time}
                              disabled={time.booked} // disabled=false on booked = false  AAAnu
                              className="hidden"
                              onChange={() => { 
                                if(!time.booked) {
                                 handleTimeSelection(time); 
                                }
                              }}
                            />
                            <label
                              htmlFor={time.time}
                              className={`cursor-pointer 
                              ${time.booked ?
                                  'opacity-80 text-white font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 bg-gradient-to-r from-red-500 via-red-400 to-red-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80'
                                  :
                                  time.time == selectedTime ?
                                    'relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-white rounded-full group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80'
                                    :
                                    'relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-full group bg-gradient-to-br from-blue-300 via-blue-400 to-blue-500 group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 '
                                }
                            }`}
                            >
                              {time.booked ?
                                convertToAMPM(time.time)
                                :
                                time.time == selectedTime ?
                                  <span className="relative px-5 py-2.5 dark:bg-gray-900 rounded-full group-hover:bg-opacity-0">
                                    {convertToAMPM(time.time)}
                                  </span>
                                  :
                                  <span className="relative px-5 py-2.5 bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0">
                                    {convertToAMPM(time.time)}
                                  </span>
                              }

                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                :
                <div className='mt-3 rounded-lg shadow-lg p-5 bg-gradient-to-r from-teal-50 to-lime-50 hover:bg-gradient-to-l hover:from-teal-50 hover:to-lime-50 focus:ring-4 focus:outline-none focus:ring-lime-50 dark:focus:ring-teal-700 text-center  font-bold font-roboto text-[25px] text-gray-500'>
                  No Available Times slots
                </div>
              }



              {selectedTime &&
                <div className="mt-3 rounded-lg shadow-lg p-4 bg-gradient-to-r from-red-50 via-red-50 to-yellow-50 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-50 dark:focus:ring-red-400">

                  <h3 className="text-lg font-semibold dark:text-white mb-2">Booking Type</h3>
                  <div className="inline-flex rounded-md shadow-sm" role="group">
                    <button type="button" className={`
                      ${selectedStatus === 'ONLINE'
                        ? 'text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700'
                        : 'bg-transparent text-gray-900 '} 
                      inline-flex items-center px-4 py-2 text-sm border border-purple-900  rounded-l-lg  
                      hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium
                      `} onClick={() => handleStatusToggle('ONLINE')}>
                      <AiOutlineTablet />
                      <span className='mx-2'>ONLINE</span>
                    </button>
                    <button type="button" className={`
                  ${selectedStatus === 'OFFLINE'
                        ? 'text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700'
                        : 'bg-transparent text-gray-900 '}
                  inline-flex items-center px-4 py-2 text-sm border border-purple-900 rounded-r-md 
                  hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium`} onClick={() => handleStatusToggle('OFFLINE')}>
                      <FaUserDoctor />
                      <span className='mx-2'>OFFLINE</span>
                    </button>
                  </div>
                </div>
              }

              <div className="mt-3 rounded-lg shadow-lg p-5 bg-gradient-to-r from-teal-50 to-lime-50 hover:bg-gradient-to-l hover:from-teal-50 hover:to-lime-50 focus:ring-4 focus:outline-none focus:ring-lime-50 dark:focus:ring-teal-700">

                <div>
                  <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Notes</label>
                  <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."
                   value={notes}
                    onChange={(e) => {
                      setNotes(e.target.value);
                    }}
                  ></textarea>
                </div>
              </div>

              {selectedTime &&
                <div className="mt-3 rounded-lg shadow-lg p-4 bg-gradient-to-r from-red-50 via-red-50 to-yellow-50 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-50 dark:focus:ring-red-400">

                  <h3 className="text-lg font-semibold dark:text-white mb-2">Booking Fee </h3>
                  <div className='text-gray-600'>
                    <b>Rs. {therapist.hourly_rate}</b>
                  </div>
                </div>
              }

              {selectedTime &&
                <div className='my-10 flex justify-center'>
                  <button
                    onClick={handleBooking}
                    className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  >
                    Confirm Reschedule
                  </button>
                </div>
              }


            </div>

          </div>


        </div>

      </div>

      <Toaster />
      <Footer />
    </>
  );
};

export default TherapistBookingReschedule;
