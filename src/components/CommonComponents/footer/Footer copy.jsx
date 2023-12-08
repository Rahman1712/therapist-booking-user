
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* Column 1 */}
        <div>
          <div className="mb-4">
            <h1 className="text-2xl font-bold">Your Logo</h1>
            <p>ICON Sapphire Space, Bani Park,<br />Jaipur 302016, India</p>
            <p>ICON hola@felicity.care</p>
            <p>ICON +916377327550</p>
          </div>
        </div>

        {/* Column 2 */}
        <div className="sm:col-span-2 md:col-span-1 grid grid-cols-2 gap-4">
          <div>
            <h2 className="text-lg font-semibold">Quick Links</h2>
            <ul>
              <li><a href="#">For Corporates</a></li>
              <li><a href="#">For Therapists</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">About us</a></li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Legal Stuff</h2>
            <ul>
              <li><a href="#">Disclaimer</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms Of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Column 3 */}
        <div>
          <p>We are here to make sure that you are always happy</p>
          <div className="flex mt-4">
            <input
              type="text"
              placeholder="Your email"
              className="p-2 border rounded-l focus:outline-none"
            />
            <button className="bg-blue-600 text-white py-2 px-4 rounded-r hover:bg-blue-700">Subscribe</button>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-8">
        <p className="text-center text-sm">
          If you are in a life-threatening situation – DO NOT use this site. Use these resources to get immediate help.<br />
          ©Felicity. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
