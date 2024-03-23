import axios from "axios";
import { useEffect, useState } from "react";
import { Alert } from "../../utils/Alert";
import { useAuth } from "../../contexts/Auth";

const HomeForm = () => {
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState({
    type: "",
    message: "",
  });

  const { token, isAuthenticated, handleReload } = useAuth();

  const displayMessage = (type, message) => {
    setShowAlert(true);
    setAlert({ type: type, message: message });
    setTimeout(() => {
      setShowAlert(false);
    }, 1500);
  };
  
  const [openDest, setOpenDest] = useState(false);
  const onOpenDest = () => {
    setOpenDest(!openDest);
  };
  const [activeTab, setActiveTab] = useState(
    isAuthenticated() ? "tab2" : "tab1"
  );
  const setTab = (tab) => {
    setActiveTab(tab);
  };

  const [selectWay, setSelectWay] = useState("Destination");
  const setWay = (way) => {
    setSelectWay(way);
  };

  const [bookingForm, setBookingForm] = useState({
    name: localStorage.getItem("formname") || "",
    phone: localStorage.getItem("formphone") || "",
    pickup: "",
    package: "",
    destinations: [],
    fromdate: "",
    todate: "",
    passengers: "",
    taxi: "",
  });

  const [destinations, setDestinations] = useState([]);
  const [packages, setPackages] = useState([]);
  const [pickups, setPickups] = useState([]);
  const [taxi, setTaxi] = useState([]);

  const [singlePackage, setSinglePackage] = useState("");
  useEffect(() => {
    const setPackageID = async () => {
      try {
        if (bookingForm.package.length > 0) {
          const url = `${import.meta.env.VITE_PACKAGES}/${bookingForm.package}`;
          const response = await axios.get(url);

          if (response) {
            const id = response.data.message._id;
            setSinglePackage(id);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    setPackageID();
  }, [bookingForm.package]);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name == "destinations") {
      if (checked) {
        setBookingForm((prevState) => ({
          ...prevState,
          destinations: [...prevState.destinations, value],
        }));
      } else {
        setBookingForm((prevState) => ({
          ...prevState,
          destinations: prevState.destinations.filter((dest) => dest !== value),
        }));
      }
    } else {
      setBookingForm((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    const getDestinations = async () => {
      const url = `${import.meta.env.VITE_DESTINATIONS}`;
      const destinations = await axios.get(url);
      const reversedDestinations = destinations.data.allDestinations.reverse();
      setDestinations(reversedDestinations);
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
      const pickup = await axios.get(`${import.meta.env.VITE_PICKUPS}`);
      const pickupLoacations = pickup.data.message;
      setPickups(pickupLoacations);
    };
    getPickups();

    const getTaxi = async () => {
      const taxi = await axios.get(`${import.meta.env.VITE_TAXI}`);
      setTaxi(taxi.data.message);
    };
    getTaxi();
  }, []);

  function getTodaysDate() {
    let today = new Date();

    let day = today.getDate();
    let month = today.getMonth() + 1;
    let newMonth = month < 10 ? "0" + month : month;
    let year = today.getFullYear();

    let todaysdate = `${year}-${newMonth}-${day}`;
    return todaysdate;
  }

  const handleSubmit = async (e) => {
    setLoading(true);
    try {

      if (isAuthenticated()) {
        const url = `${import.meta.env.VITE_BOOKINGS}`;
        const mytoken = "Bearer " + token;
        const response = await axios.post(url, bookingForm, {
          headers: {
            Authorization: mytoken,
          },
        });
        
        if (response.data.status == "Successful") {
            displayMessage("success", "Booking request Confirmed.");
            setTimeout(() => {
                handleReload()
            }, 1500);
            return;
        }
        displayMessage("danger", response.data.message);
        
    } else {
        const url = `${import.meta.env.VITE_BOOKINGS}/anonymus`;
        const response = await axios.post(url, bookingForm);
        console.log(response);

        if (response.data.status == "Successful") {
            displayMessage("success", "Booking request Confirmed.");
            setTimeout(() => {
                handleReload()
            }, 1500);
            return;
        }
        displayMessage("danger", response.data.message);
      }

    } catch (error) {
      displayMessage("danger", "Internal Error Occured. Try Again");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


    return (
      <>
        {showAlert && <Alert alert={alert} />}
        <div className="mb-64 lg:mx-16 md:mx-8 mx-4 lg:text-base text-sm ">
          <div
            className="flex justify-center relative bg-slate-800 rounded-2xl bg-fixed bg-cover bg-center shadow-2xl"
            style={{
              backgroundImage:
                'url("https://images.pexels.com/photos/5324304/pexels-photo-5324304.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
              height: "480px"
            }}
          >
            <div className="hidden bg-gradient-to-b from-slate-900 bg-opacity-60 w-screen h-96 rounded-2xl text-center pt-2 text-slate-200 lg:text-7xl md:text-6xl text-5xl">
              <h1 className="font-extrabold">Travel More Himachal  </h1>
              <p className="text-base">Welcome to EpicHimachal. Explore Incredible Himachal with us.</p>
            </div>

            <div className="flex flex-col justify-center items-center absolute -bottom-1/4 px-8 py-4 w-11/12 h-auto rounded-2xl backdrop-blur-xl bg-slate-200 bg-opacity-40 shadow-2xl">
                
              {activeTab === "tab1" && !isAuthenticated() && (
                <div className="flex flex-col justify-center items-center">
                  <div className="flex mb-8 *:text-slate-200 text-base">
                    <p>Enter Personal Details</p>
                  </div>
                  <div className="grid lg:grid-cols-2 grid-cols-1 ">
                    <div className="grid grid-cols-1">
                      <p className="text-slate-100 text-xs ml-4">
                        Enter your name:
                      </p>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        className="text-slate-500 rounded-xl mx-2 my-2 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
                        required
                        value={bookingForm.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="grid grid-cols-1">
                      <p className="text-slate-100 text-xs ml-4">
                        Enter your phone:
                      </p>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        className="text-slate-500 rounded-xl mx-2 my-2 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
                        required
                        value={bookingForm.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone"
                      />
                    </div>
                  </div>

                <div className="flex justify-center items-center">

                  {/* <button
                      className="flex mt-8 mx-4 px-3 py-1 justify-center items-center cursor-pointer rounded-full bg-slate-900
                  hover:bg-slate-800 text-white text-sm"
                      onClick={() => {
                        // handleSubmit();
                      }}
                    >
                      Book Now &#10095;
                    </button> */}


                  <span
                    className="flex mt-8 mx-4 justify-center items-center cursor-pointer size-8 rounded-full bg-slate-900
                hover:bg-slate-800 text-white"
                    onClick={() => {
                      if (bookingForm.name == "" || bookingForm.phone == "") {
                        displayMessage("danger", "Please enter name and phone");
                        return;
                      }
                      if (bookingForm.phone.length < 10) {
                        displayMessage(
                          "danger",
                          "Please recheck your entered Phone number."
                        );
                        return;
                      }
                      localStorage.setItem("formname", bookingForm.name);
                      localStorage.setItem("formphone", bookingForm.phone);
                      setTab("tab2");
                    }}
                    >
                    &#10095;
                  </span>
                </div>
                </div>
              )}

              {activeTab === "tab2" && (
                <div className="flex flex-col justify-center items-center">
                  <div className="flex mb-8 mx-2 my-1 *:text-slate-200 text-base">
                    <p>Enter Pickup Details</p>
                  </div>

                  <div className="grid lg:grid-cols-2 grid-cols-1">
                    <div className="grid grid-cols-1">
                      <p className="text-xs ml-4 text-slate-100">
                        Select Pickup Location
                      </p>
                      <select
                        className="text-slate-500 rounded-xl mx-2 my-2 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
                        id="pickup"
                        name="pickup"
                        value={bookingForm.pickup}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Pickup Location</option>
                        {pickups.map((item) => {
                          return (
                            <option key={item._id} value={item.name}>
                              {item.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <div className="grid grid-cols-1">
                      <p className="text-xs ml-4 text-slate-100">From Date</p>
                      <input
                        id="fromdate"
                        name="fromdate"
                        type="date"
                        value={bookingForm.fromdate}
                        onChange={handleChange}
                        className="text-slate-500 rounded-xl mx-2 my-2 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
                        min={getTodaysDate()}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex ">
                    {!isAuthenticated() && (
                      <button
                        className="flex mt-8 mx-4 justify-center items-center cursor-pointer size-8 rounded-full bg-slate-900
                  hover:bg-slate-800 text-white"
                        onClick={() => {
                          setTab("tab1");
                        }}
                      >
                        &#10094;
                      </button>
                    )}
                    <button
                      className="flex mt-8 mx-4 justify-center items-center cursor-pointer size-8 rounded-full bg-slate-900
                hover:bg-slate-800 text-white"
                      onClick={() => {
                        if (
                          bookingForm.pickup == "" ||
                          bookingForm.fromdate == ""
                        ) {
                          displayMessage(
                            "danger",
                            "Enter pickup location & From Date."
                          );
                          return;
                        }
                        setTab("tab3");
                      }}
                    >
                      &#10095;
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "tab3" && (
                <>
                  <div className="flex md:flex-row flex-col items-center *:text-slate-100 mx-2 mb-8 ">
                    <button
                      className="bg-slate-900 px-2 py-1 rounded-lg hover:bg-slate-800 text-xs"
                      onClick={() => {
                        setWay("Packages");
                        bookingForm.destinations = []
                        bookingForm.passengers = ""
                        bookingForm.taxi = ""
                        bookingForm.todate = ""
                      }}
                    >
                      Choose Package
                    </button>
                    <span className="mx-4 text-xs">or</span>
                    <button
                      className="bg-slate-900 px-2 py-1 rounded-lg hover:bg-slate-800 text-xs"
                      onClick={() => {
                        setWay("Destination");
                        bookingForm.package = ""
                      }}
                    >
                      Choose Destinations
                    </button>
                  </div>

                  {selectWay === "Packages" && (
                    <div className="flex flex-col justify-center items-center">
                      <div id="Packages" className="grid grid-cols-1">
                        <div className="grid grid-cols-1">
                          <p className="text-slate-100 text-xs ml-4">
                            Choose Package
                          </p>
                          <select
                            className="text-slate-500 rounded-xl mx-2 my-2 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
                            id="package"
                            name="package"
                            value={bookingForm.package}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Choose Package</option>
                            {packages &&
                              packages.map((item) => {
                                return (
                                  <option key={item._id} value={item._id}>
                                    {item.title}
                                  </option>
                                );
                              })}
                          </select>

                          {singlePackage && bookingForm.package != "" && (
                            <div className="flex justify-center items-center text-slate-100 text-xs *:bg-slate-900 hover:*:bg-slate-800 *:transition-colors *:rounded-lg *:px-2 *:py-1">
                              <button
                                onClick={() => {
                                  window.open(`/packages/${singlePackage}`, "_blank");
                                }}
                              >
                                View Package Details &#8599;
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex *:text-xs">
                        <button
                          className="flex mt-8 mx-4 justify-center items-center cursor-pointer size-8 rounded-full bg-slate-900
                  hover:bg-slate-800 text-white"
                          onClick={() => {
                            setTab("tab2");
                          }}
                        >
                          &#10094;
                        </button>
                        <button
                          className="flex mt-8 mx-4 px-3 py-1 justify-center items-center cursor-pointer rounded-full bg-slate-900
                      hover:bg-slate-800 text-white text-sm"
                          onClick={() => {
                            if (!bookingForm.package) {
                              displayMessage("danger", "Please Enter all details before submitting.")
                              return
                            }
                            handleSubmit();
                          }}
                          disabled={loading}
                        >
                          {loading?<img className="animate-spin mr-2 invert" src="/rotate_right.svg"/>:null}
                          Book Now &#10095;
                        </button>
                      </div>
                    </div>
                  )}

                  {selectWay === "Destination" && (
                    <div className="flex flex-col justify-center items-center">
                      <div
                        id="Destination"
                        className="grid grid-cols-1 lg:grid-cols-2 "
                      >
                        <div
                          className={`${
                            openDest ? "" : "hidden"
                          } absolute bg-slate-100 rounded-2xl top-44 md:top-36 p-2 ml-2`}
                        >
                          {destinations &&
                            destinations.map((item) => {
                              return (
                                <div key={item._id}>
                                  <label className="block cursor-pointer hover:bg-blue-600 hover:text-slate-100 *:transition-colors">
                                    <input
                                      name="destinations"
                                      className="mr-2"
                                      type="checkbox"
                                      value={item.title}
                                      checked={bookingForm.destinations.includes(
                                        item.title
                                      )}
                                      onChange={handleChange}
                                      required
                                    />
                                    {item.title}
                                  </label>
                                </div>
                              );
                            })}
                        </div>

                        <div className="grid grid-cols-1">
                          <p className="text-slate-100 text-xs ml-4">
                            Choose Destinations
                          </p>
                          <button
                            className="bg-white text-slate-500 text-left mx-2 my-2 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500"
                            onClick={onOpenDest}
                          >
                            {openDest
                              ? "Close Destination"
                              : "Open Destination"}
                          </button>
                        </div>

                        <div className="grid grid-cols-1">
                          <p className="text-slate-100 text-xs ml-4">
                            Choose Taxi
                          </p>
                          <select
                            id="taxi"
                            name="taxi"
                            className="bg-white text-slate-500 text-left mx-2 my-2 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500"
                            required
                            value={bookingForm.taxi}
                            onChange={handleChange}
                          >
                            <option value="">Select Car Type</option>
                            {taxi &&
                              taxi.map((item) => {
                                return (
                                  <option key={item._id} value={item.name}>
                                    {item.name}-{item.type}
                                  </option>
                                );
                              })}
                          </select>
                        </div>

                        <div className="grid grid-cols-1">
                          <p className="text-slate-100 text-xs ml-4">
                            Number of Passengers
                          </p>
                          <input
                            type="number"
                            id="passengers"
                            name="passengers"
                            className="bg-white text-slate-500 text-left mx-2 my-2 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500"
                            placeholder="Select Passengers"
                            min="1"
                            value={bookingForm.passengers}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="grid grid-cols-1">
                          <p className="text-slate-100 text-xs ml-4">To Date</p>
                          <input
                            id="todate"
                            name="todate"
                            type="date"
                            className="bg-white text-slate-500 text-left mx-2 my-2 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500"
                            min={getTodaysDate()}
                            required
                            value={bookingForm.todate}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="flex *:text-xs">
                        <button
                          className="flex mt-8 mx-4 justify-center items-center cursor-pointer size-8 rounded-full bg-slate-900
                  hover:bg-slate-800 text-white"
                          onClick={() => {
                            setTab("tab2");
                          }}
                        >
                          &#10094;
                        </button>
                        <button
                          className="flex mt-8 mx-4 px-3 py-1 justify-center items-center cursor-pointer rounded-full bg-slate-900
                      hover:bg-slate-800 text-white text-sm"
                          onClick={() => {
                            if (bookingForm.destinations.length < 1 || !bookingForm.passengers || !bookingForm.taxi) {
                              displayMessage("danger", "Please Enter all details before submitting.")
                              return
                            }
                            handleSubmit();
                          }}
                          disabled={loading}
                        >
                          {loading?<img className="animate-spin mr-2 invert" src="/rotate_right.svg"/>:null}
                          Book &#10095;
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </>
    );
};

export { HomeForm };
