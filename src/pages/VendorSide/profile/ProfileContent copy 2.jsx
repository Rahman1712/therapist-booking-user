import { useState } from 'react';
import { therapistsAxiosApi } from '../../../config/axiosConfig';
import { THERAPIST_PRIVATE_API } from '../../../constants';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const ProfileContent = () => {
  const [therapist, setTherapist] = useState(null);
  const [pdfUrl, setPdfUrl] = useState('');

  const { id } = useSelector((state) => state.auth);

  useEffect(() => {
    getTherapistById(id);
  }, [id])

  const getTherapistById = async (id) => {
    try {
      const response = await therapistsAxiosApi.get(THERAPIST_PRIVATE_API + `/getbyid/${id}`);
      if (response.status === 200) {
        const therapistData = response.data;
        console.log(therapistData);
        setTherapist(therapistData);
      } else {
        console.error('Request failed with status:', response.status);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

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

    <div className="container min-h-screen">
      <div className="container mx-auto mt-7">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-12">
            {therapist && (
              <div className="bg-white shadow p-4">
                <h3 className="text-2xl font-semibold">Therapist Details</h3>

                <div className="mb-4">
                  <h4 className="text-lg font-semibold">User ID: {therapist.id}</h4>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="lg:col-span-1">
                    <div className="bg-white shadow border rounded p-4">
                      <div className="mb-3 flex justify-center">
                        <img
                          src={therapist.imageUrl || 'assets/images/profile/user-1.jpg'}
                          // src={therapist.userImage.url || 'assets/images/profile/user-1.jpg'}
                          alt="User Image"
                          className="rounded-full img-fluid"
                          width="100"
                        />
                      </div>

                      <h5 className="font-semibold">Details</h5>
                      <p>Username: {therapist.username}</p>
                      <p>Fullname: {therapist.fullname}</p>
                      <p>Email: {therapist.email}</p>
                      <p>Mobile: {therapist.mobile}</p>
                    </div>
                  </div>

                  {therapist.therapistInfoDto && (
                    <div className="lg:col-span-1">
                      <div className="bg-white shadow border rounded p-4">
                        <h5 className="font-semibold">Address</h5>
                        <p>Building: {therapist.therapistInfoDto.address.building}</p>
                        <p>Street: {therapist.therapistInfoDto.address.street}</p>
                        <p>District: {therapist.therapistInfoDto.address.district}</p>
                        <p>State: {therapist.therapistInfoDto.address.state}</p>
                        <p>Zipcode: {therapist.therapistInfoDto.address.zipcode}</p>
                      </div>
                    </div>
                  )}

                </div>



                {therapist.therapistInfoDto && (
                  <div className="bg-white shadow border rounded p-4 mt-4">
                    <h5 className="font-semibold">Bio Data</h5>
                    <p>{therapist.therapistInfoDto.bio}</p>
                  </div>
                )}

                {therapist.therapistInfoDto && (
                  <div className="bg-white shadow border rounded p-4 mt-4">
                    <h5 className="font-semibold">Specializations</h5>
                    <ul>
                      {therapist.therapistInfoDto.categories.map((category, index) => (
                        <li key={index}>{category.name}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* {alertMessage && (
                  <div className={`alert alert-${alertType} alert-dismissible fade show m-3`} role="alert">
                    {alertMessage}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={alertClear} />
                  </div>
                )} */}
              </div>
            )}

            {!therapist && (
              <div className="flex justify-center mt-5">
                <div className="info-box d-flex flex-column col-6 align-items-center justify-content-center py-5">
                  <i className="fa-solid fa-circle-exclamation"></i>
                  <p>Therapist not found.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

  );
};

export default ProfileContent;



