import { useState, useEffect } from "react";
import { SlotBookingModal } from "./SlotBookingModal";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import { therapistsAxiosApi } from "../../../config/axiosConfig";
import { THERAPIST_PUBLIC_API, THERAPIST_SLOTS_API } from '../../../constants';
import { AiFillDelete } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";

const SlotTable = () => {
  const { id } = useSelector((state) => state.auth);
  const [refresh, setRefresh] = useState(false);

  const [slots, setSlots] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortField, setSortField] = useState("id");
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const slotsPerPage = 5;


  useEffect(() => {
    therapistsAxiosApi.get(THERAPIST_PUBLIC_API + "/therapist/" + id).then((response) => {
      setSlots(response.data)
    })
  }, [id, refresh]);

  const deleteTimesInSlotFunction = async (time_slots_length, slotId, time) => {
    console.log(time_slots_length);
    if (time_slots_length > 1) {
      deleteTimesInSlot(slotId, time);
    } else {
      deleteTimeSlot(slotId);
    }
  }

  const deleteTimeSlot = async (slotId) => {
    try {
      const response = await therapistsAxiosApi.delete(THERAPIST_SLOTS_API + `/${slotId}/delete`);

      console.log(response.data);
      popupToast('success', 'Time slot deleted successfully', 2000)
      refreshSlotTable();
    } catch (error) {
      popupToast('error', 'Error occurred on deletion', 1000)
    }
  }
  const deleteTimesInSlot = async (slotId, time) => {
    const timesToRemove = [time];
    try {
      const response = await therapistsAxiosApi.put(THERAPIST_SLOTS_API + `/${slotId}/remove-times`, timesToRemove);

      console.log(response.data);
      popupToast('success', 'Time slot deleted successfully', 2000)
      refreshSlotTable();
    } catch (error) {
      popupToast('error', 'Error occurred on deletion', 1000)
    }
  }


  const refreshSlotTable = () => {
    setRefresh(!refresh);
  };

  const toggleSortOrder = (sortField) => {
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
    setSortField(sortField);
  };

  const sortedSlots = slots
    .filter((slot) => slot.date.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === "asc") {
        switch (sortField) {
          case "id": return a.id - b.id;
          case "date": return new Date(a.date) - new Date(b.date);
          default: return a.id - b.id;
        }

      } else {
        switch (sortField) {
          case "id": return b.id - a.id;
          case "date": return new Date(b.date) - new Date(a.date);
          default: return b.id - a.id;
        }
      }
    });

  const pageCount = Math.ceil(sortedSlots.length / slotsPerPage);

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  const displaySlots = sortedSlots.slice(
    pageNumber * slotsPerPage,
    (pageNumber + 1) * slotsPerPage
  );

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

  function convertToAMPM(time24) {
    // Split the time into hours, minutes, and seconds
    const [hours, minutes, seconds] = time24.split(':');

    // Determine whether it's AM or PM
    const period = hours >= 12 ? 'PM' : 'AM';

    // Convert hours to 12-hour format
    const hours12 = (hours % 12) || 12; // 0 should become 12 in 12-hour format

    // Create the AM/PM formatted time
    // const time12 = `${hours12}:${minutes}:${seconds} ${period}`;
    const time12 = `${hours12}:${minutes} ${period}`;

    return time12;
  }


  function compareTimes(time1, time2) {
    const [hours1, minutes1, seconds1] = time1.split(':').map(Number);
    const [hours2, minutes2, seconds2] = time2.split(':').map(Number);

    if (hours1 < hours2) {
      return -1;
    } else if (hours1 > hours2) {
      return 1;
    } else {
      if (minutes1 < minutes2) {
        return -1;
      } else if (minutes1 > minutes2) {
        return 1;
      } else {
        if (seconds1 < seconds2) {
          return -1;
        } else if (seconds1 > seconds2) {
          return 1;
        } else {
          return 0; // The times are equal
        }
      }
    }
  }

  return (
    <div className="container mx-auto mt-4 p-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-[25px] text-gray-700">Slots</h2>
        <SlotBookingModal
          slots={slots}
          therapistId={id}
          refreshSlotTable={refreshSlotTable}
        />

      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by date"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded p-2 w-full"
        />
      </div>

      <div className="flex flex-col ">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden ">

              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr className="bg-gray-200">
                    {/* <th className="py-3 px-6 border-b text-left">
                      <button
                        onClick={() => {toggleSortOrder('id');}}
                        className="flex items-center"
                      >
                        ID
                        <FontAwesomeIcon
                          icon={faSort}
                          className="ml-2 text-gray-500"
                        />
                      </button>
                    </th> */}
                    <th className="py-3 px-6 border-b text-left">
                      <button
                        onClick={() => { toggleSortOrder('date'); }}
                        className="flex items-center"
                      >
                        Slot Date
                        <FontAwesomeIcon
                          icon={faCalendar}
                          className="ml-2 text-gray-500"
                        />
                      </button>
                    </th>
                    <th className="py-3 px-6 border-b text-left">Slots</th>
                  </tr>
                </thead>
                <tbody>
                  {displaySlots.map((slot) => (
                    <tr key={slot.id} className="hover:bg-gray-100 odd:bg-slate-50 even:bg-indigo-50 dark:odd:bg-slate-900 dark:even:bg-slate-800">
                      {/* <td className="py-2 px-6 border-b">{slot.id}</td> */}
                      <td className="py-2 px-6 border-b">{slot.date}</td>
                      <td className="py-2 px-6 border-b">
                        <div className="max-w-md space-y-4">
                          {slot.time_slots.sort((a, b) => compareTimes(a.time, b.time)).map((time_slot, i) => (
                            <div key={i} className={`bg-gray-200 dark:bg-gray-700 p-2 rounded-md ${time_slot.booked ? 'bg-green-400 dark:bg-green-700' : 'bg-rose-400 dark:bg-rose-700'}`}>
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                  {convertToAMPM(time_slot.time)}
                                </p>
                                {!time_slot.booked && (
                                  <div className="cursor-pointer">
                                    <AiFillDelete className="hover:text-rose-700" onClick={() => { deleteTimesInSlotFunction(slot.time_slots.length, slot.id, time_slot.time); }} />
                                  </div>
                                )}
                              </div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {time_slot.booked ? 'Booked' : 'Not Booked'}
                              </p>
                            </div>
                          ))}
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
          </div>
        </div>
      </div>


      <ReactPaginate
        previousLabel={
          <button className="bg-blue-400 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded">
            Previous
          </button>
        }
        nextLabel={
          <button className="bg-blue-400 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded">
            Next
          </button>
        }
        pageCount={pageCount}
        onPageChange={handlePageChange}
        containerClassName="flex justify-center mt-4"
        activeClassName="active"
        pageLinkClassName="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 mx-2 rounded"
        breakLinkClassName="bg-white text-gray-800 font-semibold py-2 px-4 mx-2 rounded"
      />

      <Toaster />
    </div>
  );
};

export default SlotTable;
