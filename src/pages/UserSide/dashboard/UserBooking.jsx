import Navbar from '../../../components/UserComponents/navbar/Navbar'
import Footer from '../../../components/CommonComponents/footer/Footer'
import Sidebar from '../../../components/UserComponents/sidebar/Sidebar'
import UserBookingContent from './UserBookingContent'

const UserBooking = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-screen flex">
        <Sidebar className="min-h-screen"/> 
        <UserBookingContent /> 
      </div>

      <Footer />
    </>
  )
}

export default UserBooking