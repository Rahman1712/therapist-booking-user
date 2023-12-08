import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userAxiosApi, therapistsAxiosApi } from '../../../config/axiosConfig';
import { PAYMENT_API, USER_BOOKING_API } from '../../../constants';
import Navbar from '../../../components/UserComponents/navbar/Navbar';
import Footer from '../../../components/CommonComponents/footer/Footer';
import { Toaster } from 'react-hot-toast';
import { bookActions } from '../../../store/book-slice';

const TherapistPayment = () => {
  const { bookingId } = useParams();
  const [bookingResult, setBookingResult] = useState(null);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (bookingId !== 'undefined' && bookingId !== null) {
      userAxiosApi.get(USER_BOOKING_API + `/booking-byid/${bookingId}`).then((response) => {
        console.log(response.data);
        setBookingResult(response.data);
      });
    }
  }, [bookingId]);

  const createTransaction = async (amount) => {
    therapistsAxiosApi.get(PAYMENT_API + `/createTransaction/${amount}`).then((response) => {
      console.log(response.data);
      console.log("===  -----   ===");
      /*{orderId: 'order_MHvzT6digVt8lg', currency: 'INR', amount: 5180000, key: 'rzp_test_K9qFfxNeV2pv2R'}*/
      openTransactionModal(response.data);
    });
  }

  const openTransactionModal = (response) => {
    // Your modal code here
  }

  const handlePayment = async () => {
    // Handle payment logic
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
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

  return (

    <>

      <Navbar />
      <div className='bg-gradient-to-r from-cyan-50 to-blue-50 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-50 dark:focus:ring-cyan-800 font-roboto'>

        <div className="container mx-auto p-4 ">
          <h1 className="text-3xl font-semibold text-center my-8 dark:text-white font-orbitron">
            Book Therapist
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">

            <div className="col-span-1 md:col-span-2 ">
              <div className="rounded-lg shadow-lg p-4 bg-gradient-to-br from-pink-50 to-orange-50 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-50 dark:focus:ring-pink-800">
                <div className="flex flex-col justify-center items-center">
                  <h3 className="text-xl font-semibold dark:text-white">
                    Details
                  </h3>
                  <p>Booking Id :
                    <span>{bookingResult?.id}      </span>
                  </p>
                  <p>Appointment Date
                    <span>{bookingResult?.appointmentDateTime.split('T')[0]}      </span>
                  </p>
                  <p>Booking Date
                    <span>{bookingResult?.date}</span>
                  </p>
                  <p>Booking Time
                    <span>{bookingResult && convertToAMPM(bookingResult?.timeSlot.time)}</span>
                  </p>
                  <p>Booking Type
                    <span>{bookingResult?.bookingType}</span>
                  </p>
                  <p>Minutes
                    <span>{bookingResult?.minutes} mins</span>
                  </p>
                  <p>Therapist Name
                    <span>{bookingResult?.therapistInfo.fullname}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="col-span-1 md:col-span-1 font-roboto">
              <div className="rounded-lg shadow-lg p-4 bg-gradient-to-r from-red-50 via-red-50 to-yellow-50 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-50 dark:focus:ring-red-400">
                <h3 className="text-xl font-semibold dark:text-white">Payment</h3>
                <div className="w-1/2 text-center">
                  <img
                    src="https://cdn.pixabay.com/photo/2016/09/30/17/29/shopping-1705800_1280.png"
                    alt="Payment Image"
                    className="mx-auto mt-4"
                    width={50} height={50}
                  />
                </div>
                <p>Amount
                  <span>{bookingResult?.amount}</span>
                </p>
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter your email"
                  className="w-full p-2 border border-gray-300 rounded mt-2"
                />

                <button className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                  Pay Now
                </button>
              </div>
            </div>
          </div >
        </div >
      </div>

      <Toaster />
      <Footer />
    </>


  );
};

export default TherapistPayment;
