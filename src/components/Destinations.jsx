import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const DestinationsPage = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const openDestination = (destinationID) =>{
    navigate(`/destinations/${destinationID}`);
  }

  useEffect(() => {
    const getDestinations = async () => {
      const url = `${import.meta.env.VITE_DESTINATIONS}`;

      const destinations = await axios.get(url);

      const reversedDestinations = destinations.data.allDestinations.reverse();
      setItems(reversedDestinations);
    };

    getDestinations();

  }, []);

  return (
    <>
      <>
      <div className="mx-4 lg:mx-8">
        <div className="flex flex-col mx-2 text-center justify-center items-center mt-16">
          <h1 className="text-3xl mb-2">
            <b>Destinations</b>
          </h1>
          <hr className="mb-8 w-1/3" />
        </div>

        <div className="flex flex-wrap justify-center items-center">
          {items && items.map((item, index) => {
            return (
              <div className="cursor-pointer mb-4" key={item._id} onClick={()=>{openDestination(item._id)}}>
                <div className="flex relative justify-center size-64 mr-4">
                  <img
                    className="object-cover rounded-md"
                    src={`${import.meta.env.VITE_LOCALHOST}/` + item.images[0]}
                    alt=""
                  />
                  <div className="absolute bottom-0 rounded-b-md text-slate-100 bg-gradient-to-t from-slate-900 bg-opacity-60 p-4 w-full">
                    <h1 className="text-lg">
                      <b>{item.title}</b>
                    </h1>
                    <p className="text-xs line-clamp-2">{item.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </>
    </>
  );
};

export { DestinationsPage };
