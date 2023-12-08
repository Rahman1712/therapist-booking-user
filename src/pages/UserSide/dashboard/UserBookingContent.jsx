import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { userAxiosApi } from "../../../config/axiosConfig";
import { USER_BOOKING_API } from "../../../constants";
import { BsEye } from "react-icons/bs";
import { useNavigate } from "react-router-dom/dist";

const UserBookingContent = () => {

  const { id } = useSelector((state) => state.auth);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    userAxiosApi.get(USER_BOOKING_API + "/booking-byuserid/" + id).then((response) => {
      console.log(response.data);
      setBookings(response.data)
    })
  }, [id]);

  return (
    <div className="container font-roboto">
      <h1 className="text-3xl font-semibold text-center my-8 dark:text-white font-orbitron">
            Bookings
      </h1>
      <div className="flex flex-col justify-center w-full px-10 mt-10 ">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden ">

              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="py-3 px-6 border-b text-left">
                      Booking Id
                    </th>
                    <th className="py-3 px-6 border-b text-left">
                      Booking Status
                    </th>
                    <th className="py-3 px-6 border-b text-left">
                      Payment Status
                    </th>
                    <th className="py-3 px-6 border-b text-left">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-100 odd:bg-slate-50 even:bg-indigo-50 dark:odd:bg-slate-900 dark:even:bg-slate-800">
                      {/* <td className="py-2 px-6 border-b">{slot.id}</td> */}
                      <td className="py-2 px-6 border-b">
                        {booking.id}
                      </td>
                      <td className="py-2 px-6 border-b">
                        {booking.bookingStatus}
                      </td>
                      <td className="py-2 px-6 border-b">
                        {booking.paymentStatus}
                      </td>
                      <td className="py-2 px-6 border-b">
                        <a className="cursor-pointer" onClick={() => { navigate("/user-book/"+booking.id); }}>

                        <BsEye  />

                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default UserBookingContent