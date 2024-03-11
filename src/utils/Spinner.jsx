import React from 'react';
import './Spinner.css'; // Make sure to define your spinner styles

function Spinner() {
  return (
    <div className="spinner-overlay">
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    </div>
  );
}

export {Spinner};
