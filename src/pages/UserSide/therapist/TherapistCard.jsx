/* eslint-disable react/prop-types */
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
      <div className="bg-white rounded-md shadow-md overflow-hidden
      bg-gradient-to-r from-teal-100 to-lime-100 hover:bg-gradient-to-l hover:from-teal-100 hover:to-lime-100 focus:ring-4 focus:outline-none focus:ring-lime-100 dark:focus:ring-teal-700
      ">
        <div className="h-[100px] rounded-tl-md rounded-tr-md 
        bg-gradient-to-r from-indigo-200 via-cyan-100 to-indigo-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-100 dark:focus:ring-blue-400
        "></div>
        <div className="w-[110px] -mt-[60px] overflow-hidden rounded-[50%] border-[3px] border-solid border-cyan-100 mx-auto bg-white" style={{ userSelect: 'none' }}>
          <img
            src={therapist.imageUrl} alt={therapist.fullname}
            className="rounded-circle img-fluid"
          />
        </div>
        <div className="p-4 font-poppins">
          <div className="flex flex-col justify-center items-center mb-3">
            <h4 className="text-lg font-bold text-center text-gray-900">
              {therapist.fullname}
            </h4>
            <p className="flex justify-center items-center text-cyan-800">
              <MdVerified className="mr-1" />
              <span className="text-xs ">
                verified
              </span>
            </p>
          </div>
          <p className="text-sm text-center text-gray-700 mb-4">{therapist.qualification}</p>
          <hr className="border-gray-300" />
          <div className="mt-2">
            <p className="flex items-center font-bold gap-2 text-gray-600">
              <MdStars />
              <span className="text-sm">Specializations</span>
            </p>
            <div className="px-5 font-roboto-mono">
              <Marquee autoFill pauseOnHover speed={10} >
                {therapist.categories?.map((category) => (
                  <span
                    key={category}
                    className="text-xs font-medium m-2 px-2.5 py-0.5 rounded-md bg-gradient-to-r from-teal-100 to-cyan-100 focus:ring-4 focus:outline-none focus:ring-lime-50 dark:focus:ring-teal-700"
                  >
                    {category}
                  </span>
                ))}
              </Marquee>
              {/* <TextLoop interval={100}>
                {therapist.categories?.map((category) => (
                  <span
                    key={category}
                    className="text-xs font-medium m-2 px-2.5 py-0.5 rounded-md bg-gradient-to-r from-teal-100 to-cyan-100 focus:ring-4 focus:outline-none focus:ring-lime-50 dark:focus:ring-teal-700"
                  >
                    {category}
                  </span>
                ))}
              </TextLoop> */}
            </div>

          </div>
          <div className="flex justify-between mt-4 font-roboto">

            <button type="button" className="text-cyan-800 bg-slate-200 shadow-xl hover:bg-cyan-800 hover:text-white  font-medium rounded-lg text-sm px-3 py-2.5 text-center mr-2 mb-2 min-w-[100px]"
              onClick={() => {
                navigate(`/therapist-profile/${therapist.id}`);
              }}
            >View Profile</button>

            <button type="button" className="text-white bg-cyan-800 shadow-xl hover:bg-slate-200 hover:text-cyan-800  font-medium rounded-lg text-sm px-3 py-2.5 text-center mr-2 mb-2 min-w-[100px]"
              onClick={() => {
                navigate(`/therapist-book/${therapist.id}`);
              }}
            >Book Now</button>
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