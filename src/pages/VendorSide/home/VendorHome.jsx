import Footer from "../../../components/CommonComponents/footer/Footer"
import Navbar from "../../../components/VendorComponents/navbar/Navbar"
import Sidebar from "../../../components/VendorComponents/sidebar/Sidebar"
import MainContent from './MainContent'
import TherapistDashboard from "./TherapistDashboard"

const VendorHome = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-screen flex">
        <Sidebar className="min-h-screen"/> 
        {/* <MainContent />  */}
        <TherapistDashboard /> 
      </div>

      <Footer />
    </>
  )
}

export default VendorHome