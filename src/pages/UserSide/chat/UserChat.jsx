import Navbar from '../../../components/UserComponents/navbar/Navbar'
import Footer from '../../../components/CommonComponents/footer/Footer'
import Sidebar from '../../../components/UserComponents/sidebar/Sidebar'
import UserChatContent from './UserChatContent'

const UserChat = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-screenn flex">
        <Sidebar className="min-h-screennn"/> 
        <UserChatContent /> 
      </div>

      <Footer />
    </>
  )
}

export default UserChat;