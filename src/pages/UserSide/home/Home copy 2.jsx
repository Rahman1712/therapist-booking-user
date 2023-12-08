import Footer from "../../../components/CommonComponents/footer/Footer";
import Navbar from "../../../components/UserComponents/navbar/Navbar";

function Home() {
  return (
    <>
      <Navbar />

      <div>

        {/* Hero Section */}
        <section className="bg-gray-800 text-white dark:bg-white dark:text-dark py-16">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl font-bold">Welcome to ZenithCare</h1>
            <p className="text-lg mt-4">Your path to well-being and healing</p>
            <a href="#" className="bg-blue-600 text-white px-4 py-2 rounded-full inline-block mt-6 hover:bg-blue-700">Learn More</a>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16">
          <div className="container mx-auto flex justify-between items-center">
            <div className="w-1/2">
              <h2 className="text-2xl font-bold mb-4">About Us</h2>
              <p className="text-gray-600">
                We are a team of dedicated therapists and counselors committed to helping you achieve mental and emotional well-being.
              </p>
            </div>
            <div className="w-1/2">
              {/* Add an image or illustration here */}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="bg-gray-100 py-16">
          <div className="container mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Our Services</h2>
            {/* Add cards or descriptions of your services here */}
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16">
          <div className="container mx-auto flex justify-between items-center">
            <div className="w-1/2">
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-gray-600">
                Have questions or need to schedule an appointment? Feel free to reach out to us.
              </p>
            </div>
            <div className="w-1/2">
              {/* Add a contact form or contact information here */}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}

export default Home;