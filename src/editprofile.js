import React, { useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';
import { IoArrowBack } from 'react-icons/io5'; // Import the necessary icons
import profilePic from './images/pro_pic.png';

const EditProfile = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const handleRoleNavigation = (role) => {
    navigate('/add-role', { state: { role } });
  };

  const handleSubmit = () => {
    alert('Profile edited successfully');
  };

  return (
    <div className="gradient-container-edit">
    <button onClick={() => navigate('/profile')} className="back-button-edit">
        <IoArrowBack size={32} color="#FFC42B" />
      </button> 
      <div className="scroll-view-edit">
        <div className="container-edit">
          <h1 className="header-text-edit">Edit Profile</h1>

          <div className="profile-container-edit">
            <img src={profilePic} alt="Profile" className="profile-image-edit" />
            <div className="profile-text-container-edit">
              <h2 className="profile-name-edit">John Doe</h2>
              <p className="profile-email-edit">johndoe@example.com</p>
            </div>
          </div>

          <div className="line-edit"></div>

          <h2 className="setting-text-edit">Account Details</h2>

          <div className="content-edit">
            <p className="settings-text-edit">Edit Email</p>
            <input
              type="email"
              className="text-input-edit"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="settings-text-edit">Username</p>
            <input
              type="text"
              className="text-input-edit"
              placeholder="Enter your Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <p className="settings-text-edit">Change Password</p>
            <input
              type="password"
              className="text-input-edit"
              placeholder="Enter new Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="settings-text-edit">Contact Number</p>
            <input
              type="text"
              className="text-input-edit"
              placeholder="Enter your Contact Number"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />

            <div className="button-container-edit">
              <button className="submit-button-edit" onClick={handleSubmit}>
                Save
              </button>
            </div>
            
            <div className="button-container-edit">
              <button className="create-event-button-edit" onClick={() => handleRoleNavigation('Service Provider')}>
                <IoMdAdd size={24} color="white" />
                <span className="create-event-text-edit">Add Service Provider Account</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
