import Navbar from '../../../components/UserComponents/navbar/Navbar'
import Footer from '../../../components/CommonComponents/footer/Footer'
import Sidebar from '../../../components/UserComponents/sidebar/Sidebar'
import UserProfileContent from './UserProfileContent'

const UserProfile = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-screen flex">
        <Sidebar className="min-h-screen"/> 
        <UserProfileContent /> 
      </div>

      <Footer />
    </>
  )
}

export default UserProfile