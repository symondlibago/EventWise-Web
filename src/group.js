import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css';
import { IoLocationSharp } from "react-icons/io5";
import { FaCalendar } from "react-icons/fa";
import API_URL from './apiconfig';
import defaultImage from './images/default.png'; // Import the default image
const Images = [
  require('./images/pic1.jpg'),
  require('./images/pic2.jpg'),
  require('./images/pic3.jpg'),
  require('./images/pic4.png')
];


const Group = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * Images.length);
    return Images[randomIndex];
  };

  // Fetch events from the Laravel API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/events`); // Replace with your API endpoint
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleEventClick = (eventId) => {
    navigate('/group-attendees', { state: { eventId } });
  };

  return (
    <div className="container-group">
      <h1 className="title-group">Groups</h1>
      <div className="fading-line-group"></div>
      <div className="content-group">
        <div className="left-section-group">
          {events.slice(0, 5).map(event => (
            <div key={event.id} className="event-item-group" onClick={() => handleEventClick(event.id)}>
              {/* Static cover photo */}
              <img src={getRandomImage()} alt={event.name} className="event-image-group" />
              <div className="event-details-group">
                <h3 className="event-title-group">{event.name}</h3>
                <p className="event-date-group">
                  <FaCalendar className="icon-group" /> {event.date}
                </p>
                <div className="event-location-group">
                  <IoLocationSharp className="icon-group" />
                  <p className="event-address-group">{event.location}</p>
                </div>
              </div>
              <div className="attendance-container-group">
                <p className="attendance-text-group">{event.guest_count || 0} Attendees</p>
              </div>
            </div>
          ))}
        </div>

        <div className="middle-line-group"></div>

        <div className="right-section-group">
          {events.slice(5).map(event => (
            <div key={event.id} className="event-item-group" onClick={() => handleEventClick(event.id)}>
              {/* Static cover photo */}
              <img src={defaultImage} alt={event.name} className="event-image-group" />
              <div className="event-details-group">
                <h3 className="event-title-group">{event.name}</h3>
                <p className="event-date-group">
                  <FaCalendar className="icon-group" /> {event.date}
                </p>
                <div className="event-location-group">
                  <IoLocationSharp className="icon-group" />
                  <p className="event-address-group">{event.location}</p>
                </div>
              </div>
              <div className="attendance-container-group">
                <p className="attendance-text-group">{event.guest_count || 0} Attendees</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Group;
