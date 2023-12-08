import React from 'react';
import { Route, Routes } from 'react-router';
import BackAuth from '../auth/BackAuth';

import Home from '../pages/UserSide/home/Home'
import Login from '../pages/UserSide/login/Login'
import Signup from '../pages/UserSide/signup/Signup'
import Forgot from '../pages/UserSide/forgot/Forgot'
import PasswordReset from '../pages/UserSide/forgot/PasswordReset';
import OAuth2 from '../pages/UserSide/oauth2/OAuth'
import Otp from '../pages/UserSide/signup/Otp';
import PrivateRoute from '../auth/PrivateRoute';
import Demo from '../pages/UserSide/demo/Demo'
import Video from '../pages/UserSide/demo/Video'
import Message from '../pages/UserSide/demo/Message'
import Checkout from '../pages/UserSide/demo/Checkout'
import Therapists from '../pages/UserSide/therapist/Therapists'
import TherapistBooking from '../pages/UserSide/booking/TherapistBooking'
import TherapistProfile from '../pages/UserSide/therapist-profile/TherapistProfile';
import PaymentPage from '../pages/UserSide/payment/PaymentPage';
import Success from '../pages/UserSide/demo/Success';
import Failure from '../pages/UserSide/demo/Failure';
import UserChat from '../pages/UserSide/chat/UserChat';
import TherapistPayment from '../pages/UserSide/booking/TherapistPayment';
import UserDashboard from '../pages/UserSide/dashboard/UserDashboard';
import UserProfile from '../pages/UserSide/dashboard/UserProfile';
import UserBooking from '../pages/UserSide/dashboard/UserBooking';
import BookingDetail from '../pages/UserSide/dashboard/BookingDetail';
import UserProfileEdit from '../pages/UserSide/dashboard/UserProfileEdit';
import TherapistBookingReschedule from '../pages/UserSide/booking/TherapistBookingReschedule';
import TherapistsByCategory from '../pages/UserSide/therapist/TherapistsByCategory';
import Categories from '../pages/UserSide/categories/Categories';
import UserVideoChat from '../pages/UserSide/video-chat/UserVideoChat';
const LazyProfile = React.lazy(() => import ('../pages/UserSide/profile/Profile'));

const UserRoutes = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        
        <Route path="/login" element={
          <BackAuth  element={<Login />} />
        }/>

        <Route path="/signup" element={
          <BackAuth  element={<Signup />} />
        }/>

        <Route path="/otp-verify" element={
          <BackAuth  element={<Otp />} />
        }/>

        <Route path="/forgot-password" element={
          <BackAuth  element={<Forgot />} />
        }/>


        <Route exact path="/reset-password" element={<PasswordReset />}></Route>
        
        <Route exact path="/oauth2/redirect" element={<OAuth2 />}></Route>
     
        <Route exact path="/videos" element={<Video />}></Route>

        <Route exact path="/therapists" element={<Therapists />}></Route>

        <Route exact path="/therapists-by-category/:categoryName" element={<TherapistsByCategory />}></Route>

        <Route exact path="/categories" element={<Categories />}></Route>

        <Route exact path="/checkout" element={<Checkout />}></Route>
        <Route exact path="/message" element={<Message />}></Route>
        
        
        <Route exact path="/success" element={<Success />}></Route>
        <Route exact path="/failure" element={<Failure />}></Route>
        
        {/* <Route path="/chat" element={<UserChat />} /> */}

        <Route exact path="/therapist-profile/:therapistId" element={<TherapistProfile />}></Route>

        <Route exact path="/therapist-book/:therapistId" element={<TherapistBooking />}></Route>

        <Route exact path="/therapist-book-reschedule/:therapistId/booking/:bookingId" element={ 
          <PrivateRoute  element={<TherapistBookingReschedule />} />
        }></Route>

        <Route exact path="/payment-call" element={<PaymentPage />}></Route>
        {/* <Route exact path="/payment" element={ 
          <PrivateRoute  element={<PaymentPage />} />
        }></Route> */}
        
        <Route exact path="/payment/:bookingId" element={ 
          <PrivateRoute  element={<TherapistPayment />} />
        }></Route>

        <Route exact path="/user-dashboard" element={ 
          <PrivateRoute  element={<UserDashboard />} />
        }></Route>
        <Route exact path="/user-profile" element={ 
          <PrivateRoute  element={<UserProfile />} />
        }></Route>
        <Route exact path="/user-profile-edit" element={ 
          <PrivateRoute  element={<UserProfileEdit />} />
        }></Route>
        <Route exact path="/user-bookings" element={ 
          <PrivateRoute  element={<UserBooking />} />
        }></Route>
        <Route exact path="/user-book/:bookingId" element={ 
          <PrivateRoute  element={<BookingDetail />} />
        }></Route>
        <Route exact path="/user-chats" element={ 
          <PrivateRoute  element={<UserChat />} />
        }></Route>
        
        <Route exact path="/user-video-chat" element={<UserVideoChat />}></Route>
        {/* <Route exact path="/user-video-chat" element={ 
          <PrivateRoute  element={<UserVideoChat />} />
        }></Route> */}
        
        <Route exact path="/demo" element={ 
          <PrivateRoute  element={<Demo />} />
        }></Route>

        {/* <Route exact path="/therapists" element={ 
          <PrivateRoute  element={<Therapists />} />
        }></Route> */}

        <Route exact path="/profile" element={
          <React.Suspense>
            <LazyProfile />
          </React.Suspense>
        }></Route>

      </Routes>

      
    </>
  );
};

export default UserRoutes;



{/* <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/userChat/:user_id/:vendor_id" element={<UserChatLayout />} />
        <Route element={<BackAuth />}>
          <Route exact path="/login" element={<SignIn />} />
        </Route>
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/otpuser/:id" element={<UserOtp />} />
        <Route element={<ReqAuth />}>
          <Route exact path="/Therapist" element={<Counselor />} />
          <Route exact path="/blog" element={<UserBlog />} />
          <Route path="/user-booking/:id" element={<UserBookingLayout/>} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/booked-sessions" element={<Booked_sessions />} />
       
          <Route exact path="/counselor/:id" element={<TherapistProfile />} />
         
        </Route>
      </Routes> */}











      // {
      //   <>
      //   <Routes>
      //     <Route exact path="/" element={<Home />}></Route>
          
      //     <Route element={<BackAuth />}>
      //       <Route exact path="/login" element={<Login />} />
      //     </Route>
      //     <Route element={<BackAuth />}>
      //       <Route exact path="/signup" element={<Signup />}></Route>
      //     </Route>
      //     <Route element={<BackAuth />}>
      //       <Route exact path="/otp-verify" element={<Otp />}></Route>
      //     </Route>
      //     <Route element={<BackAuth />}>
      //       <Route exact path="/forgot-password" element={<Forgot />}></Route>
      //     </Route>
      //     <Route element={<BackAuth />}>
      //       <Route exact path="/reset-password" element={<PasswordReset />}></Route>
      //     </Route>
      //     <Route element={<BackAuth />}>
      //       <Route exact path="/oauth2/redirect" element={<OAuth2 />}></Route>
      //     </Route>
      //     <Route exact path="/videos" element={<Video />}></Route>
      //     {/* <Route exact path="/demo" element={ <Demo />}></Route> */}
  
      //     <Route exact path="/demo" element={
      //       <PrivateRoute
      //         path="/profile"
      //         element={<Demo />}
      //       />
      //     }
      //     ></Route>
  
      //     <Route exact path="/about" element={
      //       <React.Suspense>
      //         <LazyAbout />
      //       </React.Suspense>
      //     }></Route>
      //   </Routes>
  
        
      // </>
      // }


      // ===================
    //   <Route
    //   path="/login"
    //   element={
    //     useSelector((state) => state.auth.isLoggedIn) ? (
    //       <Navigate to="/" replace />
    //     ) : (
    //       <Login />
    //     )
    //   }
    // />