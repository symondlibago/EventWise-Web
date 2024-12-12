import React, { useState } from 'react';
import './App.css'; // Ensure the CSS file is correctly imported
import { IoMdCreate, IoMdArrowForward, IoMdClose } from 'react-icons/io';
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router for navigation
import profilePic from './images/pro_pic.png'; // Correctly imported profile picture

const eventsData = [
  { id: '1', title: 'Mr. & Mrs. Malik Wedding', image: require('./images/event1.png'), date: '2024-07-01', address: 'CDO' },
  { id: '2', title: 'Elizabeth Birthday', image: require('./images/event2.png'), date: '2024-08-12', address: 'CDO' },
  { id: '3', title: 'Class of 1979 Reunion', image: require('./images/event3.png'), date: '2024-09-25', address: 'CDO' },
  { id: '4', title: 'Corporate Party', image: require('./images/event1.png'), date: '2024-10-30', address: 'CDO' },
  { id: '5', title: 'Annual Gala', image: require('./images/event2.png'), date: '2024-11-15', address: 'CDO' },
  { id: '6', title: 'New Year Celebration', image: require('./images/event3.png'), date: '2024-12-31', address: 'CDO' },
  { id: '7', title: 'Music Festival', image: require('./images/event1.png'), date: '2024-06-22', address: 'CDO' },
  { id: '8', title: 'Art Exhibition', image: require('./images/event2.png'), date: '2024-07-05', address: 'CDO' },
  { id: '9', title: 'Art Exhibition', image: require('./images/event2.png'), date: '2024-05-05', address: 'CDO' },
  { id: '10', title: 'Art Exhibition', image: require('./images/event2.png'), date: '2024-05-05', address: 'CDO' },
  { id: '11', title: 'Art Exhibition', image: require('./images/event2.png'), date: '2024-05-05', address: 'CDO' },
  { id: '12', title: 'Art Exhibition', image: require('./images/event2.png'), date: '2024-05-05', address: 'CDO' },
  { id: '13', title: 'Mr. & Mrs. Malik Wedding', image: require('./images/event1.png'), date: '2024-07-01', address: 'CDO' },
  { id: '14', title: 'Mr. & Mrs. Malik Wedding', image: require('./images/event1.png'), date: '2024-07-01', address: 'CDO' },
  { id: '15', title: 'Mr. & Mrs. Malik Wedding', image: require('./images/event1.png'), date: '2024-07-01', address: 'CDO' },
  { id: '16', title: 'Mr. & Mrs. Malik weddings', image: require('./images/event1.png'), date: '2024-07-01', address: 'CDO' },
  { id: '17', title: 'Mr. & Mrs. Malik weddings', image: require('./images/event1.png'), date: '2024-08-01', address: 'CDO' },
];

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

const getMonthName = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('default', { month: 'long', year: 'numeric' });
};

const groupedEvents = eventsData.reduce((acc, event) => {
  const month = getMonthName(event.date);
  if (!acc[month]) {
    acc[month] = [];
  }
  acc[month].push(event);
  return acc;
}, {});

const sortedEventsData = Object.keys(groupedEvents).sort((a, b) => {
  const dateA = new Date(`01 ${a}`);
  const dateB = new Date(`01 ${b}`);
  return dateA - dateB;
}).map(month => ({
  month: month,
  events: groupedEvents[month]
}));

const Profile = () => {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const navigate = useNavigate();


  const renderEventItem = (item) => (
    <div className="event-item-profile" key={item.id}>
      <img src={item.image} alt={item.title} className="image-profile" />
      <h3 className="title-profile">{item.title}</h3>
      <div className="detail-container-profile">
        <div className="detail-row-profile">
          <span className="detail-text-profile">{item.date}</span>
        </div>
        <div className="detail-row-profile">
          <span className="detail-text-profile">{item.address}</span>
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
        <h2 className="overlay-header-profile">Events in month of {month}</h2>
        <button className="close-button-profile" onClick={() => setSelectedMonth(null)}>
          <IoMdClose size={24} color="black" />
        </button>
        <div className="events-list-container-overlay-profile">
          {groupedEvents[month].map(renderEventItem)}
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
              <IoMdCreate size={24} color="black" />
              <span className="edit-button-text-profile">Edit Profile</span>
            </button>
          </div>
        </div>

        <h2 className="popular-event-text-profile">Popular Events</h2>

        

        <div className="events-list-container-profile">
        <div className="broken-box-profile-events">
                  <button className="add-package-button-profile" onClick={() => navigate('/create-event')}>Add Event</button>
                </div> 
          {sortedEventsData.map(({ month }) => (
            <div className="month-folder-profile" key={month} onClick={() => setSelectedMonth(month)}>
              <h3 className='month-text-profile'>{month}</h3>
            </div>
          ))}
        </div>

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
