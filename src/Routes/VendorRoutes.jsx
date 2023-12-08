import { Route, Routes } from 'react-router';
import VendorAuth from '../auth/VendorAuth';

import VendorHome from '../pages/VendorSide/home/VendorHome';

import TherapistLogin from '../pages/VendorSide/login/TherapistLogin';
import TherapistSignup from '../pages/VendorSide/signup/TherapistSignup';
import Details from '../pages/VendorSide/signup/Details';
import BackAuth from '../auth/BackAuth';
import TherapistOtp from '../pages/VendorSide/signup/TherapistOtp';
import SuccessPage from '../pages/VendorSide/signup/Success';
import TherapistProfile from '../pages/VendorSide/profile/TherapistProfile';
import TherapistProfileEdit from '../pages/VendorSide/profile/TherapistProfileEdit';
import Bookings from '../pages/VendorSide/booking/Bookings';
import TimeSlots from '../pages/VendorSide/timeslots/TimeSlots';
import TherapistChat from '../pages/VendorSide/chat/TherapistChat';
import BookingDetail from '../pages/VendorSide/booking/BookingDetail';
import TherapistVideoChat from '../pages/VendorSide/video-chat/TherapistVideoChat';

const VendorRoutes = () => {
  return (
    <>
      <Routes>

        <Route path="/login" element={
          <BackAuth  element={<TherapistLogin />} />
        }/>

        <Route path="/signup" element={
          <BackAuth  element={<TherapistSignup />} />
        }/>

        <Route path="/otp-verify" element={
          <BackAuth  element={<TherapistOtp />} />
        }/>

        <Route element={<VendorAuth allows={true} />}>
          <Route path="/detail/:username" element={<Details />} />
        </Route>

        <Route element={<VendorAuth allows={true} />}>
          <Route path="/success" element={<SuccessPage />} />
        </Route>

        <Route element={<VendorAuth allows={true} />}>
          <Route path="/profile" element={<TherapistProfile />} />
        </Route>

        <Route element={<VendorAuth allows={true} />}>
          <Route path="/profile-edit" element={<TherapistProfileEdit />} />
        </Route>

        <Route element={<VendorAuth allows={true} />}>
          <Route path="/bookings" element={<Bookings />} />
        </Route>

        <Route element={<VendorAuth allows={true} />}>
          <Route path="/booking-detail/:bookingId" element={<BookingDetail />} />
        </Route>

        <Route path="/chat" element={<TherapistChat />} />

        <Route element={<VendorAuth allows={true} />}>
          <Route path="/time-slots" element={<TimeSlots />} />
        </Route>

        <Route element={<VendorAuth allows={true} />}>
          <Route path="/therapist-chats" element={<TherapistChat />} />
        </Route>
        
        <Route element={<VendorAuth allows={true} />}>
          <Route path="/home" element={<VendorHome />} />
        </Route>

        <Route element={<VendorAuth allows={true} />}>
          <Route path="/therapist-video-chat" element={<TherapistVideoChat />} />
        </Route>

      </Routes>
    </>
  )
}

export default VendorRoutes