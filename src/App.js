import React, { useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import './App.css'; // Import the CSS file for styling

const CustomSelect = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="custom-select">
      <div className="custom-select-input" onClick={() => setIsOpen(!isOpen)}>
        {value}<span className="dropdown-indicator"> ⮟</span>
      </div>
      {isOpen && (
        <div className="custom-select-options">
          {options.map((option) => (
            <div
              key={option}
              className="custom-select-option"
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Settings = () => {
  const [language, setLanguage] = useState('English');
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [textSize, setTextSize] = useState('Medium');
  const navigate = useNavigate();  // Initialize navigate here

  const handleSave = () => {
    alert('Settings updated successfully');
  };

  return (
    <div className="settings-bg">
    <div className="settings-container">
      {/* Single Back Button at Upper Left Corner */}
      <button onClick={() => navigate('/dashboard')} className="back-button-addschedule">
        <IoArrowBack size={32} color="#eeba2b" />
      </button>

      <h1 className="settings-header">Settings</h1>
      
      <div className="settings-item">
        <label className="settings-label">Language</label>
        <p className="settings-description">Default language for public dashboard</p>
        <CustomSelect
          options={['English', 'Spanish', 'French']}
          value={language}
          onChange={setLanguage}
        />
      </div>

      <div className="settings-item">
        <label className="settings-label">Dark Mode</label>
        <p className="settings-description">Toggle to enable dark theme</p>
        <input
          type="checkbox"
          className="settings-checkbox"
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
        />
      </div>

      <div className="settings-item">
        <label className="settings-label">Notifications</label>
        <p className="settings-description">Receive updates and alerts</p>
        <input
          type="checkbox"
          className="settings-checkbox"
          checked={notifications}
          onChange={() => setNotifications(!notifications)}
        />
      </div>

      <div className="settings-item">
        <label className="settings-label">Text Size</label>
        <p className="settings-description">Adjust text size for better readability</p>
        <CustomSelect
          options={['Small', 'Medium', 'Large']}
          value={textSize}
          onChange={setTextSize}
        />
      </div>

      <div className="settings-item">
        <div className="button-container">
          <button className="settings-save-button" onClick={handleSave}>
            Save Settings
          </button>
        </div>
      </div>

    </div>
    </div>
  );
};

export default Settings;
