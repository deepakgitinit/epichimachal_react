import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Alert } from "../../utils/Alert";
import { Spinner } from "../../utils/Spinner";
import { useAuth } from "../../contexts/Auth";

const HomeForm = () => {
  const pickupLocationRef = useRef(null);
  const destinationRef = useRef(null);
  const passengersRef = useRef(null);
  const packageRef = useRef(null);
  const fromDateRef = useRef(null);
  const toDateRef = useRef(null);
  const selectedCarRef = useRef(null);

  const [activeTab, setActiveTab] = useState(localStorage.getItem('activeTabHome') || 'tab1');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    localStorage.setItem('activeTabHome', tab);
  };

  const [destinations, setDestination] = useState([]);
  const [packages, setPackages] = useState([]);
  const [pickups, setPickups] = useState([]);
  const [taxi, setTaxi] = useState([])

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
    }, 1500);
  };


  const handleSubmitPacakge = async (e) => {
    e.preventDefault();
    try {
      if (isAuthenticated()) {
        setLoading(true);
        const pickupLocation = pickupLocationRef.current.value;
        const fromDate = fromDateRef.current.value;
        const selectedPackage = packageRef.current.value;

        const booking = {
          pickup: pickupLocation,
          fromdate: fromDate,
          package: selectedPackage,
        };


        const mytoken = "Bearer " + token;

        const url = `${import.meta.env.VITE_BOOKINGS}`;
        
        const response = await axios.post(url, booking, {
          headers: {
            Authorization: mytoken,
          },
        });

        if (
          response.data.status == "Successful"
        ) {
          displayMessage("success", "Booking request Confirmed.");
          return;
        }
        displayMessage("danger", response.data.message);
        

      } else {
        displayMessage("danger", "Please Login to submit Booking request.");
      }
      
    } catch (error) {
      displayMessage("danger", "Internal Error Occured. Try Again");
      console.log(error);

    } finally {
      setLoading(false);
    }

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
          taxi: selectedCar,
        };

        const mytoken = "Bearer " + token;

        const url = `${import.meta.env.VITE_BOOKINGS}`;
        const response = await axios.post(url, booking, {
          headers: {
            Authorization: mytoken,
          },
        });

        if (
          response.data.status == "Successful"
        ) {
          displayMessage("success", "Booking request Confirmed.");
          return;
        }
        displayMessage("danger", response.data.message);

      } else {
        displayMessage("danger", "Please Login to submit Booking request.");
      }

    } catch (error) {
      displayMessage("danger", "Internal Error Occured. Try Again");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  function getTodaysDate() {
    let today = new Date();

    let day = today.getDate();
    let month = today.getMonth() + 1;
    let newMonth = month<10?"0"+month:month;
    let year = today.getFullYear();

    let todaysdate =  `${year}-${newMonth}-${day}`;
    return todaysdate;

}

  useEffect(() => {
    const getDestinations = async () => {
      const url = `${import.meta.env.VITE_DESTINATIONS}`;
      const destinations = await axios.get(url);
      const reversedDestinations = destinations.data.allDestinations.reverse();
      setDestination(reversedDestinations);
    };
    getDestinations();

    const getPackages = async () => {
      const url = `${import.meta.env.VITE_PACKAGES}`;
      const packages = await axios.get(url);
      const reversePackages = packages.data.allPackages;
      setPackages(reversePackages);
    };
    getPackages();

    const getPickups = async () => {
      const pickup = await axios.get(
        `${import.meta.env.VITE_PICKUPS}`
      );
      const pickupLoacations = pickup.data.message;
      setPickups(pickupLoacations);
    };
    getPickups();

    const getTaxi = async () => {
      const taxi = await axios.get(
        `${import.meta.env.VITE_TAXI}`
      );
      setTaxi(taxi.data.message);
    };
    getTaxi();

  }, []);

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
                src="/Hero-Image.jpg"
                alt="Himachal-pradesh-explore"
                />
              <div className="absolute flex flex-col rounded-l-md text-slate-100 bg-gradient-to-r from-slate-900 lg:w-1/2 md:w-2/3 w-4/5 h-full *:lg:ml-10 *:lg:mt-6 *:ml-6 *:mt-4">
                <h1 className="lg:text-8xl md:text-7xl text-5xl">
                  <b>
                    Travel More
                    <br />
                    Himachal
                  </b>
                </h1>
                <p className="text-lg">
                  Welcome to EpicHimachal. Explore Incredible Himachal with us.
                </p>
              </div>
            </div>


          <div className="flex flex-col justify-center items-center relative -top-32">

            <div className="container mx-auto pt-8 z-40 relative top-4">
              <div className="flex justify-center flex-col md:flex-row *:md:my-0 *:my-1">
                <button
                  className={`px-4 py-2 md:mr-2 focus:outline-none rounded-md ${activeTab === 'tab1' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'}`}
                  onClick={() => handleTabClick('tab1')}
                  >
                  Taxi Bookings
                </button>
                <button
                  className={`px-4 py-2 focus:outline-none rounded-md ${activeTab === 'tab2' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'}`}
                  onClick={() => handleTabClick('tab2')}
                  >
                  Package Bookings
                </button>
              </div>
            </div>


            {activeTab === 'tab1' && (<form
              className="grid lg:grid-cols-6 grid-cols-2 relative text-sm w-11/12 backdrop-blur-lg bg-opacity-40 bg-slate-800 rounded-md p-4 *:p-2 *:m-2 *:rounded-lg shadow-2xl pt-8"
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
                {pickups.map((item)=>{
                  return <option key={item._id} value={item.name}>{item.name}</option>
                })}
              </select>

              <label className="text-slate-100" htmlFor="destination">
                Destination*
              </label>
              <select id="destination" required ref={destinationRef}>
                <option value="">Select Destination</option>
                {destinations && destinations.map(item=>{
                  return <option key={item._id} value={item.title}>{item.title}</option>
                })

                }
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
              <input id="fromdate" type="date" min={getTodaysDate()} required ref={fromDateRef} />

              <label className="text-slate-100" htmlFor="todate">
                To Date
              </label>
              <input id="todate" type="date" min={getTodaysDate()} ref={toDateRef} />

              <label className="text-slate-100" htmlFor="selectcar">
                Select Car*
              </label>
              <select id="selectcar" required ref={selectedCarRef}>
                <option value="">Select Car Type</option>
                {taxi && taxi.map((item)=>{
                  return <option key={item._id} value={item.name}>{item.name}-{item.type}</option>
                })}
              </select>

              <button className="text-slate-100 bg-slate-900 hover:bg-slate-800 rounded-md lg:col-start-6 lg:col-span-1 col-span-2">
                Book Now!
              </button>
            </form>)}


            {activeTab === 'tab2' && (<form
              className="grid lg:grid-cols-6 grid-cols-2 relative text-sm max-w-11/12 backdrop-blur-lg bg-opacity-40 bg-slate-800 rounded-md p-4 *:p-2 *:m-2 *:rounded-lg shadow-2xl pt-8"
              onSubmit={handleSubmitPacakge}
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
                {pickups.map((item)=>{
                  return <option key={item._id} value={item.name}>{item.name}</option>
                })}
              </select>

              <label className="text-slate-100" htmlFor="package">
                Choose Pacakges*
              </label>
              <select
                className="*:py-2"
                id="package"
                required
                ref={packageRef}
              >
                <option value="">Choose Package</option>
                {packages && packages.map((item)=>{
                  return <option key={item._id} value={item.title}>{item.title}</option>
                })}
              </select>

              <label className="text-slate-100" htmlFor="fromdate">
                From Date*
              </label>
              <input id="fromdate" type="date" min={getTodaysDate()} required ref={fromDateRef} />              

              <button className="text-slate-100 bg-slate-900 hover:bg-slate-800 rounded-md lg:col-start-6 lg:col-span-1 col-span-2">
                Book Now!
              </button>
            </form>)}

          </div>
          </div>
      </>
    );
  }
};

export { HomeForm };
