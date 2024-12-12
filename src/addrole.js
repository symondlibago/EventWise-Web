import React, { useState, useEffect } from 'react';
import './App.css'; // Ensure your CSS file is created and imported
import { useNavigate, useLocation } from 'react-router-dom'; // For navigation and state management
import profilePic from './images/pro_pic.png'; // Ensure you use the correct image path
import { IoArrowBack } from 'react-icons/io5'; // Import the necessary icons


const AddRole = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // State variables for form fields
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [serviceOffer, setServiceOffer] = useState('');

  // Extract role from the location state (or set a default value)
  useEffect(() => {
    if (location.state && location.state.role) {
      setRole(location.state.role);
    }
  }, [location.state]);

  // Handle form submission
  const handleSubmit = () => {
    alert('Role added successfully');
  };

  return (
    <div className="gradient-container-addrole">
    <button onClick={() => navigate('/edit-profile')} className="back-button-addrole">
        <IoArrowBack size={32} color="#FFC42B" />
      </button>
      <div className="scroll-view-addrole">
        <div className="container-addrole">
          <h1 className="header-text-addrole">Add Role</h1>

          <div className="profile-container-addrole">
            <img src={profilePic} alt="Profile" className="profile-image-addrole" />
            <div className="profile-text-container-addrole">
              <h2 className="profile-name-addrole">John Doe</h2>
              <p className="profile-email-addrole">johndoe@example.com</p>
            </div>
          </div>

          <div className="line-addrole"></div>

          <h2 className="setting-text-addrole">Role Details</h2>

          <div className="content-addrole">
            <p className="settings-text-addrole">Name</p>
            <input
              type="text"
              className="text-input-addrole"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <p className="settings-text-addrole">Role</p>
            <input
              type="text"
              className="text-input-addrole"
              placeholder="Enter Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
            <p className="settings-text-addrole">Service Offer</p>
            <input
              type="text"
              className="text-input-addrole"
              placeholder="Enter Service Offer"
              value={serviceOffer}
              onChange={(e) => setServiceOffer(e.target.value)}
            />

            <div className="button-container-addrole">
              <button className="submit-button-addrole" onClick={handleSubmit}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRole;
