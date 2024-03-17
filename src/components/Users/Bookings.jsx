import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/Auth";
import { Alert } from "../../utils/Alert";
import { Spinner } from "../../utils/Spinner";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const { token, handleReload} = useAuth();

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
    try {
      const url = "http://localhost:5000/api/v1/bookings";
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
    }
  };

  const deleteBooking = async (e, id) => {
    e.preventDefault();
    try {
      const value = confirm("Do you want to delete Booking?");

      if (value) {
        setLoading(true);
        const url = `http://localhost:5000/api/v1/bookings/${id}`;

        const mytoken = "Bearer " + token;

        const response = await axios.delete(url, {
          headers: {
            Authorization: mytoken,
          },
        });

        if (response.data.status == "Successful") {
          displayMessage("success", "Booking request Deleted.");
          setTimeout(() => {
            handleReload()
          }, 1500);
          return;
        }
        displayMessage("danger", response.data.message);
      } else {
        displayMessage("danger", "Cancelled by user.");
      }
    } catch (error) {
      console.log(error);
      displayMessage("danger", "Internal Error");

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBookings();
  }, []);


  if (loading) {
    <Spinner />;
  } else {
    return (
      <>
        {showAlert && <Alert alert={alert} />}
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-4">Travel Booking History</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-fit">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-md shadow-md p-4"
              >
                {booking.package ? (
                  <h2 className="text-xl font-semibold mb-2">
                    <span className="text-base">Package: </span>{" "}
                    {booking.package}
                  </h2>
                ) : (
                  <h1 className="text-xl font-semibold mb-2">
                    <span className="text-base">Destination: </span>{" "}
                    {booking.destination}
                  </h1>
                )}
                <div className="text-sm">
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
                    Taxi Type: <i>{booking.taxi}</i>
                  </p>
                  <p className="text-gray-600 mb-2">
                    Status:{" "}
                    <b>
                      <i>{booking.status}</i>
                    </b>
                  </p>
                </div>

                <button
                  className="bg-red-800 hover:bg-red-700 rounded-md text-xs text-white py-1 px-2"
                  onClick={(e) => {
                    deleteBooking(e, booking._id);
                  }}
                >
                  Delete Booking
                </button>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
};

export default BookingList;
