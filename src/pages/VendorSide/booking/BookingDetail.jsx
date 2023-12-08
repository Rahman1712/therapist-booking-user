import Navbar from '../../../components/VendorComponents/navbar/Navbar'
import Footer from '../../../components/CommonComponents/footer/Footer'
import Sidebar from '../../../components/VendorComponents/sidebar/Sidebar'
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