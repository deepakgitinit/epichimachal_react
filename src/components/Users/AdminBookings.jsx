import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../contexts/Auth";
import { Alert } from "../../utils/Alert";
import { Spinner } from "../../utils/Spinner";

const AdminBookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [filterStatus, setFilterStatus] = useState("Pending");

  const { token, handleReload } = useAuth();
  const bookingStatusRefs = useRef([]);

  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState({
    type: "",
    message: "",
  });

  const displayMessage = (type, message) => {
    setShowAlert(true);
    setAlert({ type: type, message: message });
    setTimeout(() => {
      setShowAlert(false);
    }, 1500);
  };

  const getBookings = async () => {
    setLoading(true);
    try {
      const url = `${import.meta.env.VITE_BOOKINGS}/all`;
      const token = "Bearer " + localStorage.getItem("token");

      const response = await axios.get(url, {
        headers: {
          Authorization: token,
        },
      });
      const bookingRevers = response.data.message.reverse();
      setBookings(bookingRevers);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateBookings = async (event, id) => {
    setLoading(true);
    event.preventDefault();
    try {
      const url = `${import.meta.env.VITE_BOOKINGS}/${id}`;
      const mytoken = "Bearer " + token;
      const status = bookingStatusRefs.current[id].value;
      const bookingid = id;

      const response = await axios.patch(
        url,
        {
          bookingid: bookingid,
          status: status,
        },
        {
          headers: {
            Authorization: mytoken,
          },
        }
      );

      if (response.data.status == "Successful") {
        displayMessage("success", response.data.message);
        setTimeout(() => {
          handleReload();
        }, 1500);
      } else {
        displayMessage("danger", response.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBookings();
  }, []);

const filteredBookings = bookings.filter(booking => booking.status === filterStatus);
  
if (loading) {
  return <Spinner/>
} else {
  return (
    <>
      {showAlert && <Alert alert={alert} />}
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">Travel Booking List</h1>

        <div className="flex *:mr-3 items-center text-sm mb-2">
        <p>Filter:</p>
        <button className=" bg-slate-900 rounded-md text-slate-100 px-2 py-1 hover:bg-slate-800" onClick={() => setFilterStatus("Pending")}>Pending</button>
        <button className=" bg-slate-900 rounded-md text-slate-100 px-2 py-1 hover:bg-slate-800" onClick={() => setFilterStatus("Confirmed")}>Confirmed</button>
        <button className=" bg-slate-900 rounded-md text-slate-100 px-2 py-1 hover:bg-slate-800" onClick={() => setFilterStatus("Rejected")}>Rejected</button>
        </div>

        <div className="flex flex-wrap">

          {filteredBookings &&
            filteredBookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-md shadow-md p-4 w-full my-2"
              >
                <h2 className="text-xl font-semibold mb-2">
                  User Details:{" "}
                  <span className="text-xs text-red-700">
                    {!booking.userid ? "(anonymus)" : ""}
                  </span>
                </h2>

                <div className="text-sm">
                  {booking.name && (
                    <p className="text-gray-600 mb-2">
                      Name: <i> {booking.name}</i>
                    </p>
                  )}
                  {booking.email && (
                    <p className="text-gray-600 mb-2">
                      Email: <i> {booking.email}</i>
                    </p>
                  )}
                  <p className="text-gray-600 mb-2">
                    Phone Number: <i> {booking.phone}</i>
                  </p>
                </div>

                <h2 className="text-xl font-semibold mt-4 mb-2">
                  Booking Details:
                </h2>

                <div className="text-sm">
                  {booking.package ? (
                    <p className="text-gray-600 mb-2">
                      Package: <i>{booking.package}</i>
                    </p>
                  ) : (
                    <p className="text-gray-600 mb-2">
                      Destinations:{" "}
                      <i>
                        [{[booking.destinations.map((item) => item).join(", ")]}
                        ]
                      </i>
                    </p>
                  )}
                  <p className="text-gray-600 mb-2">
                    Pickup Location: <i> {booking.pickup}</i>
                  </p>
                  {booking.fromdate && (
                    <p className="text-gray-600 mb-2">
                      From Date: <i> {booking.fromdate.slice(0, 10)}</i>
                    </p>
                  )}
                  {booking.todate && (
                    <p className="text-gray-600 mb-2">
                      To Date: <i> {booking.todate.slice(0, 10)}</i>
                    </p>
                  )}
                  <p className="text-gray-600 mb-2">
                    Passengers: {booking.passengers}
                  </p>
                  <p className="text-gray-600 mb-2">
                    Car Type: <i>{booking.taxi}</i>
                  </p>
                  <p className="text-gray-600 mb-2">
                    Status:{" "}
                    <b>
                      <i>{booking.status}</i>
                    </b>
                  </p>
                </div>

                {booking.status == "Pending" && <form
                  className="text-xs mt-4 *:mr-2 bg-slate-100 p-2 rounded-md"
                  onSubmit={(event) => {
                    updateBookings(event, booking._id);
                  }}
                >
                  <label htmlFor={`status-${booking._id}`}>Status</label>
                  <select
                    id={`status-${booking._id}`}
                    type="select"
                    ref={(el) => (bookingStatusRefs.current[booking._id] = el)}
                  >
                    <option value="Confirmed">Confirm</option>
                    <option value="Rejected">Reject</option>
                  </select>

                  <button
                    className="bg-slate-800 rounded-md text-slate-100 px-2 py-1"
                    disabled={loading}
                  >
                    Submit
                  </button>
                </form>}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
}

export default AdminBookingList;
