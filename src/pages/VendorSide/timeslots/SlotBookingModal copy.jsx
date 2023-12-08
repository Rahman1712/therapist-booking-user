/* eslint-disable react/prop-types */
import { DateCalendar, DatePicker, DesktopDatePicker, StaticDatePicker, StaticDateTimePicker, StaticTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineClose } from "react-icons/ai";
import { therapistsAxiosApi } from "../../../config/axiosConfig";
import { THERAPIST_PUBLIC_API, THERAPIST_SLOTS_API } from "../../../constants";
import Select from 'react-select'
import times from "../../../constants/times.json";

export function SlotBookingModal({ therapistsSlotsList, therapistId }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toJSON().slice(0, 10));
  // const [alreadySelectedTimes, setAlreadySelectedTimes] = useState([]);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [timesData , setTimesData] = useState([]);

  useEffect(() => {
    const filteredTimes = times.filter((time) => {
      console.log(therapistsSlotsList+"=========");
      const isAvailable = therapistsSlotsList.some((slot) => {
        return (
          slot.date === selectedDate &&
          !slot.time_slots.some((selectedSlot) =>
            selectedSlot.time === time.value && selectedSlot.isBooked
          )
        );
      });

      return !isAvailable;
    });

    setTimesData(filteredTimes);
  }, [selectedDate])

  const handleOpen = () => setShowModal(true);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedDate("");
  };

  const handleTimesSelectChange = (selectedOptions) => {
    const selectedTimesValues = selectedOptions.map((option) => option.value);
    setSelectedTimes(selectedTimesValues);
  }

  const createTherapistAvailabilitySlot = async () => {
    const response = await therapistsAxiosApi.post(THERAPIST_SLOTS_API + '/create', {
      therapistId,
      date: SelectedDate,
      selectedTimes: null,
    });


  }

  const handleCreateSlots = () => {
    if (SelectedDate && SelectedTime) {
      const newSlot = {
        id: Date.now(),
        date: SelectedDate,
        time: SelectedTime,
        is_available: true,
      };

      addSlotToList(newSlot);

      // Add any other logic you need for slot creation

      toast.success("Successfully created slot");
      handleClose();
    } else {
      toast.error("Please select a date and time.");
    }
  };

  const handleBackdropClick = (e) => {
    // Prevent the backdrop click from closing the modal
    e.stopPropagation();
  };

  const generateTimesArray = () => {
    const times = [];
    let startTime = new Date();
    startTime.setHours(9, 0, 0, 0); // Set start time to 9:00 AM

    const endTime = new Date();
    endTime.setHours(18, 0, 0, 0); // Set end time to 6:00 PM

    while (startTime <= endTime) {
      const label = startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const value = label.replace(':', ':00:00');
      times.push({ label, value });
      startTime.setMinutes(startTime.getMinutes() + 30); // Increment by 30 minutes
    }

    return times;
  };

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
                {/* <StaticDateTimePicker defaultValue={dayjs(new Date())} /> */}
                {/* <StaticDatePicker defaultValue={dayjs(new Date())} /> */}
                {/* <DatePicker format="YYYY-MM-DD" defaultValue={dayjs(new Date())}/> */}
                <StaticDatePicker format="YYYY-MM-DD" minDate={dayjs(new Date())} defaultValue={dayjs(new Date())}/>
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
