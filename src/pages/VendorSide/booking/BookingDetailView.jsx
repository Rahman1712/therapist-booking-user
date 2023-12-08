import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom/dist';
import { therapistsAxiosApi, userAxiosApi } from '../../../config/axiosConfig';
import { THERAPIST_BOOKING_API } from '../../../constants';

const BookingDetailView = () => {

  const [bookingDetail, setBookingDetail] = useState(null);
  const { bookingId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (bookingId !== 'undefined' && bookingId !== null) {
      therapistsAxiosApi.get(THERAPIST_BOOKING_API + `/booking-byid/${bookingId}`).then((response) => {
        console.log(response.data);
        setBookingDetail(response.data);
      });
    }
  }, [bookingId]);

  const updateCompletedById = () => {
    therapistsAxiosApi.put(THERAPIST_BOOKING_API + `/update-booking-completed/${bookingId}`, null).then((response) => {
      console.log(response.data);
      setBookingDetail(response.data);
    });
  }

  return (
    <div className="container font-roboto px-10 m-10">
      <div className="flex justify-center items-center w-full  ">
        <div className="bg-white rounded shadow-lg p-6 w-full ">
          {bookingDetail ? (
            <div>
              <h1 className="text-xl font-bold mb-4">Booking Details</h1>
              <div className="mb-4">
                <p className="font-bold mb-2">User Information</p>
                <p>Name: {bookingDetail.userData.fullname}</p>
                <p>Email: {bookingDetail.userData.email}</p>
                <p>Mobile: {bookingDetail.userData.mobile}</p>
              </div>
              <div className="mb-4">
                <p className="font-bold mb-2">Appointment Details</p>
                <p>Date: {bookingDetail.date}</p>
                <p>Time: {bookingDetail.timeSlot.time}</p>
                <p>Duration: {bookingDetail.minutes} minutes</p>
              </div>
              
              <div className="mb-4">
                <p className="font-bold mb-2">Payment Information</p>
                <p>Payment Status: {bookingDetail.paymentStatus}</p>
                <p>Amount: Rs. {bookingDetail.amount}</p>
                {bookingDetail.payment &&
                  <>
                    <p>Payment Method: {bookingDetail.payment?.paymentMethod}</p>
                    <p>Payment Date: {bookingDetail.payment?.paymentDate}</p>
                  </>
                }
              </div>

              <div className="mb-4">
                <p className="font-bold mb-2">Actions</p>
                <p>Booking Status: {bookingDetail.bookingStatus}</p>
                {bookingDetail.paymentStatus !== "PENDING" &&
                 bookingDetail.bookingStatus !== "COMPLETED" &&
                 bookingDetail.bookingStatus !== "CONFIRMED" &&
                 bookingDetail.bookingStatus !== "CANCELLED" &&
                (
                  <button className="text-white bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:focus:ring-indigo-800 shadow-lg shadow-indigo-500/50 dark:shadow-lg dark:shadow-indigo-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4"
                    onClick={() => { updateCompletedById(); }}>
                    Completed
                  </button>
                )
                }
              </div>

            </div>
          ) : (
            <p>Loading booking details...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingDetailView;