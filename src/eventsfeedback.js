import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';  // Import Pie chart
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faMapMarker, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Chart as ChartJS, ArcElement, CategoryScale, Tooltip, Legend } from 'chart.js';

// Register the necessary chart elements
ChartJS.register(ArcElement, CategoryScale, Tooltip, Legend);

const initialEventsData = [
  { id: '1', title: 'Mr. & Mrs. Malik Wedding', date: '2024-07-01', address: 'CDO', buttons: ['Feedback'] },
  { id: '2', title: 'Elizabeth Birthday', date: '2024-08-12', address: 'CDO', buttons: ['Feedback'] },
  { id: '3', title: 'Class of 1979 Reunion', date: '2024-09-25', address: 'CDO', buttons: ['Feedback'] },
  { id: '4', title: 'Corporate Party', date: '2024-10-30', address: 'CDO', buttons: ['Feedback'] },
  { id: '5', title: 'Annual Gala', date: '2024-11-15', address: 'CDO', buttons: ['Feedback'] },
  { id: '6', title: 'New Year Celebration', date: '2024-12-31', address: 'CDO', buttons: ['Feedback'] },
  { id: '7', title: 'Music Festival', date: '2024-06-22', address: 'CDO', buttons: ['Feedback'] },
  { id: '8', title: 'Art Exhibition', date: '2024-07-05', address: 'CDO', buttons: ['Feedback'] },
];

function EventsFeedback() {
  const [search, setSearch] = useState('');
  const [filteredEvents, setFilteredEvents] = useState(initialEventsData);
  const navigate = useNavigate();

  const handleSearch = (text) => {
    setSearch(text);
    if (text) {
      const newData = initialEventsData.filter((item) => {
        const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredEvents(newData);
    } else {
      setFilteredEvents(initialEventsData);
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
      <h3 className="title-eventfeedback">{item.title}</h3>
      <div className="detail-container-eventfeedback">
        <div className="detail-row-eventfeedback">
          <FontAwesomeIcon icon={faCalendar} size="lg" color="#2A93D5" />
          <span className="detail-text-eventfeedback">{item.date}</span>
        </div>
        <div className="detail-row-eventfeedback">
          <FontAwesomeIcon icon={faMapMarker} size="lg" color="#2A93D5" />
          <span className="detail-text-eventfeedback">{item.address}</span>
        </div>
      </div>
      <div className="buttons-container-eventfeedback">
        {item.buttons.map((button, index) => (
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
