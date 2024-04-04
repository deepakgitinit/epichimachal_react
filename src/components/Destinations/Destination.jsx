import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "../../utils/Spinner";

const Destination = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [mydestination, setDestination] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const getDestination = async () => {
    setLoading(true);
    try {
      const url = `${import.meta.env.VITE_DESTINATIONS}/${id}`;
      const response = await axios.get(url);
      setDestination(response.data.message);

    } catch (error) {
      console.log("Error fetching destination:", error);

    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === (mydestination?.images?.length - 1) ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? (mydestination?.images?.length - 1) : prevIndex - 1
    );
  };

  useEffect(() => {
    getDestination();
  }, [id]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [mydestination?.images]);

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-md p-6" style={{maxWidth: "720px"}}>
        <h2 className="text-2xl font-bold mb-4">{mydestination.title}</h2>
        <div className="flex relative overflow-hidden">
          <button
            className="absolute inset-y-0 left-0 top-1/2 z-10 flex items-center justify-center w-12 h-12 text-white bg-slate-100 rounded-full bg-opacity-50 hover:bg-opacity-75"
            onClick={prevSlide}
          >
            &#10094;
          </button>
          <button
            className="absolute inset-y-0 right-0 top-1/2 z-10 flex items-center justify-center w-12 h-12 text-white bg-slate-100 rounded-full bg-opacity-50 hover:bg-opacity-75"
            onClick={nextSlide}
          >
            &#10095;
          </button>
          <div className="flex relative transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentImageIndex * 100}%)`}}>
            {mydestination.images &&
              mydestination.images.map((image, index) => (
                <img
                  key={index}
                  src={`${import.meta.env.VITE_LOCALHOST}/${image}`}
                  alt={`Slide ${index}`}
                  className="top-0 left-0 w-full h-full rounded-md object-cover"
                />
              ))}
          </div>
        </div>
        <p className="text-gray-700 text-base mt-4">{mydestination.description}</p>
        <div className="flex items-center mt-4">
          {mydestination.tags && mydestination.tags != 0 && mydestination.tags.map((tag, index) => (
            <span key={index} className="inline-block bg-gray-200 text-gray-700 px-3 py-1 text-sm font-semibold rounded-full mr-2">
              {tag}
            </span>
          ))}
        </div>
      </div>
    );
  }
};

export { Destination };
