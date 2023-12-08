import { useState } from 'react';
import {userAxiosApi} from '../../../config/axiosConfig';

const VideoSection = () => {
  const [isLoading, setLoading] = useState(false);
  
  const access = localStorage.getItem("access_token");
  // const config = {
  //   headers: {
  //     'Accept': 'video/mp4',
  //     'Authorization': `Bearer ${access}`,
  //   },
  // }
  const buttonClickHandler = () => {
    setLoading(true);
    videoFileLoad();
  }

  const videoFileLoad = () => {
    userAxiosApi.get('/api/v1/video/video-file/stream.mp4', {
      responseType: 'arraybuffer',
      headers: {
          'Accept': 'video/mp4',
          Authorization: `Bearer ${access}`,
      },
      
    })
    .then((response) => {
        // Create a Blob from the response data
        const videoBlob = new Blob([response.data], { type: 'video/mp4' });
        // Create a video element and set the source to the Blob
        const videoElement = document.getElementById('video');
        videoElement.src = URL.createObjectURL(videoBlob);
    })
    .catch((error) => {
        console.error('Error fetching video stream:', error);
    });
  }

  const videoLoad = () =>{
    const videoId = 1; // Replace with the actual video ID you want to fetch
    userAxiosApi.get(`/video/${videoId}`, {
        responseType: 'arraybuffer',
        headers: {
            'Accept': 'video/mp4',
        },
    })
    .then((response) => {
        // Create a Blob from the response data
        const videoBlob = new Blob([response.data], { type: 'video/mp4' });
        // Create a video element and set the source to the Blob
        const videoElement = document.getElementById('video');
        videoElement.src = URL.createObjectURL(videoBlob);
    })
    .catch((error) => {
        console.error('Error fetching video stream:', error);
    });
  }

  return (
    <div>
      {/* {isLoading && */}
        <video id="video" controls autoPlay>
            Your browser does not support the video tag.
        </video>
      {/* } */}
      <button type='button' onClick={buttonClickHandler}>load video</button>
    </div>
  )
}

export default VideoSection