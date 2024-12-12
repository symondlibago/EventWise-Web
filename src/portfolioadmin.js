import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'; // Ensure the CSS file is correctly imported
import { MdLocationOn, MdEvent } from 'react-icons/md';

// Events data
const eventsData = [
  { id: '1', title: 'Mr. & Mrs. Malik Wedding', image: require('./images/event1.png'), date: '2024-07-01', address: 'CDO' },
  { id: '2', title: 'Elizabeth Birthday', image: require('./images/event2.png'), date: '2024-08-12', address: 'CDO' },
  { id: '3', title: 'Class of 1979 Reunion', image: require('./images/event3.png'), date: '2024-09-25', address: 'CDO' },
  { id: '4', title: 'Corporate Party', image: require('./images/event1.png'), date: '2024-10-30', address: 'CDO' },
  { id: '5', title: 'Annual Gala', image: require('./images/event2.png'), date: '2024-11-15', address: 'CDO' },
  { id: '6', title: 'New Year Celebration', image: require('./images/event3.png'), date: '2024-12-31', address: 'CDO' },
  { id: '7', title: 'Music Festival', image: require('./images/event1.png'), date: '2024-06-22', address: 'CDO' },
  { id: '8', title: 'Art Exhibition', image: require('./images/event2.png'), date: '2024-07-05', address: 'CDO' },
];

// Utility function to group and sort events by month and year
const groupAndSortEventsByMonth = (events) => {
  const groupedEvents = events.reduce((acc, event) => {
    const eventDate = new Date(event.date);
    const month = eventDate.toLocaleString('default', { month: 'long' });
    const year = eventDate.getFullYear();
    const key = `${month} ${year}`;

    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(event);

    return acc;
  }, {});

  // Sort months and events
  const sortedKeys = Object.keys(groupedEvents).sort((a, b) => {
    const [monthA, yearA] = a.split(' ');
    const [monthB, yearB] = b.split(' ');

    const monthOrder = new Date(Date.parse(monthA + ' 1, 2012')).getMonth();
    const monthBOrder = new Date(Date.parse(monthB + ' 1, 2012')).getMonth();

    return (yearA - yearB) || (monthOrder - monthBOrder);
  });

  const sortedGroupedEvents = sortedKeys.reduce((acc, key) => {
    acc[key] = groupedEvents[key].sort((a, b) => new Date(a.date) - new Date(b.date));
    return acc;
  }, {});

  return sortedGroupedEvents;
};

const PortfolioAdmin = () => {
  const navigate = useNavigate();
  const groupedEvents = groupAndSortEventsByMonth(eventsData);

  return (
    <div className="logo-gradient-container-portfolioadmin">
      {/* Main Content */}
      <h1 className="logo-portfolio-text-portfolioadmin">Portfolio</h1>

      {/* Render grouped and sorted events */}
      {Object.keys(groupedEvents).map((month, index) => (
        <div key={index}>
          <h2 className="logo-month-title-portfolioadmin">{month}</h2>
          <div className="logo-events-list-container-portfolioadmin">
            {groupedEvents[month].map((item) => (
              <div key={item.id} className="logo-event-item-portfolioadmin">
                <img src={item.image} alt={item.title} className="logo-image-portfolioadmin" />
                <h2 className="logo-title-portfolioadmin">{item.title}</h2>
                <div className="logo-detail-container-portfolioadmin">
                  <div className="logo-detail-row-portfolioadmin">
                    <MdEvent size={16} color="#2A93D5" />
                    <span className="logo-detail-text-portfolioadmin">{item.date}</span>
                  </div>
                  <div className="logo-detail-row-portfolioadmin">
                    <MdLocationOn size={16} color="#2A93D5" />
                    <span className="logo-detail-text-portfolioadmin">{item.address}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PortfolioAdmin;
