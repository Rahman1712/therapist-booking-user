import  { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';

const TherapistDashboard = () => {
  const [totalBookings, setTotalBookings] = useState(0);
  const [completedBookings, setCompletedBookings] = useState(0);
  const [pendingBookings, setPendingBookings] = useState(0);
 
  useEffect(() => {
     // Fetch the booking data from the API or database and update the states accordingly
     // For example:
     setTotalBookings(10);
     setCompletedBookings(5);
     setPendingBookings(5);
  }, []);
 
  const TotalBookingsCard = ({ totalBookings }) => (
     <Card className="bg-white h-[200px] text-center flex justify-center items-center rounded-lg shadow-lg p-4 bg-gradient-to-r from-red-50 via-red-50 to-yellow-50 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-50 dark:focus:ring-red-400">
       <Card.Body>
         <Card.Title className="text-xl font-bold">Total Bookings</Card.Title>
         <Card.Text className="text-gray-700">{totalBookings}</Card.Text>
       </Card.Body>
     </Card>
  );
 
  const CompletedBookingsCard = ({ completedBookings }) => (
     <Card className="bg-white h-[200px] text-center flex justify-center items-center rounded-lg shadow-lg p-5 bg-gradient-to-r from-teal-50 to-lime-50 hover:bg-gradient-to-l hover:from-teal-50 hover:to-lime-50 focus:ring-4 focus:outline-none focus:ring-lime-50 dark:focus:ring-teal-700">
       <Card.Body>
         <Card.Title className="text-xl font-bold">Completed Bookings</Card.Title>
         <Card.Text className="text-gray-700">{completedBookings}</Card.Text>
       </Card.Body>
     </Card>
  );
 
  const PendingBookingsCard = ({ pendingBookings }) => (
     <Card className="bg-white  h-[200px] text-center flex justify-center items-center rounded-lg shadow-lg p-4 bg-gradient-to-r from-blue-50 via-blue-50 to-indigo-50 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-50 dark:focus:ring-blue-400">
       <Card.Body>
         <Card.Title className="text-xl font-bold">Pending Bookings</Card.Title>
         <Card.Text className="text-gray-700">{pendingBookings}</Card.Text>
       </Card.Body>
     </Card>
  );
 
  return (
     <div className="container mx-auto px-4 mt-10">
       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         <TotalBookingsCard totalBookings={totalBookings} />
         <CompletedBookingsCard completedBookings={completedBookings} />
         <PendingBookingsCard pendingBookings={pendingBookings} />
       </div>
     </div>
  );
};

export default TherapistDashboard;
