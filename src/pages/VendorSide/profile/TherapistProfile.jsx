import Footer from "../../../components/CommonComponents/footer/Footer"
import Navbar from "../../../components/VendorComponents/navbar/Navbar"
import Sidebar from "../../../components/VendorComponents/sidebar/Sidebar"
import TherapistProfileContent from './TherapistProfileContent'

const TherapistProfile = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-screen flex">
        <Sidebar className="min-h-screen"/> 
        <TherapistProfileContent />
      </div>

      <Footer />
    </>
  )
}

export default TherapistProfile