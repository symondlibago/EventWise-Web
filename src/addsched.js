import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaChevronDown } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { IoArrowBack, IoAdd } from 'react-icons/io5';
import './App.css'; // Ensure this CSS file is created for custom styles

const eventTypes = ["Wedding", "Birthday", "Conference", "Meeting", "Party"];

const AddSched = () => {
  const navigate = useNavigate(); // Use the navigate hook
  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventDate, setEventDate] = useState(null);
  const [eventVenue, setEventVenue] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [filteredTypes, setFilteredTypes] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('');

  useEffect(() => {
    if (eventType) {
      setFilteredTypes(eventTypes.filter(type =>
        type.toLowerCase().includes(eventType.toLowerCase())
      ));
    } else {
      setFilteredTypes([]);
    }
  }, [eventType]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSelectEventType = (type) => {
    setSelectedType(type);
    setEventType(type); // Set eventType as well when selecting
    setDropdownOpen(false);
  };

  const handleSave = () => {
    console.log({
      eventName,
      eventType,
      eventDate,
      eventVenue,
      startTime,
      endTime,
    });
  };

  return (
    <div className="sched-bg">
    <div className="addschedule-container">
      <button onClick={() => navigate('/schedule')} className="back-button-addschedule">
        <IoArrowBack size={32} color="#FFC42B" />
      </button>
      <h2>Add Schedule</h2>

      <div className="form-group-addschedule">
        <label>Enter Event Name:</label>
        <input
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          placeholder="Enter Event Name"
          className="input-addschedule"
        />
      </div>

      <div className="form-group-addschedule">
        <label>Choose Event Type:</label>
        <div className="dropdown-container-addschedule">
          <div className="dropdown-button-addschedule" onClick={toggleDropdown}>
            {selectedType || "Select Event Type"}
            <FaChevronDown />
          </div>
          <div className={`dropdown-menu-addschedule ${dropdownOpen ? 'show' : ''}`}>
            {eventTypes.map((type, index) => (
              <button key={index} onClick={() => handleSelectEventType(type)}>
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="form-group-addschedule">
        <label>Choose Event Date:</label>
        <DatePicker
          selected={eventDate}
          onChange={(date) => setEventDate(date)}
          className="datepicker-addschedule input-addschedule"
          placeholderText="Choose Event Date"
        />
      </div>

      <div className="form-group-addschedule">
        <label>Enter Event Venue:</label>
        <input
          type="text"
          value={eventVenue}
          onChange={(e) => setEventVenue(e.target.value)}
          placeholder="Enter Event Venue"
          className="input-addschedule"
        />
      </div>

      <div className="form-group-addschedule">
        <label>Enter Event Started:</label>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="input-addschedule"
        />
      </div>

      <div className="form-group-addschedule">
        <label>Enter Event Ended:</label>
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="input-addschedule"
        />
      </div>

      <button className="save-button-addschedule" onClick={handleSave}>Save</button>
    </div>
    </div>
  );
};

export default AddSched;
