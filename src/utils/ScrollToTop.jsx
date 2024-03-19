// ScrollToTopButton.js

import React, { useState, useEffect } from 'react';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show the button when the user scrolls down
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Add a scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Scroll to the top when the button is clicked
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      className={`fixed size-12 bottom-8 right-8 bg-gray-800 bg-opacity-50 hover:bg-opacity-100 transition-opacity text-white z-50 rounded-full p-2 ${
        isVisible ? 'block' : 'hidden'
      }`}
      onClick={scrollToTop}
      title="Scroll to Top"
    >
      ↑ {/* Up arrow icon */}
    </button>
  );
};

export { ScrollToTopButton };
