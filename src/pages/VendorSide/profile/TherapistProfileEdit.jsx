import Footer from "../../../components/CommonComponents/footer/Footer"
import Navbar from "../../../components/VendorComponents/navbar/Navbar"
import Sidebar from "../../../components/VendorComponents/sidebar/Sidebar"
import TherapistProfileEditContent from './TherapistProfileEditContent'

const TherapistProfileEdit = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-screen flex">
        <Sidebar className="min-h-screen"/> 
        <TherapistProfileEditContent />
      </div>

      <Footer />
    </>
  )
}

export default TherapistProfileEdit;