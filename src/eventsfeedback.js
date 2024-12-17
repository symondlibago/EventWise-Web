import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';  // Import Pie chart
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faMapMarker, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Chart as ChartJS, ArcElement, CategoryScale, Tooltip, Legend } from 'chart.js';
import API_URL from './apiconfig';


// Register the necessary chart elements
ChartJS.register(ArcElement, CategoryScale, Tooltip, Legend);

function EventsFeedback() {
  const [search, setSearch] = useState('');
  const [events, setEvents] = useState([]);  // State to hold events data
  const [filteredEvents, setFilteredEvents] = useState([]);  // State for filtered events
  const [loading, setLoading] = useState(true);  // Loading state
  const navigate = useNavigate();

  // Fetch events on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/events`);
        setEvents(response.data);
        setFilteredEvents(response.data);  // Set filteredEvents with the fetched data
      } catch (error) {
        console.error("Error fetching events data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []); // Empty dependency array ensures this runs only once

  const handleSearch = (text) => {
    setSearch(text);
    if (text) {
      const newData = events.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredEvents(newData);
    } else {
      setFilteredEvents(events);  // Reset filtered events when search is cleared
    }
  };

  const handleDelete = (eventId) => {
    const newData = filteredEvents.filter((item) => item.id !== eventId);
    setFilteredEvents(newData);
  };

  // Pie chart data configuration
  const pieData = {
    labels: ['Positive', 'Negative', 'Neutral'],
    datasets: [
      {
        label: 'Feedback',
        data: [65, 20, 15], // Example data
        backgroundColor: ['green', 'red', 'yellow'], // Example colors
        hoverBackgroundColor: ['green', 'red', 'yellow'],
      },
    ],
  };

  // Pie chart options to adjust size
  const pieOptions = {
    width: 150, // Adjust width as needed
    height: 150, // Adjust height as needed
    maintainAspectRatio: false, // Prevents the chart from maintaining aspect ratio
  };

  const renderEventItem = (item) => (
    <div key={item.id} className="item-container-eventfeedback">
      <div className="pie-chart-container-eventfeedback">
        <Pie data={pieData} options={pieOptions} /> {/* Apply options to Pie chart */}
      </div>
      <h3 className="title-eventfeedback">{item.name}</h3>
      <div className="detail-container-eventfeedback">
        <div className="detail-row-eventfeedback">
          <FontAwesomeIcon icon={faCalendar} size="lg" color="#eeba2b" />
          <span className="detail-text-eventfeedback">{item.date}</span>
        </div>
        <div className="detail-row-eventfeedback">
          <FontAwesomeIcon icon={faMapMarker} size="lg" color="#eeba2b" />
          <span className="detail-text-eventfeedback">{item.location}</span>
        </div>
      </div>
      <div className="buttons-container-eventfeedback">
        {(item.buttons || []).map((button, index) => (  // Default to empty array if item.buttons is undefined
          <button
            key={index}
            className="button-eventfeedback"
            onClick={() => {
              if (button === 'Delete') {
                handleDelete(item.id);
              } else if (button === 'Feedback') {
                navigate('/feedback/feedback-events');
              }
            }}
          >
            {button}
          </button>
        ))}
      </div>
    </div>
  );
  

  if (loading) {
    return <div>Loading events...</div>; // Show loading message while data is being fetched
  }

  return (
    <div className="gradient-container-eventfeedback">
      <div className="container-eventfeedback">
        <div className="search-container-eventfeedback">
          <FontAwesomeIcon icon={faSearch} size="lg" color="#888" className="search-icon-eventfeedback" />
          <input
            type="text"
            className="search-box-eventfeedback"
            placeholder="Search Event"
            onChange={(e) => handleSearch(e.target.value)}
            value={search}
          />
        </div>
        <div className="event-list-eventfeedback">
          {filteredEvents.map(renderEventItem)}
        </div>
      </div>
    </div>
  );
}

export default EventsFeedback;
