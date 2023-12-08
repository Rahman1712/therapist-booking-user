import React from 'react';

const Blogs = () => {
  // Example data for recent blogs
  const blogs = [
    { title: 'Blog Title 1', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    // Add more blog entries as needed
  ];

  return (
    <section className="bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto py-8">
        <h2 className="text-3xl mb-4">RECENT BLOGS</h2>
        {/* Implement a grid or list for recent blogs */}
      </div>
    </section>
  );
};

export default Blogs;
