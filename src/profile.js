import React, { useState, useEffect } from 'react';
import './App.css';
import { IoMdCreate, IoMdArrowForward, IoMdClose } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import profilePic from './images/pro_pic.png';
import axios from 'axios';
import API_URL from './apiconfig';

const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const Profile = () => {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const packagesData = [
    { id: '1', packagename: 'Package A', image: require('./images/event1.png'), price: '100,000', pax: '300 pax' },
    { id: '2', packagename: 'Package B', image: require('./images/event2.png'), price: '100,000', pax: '250 pax' },
    { id: '3', packagename: 'Package C', image: require('./images/event3.png'), price: '100,000', pax: '150 pax' },
    { id: '4', packagename: 'Package D', image: require('./images/event1.png'), price: '100,000', pax: '200 pax' },
    { id: '5', packagename: 'Package E', image: require('./images/event2.png'), price: '100,000', pax: '100 pax' },
    { id: '6', packagename: 'Package F', image: require('./images/event3.png'), price: '100,000', pax: '50 pax' },
    { id: '7', packagename: 'Package G', image: require('./images/event1.png'), price: '100,000', pax: '50 pax' },
    { id: '8', packagename: 'Package H', image: require('./images/event2.png'), price: '100,000', pax: '200 pax' },
    { id: '9', packagename: 'Package I', image: require('./images/event2.png'), price: '100,000', pax: '500 pax' },
  ];

  // Use default month (e.g., current month) if no month is selected
  const currentMonth = new Date().getMonth() + 1; // Month is 0-based, so add 1

  // Fetch events data from the backend API when the component mounts or when the selected month changes
  useEffect(() => {
    const fetchEventsByMonth = async () => {
      const monthToFetch = selectedMonth || currentMonth;
      try {
        const response = await axios.get(`${API_URL}/api/events/month/${monthToFetch}`);
        console.log('Fetched events:', response.data);  // Log the data to check it
        setEventsData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        setLoading(false);
      }
    };
  
    fetchEventsByMonth();
  }, [selectedMonth]);
  
  
  

  const groupedEventsByMonth = eventsData.reduce((acc, event) => {
    const monthNumber = new Date(event.date).getMonth() + 1; // Month (1-12)
    if (!acc[monthNumber]) {
      acc[monthNumber] = [];
    }
    acc[monthNumber].push(event);
    return acc;
  }, {});
  
  

  const allMonthsWithEvents = months.map((month, index) => ({
    month,
    events: groupedEventsByMonth[index + 1] || [] // Access by month number (1-12)
  }));
  

  const renderEventItem = (item) => (
    <div className="event-item-profile" key={item.id}>
      <img src={item.coverPhoto} alt={item.title} className="image-profile" />
      <h3 className="title-profile">{item.name}</h3>
      <div className="detail-container-profile">
        <div className="detail-row-profile">
          <span className="detail-text-profile">{item.date}</span>
        </div>
        <div className="detail-row-profile">
          <span className="detail-text-profile">{item.location}</span>
        </div>
      </div>
    </div>
  );

  const renderPackageItem = (item) => (
    <div className="package-item-profile" key={item.id}>
      <img src={item.image} alt={item.packagename} className="image-profile" />
      <div className="packagename-profile">{item.packagename}</div>
      <div className="detail-container-profile">
        <div className="detail-row-profile">
          <span className="detail-text-profile">{item.price}</span>
        </div>
        <div className="detail-row-profile">
          <span className="detail-text-profile">{item.pax}</span>
        </div>
      </div>
    </div>
  );

  const renderEventsForMonth = (month) => (
    <div className="overlay-profile" onClick={() => setSelectedMonth(null)}>
      <div className="overlay-content-profile" onClick={(e) => e.stopPropagation()}>
      <h2 className="overlay-header-profile">Events in {months[month - 1]}</h2>

        <button className="close-button-profile" onClick={() => setSelectedMonth(null)}>
          <IoMdClose size={24} color="black" />
        </button>
        <div className="events-list-container-overlay-profile">
        {groupedEventsByMonth[month]?.map(renderEventItem) ?? (
  <p className="no-events-text-profile">No events in this month</p>
)}
        </div>
      </div>
    </div>
  );

  return (
    <div className="gradient-container-profile">
      <div className="scroll-view-profile">
        <h1 className="header-text-profile">Profile</h1>
        <hr className="header-line-profile" />

        <div className="profile-section-profile">
          <img src={profilePic} alt="Profile" className="profile-picture-profile" />
          <h2 className="name-text-profile">Arvil</h2>
          <p className="address-text-profile">Organizer</p>

          <div className="button-container-profile">
            <button className="edit-button-profile" onClick={() => navigate('/edit-profile')}>
              <IoMdCreate size={24} color="white" />
              <span className="edit-button-text-profile">Edit Profile</span>
            </button>
          </div>
        </div>

        <h2 className="popular-event-text-profile">Popular Events</h2>

        {loading ? (
          <p>Loading events...</p>
        ) : (
          <div className="events-list-container-profile">
            {allMonthsWithEvents.map(({ month, events }) => (
              <div
                className="month-folder-profile"
                key={month}
                onClick={() => setSelectedMonth(months.indexOf(month) + 1)}

              >
                <h3 className="month-text-profile">{month}</h3>
                {events.length > 0 && (
                  <span className="event-count-profile">{events.length}</span>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="packages-section-profile">
          <h2 className="packages-header-profile">Packages</h2>
          <div className="add-package-container">
          </div>
          <div className="packages-list-profile"> {/* New wrapper for package items */}
          <div className="broken-box-profile">
              <p className="broken-box-text">Add New Package</p>
              <button className="add-package-button-profile" onClick={() => navigate('/package')}>
                Add Package
              </button>
            </div>
            {packagesData.map(renderPackageItem)} {/* Render package items */}
          </div>
        </div>


      </div>

      {selectedMonth && renderEventsForMonth(selectedMonth)}
    </div>
  );
};

export default Profile;
