import Footer from "../../../components/CommonComponents/footer/Footer";
import Navbar from "../../../components/UserComponents/navbar/Navbar";
import Categories from "./Categories";
import Header from "./Header";
import AboutUs from "./AboutUs";
import Doctors from "./Doctors"; 
import Testimonials from "./Testimonials"; 
import Blogs from "./Blogs"; 

function Home() {
  return (
    <>
      <Navbar />
      <Header />
      <Categories />
      <AboutUs />
      <Doctors />
      <Testimonials />
      <Blogs />
      <Footer />
    </>
  );
}

export default Home;