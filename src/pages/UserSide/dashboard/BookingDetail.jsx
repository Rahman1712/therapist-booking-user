import Navbar from '../../../components/UserComponents/navbar/Navbar'
import Footer from '../../../components/CommonComponents/footer/Footer'
import Sidebar from '../../../components/UserComponents/sidebar/Sidebar'
import BookingDetailView from './BookingDetailView'

const BookingDetail = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-screen flex">
        <Sidebar className="min-h-screen"/> 
        <BookingDetailView /> 
      </div>

      <Footer />
    </>
  )
}

export default BookingDetail