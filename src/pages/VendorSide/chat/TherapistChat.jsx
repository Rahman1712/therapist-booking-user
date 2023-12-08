import Navbar from '../../../components/VendorComponents/navbar/Navbar'
import Footer from '../../../components/CommonComponents/footer/Footer'
import Sidebar from '../../../components/VendorComponents/sidebar/Sidebar'
import TherapistChatContent from './TherapistChatContent'

const TherapistChat = () => {
  return (
    <>
      <Navbar />

      <div className="h-screennn flex">
        <Sidebar className="min-h-screennn"/> 
        <TherapistChatContent /> 
      </div>

      <Footer />
    </>
  )
}

export default TherapistChat;