import React from 'react';
import { useNavigate } from 'react-router';

const Header = () => {
  const navigate = useNavigate();
  
  return (
    <section className="bg-cover bg-center bg-header-bg-img text-white dark:bg-blue-950">
      <div className="container mx-auto py-12">
        <div className="flex items-center justify-between">
          <div className="w-1/2">
            <h1 className="text-4xl text-cyan-950">We're <strong>determined</strong> for <br />your <strong>better</strong> life.</h1>
            <p className="mt-2 text-xl text-cyan-800">You can get the care you need 24/7 – be it online or in person. You will be treated by caring specialist doctors.</p>
            <button className="bg-cyan-900 text-white rounded-full px-6 py-4 mt-6 font-bold hover:bg-white hover:text-blue-900" onClick={() => navigate("/therapists")}>Make Appointment</button>
          </div>
          <div className="w-1/2">
            <img src="/images/gallery/hero.png" alt="Doctor Image" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
