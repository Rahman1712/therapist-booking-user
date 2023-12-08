import React from 'react';

const AboutUs = () => {
  return (
    <section className="bg-cover bg-center bg-about-bg bg-cyan-700 dark:bg-blue-900 text-white">
      <div className="container mx-auto py-12 relative">

        <div className="flex items-center">
          <div className="w-1/2">
            <img src="/images/home/appointment.png" alt="About Us Image" />
          </div>
          <div className="w-1/2 text-center">
            <h2 className="text-3xl">Medi Care with Top Professionals and In Budget.</h2>
            <p className="mt-4">We've built a healthcare system that puts your needs first. For us, there is nothing more important than the health of you and your loved ones.</p>
            <button className="bg-white text-gray-700 rounded-full px-6 py-2 mt-6 hover:bg-gray-200 hover:text-gray-800">Learn More</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
