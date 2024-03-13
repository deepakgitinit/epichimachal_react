import { useState, useRef, useMemo } from "react";
import axios from "axios";

const Destinations = () => {
  const [items, setItems] = useState([]);
  const sliderRef = useRef(null);

  const scrollSlider = (direction) => {
    const slider = sliderRef.current;
    const scrollAmount = 250; // Adjust as necessary
    slider.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
  };

  useMemo(() => {
    const getDestinations = async () => {
      const destinations = await axios.get(
        "http://localhost:5000/api/v1/destinations"
      );
      setItems(destinations.data.allDestinations);
    };
    getDestinations();
  }, []);

  return (
    <>
      <div className="mx-4 lg:mx-8">
        <div className="flex flex-col mx-2 text-center justify-center items-center mt-16">
          <h1 className="text-3xl mb-2">
            <b>Destinations</b>
          </h1>
          <hr className="mb-8 w-1/3" />
        </div>

        <div
          className="flex overflow-y-auto transition-transform"
          ref={sliderRef}
          style={{ scrollbarWidth: "none" }}
        >
          {items.map((item, index) => {
            return (
              <div key={index}>
                <div className="flex relative justify-center w-64 h-96 mr-4">
                  <img
                    className="object-cover rounded-md"
                    src={"http://localhost:5000/" + item.images[0]}
                    alt=""
                  />
                  <div className="absolute bottom-0 rounded-b-md cursor-pointer text-slate-100 bg-gradient-to-t from-slate-900 bg-opacity-60 p-4 w-full">
                    <h1 className="text-lg">
                      <b>{item.title}</b>
                    </h1>
                    <p className="text-xs">{item.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="text-slate-100 *:bg-slate-900 hover:*:bg-slate-800 *:rounded-full *:px-4 *:py-2 *:mx-2 my-4">
          <button className="prev" onClick={() => scrollSlider(-1)}>
            &#10094;
          </button>
          <button className="next" onClick={() => scrollSlider(1)}>
            &#10095;
          </button>
        </div>
      </div>
    </>
  );
};

export { Destinations };
