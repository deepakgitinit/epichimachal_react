import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { Alert } from "../../utils/Alert";
import { Spinner } from "../../utils/Spinner";
import { useAuth } from "../../contexts/Auth";
import { useNavigate } from "react-router-dom";

const DestinationGrid = () => {
  const [items, setItems] = useState([]);
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  const { token, handleReload } = useAuth();

  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [myalert, setAlert] = useState({
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
    const scrollAmount = 275;
    slider.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
  };

  useEffect(() => {
    const getDestinations = async () => {
      const destinations = await axios.get(
        `${import.meta.env.VITE_DESTINATIONS}`
      );
      const reversedDestinations = destinations.data.allDestinations.reverse();
      setItems(reversedDestinations);
    };
    getDestinations();
  }, []);

  const handleDelete = async (e, id) => {
    e.preventDefault();
    try {
      const value = confirm("Do you want to delete Destination?");

      if (value) {
        setLoading(true);
        const url = `${import.meta.env.VITE_DESTINATIONS}/${id}`;
        const mytoken = "Bearer " + token;

        const response = await axios.delete(url, {
          headers: {
            Authorization: mytoken,
          },
        });

        if (
          response.data.status == "Successful"
        ) {
          displayMessage("success", response.data.message);
          setTimeout(() => {
            handleReload();
          }, 1500);
        }
      } else {
        displayMessage("danger", "Cancelled by User");
        return;
      }
    } catch (error) {
      displayMessage("danger", "Internal Error Occured.");
    } finally {
      setLoading(false);
    }
  };

  const handleError = (e) =>{
    e.target.src = "\\public\\Loading_Image.png";
  };

  const gotoDestination = (id) =>{
    navigate(`/destinations/${id}`)
    window.scrollTo({ top: 0 });
  }


  if (loading) {
    return <Spinner />;
  } else {
    return (
      <>
        {showAlert && <Alert alert={myalert} />}
        <div className="mx-4 lg:mx-8 ">
          <div className="flex flex-col mx-2 text-center justify-center items-center mt-16">
            <h1 className="text-3xl mb-2">
              <b>Destinations</b>
            </h1>
            <hr className="mb-8 w-1/3" />
          </div>

          <div
            className="flex relative overflow-y-auto transition-transform"
            ref={sliderRef}
            style={{ scrollbarWidth: "none" }}
          >
            {items.map((item) => {
              return (
                <div key={item._id} >
                  <div className="flex relative justify-center size-64 mr-4">
                    <span
                      className="flex absolute right-2 top-2 bg-opacity-70 hover:bg-opacity-100 transition-opacity text-slate-100 bg-slate-600 cursor-pointer size-8 rounded-full text-center justify-center items-center"
                      onClick={(event) => {
                        handleDelete(event, item._id);
                      }}
                    >
                      &#10005;
                    </span>

                    <button
                    className="absolute top-0 left-2 text-xs py-1 px-2 my-2 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-100"
                    onClick={() => {
                      gotoDestination(item._id);
                    }}
                  >
                    Open
                  </button>

                    <img
                      className="object-cover rounded-md"
                      src={`${import.meta.env.VITE_LOCALHOST}/` + item.images[0]}
                      alt=""
                      onError={handleError}
                    />
                    <div className="absolute bottom-0 rounded-b-md text-slate-100 bg-slate-900 bg-opacity-60 p-4 w-full">
                      <h1 className="text-lg">
                        <b>{item.title}</b>
                      </h1>
                      <p className="text-xs line-clamp-2">{item.description}</p>
                      <ul className="text-xs flex flex-row mt-2">
                        {item.tags.map((item, index) => {
                          return (
                            <li key={index} className="mr-2">
                              {item}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex justify-center items-center text-slate-100 *:bg-opacity-40 *:bg-slate-900 hover:*:bg-slate-800 *:rounded-full *:px-4 *:py-2 *:mx-2 my-4 mb-16">
          <button className="prev" onClick={() => scrollSlider(-1)}>
            &#10094;
          </button>
          <button className="next" onClick={() => scrollSlider(1)}>
            &#10095;
          </button>
        </div>
      </>
    );
  }
};

export { DestinationGrid };
