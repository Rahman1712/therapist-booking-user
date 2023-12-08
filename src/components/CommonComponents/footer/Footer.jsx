import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Footer = () => {

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <>
      {isLoggedIn ?

        <footer className="bg-gray-100 text-center text-lg-start text-gray-500">
          <section className="flex justify-center justify-betweend p-4 border-b border-gray-300">
            <div className="me-5 hidden lg:block">
              <span>Get connected with us on social networks:</span>
            </div>

            <div>
              <a href="#" className="me-4 text-gray-500 hover:text-blue-500">
                Facebook
              </a>
              <a href="#" className="me-4 text-gray-500 hover:text-blue-500">
                Twitter
              </a>
              <a href="#" className="me-4 text-gray-500 hover:text-blue-500">
                Google
              </a>
              <a href="#" className="me-4 text-gray-500 hover:text-blue-500">
                Instagram
              </a>
              <a href="#" className="me-4 text-gray-500 hover:text-blue-500">
                LinkedIn
              </a>
              <a href="#" className="me-4 text-gray-500 hover:text-blue-500">
                Github
              </a>
            </div>
          </section>

          <section>
            <div className="container text-center text-md-start mt-5">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-3">
                <div className="mb-4">
                  <h6 className="text-xl font-semibold mb-4">
                    <Link to="/" className="text-blue-950 font-extrabold text-[25px]">
                      medicare 💙
                    </Link>
                  </h6>
                  <p>
                    Wellness Starts Here 💖
                  </p>
                </div>

                <div className="mb-4">
                  <h6 className="text-xl font-semibold mb-4">Links</h6>
                  <p>
                    <a href="#">Dashboard</a>
                  </p>
                  <p>
                    <a href="#">Profile</a>
                  </p>
                  <p>
                    <a href="#">Vue</a>
                  </p>
                  <p>
                    <a href="#">Laravel</a>
                  </p>
                </div>

                <div className="mb-4">
                  <h6 className="text-xl font-semibold mb-4">Useful links</h6>
                  <p>
                    <a href="#">Profile</a>
                  </p>
                  <p>
                    <a href="#">Settings</a>
                  </p>
                  <p>
                    <a href="#">Help</a>
                  </p>
                </div>

                <div className="mb-4">
                  <h6 className="text-xl font-semibold mb-4">Contact</h6>
                  <p>
                    <i className="me-2">Address</i>
                    Calicut, Kerala, India
                  </p>
                  <p>
                    <i className="me-3">Email</i>
                    info@medicare.com
                  </p>
                  <p>
                    <i className="me-3">Phone</i> + 01 234 567 88
                  </p>
                  <p>
                    <i className="me-3">Fax</i> + 01 234 567 89
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div className="text-center py-4 bg-opacity-25" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
            © 2022 Copyright:
            <a className="text-blue-500 font-semibold mx-1" href="https://medicare.com/">
              medicare.com
            </a>
          </div>
        </footer>

        :

        <footer className="bg-gray-100">
          <div className="container mx-auto py-6">
            <div className="text-center text-gray-500">
              <div className="flex flex-col items-center sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-4 sm:mb-0">
                  <Link to="/" className="text-blue-950 font-extrabold text-[25px]">
                    medicare 💙
                  </Link>
                </div>
                <div className="text-center">
                  &copy; 2022 by medicare&trade;
                </div>
              </div>
            </div>
          </div>
        </footer>
      }
    </>


  );
};

export default Footer;
