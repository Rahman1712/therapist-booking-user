import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userAxiosApi, therapistsAxiosApi } from '../../../config/axiosConfig';
import { PAYMENT_API, USER_BOOKING_API } from '../../../constants';
import Navbar from '../../../components/UserComponents/navbar/Navbar';
import Footer from '../../../components/CommonComponents/footer/Footer';
import { Toaster } from 'react-hot-toast';
import { bookActions } from '../../../store/book-slice';
import { popupToast } from '../../../utils/AlertUtils';
import { useNavigate } from 'react-router-dom/dist';
// import Razorpay from 'razorpay';

// import useRazorpay from "react-razorpay";


const TherapistPayment = () => {
  const { bookingId } = useParams();
  const [bookingResult, setBookingResult] = useState(null);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

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
    var options = {
      order_id: response.bookingId,
      key: response.key,
      amount: response.amount,
      currency: response.currency,
      name: email,
      description: 'Payment of MediCare',
      image: 'https://cdn.pixabay.com/photo/2016/09/30/17/29/shopping-1705800_1280.png',
      handler: (response) => {
        /* {razorpay_payment_id: 'pay_MHvxr7K0SeiX8s', razorpay_order_id: 'order_MHvxRVeUTCEVAU', razorpay_signature: 'a6ac2256dab7aac7a740488adbcb79527f9e2c8f9608c37ae98289a3751d8802'} */
        console.log(response);
        if (response != null && response.razorpay_payment_id != null) {
          handlePaymentResponse(response);
        } else {
          alert("Payment Failed..");
        }
      },
      prefill: {
        name: 'MediCare',
        email: 'medicarehelp@gmail.com',
        contact: '9090909090'
      },
      notes: {
        address: 'Online Shopping'
      },
      theme: {
        color: '#012970'
      }
    };

    // eslint-disable-next-line no-undef
    var razorPayObject = new Razorpay(options);
    razorPayObject.open();

  }

  const handlePayment = async () => {
    createTransaction(bookingResult.amount);
  }

  const handlePaymentResponse = async (res) =>{
    const razorPayment = {
      ...res,
      amount: bookingResult.amount,
      bookingId: bookingId
    }
    try {
      const response = await userAxiosApi.put(USER_BOOKING_API +`/${bookingId}/updatePayment`, razorPayment);
      console.log(response.data);
      popupToast('success','Payment Successfully Done 🌞', 2000);
      navigate("/user-bookings"); 
    } catch (error) {
      console.log(error);
      popupToast('error','Error in Payment ', 2000);
    }
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
      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-50 dark:focus:ring-cyan-800 font-roboto">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-semibold text-center my-8 dark:text-white font-orbitron">
            Book Therapist
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {/* Left Column */}
            <div className="col-span-1 md:col-span-2">
              <div className="rounded-lg shadow-lg p-4 bg-gradient-to-br from-pink-50 to-orange-50 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-50 dark:focus:ring-pink-800">
                <div className="flex flex-col justify-center items-start">
                  <h3 className="text-xl font-semibold dark:text-white">Details</h3>
                  <p className="text-lg">
                    Booking Id: <span className="font-semibold">{bookingResult?.id}</span>
                  </p>
                  <p className="text-lg">
                    Appointment Date: <span className="font-semibold">{bookingResult?.appointmentDateTime.split('T')[0]}</span>
                  </p>
                  <p className="text-lg">
                    Booking Date: <span className="font-semibold">{bookingResult?.date}</span>
                  </p>
                  <p className="text-lg">
                    Booking Time: <span className="font-semibold">{bookingResult && convertToAMPM(bookingResult?.timeSlot.time)}</span>
                  </p>
                  <p className="text-lg">
                    Booking Type: <span className="font-semibold">{bookingResult?.bookingType}</span>
                  </p>
                  <p className="text-lg">
                    Minutes: <span className="font-semibold">{bookingResult?.minutes} mins</span>
                  </p>
                  <p className="text-lg">
                    Therapist Name: <span className="font-semibold">{bookingResult?.therapistInfo.fullname}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="col-span-1 md:col-span-1 font-roboto">
              <div className="rounded-lg shadow-lg p-4 bg-gradient-to-r from-red-50 via-red-50 to-yellow-50 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-50 dark:focus:ring-red-400">
                <h3 className="text-xl font-semibold dark:text-white">Payment</h3>
                <div className="w-1/2 text-center">
                  <img
                    src="https://cdn.pixabay.com/photo/2016/09/30/17/29/shopping-1705800_1280.png"
                    alt="Payment Image"
                    className="mx-auto mt-4"
                    width={50}
                    height={50}
                  />
                </div>
                <p className="text-lg">
                  Amount: <span className="font-semibold">{bookingResult?.amount}</span>
                </p>
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter your email"
                  className="w-full p-2 border border-gray-300 rounded mt-2"
                />
                <button className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4"
                onClick={handlePayment}>
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
      <Footer />
    </>


  );
};

export default TherapistPayment;
