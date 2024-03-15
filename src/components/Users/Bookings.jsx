import axios from "axios";
import React, { useMemo, useState } from "react";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);

  const getBookings = async () => {
    try {
      const url = "http://localhost:5000/api/v1/bookings";
      const token = "Bearer " + localStorage.getItem("token");

      const response = await axios.get(url, {
        headers: {
          Authorization: token,
        },
      });

      setBookings(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  useMemo(() => {
    getBookings();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Travel Booking List</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {bookings.map((booking) => (
          <div key={booking._id} className="bg-white rounded-md shadow-md p-4">
            <h2 className="text-xl font-semibold mb-2">
              {booking.destination}
            </h2>

            <div className="text-sm">
            <p className="text-gray-600 mb-2">Pickup Location: <i> {booking.pickup}</i></p>
            {booking.fromdate && <p className="text-gray-600 mb-2">From Date: <i> {booking.fromdate.slice(0, 10)}</i></p>}
            {booking.todate && <p className="text-gray-600 mb-2">To Date: <i> {booking.todate.slice(0, 10)}</i></p>}
            <p className="text-gray-600 mb-2">
              Passengers: {booking.passengers}
            </p>
            <p className="text-gray-600 mb-2">Car Type: <i>{booking.car}</i></p>
            <p className="text-gray-600 mb-2">Status: <b><i>{booking.status}</i></b></p>
            {booking.package?<p className="text-gray-600 mb-2">Package: <i>{booking.package}</i></p>:""}
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingList;
