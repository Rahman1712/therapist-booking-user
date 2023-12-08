import { useState } from 'react';
import { therapistsAxiosApi } from '../../../config/axiosConfig';
import { THERAPIST_PRIVATE_API } from '../../../constants';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import TherapistCertificateView from './TherapistCertificateView';
import { BsFilePdf } from 'react-icons/bs';
import { useNavigate } from 'react-router';

const TherapistProfileContent = () => {
  const navigate = useNavigate();
  const { id, username } = useSelector((state) => state.auth);
  const [therapist, setTherapist] = useState(null);

  const [educationalUrl, setEducationalUrl] = useState(null);
  const [experienceUrl, setExperienceUrl] = useState(null);
  const [additionalUrl, setAdditionalUrl] = useState(null);
  const [docData, setDocData] = useState({
    docName: '',
    docUrl: null,
  });
  const [isCertificateViewOpen, setCertificateViewOpen] = useState(false);

  useEffect(() => {
    getTherapistById(id);
  }, [id])

  const handleEdit = () => {
    navigate("/vendor/profile-edit");
  };
  const handleDetail = () => {
    navigate(`/vendor/detail/${username}`);
  };

  const getTherapistById = async (id) => {
    try {
      const response = await therapistsAxiosApi.get(THERAPIST_PRIVATE_API + `/getbyid/${id}`);
      if (response.status === 200) {
        const therapistData = response.data;
        console.log(therapistData);
        setTherapist(therapistData);
       
        const eduCertBytes = therapistData.therapistInfoDto.educationalCertificate;
        const eduCertType = therapistData.therapistInfoDto.educationalCertificateType;
        if(eduCertBytes) {
          const eduUrl = await getDocUrl(eduCertBytes, eduCertType);
          setEducationalUrl(eduUrl);
        } 

        const expCertBytes = therapistData.therapistInfoDto.experienceCertificate;
        const expCertType = therapistData.therapistInfoDto.experienceCertificateType;
        if(expCertBytes) {
          const expUrl = await getDocUrl(expCertBytes, expCertType);
          setExperienceUrl(expUrl);
        }

        const addCertBytes = therapistData.therapistInfoDto.additionalCertificate;
        const addCertType = therapistData.therapistInfoDto.additionalCertificateType;
        if(addCertBytes) {
          const addUrl = await getDocUrl(addCertBytes, addCertType);
          setAdditionalUrl(addUrl);
        }

      } else {
        console.error('Request failed with status:', response.status);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  async function getDocUrl(docBytes, docType) {
    const binaryString = atob(docBytes);
    const byteArray = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      byteArray[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([byteArray], { type: docType });
    const docUrl = URL.createObjectURL(blob);
    return docUrl;
  }

  const handleCertificateView = (docName, docUrl) => {
    console.log(docName);
    console.log(docUrl);
    setDocData(
      {
        docName, 
        docUrl,
      }
    );
    setCertificateViewOpen(true);
  }

  // function generateDocumentUrl(documentBytes, documentName, documentType) {
  //   const byteString = window.atob(documentBytes);
  //   const arrayBuffer = new ArrayBuffer(byteString.length);
  //   const int8Array = new Uint8Array(arrayBuffer);

  //   for (let i = 0; i < byteString.length; i++) {
  //     int8Array[i] = byteString.charCodeAt(i);
  //   }

  //   const blob = new Blob([int8Array], { type: documentType });
  //   const pdfFile = new File([blob], documentName, { type: documentType });

  //   return this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(pdfFile));
  // }

  return (

    <section className="bg-gray-200 w-full px-5 font-roboto">
      <div className="container mx-auto py-5">
        <h1 className="font-roboto-mono font-bold mb-5 underline underline-offset-2 text-xl text-cyan-900">Profile Details</h1>
        {therapist && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

            <div className="lg:col-span-1">
              <div className="mb-4">
                <div className="bg-white rounded-md shadow-md p-4">
                  <div className="text-center p-4">

                    <div className="mb-3 flex justify-center">
                      <img
                        src={therapist.imageUrl || 'assets/images/profile/user-1.jpg'}
                        // src={therapist.userImage.url || 'assets/images/profile/user-1.jpg'}
                        alt="User Image"
                        className="rounded-full img-fluid"
                        width="100"
                      />
                    </div>

                    <p className="text-gray-500 mt-2 mb-1">Therapist: #{therapist.id}</p>
                    <p className="text-gray-500 mb-4">{therapist.username}</p>
                    <button
                      onClick={handleEdit} 
                      className="text-white bg-cyan-800 shadow-xl hover:bg-slate-200 hover:text-cyan-800  font-medium rounded-lg text-sm px-3 py-2.5 text-center mr-2 mb-2 min-w-[100px]">Edit</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 ">
              <div className="mb-4">
                <div className="bg-white rounded-md shadow-md p-4">
                  <div className="flex flex-col mb-4 mt-5">
                    <h5 className="font-semibold underline mb-2">Details</h5>
                    <div className="flex m-2">
                      <p className="w-1/3">Full Name</p>
                      <p className="text-gray-500">{therapist.fullname}</p>
                    </div>
                    {therapist.therapistInfoDto &&
                      <div className="flex m-2">
                        <p className="w-1/3">Qualification</p>
                        <p className="text-gray-500">{therapist.therapistInfoDto.qualification}</p>
                      </div>
                    }
                    <hr />
                    <div className="flex m-2">
                      <p className="w-1/3">Email</p>
                      <p className="text-gray-500">{therapist.email}</p>
                    </div>
                    <hr />
                    <div className="flex m-2">
                      <p className="w-1/3">Mobile</p>
                      <p className="text-gray-500">{therapist.mobile}</p>
                    </div>
                  </div>

                  {!therapist.therapistInfoDto && (
                  <div className="mb-4 bg-white rounded-md shadow-md p-4 border-2 border-rose-400">
                    <div className="flex flex-col mb-4 mt-5 justify-center items-center">
                      <p className="font-semibold mb-2 text-center">details not added</p>
                      <button
                      onClick={handleDetail} 
                      className="text-white bg-cyan-700 shadow-xl hover:bg-slate-200 hover:text-cyan-700  font-medium rounded-lg text-sm px-3 py-2.5 text-center mr-2 mb-2 w-[100px]">
                        Add Detail
                      </button>
                    </div>
                  </div>
                  )}

                </div>
              </div>

              {therapist.therapistInfoDto && (
              <div className="mb-4">
                <div className="bg-white rounded-md shadow-md p-4">
                  <div className="flex flex-col mb-4 mt-5">
                      <div className="lg:col-span-1">
                        <div className="bg-white shadow border rounded p-4">
                          <h5 className="font-semibold underline mb-2">Address</h5>
                          <p>Building: {therapist.therapistInfoDto.address.building}</p>
                          <p>Street: {therapist.therapistInfoDto.address.street}</p>
                          <p>District: {therapist.therapistInfoDto.address.district}</p>
                          <p>State: {therapist.therapistInfoDto.address.state}</p>
                          <p>Zipcode: {therapist.therapistInfoDto.address.zipcode}</p>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
              )}

              {therapist.therapistInfoDto && (
              <div className="mb-4">
                <div className="bg-white rounded-md shadow-md p-4">
                  <div className="flex flex-col mb-4 mt-5">
                      <div className="bg-white shadow border rounded p-4 mt-4">
                        <h5 className="font-semibold underline mb-2">About</h5>
                        <p>{therapist.therapistInfoDto.bio}</p>
                      </div>
                  </div>
                </div>
              </div>
              )}

              {therapist.therapistInfoDto && (
              <div className="mb-4">
                <div className="bg-white rounded-md shadow-md p-4">
                  <div className="flex flex-col mb-4 mt-5">
                      <div className="bg-white shadow border rounded p-4 mt-4">
                        <h5 className="font-semibold underline mb-2">Specializations</h5>
                        <ul>
                          {therapist.therapistInfoDto.categories.map((category, index) => (
                            <li key={index}>{category.name}</li>
                          ))}
                        </ul>
                      </div>
                  </div>
                </div>
              </div>
              )}

              {therapist.therapistInfoDto && (
              <div className="mb-4">
                <div className="bg-white rounded-md shadow-md p-4">
                  <div className="flex flex-col mb-4 mt-5">
                      <div className="bg-white shadow border rounded p-4 mt-4">
                        <h5 className="font-semibold underline mb-2">Certificates Uploaded</h5>
                        
                        <p className='text-gray-800 mr-2 mb-3 flex gap-2'>
                          Educational Certificate:
                          {educationalUrl ? 
                          <a className='text-cyan-800 hover:text-cyan-500' 
                          onClick={() => handleCertificateView("Educational Certificate" , educationalUrl) } >
                            <span className='flex gap-2 items-center cursor-pointer'>open file <BsFilePdf /></span>
                          </a>
                          :
                          <span className='text-rose-800'>not uploaded</span>
                          }
                        </p>

                        <p className='text-gray-800 mr-2 mb-3 flex gap-2'>
                          Experience Certificate:
                          {experienceUrl ? 
                          <a className='text-cyan-800 hover:text-cyan-500' 
                          onClick={() => handleCertificateView("Experience Certificate" , experienceUrl) } >
                            <span className='flex gap-2 items-center cursor-pointer'>open file <BsFilePdf /></span>
                          </a>
                          :
                          <span className='text-rose-800'>not uploaded</span>
                          }
                        </p>

                        <p className='text-gray-800 mr-2 mb-3 flex gap-2'>
                          Additional Certificate:
                          {additionalUrl ? 
                          <a className='text-cyan-800 hover:text-cyan-500' 
                          onClick={() => handleCertificateView("Additional Certificate" , additionalUrl) } >
                            <span className='flex gap-2 items-center cursor-pointer'>open file <BsFilePdf /></span>
                          </a>
                          :
                          <span className='text-rose-800'>not uploaded</span>
                          }
                        </p>
                      </div>
                  </div>
                </div>
              </div>
              )}

            </div>

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

      {isCertificateViewOpen &&
        <TherapistCertificateView
          isOpen={isCertificateViewOpen}
          onClose={() => setCertificateViewOpen(false)}
          docData={docData}
          className="z-50"
        />
      }
    </section>


  );
};

export default TherapistProfileContent;



