/* eslint-disable no-inner-declarations */
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom/dist';
import { userAxiosApi } from '../../../config/axiosConfig';
import { REVIEW_API, USER_BOOKING_API } from '../../../constants';
import ReactStars from "react-rating-stars-component";
import { useSelector } from 'react-redux';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import CountdownTimer from './CountdownTimer';

const BookingDetailView = () => {
  const { id, fullname, email, mobile } = useSelector((state) => state.auth);
  const [bookingDetail, setBookingDetail] = useState(null);
  const { bookingId } = useParams();
  const [review, setReview] = useState({});
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();


  useEffect(() => {
    if (bookingId !== 'undefined' && bookingId !== null) {
      async function fetchData() {
        try {
          const response1 = await userAxiosApi.get(USER_BOOKING_API + `/booking-byid/${bookingId}`);
          console.log(response1.data);
          setBookingDetail(response1.data);

          const response2 = await userAxiosApi.get(REVIEW_API + `/booking/${bookingId}`);
          console.log("==========");
          console.log(response2.data);
          setReview(response2.data);

        } catch (error) {
          console.error(error);
        }
      }
      fetchData();
    }
  }, [bookingId]);


  const ratingChanged = (newRating) => {
    console.log(newRating);
    setRating(newRating);
  };

  const handleCreateReview = () => {
    if (content && rating > 0) {
      const reviewData = {
        content,
        rating,
        bookingId,
        // userId: id,
        userData: {
          userId: id,
          fullname,
          email,
          mobile
        },
        therapistId: bookingDetail.therapistInfo.therapistId,
      };

      userAxiosApi.post(REVIEW_API + '/create', reviewData)
        .then((response) => {
          console.log('Review created:', response.data);
          setReview(response.data);
        })
        .catch((error) => {
          console.error('Error creating review:', error);
        });
    } else {
      console.error('Content and rating are required');
    }
  };

  function renderRatingStars(rating) {
    const filledStars = Math.min(5, Math.floor(rating));
    const outlineStars = Math.max(0, 5 - filledStars);

    const stars = [];

    for (let i = 0; i < filledStars; i++) {
      stars.push(<AiFillStar key={`filled-${i}`} color="#ffd700" />);
    }

    for (let i = 0; i < outlineStars; i++) {
      stars.push(<AiOutlineStar key={`outline-${i}`} color="#000" />);
    }

    return (
      <div className="rating-stars flex">
        {stars.map((star, index) => (
          <span key={index}>{star}</span>
        ))}
      </div>
    );
  }

  const cancelBooking = async (bookingId) => {
    try {
      const response = await userAxiosApi.put(USER_BOOKING_API + `/cancel/${bookingId}`);
      console.log(response.data);
      setBookingDetail(response.data);
    } catch (error) {
      console.error('Error cancelling booking:', error);
    }
  };

  const rescheduleBooking = async (bookingId, therapistId) => {
    navigate(`/therapist-book-reschedule/${therapistId}/booking/${bookingId}`);
  };

  const checkTimeExpiresToChange = (dateTime) => {
    const givenDateTime = new Date(dateTime);
    const currentDateTime = new Date();
    const timeLimit = 3 * 60 * 60 * 1000; // 3 hours in milli
    const timeDifference = currentDateTime - givenDateTime;
    return timeDifference < timeLimit; // true or false
  }

  return (
    <div className="container font-roboto  px-10 m-10">
      <div className="flex justify-center items-center w-full ">
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
                <p className="font-bold mb-2">Therapist Information</p>
                <p>Name: {bookingDetail.therapistInfo.fullname}</p>
              </div>
              {bookingDetail.payment &&
                <div className="mb-4">
                  <p className="font-bold mb-2">Payment Information</p>
                  <p>Amount: Rs. {bookingDetail.payment?.amount}</p>
                  <p>Payment Method: {bookingDetail.payment?.paymentMethod}</p>
                  <p>Payment Date: {bookingDetail.payment?.paymentDate}</p>
                </div>
              }

              <div className="mb-4">
                <p className="font-bold mb-2">Actions</p>
                <p>Payment Status: {bookingDetail.paymentStatus}</p>
                <p>Amount: Rs. {bookingDetail.amount}</p>

                {bookingDetail.paymentStatus === "PENDING" &&
                checkTimeExpiresToChange(`${bookingDetail.date}T${bookingDetail.timeSlot.time}`) &&

                  <button className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4"
                    onClick={() => { navigate("/payment/" + bookingId); }}>
                    Pay Now
                  </button>
                }


                {checkTimeExpiresToChange(`${bookingDetail.date}T${bookingDetail.timeSlot.time}`) &&
                 <CountdownTimer dateTime={`${bookingDetail.date}T${bookingDetail.timeSlot.time}`} />
                }


                {bookingDetail.bookingStatus !== "COMPLETED" &&
                  bookingDetail.bookingStatus !== "CANCELLED" &&
                  bookingDetail.bookingStatus !== "CONFIRMED" &&
                  checkTimeExpiresToChange(`${bookingDetail.date}T${bookingDetail.timeSlot.time}`) &&
                  (
                    <>
                      <button
                        className="mx-5 text-white bg-gradient-to-r from-rose-400 via-rose-500 to-rose-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-rose-300 dark:focus:ring-rose-800 shadow-lg shadow-rose-500/50 dark:shadow-lg dark:shadow-rose-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4"
                        onClick={() => {
                          cancelBooking(bookingId);
                        }}
                      >
                        Cancel
                      </button>
                      {!bookingDetail.rescheduleDateTime &&
                      <button
                        className="mx-5 text-white bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-amber-300 dark:focus:ring-amber-800 shadow-lg shadow-amber-500/50 dark:shadow-lg dark:shadow-amber-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4"
                        onClick={() => {
                          rescheduleBooking(bookingId, bookingDetail.therapistInfo.therapistId);
                        }}
                      >
                        Reschedule
                      </button>
                      }
                    </>
                  )}

              </div>

              {bookingDetail.bookingStatus === "COMPLETED" && (

                <>
                  <div className="mb-4 rounded-lg shadow-md p-10">
                    {review ? (
                      <div>
                        <p className="font-bold mb-2">Review</p>
                        <p className='text-xs'>{review.date}</p>
                        <p>{review.content}</p>
                        <div>
                          {review.rating > 0 ? renderRatingStars(review.rating) : 'No rating'} ({review.rating} out of 5)
                        </div>

                        {/* <button
                          className="text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4"
                        // onClick={handleUpdateReview}
                        >
                          Update Review
                        </button> */}
                      </div>
                    ) : (
                      <div>
                        <p className="font-bold mb-2">Add Review</p>
                        <div className="mb-4">
                          <label htmlFor="bio" className="block text-sm font-medium text-gray-800">
                            Enter your opinion
                          </label>
                          <textarea
                            id="bio"
                            name="bio"
                            rows="3"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Enter your review"
                            className="mt-1 p-2 w-full border border-gray-400 rounded-md"
                          />
                        </div>

                        <ReactStars
                          count={5}
                          onChange={ratingChanged}
                          size={24}
                          activeColor="#ffd700"
                        />

                        <button
                          className="text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4"
                          onClick={handleCreateReview}
                        >
                          Create New Review
                        </button>
                      </div>
                    )}
                  </div>
                </>

              )}
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