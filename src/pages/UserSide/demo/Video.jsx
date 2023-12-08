import Footer from "../../../components/CommonComponents/footer/Footer";
import Navbar from "../../../components/UserComponents/navbar/Navbar";
import { Component } from 'react';
import { userAxiosApi } from '../../../config/axiosConfig';

class Video extends Component {

  componentDidMount() {
    // Make an Axios request to fetch the video stream
    // api.get('/api/v1/video/video-file/stream.mp4', {
    //api/v1/video/video-file/stream.mp4
    //api/v1/video/stream/stream.mp4
    //api/v1/video/video-file/perfume.mkv
    //api/v1/video/stream/perfume.mkv
    userAxiosApi.get('/api/v1/video/video-file/perfume.mkv', {
      responseType: 'arraybuffer',
      headers: {
        'Accept': 'video/mp4',
        'Range': 'bytes=0-',
        // 'Authorization' : `Bearer ${localStorage.getItem("access_token")}`
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
  render() {
    return (
      <>
        <Navbar />

        <div>
          <video id="video" controls autoPlay>
            Your browser does not support the video tag.
          </video>
        </div>

        <Footer />
      </>
    )
  }
}

export default Video;