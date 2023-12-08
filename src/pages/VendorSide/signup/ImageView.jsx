/* eslint-disable react/prop-types */
import { useEffect } from "react";

const ImageView = (props) => {
  const {imageUrl} = props;

  console.log();

  useEffect(() => {
    // Clean up the URL when the component unmounts
    return () => {
      URL.revokeObjectURL(imageUrl);
    };

  }, [imageUrl]);

  return (
    <>
    {
      imageUrl ?
      <img 
      src={imageUrl} 
      alt="Profile Image" 
      className={`w-52 h-52 mb-3 rounded-lg shadow-lg flex justify-center items-center text-center`}
      onError={() => {
        console.log("Error loading image");
      }}
      />
      :
      <img src="/Upload2.png" alt="No Image"/>
    }
    </>
  );
};

export default ImageView;