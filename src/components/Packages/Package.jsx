import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "../../utils/Spinner";
import { Alert } from "../../utils/Alert";

const Package = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [mypackage, setMyPackage] = useState({});
  const [mydestinations, setDestinations] = useState([]);
  const sliderRef = useRef(null);
  const sendMailRef = useRef(null);

  const navigate = useNavigate();

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

  const scrollSlider = (direction) => {
    const slider = sliderRef.current;
    const scrollAmount = 330;
    slider.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
  };

  const fetchDestinations = async (id) => {
    const destinationUrl = `${import.meta.env.VITE_DESTINATIONS}/${id}`;
    const response = await axios.get(destinationUrl);
    return response.data.message;
  };

  const fetchAllDestinations = async (destinationsArray) => {
    try {
      const fetchPromises = destinationsArray.map((element) =>
        fetchDestinations(element)
      );
      const responses = await Promise.all(fetchPromises);
      setDestinations(responses);
    } catch (error) {
      console.error("Error fetching destinations:", error);
    }
  };

  const fetchPackage = async () => {
    setLoading(true);
    try {
      const url = `${import.meta.env.VITE_PACKAGES}/${id}`;
      const response = await axios.get(url);
      const packageDetails = response.data.message;
      const destinationsDetails = response.data.message.destinations;
      setMyPackage(packageDetails);
      fetchAllDestinations(destinationsDetails);
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  const gotoDestination = (id) => {
    navigate(`/destinations/${id}`);
    window.scrollTo({ top: 0 });
  };

  const sendMail = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = `${import.meta.env.VITE_ITINERARY}`;
      const { title, price, passengers, taxi, time, description } = mypackage;

      const mails = sendMailRef.current.value;
      const subject = title;

      const htmlContent = `
      <html>
      <head>
        <title>${title}</title>
      </head>
      <body>
        <h1><b>TravelMoreHimachal</b> - Itinerary of ${title}<h1>
        <h2><b>Destinations:</b></h2>
        <p> <i>${mydestinations.map((item) => {
          return " " + item.title;
        })}</i></p>
        <h2><b>Price:</b></h2><p> 
        <i>${price}</i></p>
        <h2><b>Passengers:</b></h2> 
        <p><i>${passengers}</i></p>
        <h2><b>Time:</b></h2> 
        <p><i>${time}</i></p>
        <h2><b>Taxi:</b></h2> 
        <p><i>${taxi}</i></p>
        <h2><b>Itinerary:</b></h2> 
        ${description}
      </body>
      </html>
    `;

      const response = await axios.post(url, {
        mails: mails,
        subject: subject,
        htmlContent: htmlContent
        });

      if (response.data.status == "Successful") {
        displayMessage("success", response.data.message);
      } else {
        displayMessage("danger", response.data.message);
      }
    } catch (error) {
      displayMessage("danger", "Error Occured");
    } finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackage();
  }, [id]);

  if (loading) {
    return <Spinner />;
  }
  return (
    <>
    {showAlert && <Alert alert={alert} />}
      <div className="flex flex-col justify-center items-center">
        <div
          className="lg:mx-4 mx-2 rounded overflow-hidden shadow-lg"
          style={{ maxWidth: "1080px" }}
        >
          <div className="flex relative">
            <img
              className="w-full lg:h-96 md:h-80 h-64 rounded-t-md z-0 object-cover"
              src={`${import.meta.env.VITE_LOCALHOST}/` + mypackage.thumbnail}
              alt={mypackage.title}
              loading="lazy"
            />
            <div className="absolute bottom-0 text-center rounded-b-md cursor-pointer text-slate-100 bg-gradient-to-t from-slate-900 bg-opacity-60 p-4 w-full">
              <h1 className="lg:text-7xl md:text-5xl text-2xl font-sans font-extrabold">
                {mypackage.title}
              </h1>
            </div>
          </div>

          <div className="relative bg-white p-6 *:mb-4">
            <div className="flex flex-wrap items-center">
              <p>
                <b>Category: </b>
              </p>{" "}
              {mypackage.category &&
                mypackage.category != 0 &&
                mypackage.category.map((category, index) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-200 text-gray-700 px-3 py-1 text-sm font-semibold rounded-full mx-2 my-2"
                  >
                    {category}
                  </span>
                ))}
            </div>

            <div className="font-bold text-2xl mb-2 relative z-10">
              {mypackage.title}
            </div>

            <p className="text-gray-700 text-base mb-2">
              <b>Price:</b> &#x20B9; {mypackage.price}
            </p>

            <p className="text-gray-700 text-base mb-2">
              <b>Passengers:</b> {mypackage.passengers}
            </p>

            <p className="text-gray-700 text-base mb-2">
              <b>Time:</b> {mypackage.time}
            </p>
            <p className="text-gray-700 text-base mb-2">
              <b>Taxi:</b> {mypackage.taxi}
            </p>

            <p className="text-gray-700 text-base mb-2">
              <b>Destinations:</b>
            </p>

            <div
              className={`flex lg:w-auto`}
              style={window.innerWidth <= 1280 ? { width: "80vw" } : {}}
            >
              <div
                className="flex overflow-y-auto transition-transform"
                ref={sliderRef}
                style={{ scrollbarWidth: "none" }}
              >
                {mydestinations.length > 0 &&
                  mydestinations.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="cursor-pointer"
                        onClick={() => {
                          gotoDestination(item._id);
                        }}
                      >
                        <div className="flex relative justify-center w-80 mr-4 ">
                          <img
                            className="w-auto h-48 object-cover rounded-md"
                            src={
                              `${import.meta.env.VITE_LOCALHOST}/` +
                              item.images[0]
                            }
                            alt="destination"
                            loading="lazy"
                          />
                          <div className="absolute bottom-0 rounded-b-md  text-slate-100 bg-gradient-to-t from-slate-900 bg-opacity-60 p-4 w-full">
                            <h1 className="text-lg">
                              <b>{item.title}</b>
                            </h1>
                            <p className="text-xs line-clamp-2">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="flex text-slate-100 *:bg-opacity-40 *:bg-slate-900 hover:*:bg-slate-800 *:rounded-full *:px-4 *:py-2 *:mx-2 my-4">
              <button className="prev" onClick={() => scrollSlider(-1)}>
                &#10094;
              </button>
              <button className="next" onClick={() => scrollSlider(1)}>
                &#10095;
              </button>
            </div>

            <div className="text-gray-700 text-base mb-2">
              <div className="text-lg mb-3">
                <b>Description:</b>
              </div>
              <div dangerouslySetInnerHTML={{ __html: mypackage.description }}>
                {/* {mypackage.description} */}
              </div>
            </div>

            <div className="flex lg:flex-row flex-col *:mr-2 *:mb-2 items-center object-center mt-8">
              <p className="flex items-center text-gray-700 text-base">
                <img
                  className="w-4 h-4 mr-2"
                  src="https://cdn3.iconfinder.com/data/icons/virtual-notebook/16/button_share-512.png"
                  alt="Share"
                />
                <b>Share:</b>
              </p>
              <input
                className="border border-slate-900 rounded-lg mr-2 px-2"
                type="text"
                ref={sendMailRef}
                placeholder="Enter mails "
              ></input>
              <button
                className="bg-slate-900 hover:bg-slate-800 text-slate-200 text-sm px-2 py-1 rounded-md"
                onClick={(e)=>{sendMail(e)}}
                disabled={loading}
              >
                Send Mail
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { Package };
