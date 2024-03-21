import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../contexts/Auth";
import { Alert } from "../../utils/Alert";
import { Spinner } from "../../utils/Spinner";

const AdminBookingList = () => {
  const [bookings, setBookings] = useState([]);
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

      if (
        response.data.status == "Successful"
      ) {
        displayMessage("success", response.data.message);
        setTimeout(() => {
            handleReload()
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

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <>
        {showAlert && <Alert alert={alert} />}
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-4">Travel Booking List</h1>
          {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-4"> */}

          <div className="flex flex-wrap">
            {bookings && bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-md shadow-md p-4 w-full my-2"
              >
                <h2 className="text-xl font-semibold mb-2">User Details:</h2>

                <div className="text-sm">
                  {booking.name && <p className="text-gray-600 mb-2">
                    Name: <i> {booking.name}</i>
                  </p>}
                  <p className="text-gray-600 mb-2">
                    Email: <i> {booking.email}</i>
                  </p>
                 <p className="text-gray-600 mb-2">
                    Phone Number: <i> {booking.phone}</i>
                  </p>
                </div>

                <h2 className="text-xl font-semibold mt-4 mb-2">
                  Booking Details:
                </h2>

                <div className="text-sm">
                  {booking.package?<p className="text-gray-600 mb-2">
                      Package: <i>{booking.package}</i>
                    </p>:<p className="text-gray-600 mb-2">
                    Destination: <i> {booking.destination}</i>
                  </p>}
                  <p className="text-gray-600 mb-2">
                    Pickup Location: <i> {booking.pickup}</i>
                  </p>
                  {booking.fromdate && <p className="text-gray-600 mb-2">From Date: <i> {booking.fromdate.slice(0, 10)}</i></p>}
                  {booking.todate && <p className="text-gray-600 mb-2">To Date: <i> {booking.todate.slice(0, 10)}</i></p>}
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

                <form
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
                  <button className="bg-slate-800 rounded-md text-slate-100 px-2 py-1">
                    Submit
                  </button>
                </form>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
};

export default AdminBookingList;
