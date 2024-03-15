import React from 'react';
import CarSlider from './CarComponent/CarSlider';

const cars = [
  { name: 'Car 1', image: 'https://imgd.aeplcdn.com/370x208/n/cw/ec/130591/fronx-exterior-right-front-three-quarter-109.jpeg' },
  { name: 'Car 2', image: 'https://imgd.aeplcdn.com/370x208/n/cw/ec/141867/nexon-exterior-right-front-three-quarter-71.jpeg?isig=0&q=80' },
  { name: 'Car 3', image: 'https://imgd.aeplcdn.com/370x208/n/cw/ec/40432/scorpio-n-exterior-right-front-three-quarter-75.jpeg' },
  { name: 'Car 4', image: 'https://imgd.aeplcdn.com/642x336/cw/ec/42611/Tata-Nexon-Exterior-172215.jpg?wm=0&q=80' },
  { name: 'Car 5', image: 'https://imgd.aeplcdn.com/370x208/n/cw/ec/40432/scorpio-n-exterior-right-front-three-quarter-75.jpeg' },

];

const Cars = () => {
  return (
    <div className="container lg:mx-16 my-8">
      <div className="flex flex-col mx-2 text-center justify-center items-center mt-8">
          <h1 className="text-3xl mb-2">
            <b>Rental Cars</b>
          </h1>
          <hr className="mb-8 w-1/3" />
        </div>
      <CarSlider cars={cars}/>
    </div>
  );
};

export default Cars;
