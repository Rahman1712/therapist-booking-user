import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userAxiosApi, therapistsAxiosApi } from '../../../config/axiosConfig';
import { PAYMENT_API } from '../../../constants';
import { popupToast } from '../../../utils/AlertUtils';
import Navbar from '../../../components/UserComponents/navbar/Navbar';
import Footer from '../../../components/CommonComponents/footer/Footer';
import { Toaster } from 'react-hot-toast';
// import Razorpay from 'razorpay';
// import useRazorpay from "react-razorpay";

const PaymentPage = () => {
  const amount = 400;
  const [bookingResult, setBookingResult] = useState(null);


  const handlePayment = async () => { }

  const createTransaction = async (amount)=> {
    therapistsAxiosApi.get(PAYMENT_API + `/createTransaction/${amount}`).then((response) => {
      console.log(response.data);
      console.log("===  -----   ===");
      /*{orderId: 'order_MHvzT6digVt8lg', currency: 'INR', amount: 5180000, key: 'rzp_test_K9qFfxNeV2pv2R'}*/
      openTransactionModal(response.data);
    });
  }

  const openTransactionModal = (response) => {
    var options = {
      order_id: response.orderId,
      key: response.key,
      amount: response.amount,
      currency: response.currency,
      name: "Abdu Fullname",
      description: 'Payment of PcKart Shopping',
      image: 'https://cdn.pixabay.com/photo/2016/09/30/17/29/shopping-1705800_1280.png',
      handler: (response) =>{
        /* {razorpay_payment_id: 'pay_MHvxr7K0SeiX8s', razorpay_order_id: 'order_MHvxRVeUTCEVAU', razorpay_signature: 'a6ac2256dab7aac7a740488adbcb79527f9e2c8f9608c37ae98289a3751d8802'} */
        console.log(response);
        if(response!=null && response.razorpay_payment_id != null){
          // this.processResponse(response);
        }else{
          alert("Payment Failed..");
        }
      },
      prefill : {
        name: 'PcKart',
        email: 'pckart@gmail.com',
        contact: '9090909090'
      },
      notes: {
        address: 'Online Shopping'
      },
      theme: {
        color: '#012970'
      }
    };

    var razorPayObject = new Razorpay(options);
    razorPayObject.open();
 
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold text-center my-8 dark:text-white font-orbitron">Payment</h1>

      
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-50 dark:focus:ring-cyan-800 font-roboto">
            {/* Display booking details here (adjust as needed) */}
            <p>Booking ID: ID</p>
            <p>Appointment Date and Time: DATE</p>
            {/* Add more booking details here */}
            <button
              onClick={handlePayment}
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Pay Now
            </button>
          </div>



        <button className='bg-rose-600 rounded-full' onClick={() => { createTransaction(amount); }}>Payment Call</button>
      </div>
      <Toaster />
      <Footer />
    </>
  );
};

export default PaymentPage;
