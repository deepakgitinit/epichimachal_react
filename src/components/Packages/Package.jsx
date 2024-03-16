import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "../../utils/Spinner";

const Package = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [mypackage, setMyPackage] = useState({});
  const [mydestinations, setDestinations] = useState([]);
  const sliderRef = useRef(null);

  const fetchDestinations = async (id) => {
    const destinationUrl = `http://localhost:5000/api/v1/destinations/${id}`;
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
    setLoading(true)
    try {
      const url = `http://localhost:5000/api/v1/packages/${id}`;
      const response = await axios.get(url);
      const packageDetails = response.data.message;
      const destinationsDetails = response.data.message.destinations;
      setMyPackage(packageDetails);
      fetchAllDestinations(destinationsDetails);

    } catch (error) {
        console.log("Error: ", error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchPackage();
  }, [id]);


if (loading) {
  return <Spinner/>
} else if (mypackage === null) {
  return null;
}   return (
    <div className="lg:mx-4 mx-2 rounded overflow-hidden shadow-lg">
      <div className="flex relative">
        <img
          className="w-full h-96 rounded-t-md z-0 object-cover"
          src={"http://localhost:5000/" + mypackage.thumbnail}
          alt={mypackage.title}
        />
        <div className="absolute bottom-0 text-center rounded-b-md cursor-pointer text-slate-100 bg-gradient-to-t from-slate-900 bg-opacity-60 p-4 w-full">
          <h1 className="lg:text-7xl md:text-5xl text-2xl font-sans font-extrabold">
            {mypackage.title}
          </h1>
        </div>
      </div>

      <div className="relative bg-white p-6 *:mb-4">
        <div className="font-bold text-2xl mb-2 relative z-10">
          {mypackage.title}
        </div>

        <p className="text-gray-700 text-lg mb-2">
          <b>Price:</b> &#x20B9; {mypackage.price}
        </p>

        <p className="text-gray-700 text-lg mb-2"><b>Description:</b> {mypackage.description}</p>

        <p className="text-gray-700 text-lg mb-2"><b>Destinations:</b></p>

        <div
          className="flex overflow-y-auto transition-transform"
          ref={sliderRef}
          style={{ scrollbarWidth: "none" }}
        >
          {mydestinations.map((item, index) => {
            return (
              <div key={index}>
                <div className="flex relative justify-center size-64 mr-4">
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

        <p className="text-gray-700 text-lg mb-2">
          <b>Category:</b> {mypackage.category}
        </p>
        <p className="text-gray-700 text-lg mb-2"><b>Time:</b> {mypackage.time}</p>
        <p className="text-gray-700 text-lg mb-2"><b>Tags:</b> {mypackage.tags}</p>
    
      </div>
    </div>
  );
};

export default Package;
