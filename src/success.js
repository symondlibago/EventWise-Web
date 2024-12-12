import React from 'react';
import { useNavigate } from 'react-router-dom';

const Success = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="success-container">
      <h1>Success!</h1>
      <p>Your event has been successfully created and service providers have been selected.</p>
      <button onClick={handleBackToHome}>Back to Home</button>
    </div>
  );
};

export default Success;
