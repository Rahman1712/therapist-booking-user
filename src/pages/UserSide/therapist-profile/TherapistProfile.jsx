/* eslint-disable no-inner-declarations */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { therapistsAxiosApi } from "../../../config/axiosConfig";
import { THERAPIST_PUBLIC_API } from "../../../constants";
import Navbar from "../../../components/UserComponents/navbar/Navbar";
import Footer from "../../../components/CommonComponents/footer/Footer";
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const TherapistProfile = () => {
  const { therapistId } = useParams();
  const [therapist, setTherapist] = useState(null);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (therapistId !== 'undefined' && therapistId !== null) {
      async function fetchData() {
        try {
          const response1 = await therapistsAxiosApi.get(THERAPIST_PUBLIC_API + `/to-user/therapist/by-id/${therapistId}`);
          console.log(response1.data);
          setTherapist(response1.data);

          const response2 = await therapistsAxiosApi.get(THERAPIST_PUBLIC_API + `/therapist/${therapistId}`);
          console.log("==========");
          console.log(response2.data);
          setReviews(response2.data);

        } catch (error) {
          console.error(error);
        }
      }
      fetchData();
    }
    // if (therapistId !== 'undefined' && therapistId !== null) {
    //   therapistsAxiosApi.get(THERAPIST_PUBLIC_API + `/to-user/therapist/by-id/${therapistId}`).then((response) => {
    //     console.log(response.data);
    //     setTherapist(response.data);
    //   });
    // }
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

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        {therapist ? (
          <div>
            <h2 className="text-2xl font-semibold mb-4 dark:text-white font-orbitron">{therapist.fullname}'s Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-roboto">
              {/* Left Column */}
              <div className="col-span-1 md:col-span-1 rounded-lg shadow-lg p-4">
                <img
                  src={therapist.imageUrl ? therapist.imageUrl : ''}
                  alt={therapist.fullname}
                  className="w-full h-auto object-contain rounded-lg"
                />
                <h3 className="text-xl font-semibold mt-4 dark:text-white">Profile</h3>
                <br />
                <p className={`mb-4 rounded-md  p-2 ${therapist.is_certified ? 'text-white bg-green-600' : 'text-white bg-rose-600'} inline`}>{therapist.is_certified ? 'Certified' : 'Not Certified'}</p>

                <br />
                <button
                  onClick={() => {
                    if (therapist.is_certified) {
                      navigate(`/therapist-book/${therapist.id}`);
                    }
                  }}
                  className={`text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-5  ${!therapist.is_certified && 'opacity-30'}`}
                >
                  Book Now
                </button>
              </div>

              {/* Right Column */}
              <div className="col-span-1 md:col-span-2 rounded-lg shadow-lg p-4">
                <h3 className="text-xl font-semibold mt-4 dark:text-white">Bio</h3>
                <p className="mb-4">{therapist.bio}</p>
                <h3 className="text-xl font-semibold mt-4 dark:text-white">Experience</h3>
                <p className="mb-4">{therapist.experience_years} years</p>
                <h3 className="text-xl font-semibold mt-4 dark:text-white">Hourly Rate</h3>
                <p className="mb-4">${therapist.hourly_rate} per hour</p>
                <h3 className="text-xl font-semibold mt-4 dark:text-white">Languages Known</h3>
                <p className="mb-4">
                  {therapist.languages ? therapist.languages.join(', ') : 'N/A'}
                </p>
                <h3 className="text-xl font-semibold mt-4 dark:text-white">Specialization Categories</h3>
                <p>
                  {therapist.categories ? therapist.categories.join(', ') : 'N/A'}
                </p>

                {reviews.length > 0 &&
                  <div className="mt-10 rounded-lg shadow-lg
                bg-white  h-[200px] text-left  p-4 bg-gradient-to-r from-blue-50 via-blue-50 to-indigo-50 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-50 dark:focus:ring-blue-400
                ">
                    <p className="font-bold mb-2">Reviews</p>
                    {reviews.map((review, index) => (
                      <div key={index} className="border border-blue-100 p-2 rounded-sm">
                        <p className='text-xs'>{review.date}</p>
                        <p>{review.content}</p>
                        <div>
                          {review.rating > 0 ? renderRatingStars(review.rating) : 'No rating'} ({review.rating} out of 5)
                        </div>
                      </div>
                    ))}
                  </div>
                }
              </div>
            </div>
          </div>
        ) : (
          <p>Loading therapist's profile...</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default TherapistProfile;
