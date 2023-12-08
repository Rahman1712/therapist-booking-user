import { useNavigate } from "react-router";
import Marquee from "react-fast-marquee";
import { MdStars, MdVerified } from 'react-icons/md';

const TherapistCard = ({ therapist }) => {
  const navigate = useNavigate();

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

  return (

    <div className="mb-5 mb-md-0 flex items-stretch">
      <div className="bg-white rounded-md shadow-md overflow-hidden">
        <div className="h-[100px] rounded-tl-md rounded-tr-md" style={{ backgroundColor: "#7a81a8" }}></div>
        <div className="w-[110px] -mt-[60px] overflow-hidden rounded-[50%] border-[3px] border-solid border-white mx-auto bg-white">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(2).webp"
            className="rounded-circle img-fluid"
            alt="Thefrapist Avatar"
          />
        </div>
        <div className="p-4 font-roboto-mono">
          <h4 className="text-lg font-bold mb-4 text-center text-gray-700 flex justify-center items-center gap-1">
            <MdVerified />
            <span>Lisa Cudrow </span>
          </h4>
          <p className="text-sm text-center text-gray-500 mb-4">Qualification: Your Qualification</p>
          <hr className="border-gray-300" />
          <div className="mt-2">
            <p className="flex items-center font-bold gap-2">
              <MdStars />
              <span className="text-sm">Specialization</span>
            </p>
            <Marquee autoFill pauseOnClick speed={3} >
              <span className="bg-gray-200 text-gray-900 text-xs font-medium m-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300">Dark</span>
            </Marquee>
          </div>
          <div className="flex justify-between mt-4">

            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none">
              Profile View
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>

  );
};

export default TherapistCard;


{/* <div className="bg-gradient-to-r from-teal-50 to-lime-50 hover:bg-gradient-to-l hover:from-teal-50 hover:to-lime-50 focus:ring-4 focus:outline-none focus:ring-lime-50 dark:focus:ring-teal-700 rounded-lg shadow-lg p-4">
      <img src={therapist.imageUrl} alt={therapist.fullname} className="w-full h-52 object-cover rounded-lg" />
      <h2 className="text-xl font-semibold mt-2 dark:text-white">{therapist.fullname}</h2>
      <p className="text-gray-500 dark:text-gray-300 text-sm mt-1">{therapist.categories.join(',')}</p>
      <div className="mt-4 flex justify-between">


        <button type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          onClick={() => {
            navigate(`/therapist-profile/${therapist.id}`);
          }}
        >View Profile</button>

        <button type="button" className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          onClick={() => {
            navigate(`/therapist-book/${therapist.id}`);
          }}
        >Book Now</button>

      </div>
    </div> */}



// <div className="container mx-auto px-4 py-5">
//   <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
//     <div className="bg-purple-500 p-5 text-white">
//       <h1 className="text-2xl">Testimonial</h1>
//     </div>
//     <div className="p-5">
//       <img
//         src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp"
//         className="mx-auto w-32 h-32 rounded-full shadow-lg"
//       />
//       <h1 className="text-xl font-bold mt-5">Maria Smantha</h1>
//       <p className="text-gray-500 mt-3">
//         "Lorem ipsum dolor sit amet eos adipisci, consectetur adipisicing
//         elit."
//       </p>
//     </div>
//   </div>
// </div>



{/* <div className="max-w-sm mx-auto mt-10 bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
 <img className="h-48 w-full object-cover" src="https://source.unsplash.com/random" alt="Card Image" />
 <div className="p-6">
    <div>
      <p className="text-lg font-semibold text-gray-600">Card Title</p>
      <p className="mt-2 text-sm text-gray-500">Card Subtitle</p>
    </div>
    <div className="mt-4">
      <p className="text-sm text-gray-600">Card description.</p>
    </div>
 </div>
 <div className="p-6 border-t border-gray-200">
    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-gray-600 bg-gray-200">
      Label
    </span>
 </div>
</div> */}

{/* <div className="container mx-auto px-4 py-5">
<div className="max-w-xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
  <div className="bg-purple-500 p-5 text-white">
    <h1 className="text-2xl">Testimonial</h1>
  </div>
  <div className="p-5 ">
    <img
      src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp"
      className="mx-auto w-32 h-32 rounded-full shadow-lg "
    />
    <h1 className="text-xl font-bold mt-5">Maria Smantha</h1>
    <p className="text-gray-500 mt-3">
      "Lorem ipsum dolor sit amet eos adipisci, consectetur adipisicing
      elit."
    </p>
  </div>
</div>
</div> */}