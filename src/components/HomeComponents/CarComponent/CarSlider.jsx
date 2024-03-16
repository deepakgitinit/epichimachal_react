import React, { useState } from 'react';

const CarSlider = ({ cars }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextCar = () => {
    setCurrentIndex((prevIndex) => (prevIndex === cars.length - 3 ? 0 : prevIndex + 1));
  };

  const prevCar = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? cars.length - 3 : prevIndex - 1));
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 33.33}%)` }}>
        {cars.map((car, index) => (
          <div key={index} className={`flex flex-col justify-center items-center w-1/3 flex-shrink-0 ${index === currentIndex ? 'center-image' : ''}`}>
            <img src={car.image} alt={car.name} className={`w-full h-auto ${index === currentIndex ? 'center-image-size' : 'smaller-image-size'}`} />
            <p className='lg:text-sm text-xs shadow-2xl'>{car.name}</p>
          </div>
        ))}
      </div>
      {/* <div className='flex relative'> */}
        <button className="absolute top-1/2 left-2 lg:left-0 bg-opacity-40 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded-full z-10" onClick={prevCar}>
        &#10094;
        </button>
        <button className="absolute top-1/2 right-2 lg:right-0 bg-opacity-40 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded-full z-10" onClick={nextCar}>
        &#10095;
        </button>
    </div>
  );
};

export default CarSlider;
