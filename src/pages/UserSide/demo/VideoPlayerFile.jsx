import React, { useEffect } from 'react';
import axios from 'axios';

function VideoPlayerFile() {
  useEffect(() => {
    // Make a GET request to the Spring Boot API endpoint
    axios.get('http://localhost:8080/api/v1/video/videos/perfume.mkv', 
    { 
      responseType: 'blob',
      headers: { 'Authorization': `Bearer ${localStorage.getItem("access_token")}`
    }      
  })
      .then(response => {
        // Create a blob URL from the response
        const videoBlob = new Blob([response.data], { type: 'video/mp4' });
        const videoUrl = URL.createObjectURL(videoBlob);

        // Set the video source and start playback
        const videoElement = document.getElementById('video-player');
        videoElement.src = videoUrl;
        videoElement.play();
      })
      .catch(error => {
        console.error('Error fetching video:', error);
      });
  }, []);

  return (
    <div>
      <video id="video-player" controls />
    </div>
  );
}

export default VideoPlayerFile;
