import Navbar from '../../../components/UserComponents/navbar/Navbar'
import Footer from '../../../components/CommonComponents/footer/Footer'
import Sidebar from '../../../components/UserComponents/sidebar/Sidebar'
import UserProfileEditContent from './UserProfileEditContent'

const UserProfileEdit = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-screen flex">
        <Sidebar className="min-h-screen"/> 
        <UserProfileEditContent /> 
      </div>

      <Footer />
    </>
  )
}

export default UserProfileEdit