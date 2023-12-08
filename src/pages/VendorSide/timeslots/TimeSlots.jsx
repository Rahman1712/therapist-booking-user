import Footer from "../../../components/CommonComponents/footer/Footer";
import Navbar from "../../../components/VendorComponents/navbar/Navbar";
import Sidebar from "../../../components/VendorComponents/sidebar/Sidebar";
import SlotTable from "./SlotTable";

const BookingManagment = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-screen flex">
        <Sidebar className="min-h-screen"/> 
        <SlotTable />
      </div>

      {/* <Footer /> */}
    </>
  );
};

export default BookingManagment;
