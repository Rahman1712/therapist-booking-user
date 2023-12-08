/* eslint-disable react/prop-types */
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineClose } from "react-icons/ai";
import { therapistsAxiosApi } from "../../../config/axiosConfig";
import { THERAPIST_SLOTS_API } from "../../../constants";
import Select from 'react-select'
import times from "../../../constants/times.json";
import { useSelector } from "react-redux";
import { MdOutlineTimerOff } from "react-icons/md";

export function SlotBookingModal({ slots, therapistId, refreshSlotTable }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toJSON().slice(0, 10));
  const [alreadySelectedTimes, setAlreadySelectedTimes] = useState([]);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [slotId, setSlotId] = useState(null);
  const [timesData, setTimesData] = useState([]);

  const { id } = useSelector((state) => state.auth);

  useEffect(() => {
    getAllTimesForDate(slots, selectedDate);
  }, [selectedDate, slots]);

  const handleOpen = () => setShowModal(true);

  const handleDateChange = (date) => {
    setSelectedDate(dayjs(date.$d).format('YYYY-MM-DD'));
  }

  const handleClose = () => {
    setShowModal(false);
    setTimesData([]);
    setAlreadySelectedTimes([]);
    setSelectedTimes([]);
    setSelectedDate(new Date().toJSON().slice(0, 10));
  };

  const handleTimesSelectChange = (selectedOptions) => {
    const selectedTimesValues = selectedOptions.map((option) => option.value);
    setSelectedTimes(selectedTimesValues);
  }

  const getAllTimesForDate = async (slots, selectedDate) => {
    // Find the slot for the selected date
    const slotForSelectedDate = slots.find((slot) => slot.date === selectedDate);

    console.log("=========" , slotForSelectedDate);

    if (slotForSelectedDate) {
      // Extract all times from the found slot
      const allTimesForSelectedDate = slotForSelectedDate.time_slots.map((timeSlot) => timeSlot.time);

      // Extract available times by filtering out already selected times
      const availableTimes = times.filter((time) => !allTimesForSelectedDate.includes(time.value));

      // Update the state with already selected and available times
      await setAlreadySelectedTimes(allTimesForSelectedDate);
      await setTimesData(availableTimes);
      await setSlotId(slotForSelectedDate.id);
    } else {
      await setAlreadySelectedTimes([]);
      await setTimesData(times);
      await setSlotId(null);
    }
  }

  const createSlots = async () => {
    if (selectedTimes.length === 0) {
      popupToast('warning', 'Selected times are empty', 1000)
      return;
    }

    const currentDate = new Date();

    const selectedDateObj = new Date(selectedDate);

    if (selectedDateObj <= currentDate) {
      popupToast('error', 'Selected date is not in the future', 1000)
      return;
    }

    for (const selectedTime of selectedTimes) {
      const selectedTimeObj = new Date(`${selectedDate}T${selectedTime}`);

      if (selectedTimeObj <= currentDate) {
        popupToast('error', 'Selected time is not in the future', 1000)
        return;
      }
    }

    try {
      const response = await therapistsAxiosApi.post(THERAPIST_SLOTS_API + '/create', selectedTimes, {
        params: {
          therapistId: therapistId,
          date: selectedDate,
        },
      });

      const time_slots = response.data.time_slots;
      console.log(time_slots);
      popupToast('success', 'Created availability slot', 2000);
      handleClose();
      refreshSlotTable();
    } catch (error) {
      popupToast('error', 'Error creating therapist availability slot', 2000)
      throw error;
    }
  }

  const addTimesToSlot = async () => {
    if (selectedTimes.length === 0) {
      popupToast('warning', 'Selected times are empty', 1000)
      return;
    }

    const currentDate = new Date();

    const selectedDateObj = new Date(selectedDate);

    if (selectedDateObj <= currentDate) {
      popupToast('error', 'Selected date is not in the future', 1000)
      return;
    }

    for (const selectedTime of selectedTimes) {
      const selectedTimeObj = new Date(`${selectedDate}T${selectedTime}`);

      if (selectedTimeObj <= currentDate) {
        popupToast('error', 'Selected time is not in the future', 1000)
        return;
      }
    }

    try {
      const additionalTimes = selectedTimes;
      const response = await therapistsAxiosApi.put(THERAPIST_SLOTS_API + `/${slotId}/add-times`, additionalTimes);

      console.log(response.data);
      popupToast('success', 'Time added to availability slot', 2000);
      handleClose();
      refreshSlotTable();
    } catch (error) {
      popupToast('error', 'Error creating therapist availability slot', 2000)
      throw error;
    }
  }

  const popupToast = (toastType, toastMessage, duration = 1000) => {
    switch (toastType) {
      case "success":
        toast.success(toastMessage, { position: "bottom-center" });
        break;
      case "error":
        toast.error(toastMessage, { position: "bottom-center", duration: duration });
        break;
      case "warning":
        toast.error(toastMessage, { position: "bottom-center", duration: duration, style: { background: '#FFC107', color: 'red' }, icon: '⚠️' });
        break;
      default:
        toast.error("Error occurred...!");
        break;
    }
  };

  const handleBackdropClick = (e) => {
    e.stopPropagation(); // Prevent the backdrop click from closing the modal
  };

  function convertToAMPM(time24) {
    // Split the time into hours and minutes
    const [hours, minutes] = time24.split(':');

    // Determine whether it's AM or PM
    const period = hours >= 12 ? 'PM' : 'AM';

    // Convert hours to 12-hour format
    const hours12 = (hours % 12) || 12; // 0 should become 12 in 12-hour format

    // Calculate the end time in 12-hour format
    const endHours12 = ((hours12 + 1) % 12) || 12;

    // Create the AM/PM formatted time
    const time12 = `${hours12}.${minutes} ${period} to ${endHours12}.${minutes} ${period}`;

    return time12;
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <button
          className=" text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          onClick={handleOpen}
        >
          Create Slot
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto" onClick={handleBackdropClick}>
          <div className="fixed inset-0 w-full h-full bg-black opacity-40"></div>
          <div className="flex items-center min-h-screen px-4 py-8">
            <div className="relative w-full max-w-2xl p-4 mx-auto bg-white rounded-md shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl text-center font-semibold">Create Slots</h1>
                <button
                  onClick={handleClose}
                  className="px-2 py-1 bg-red-100  text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm text-center mr-2 mb-2"
                >
                  <AiOutlineClose />
                </button>
              </div>

              <div className="flex ">
                <div className="left-col bg-slate-100 rounded-md mx-2 p-2" style={{ flex: '1' }}>
                  {alreadySelectedTimes.length ?
                    <>
                      <p className="text-gray-600 underline underline-offset-2 font-bold">Selected Times</p>
                      {alreadySelectedTimes.map((time, index) => (
                        <div key={index}>
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{convertToAMPM(time)}</span>
                        </div>
                      ))
                      }
                    </>

                    :
                    <div className="flex flex-col justify-center items-center">
                      <MdOutlineTimerOff />
                      <span className="text-gray-500">no time slots</span>
                    </div>
                  }
                </div>

                <div className="right-col" style={{ flex: '1' }}>
                  {/* Date and time selector on the right */}
                  <div className="mb-4">
                    <div className="static-date-picker-container">
                      <DatePicker
                        format="YYYY-MM-DD"
                        minDate={dayjs(new Date())}
                        defaultValue={dayjs(new Date())}
                        onChange={handleDateChange}
                      />
                    </div>
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
                </div>
              </div>

              <div className="mb-4">
                {alreadySelectedTimes.length ?
                  <button type="button" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 m-2" onClick={addTimesToSlot}>Add</button>
                  :
                  <button type="button" className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 m-2" onClick={createSlots}>
                    Create Slot
                  </button>
                }

              </div>
            </div>
          </div>
          <Toaster />
        </div>
      )}
    </>

  );
}
