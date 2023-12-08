import Footer from "../../../components/CommonComponents/footer/Footer";
import Navbar from "../../../components/VendorComponents/navbar/Navbar";
import Sidebar from "../../../components/VendorComponents/sidebar/Sidebar";
import BookingManagment from "./BookingManagment";

const Bookings = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-screen flex">
        <Sidebar className="min-h-screen"/> 
        <BookingManagment />
      </div>

      <Footer />
    </>
  );
};

export default Bookings;
