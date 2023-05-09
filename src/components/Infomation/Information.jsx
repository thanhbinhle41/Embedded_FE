import React from "react";

const Information = ({ measureData}) => {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <div>
        <span className="fw-medium">{`Temperature: ${measureData?.temperature}°C`}</span>
        <i className="fa-solid fa-temperature-half ms-2"></i>
      </div>
      <div>
        <span className="fw-medium">{`Air humidity: ${measureData?.air_humidity}`}</span>
        <i className="fa-regular fa-paper-plane  ms-2"></i>
      </div>
      <div>
        <span className="fw-medium">{`Water: ${measureData?.water}`}</span>
        <i className="fa-solid fa-droplet ms-2"></i>
      </div>
      <div>
        <span className="fw-medium">{`Soil humidity: ${measureData?.soil}`}</span>
        <i className="fa-solid fa-mountain-sun  ms-2"></i>
      </div>
      <div>
        <span className="fw-medium">{`Light: ${measureData?.light}`}</span>
        <i className="fa-regular fa-sun ms-2"></i>
      </div>
    </div>
  );
};

export default Information;
