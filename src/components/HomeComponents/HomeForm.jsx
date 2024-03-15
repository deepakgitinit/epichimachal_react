import React, { useState, useRef } from "react";
import axios from "axios";
import { Alert } from "../../utils/Alert";
import { Spinner } from "../../utils/Spinner";
import { useAuth } from "../../contexts/Auth";

const HomeForm = () => {
  const pickupLocationRef = useRef(null);
  const destinationRef = useRef(null);
  const passengersRef = useRef(null);
  const fromDateRef = useRef(null);
  const toDateRef = useRef(null);
  const selectedCarRef = useRef(null);

  const { token, isAuthenticated } = useAuth();

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
    }, 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isAuthenticated()) {
        setLoading(true);
        const pickupLocation = pickupLocationRef.current.value;
        const destination = destinationRef.current.value;
        const passengers = passengersRef.current.value;
        const fromDate = fromDateRef.current.value;
        const toDate = toDateRef.current.value;
        const selectedCar = selectedCarRef.current.value;
  
        const booking = {
          pickup: pickupLocation,
          destination: destination,
          passengers: passengers,
          fromdate: fromDate,
          todate: toDate,
          car: selectedCar,
        };
  
        const mytoken = "Bearer " + token;
  
        const url = "http://localhost:5000/api/v1/bookings";
        const response = await axios.post(url, booking, {
          headers: {
            Authorization: mytoken,
          },
        });
  
        if (
          response.data.status == 200 ||
          response.data.status == 201 ||
          response.data.status == "Successful"
        ) {
          displayMessage("success", "Booking request Confirmed.");
          return;
        }
        displayMessage("danger", response.data.message);
        
      }else{
        displayMessage("danger", "Please Login to submit Booking request.")
      }



    } catch (error) {
      displayMessage("danger", "Internal Error Occured. Try Again");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    <Spinner />;
  } else {
    return (
      <>
        {showAlert && <Alert alert={alert} />}
        <div className="flex flex-col relative justify-center items-center rounded-md mx-4 lg:mx-8">
          <div className="flex relative mx-2 mb-8 h-96 w-auto shadow-2xl rounded-md">
            <img
              className="-z-50 rounded-md object-cover"
              src="https://images.pexels.com/photos/7846563/pexels-photo-7846563.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Himachal-pradesh-explore"
            />
            <div className="absolute flex flex-col rounded-l-md text-slate-100 bg-gradient-to-r from-slate-900 lg:w-1/2 md:w-2/3 w-4/5 h-full *:lg:ml-10 *:lg:mt-6 *:ml-6 *:mt-4">
              <h1 className="lg:text-8xl md:text-7xl text-5xl">
                <b>
                  Incredible
                  <br />
                  Himachal
                </b>
              </h1>
              <p className="text-lg">
                Welcome to EpicHimachal. Explore Incredible Himachal.
              </p>
            </div>
          </div>

          <form
            className="grid lg:grid-cols-6 grid-cols-2 relative bottom-24 justify-center items-center text-sm w-11/12 backdrop-blur-lg bg-opacity-40 bg-slate-800 rounded-md p-4 *:p-2 *:m-2 *:rounded-lg shadow-2xl"
            onSubmit={handleSubmit}
          >
            <label className="text-slate-100" htmlFor="pickup">
              Pickup Location*
            </label>
            <select
              className="*:py-2"
              id="pickup"
              required
              ref={pickupLocationRef}
            >
              <option value="">Select Pickup Location</option>
              <option value="Chandigarh">Chandigarh</option>
              <option value="Delhi">Delhi</option>
            </select>

            <label className="text-slate-100" htmlFor="destination">
              Destination*
            </label>
            <select id="destination" required ref={destinationRef}>
              <option value="">Select Destination</option>
              <option value="Shimla">Shimla</option>
              <option value="Kullu">Kullu</option>
              <option value="Manali">Manali</option>
              <option value="Kangra">Kangra</option>
              <option value="Manikaran">Manikaran</option>
            </select>

            <label className="text-slate-100" htmlFor="passengers">
              Passengers
            </label>
            <input
              type="number"
              id="passengers"
              ref={passengersRef}
              min="1"
              defaultValue={1}
            />

            <label className="text-slate-100" htmlFor="fromdate">
              From Date*
            </label>
            <input id="fromdate" type="date" required ref={fromDateRef} />

            <label className="text-slate-100" htmlFor="todate">
              To Date
            </label>
            <input id="todate" type="date" ref={toDateRef} />

            <label className="text-slate-100" htmlFor="selectcar">
              Select Car*
            </label>
            <select id="selectcar" required ref={selectedCarRef}>
              <option value="">Select Car Type</option>
              <option value="Sedan">Sedan</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Family">Family</option>
              <option value="Taxi">Taxi</option>
            </select>

            <button className="text-slate-100 bg-slate-900 hover:bg-slate-800 rounded-md lg:col-start-6 lg:col-span-1 col-span-2">
              Book Now!
            </button>
          </form>
        </div>
      </>
    );
  }
};

export { HomeForm };
