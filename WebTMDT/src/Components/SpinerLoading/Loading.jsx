import React from 'react';
import './Loading.css'; // CSS riêng cho spinner

const FullPageLoader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader"></div>
    </div>
  );
};

export default FullPageLoader;