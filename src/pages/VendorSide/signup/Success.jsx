import { Link } from "react-router-dom";
import Footer from "../../../components/CommonComponents/footer/Footer";
import Navbar from "../../../components/VendorComponents/navbar/Navbar";

function SuccessPage() {
  return (
    <div>
      <Navbar />

      <div className="flex min-h-screen">
        <div className="w-1/2 bg-white">
          <div className="flex flex-shrink-0 md:mt-36 md:pl-20">
            <div className="flex flex-col justify-center">
              <div className="max-w-xl mb-6">
                <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
                  Terms and Conditions

                </h2>
                <p className="text-base text-gray-700 md:text-lg">
                  Welcome to MediCare! We are thrilled to have you join our platform as a therapist. Before you get started, please carefully review and accept the following terms and conditions:
                </p>
              </div>
              <div className="grid gap-5 row-gap-8 sm:grid-cols-2">
                <div className="bg-white border-l-4 shadow-sm border-deep-purple-accent-400">
                  <div className="h-full p-5 border border-l-0 rounded-r">
                    <h6 className="mb-2 font-semibold leading-5">
                      Eligibility:                </h6>
                    <p className="text-sm text-gray-900">
                      To become a therapist on MediCare, you must hold valid certifications and licenses required by your jurisdiction to practice as a therapist.

                    </p>
                  </div>
                </div>
                <div className="bg-white border-l-4 shadow-sm border-deep-purple-accent-400">
                  <div className="h-full p-5 border border-l-0 rounded-r">
                    <h6 className="mb-2 font-semibold leading-5">
                      Registration:

                    </h6>
                    <p className="text-sm text-gray-900">
                      You must provide accurate and up-to-date information during the registration process.
                      You are responsible for keeping your account information, including contact details, updated.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 bg-white p-20 ">
          <div className="w-96 h-60 md:mt-36 rounded-2xl  flex-row items-center justify-center space-x-5 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-sm px-5 py-2.5 text-center mr-2 mb-2">
            <p className="text-4xl pt-12 pl-5 text-white font-mono">
              Congratulations!
            </p>
            <p className="pt-6 pl-3 mb-4 text-white">
              Your registration has been completed. Our admin will verify it and
              respond to you soon.
            </p>
            <div className="pl-5">
              <Link to="/vendor/home">
                <button
                  type="button"
                  className="p-2.5 inline-flex items-center text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >
                  <span className="sr-only">Icon description</span>
                  Back to Home
                  <svg
                    className="w-4 h-4 pl-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default SuccessPage;
