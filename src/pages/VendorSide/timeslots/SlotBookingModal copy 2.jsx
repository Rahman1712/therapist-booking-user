/* eslint-disable react/prop-types */
import { DateCalendar, DatePicker, DesktopDatePicker, MobileDatePicker, StaticDatePicker, StaticDateTimePicker, StaticTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineClose } from "react-icons/ai";
import { therapistsAxiosApi } from "../../../config/axiosConfig";
import { THERAPIST_PUBLIC_API, THERAPIST_SLOTS_API } from "../../../constants";
import Select from 'react-select'
import times from "../../../constants/times.json";
import { useSelector } from "react-redux";

export function SlotBookingModal({ slots, therapistId }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toJSON().slice(0, 10));
  const [alreadySelectedTimes, setAlreadySelectedTimes] = useState([]);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [timesData, setTimesData] = useState([]);

  // Use slots here as needed
  useEffect(() => {
    // You can perform tasks based on the slots data
    console.log(slots);
    // For example, call a function to get times for a selected date using the slots data
    getAllTimesForDate(slots, selectedDate);
  }, [selectedDate, slots]);

  const handleOpen = () => setShowModal(true);

  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  // };

  const handleClose = () => {
    setShowModal(false);
    setSelectedDate("");
  };

  const handleTimesSelectChange = (selectedOptions) => {
    const selectedTimesValues = selectedOptions.map((option) => option.value);
    setSelectedTimes(selectedTimesValues);
  }

  async function getAllTimesForDate(slots, selectedDate) {
    console.log("ddddddddd");
    // Filter slots for the selected date
    const slotsForSelectedDate = slots
      .filter((slot) => slot.date === selectedDate);

  console.log(slotsForSelectedDate);
  
    // Extract all times from the filtered slots
    const allTimesForSelectedDate = slotsForSelectedDate
      .reduce((times, slot) => {
        // Extract all time slots
        const selectedTimes = slot.time_slots.map((timeSlot) => timeSlot.time);
        // Concatenate the selected times to the accumulator
        return times.concat(selectedTimes);
      }, []);
  
    console.log("All times for selected date:", allTimesForSelectedDate);
  
    // Extract available times by filtering out already selected times
    const availableTimes = times.filter((time) =>
      !allTimesForSelectedDate.includes(time.value)
    );
  
    console.log("Available times:", availableTimes);
  
    // Update the state with already selected and available times
    await setAlreadySelectedTimes(allTimesForSelectedDate);
    await setTimesData(availableTimes);
  }
  

  const response = await therapistsAxiosApi.put(`/api/slots/${id}/add-times`, {
    additionalTimes,
  });
  // const createTherapistAvailabilitySlot = async () => {
  //   const response = await therapistsAxiosApi.post(THERAPIST_SLOTS_API + '/create', {
  //     therapistId,
  //     date: SelectedDate,
  //     selectedTimes: null,
  //   });
  // }
  const createTherapistAvailabilitySlot = async () => {
    const response = await therapistsAxiosApi.post(THERAPIST_SLOTS_API + '/create', {
      therapistId,
      date: SelectedDate,
      selectedTimes: null,
    });
  }

  const handleCreateSlots = () => {
  //   if (SelectedDate && SelectedTime) {
  //     const newSlot = {
  //       id: Date.now(),
  //       date: SelectedDate,
  //       time: SelectedTime,
  //       is_available: true,
  //     };

  //     addSlotToList(newSlot);

  //     // Add any other logic you need for slot creation

  //     toast.success("Successfully created slot");
  //     handleClose();
  //   } else {
  //     toast.error("Please select a date and time.");
  //   }
  };

  const handleBackdropClick = (e) => {
    e.stopPropagation(); // Prevent the backdrop click from closing the modal
  };

  const handleDateChange = (date) => {
    setSelectedDate(dayjs(date.$d).format('YYYY-MM-DD'));
    console.log(dayjs(date.$d).format('YYYY-MM-DD'));
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <button
          className="px-6 py-3 text-purple-100 bg-[rgb(74,55,84)] rounded-md"
          onClick={handleOpen}
        >
          Create Slot
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto" onClick={handleBackdropClick}>
          <div className="fixed inset-0 w-full h-full bg-black opacity-40"></div>
          <div className="flex items-center min-h-screen px-4 py-8">
            <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
              <div className="flex justify-between items-center mb-4">
                {/* <h1 className="text-2xl text-center font-semibold">Create Slots</h1> */}
                <button
                  onClick={handleClose}
                  className="px-2 py-1 bg-red-100 rounded-lg"
                >
                  <AiOutlineClose />
                </button>
              </div>


              <div className="mb-4">
                {/* <StaticDatePicker format="YYYY-MM-DD" minDate={dayjs(new Date())} defaultValue={dayjs(new Date())} onChange={(e) => console.log(e)}/> */}
                {/* <MobileDatePicker format="YYYY-MM-DD" minDate={dayjs(new Date())} defaultValue={dayjs(new Date())} onChange={(e) => console.log(e)} /> */}
                {/* <DatePicker format="YYYY-MM-DD" minDate={dayjs(new Date())} defaultValue={dayjs(new Date())} onChange={handleDateChange}  /> */}
                <StaticDatePicker format="YYYY-MM-DD" minDate={dayjs(new Date())} defaultValue={dayjs(new Date())} onChange={handleDateChange}  />

              </div>

              <div className="mb-4">
                <Select
                  isMulti
                  name="selectedTimes"
                  options={timesData}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={handleTimesSelectChange}
                />
              </div>

              <div className="mb-4">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                  onClick={handleCreateSlots}
                >
                  Create Slot
                </button>
              </div>
            </div>
          </div>
          <Toaster />
        </div>
      )}
    </>
  );
}
