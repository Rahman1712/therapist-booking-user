// FilterOptions.js
import { useState } from 'react';

const FilterOptions = () => {

  const [showSpecializations, setShowSpecializations] = useState(false);
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [showDates, setShowDates] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);

  const dates = ['2023-10-30', '2023-11-01', '2023-11-05', '2023-11-10'];

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setShowDates(false);

    const timeSlotsForDate = getTimeSlotsForDate(date);
    setSelectedTimeSlots(timeSlotsForDate);
  };

  const getTimeSlotsForDate = (date) => {
    // Replace this with actual logic to fetch time slots for the selected date.
    // For now, we'll use static data.
    if (date === '2023-10-30') {
      return ['09:00 AM', '10:30 AM', '02:00 PM'];
    } else if (date === '2023-11-01') {
      return ['11:00 AM', '03:30 PM', '05:00 PM'];
    } else {
      return [];
    }
  };

  const specializations = ['Psychologist', 'Marriage Counselor', 'Therapist', 'Social Worker'];

  const handleSpecializationSelect = (specialization) => {
    setSelectedSpecialization(specialization);
    setShowSpecializations(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Filter</h2>
      </div>
      <div className="flex flex-wrap items-center space-y-2 space-x-2">
        
        <div className="relative">
          <label htmlFor="specializations" className="block text-gray-700 text-sm font-semibold">
            Specializations
          </label>
          <div className="relative">
            <select
              id="specializations"
              className="p-2 border rounded w-40 cursor-pointer"
              onClick={() => setShowSpecializations(!showSpecializations)}
            >
              <option value="">{selectedSpecialization || 'Select Specialization'}</option>
            </select>
            {showSpecializations && (
              <div className="absolute z-10 mt-2 bg-white border rounded p-2 shadow-lg">
                {specializations.map((specialization, index) => (
                  <div
                    key={index}
                    onClick={() => handleSpecializationSelect(specialization)}
                    className="cursor-pointer hover:bg-blue-100 p-1 rounded"
                  >
                    {specialization}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="relative">
          <label htmlFor="dates" className="block text-gray-700 text-sm font-semibold">
            Date
          </label>
          <div className="relative">
            <select
              id="dates"
              className="p-2 border rounded w-40 cursor-pointer"
              onClick={() => setShowDates(!showDates)}
            >
              <option value="">{selectedDate || 'Select Date'}</option>
            </select>
            {showDates && (
              <div className="absolute z-10 mt-2 bg-white border rounded p-2 shadow-lg">
                {dates.map((date, index) => (
                  <div
                    key={index}
                    onClick={() => handleDateSelect(date)}
                    className="cursor-pointer hover:bg-blue-100 p-1 rounded"
                  >
                    {date}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="relative">
          <label htmlFor="timeSlots" className="block text-gray-700 text-sm font-semibold">
            Time Slots
          </label>
          <select
            id="timeSlots"
            className="p-2 border rounded w-40"
          >
            {selectedTimeSlots.map((timeSlot, index) => (
              <option key={index} value={timeSlot}>
                {timeSlot}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <label htmlFor="nameSearch" className="block text-gray-700 text-sm font-semibold">
            Search by name
          </label>
          <input
            type="text"
            id="nameSearch"
            placeholder="Search by name"
            className="p-2 border rounded w-50"
          />
        </div>

      </div>
    </div>
  );
};

export default FilterOptions;


{/* <div className="container mx-auto p-4">
<div className="flex flex-wrap items-center space-y-2 space-x-2">
  <select className="p-2 border rounded">
    * Specializations *
  </select>
  <input type="text" placeholder="Search by name or..." className="p-2 border rounded" />
  <select className="p-2 border rounded">
    * Date dropdown *
  </select>
  <select className="p-2 border rounded">
    * Time slots dropdown *
  </select>
</div>
</div> */}