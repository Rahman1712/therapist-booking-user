import React from 'react';

const UserProfileContent = () => {
 return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-4 bg-white shadow rounded">
        <h2 className="text-xl font-bold mb-2">Username</h2>
        <p>User Details</p>
      </div>
      <div className="p-4 bg-white shadow rounded">
        <h2 className="text-xl font-bold mb-2">Full Name</h2>
        <p>User Details</p>
      </div>
      <div className="p-4 bg-white shadow rounded">
        <h2 className="text-xl font-bold mb-2">Email</h2>
        <p>User Details</p>
      </div>
      <div className="p-4 bg-white shadow rounded">
        <h2 className="text-xl font-bold mb-2">Mobile</h2>
        <p>User Details</p>
      </div>
      <div className="p-4 bg-white shadow rounded">
        <h2 className="text-xl font-bold mb-2">Role</h2>
        <p>User Details</p>
      </div>
      <div className="p-4 bg-white shadow rounded">
        <h2 className="text-xl font-bold mb-2">Account Status</h2>
        <p>User Details</p>
      </div>
    </div>
 );
};

export default UserProfileContent;

