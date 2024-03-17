import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Cars = () => {
  const [mycars, setCars] = useState({})
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextCar = () => {
    if (mycars?.length>3) {
      setCurrentIndex(prevIndex => (prevIndex === (mycars?.length - 3) ? 0 : prevIndex + 1));
    }
  };
  
  const prevCar = () => {
    if (mycars?.length>3) {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? (mycars?.length - 3) : prevIndex - 1));
    }
  };
  

  useEffect(()=>{
    const getTaxies = async ()=>{
      const url = "http://localhost:5000/api/v1/taxi"
      const response = await axios.get(url)
      setCars(response.data.message);
    }
    getTaxies();

  }, [])

  return (
    <>
    <div className="container lg:mx-16 my-8">
      <div className="flex flex-col mx-2 text-center justify-center items-center mt-8">
          <h1 className="text-3xl mb-2">
            <b>Rental Cars</b>
          </h1>
          <hr className="mb-8 w-1/3" />
        </div>
    </div>

    <div className="relative w-full overflow-hidden">
      <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 33.33}%)` }}>
        {mycars && mycars.length>0 && mycars.map((car, index) => (
          <div key={index} className={`flex flex-col justify-center items-center w-1/3 flex-shrink-0 ${index === currentIndex ? 'center-image' : ''}`}>
            <img src={"http://localhost:5000/" + car.image} alt={car.name} className={`w-full md:h-auto h-32 object-cover ${index === currentIndex ? 'center-image-size' : 'smaller-image-size'}`} />
            <p className='lg:text-sm text-xs shadow-2xl'>{car.name}</p>
          </div>
        ))}
      </div>
        <button className="absolute top-1/2 left-2 lg:left-0 bg-opacity-40 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded-full z-10" onClick={prevCar}>
        &#10094;
        </button>
        <button className="absolute top-1/2 right-2 lg:right-0 bg-opacity-40 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded-full z-10" onClick={nextCar}>
        &#10095;
        </button>
    </div>


    </>
  );
};

export default Cars;
