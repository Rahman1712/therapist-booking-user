import Navbar from '../../../components/UserComponents/navbar/Navbar'
import Footer from '../../../components/CommonComponents/footer/Footer'
import Sidebar from '../../../components/UserComponents/sidebar/Sidebar'
import UserDashboardContent from './UserDashboardContent'

const UserDashboard = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-screen flex">
        <Sidebar className="min-h-screen"/> 
        <UserDashboardContent /> 
      </div>

      <Footer />
    </>
  )
}

export default UserDashboard