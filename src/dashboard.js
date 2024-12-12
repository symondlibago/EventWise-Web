import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import { IoLocationSharp, IoTime } from "react-icons/io5";
import { FaCalendar } from "react-icons/fa";
import API_URL from './apiconfig';

// Packages data
const packageImages = [
  require('./images/event1.png'),
  require('./images/event2.png'),
  require('./images/event3.png')
];

const packageDescriptions = [
  "This package offers a comprehensive solution for your event needs. With top-notch services and amenities, Package ensures a memorable experience for all your guests.",
  "Package provides premium services tailored to your event's specific needs. From catering to decoration, we've got you covered.",
  "A versatile package offering everything from entertainment to venue setup. Perfect for all types of events and gatherings."
];

function Dashboard() {
  const [packages, setPackages] = useState([]);
  const [monthlyBookings, setMonthlyBookings] = useState([]);
  const [currentMonth, setCurrentMonth] = useState('');
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showDetailsOverlay, setShowDetailsOverlay] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showPackageOverlay, setShowPackageOverlay] = useState(false);
  const [selectedDayEvents, setSelectedDayEvents] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [packageToDelete, setPackageToDelete] = useState(null); // Track the selected package to delete
  const navigate = useNavigate();

  function formatTime(timeString) {
    if (!timeString) return ''; // Handle undefined or empty input early

    // Split timeString to extract hours and minutes
    const [hours, minutes] = timeString.split(':');

    // Create a Date object with the extracted time
    const date = new Date();
    date.setHours(hours, minutes);

    // Format the time as '3:48 PM'
    return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
    });
}

  

  useEffect(() => {
    axios.get(`${API_URL}/api/admin/packages`)
      .then((response) => {
        // Randomly assign images and descriptions to the fetched packages
        const updatedPackages = response.data.map((pkg) => ({
          ...pkg,
          image: packageImages[Math.floor(Math.random() * packageImages.length)],
          description: packageDescriptions[Math.floor(Math.random() * packageDescriptions.length)],
        }));

        setPackages(updatedPackages);
      })
      .catch((error) => {
        console.error('Error fetching packages:', error);
      });

    axios.get(`${API_URL}/api/events`)
      .then((response) => {
        const today = new Date();
        const currentMonthIndex = today.getMonth();
        const eventDates = response.data
          .filter((event) => new Date(event.date).getMonth() === currentMonthIndex)
          .map((event) => new Date(event.date).getDate());

        setMonthlyBookings(eventDates);
        setCurrentMonth(`${today.toLocaleString('default', { month: 'long' })} ${today.getFullYear()}`);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  }, []);

  const fetchEventsForDay = (day) => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth(); // Month is zero-indexed, so November is 10
  
    // Format the date for the selected day in the current month and year
    const selectedDate = new Date(currentYear, currentMonth, day);
  
    axios.get(`${API_URL}/api/events`, { params: { date: selectedDate.toISOString().split('T')[0] } })
      .then((response) => {
        // Filter events that match the exact date, not just the day of the month
        const filteredEvents = response.data.filter((event) => {
          const eventDate = new Date(event.date);
          return (
            eventDate.getFullYear() === currentYear &&
            eventDate.getMonth() === currentMonth &&
            eventDate.getDate() === day
          );
        });
  
        setEvents(filteredEvents);
        setSelectedDayEvents(filteredEvents.length > 0 ? filteredEvents : [{ name: 'No events on this day', venue: '' }]);
        setSelectedDay(day);
      })
      .catch((error) => {
        console.error('Error fetching events for day:', error);
        setEvents([]);
        setSelectedDayEvents([{ name: 'No events on this day', venue: '' }]);
      });
  };

  const handleDayClick = (day) => {
    fetchEventsForDay(day);
    setSelectedDay(day)
  };

  const handleCloseOverlay = () => {
    setShowDetailsOverlay(false);
    setSelectedEvent(null);
  };

  const handlePackageClick = (item) => {
    setSelectedPackage(item);
    setShowPackageOverlay(true);
  };

  const handleClosePackageOverlay = () => {
    setShowPackageOverlay(false);
    setSelectedPackage(null);
  };
  const handleEditPackage = (packageDetails) => {
    console.log('Navigating with packageDetails:', packageDetails);
    navigate('/package', { state: { packageDetails } });
  };
  const handleConfirmDelete = async (packageToDelete) => {
    try {
      const response = await fetch(`${API_URL}/api/admin/packages/${packageToDelete.id}`, {
        method: 'DELETE',
      });
  
      const result = await response.json();
  
      if (response.ok) {
        console.log("Package deleted successfully:", result);
        // Optionally, refresh the package list after deletion
        setPackages((prevPackages) =>
          prevPackages.filter((pkg) => pkg.id !== packageToDelete.id)
        );
      } else {
        console.error("Failed to delete package:", result.message);
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error deleting package:", error);
      alert("An error occurred while deleting the package.");
    } finally {
      setShowDeleteConfirmation(false); // Close the confirmation overlay
      setPackageToDelete(null); // Reset the state
    }
  };
  
  
  

  const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Move the renderPackageItem function inside the Dashboard component
  const renderPackageItem = (item) => (
    <div className="package-item-dashboard" key={item.id} onClick={() => handlePackageClick(item)}>
      <img src={item.image} alt={item.packageName} className="image-dashboard" />
      <div className="packagename-dashboard">{item.packageName}</div>
      <div className="detail-container-dashboard">
        <div className="detail-row-dashboard">
          <span className="detail-text-dashboard">{item.totalPrice}</span>
        </div>
        <div className="detail-row-dashboard">
          <span className="detail-text-dashboard">{item.eventType}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="dashboard-container">
      <div className="dashboard-content"> 
      <div className="left-side">
  {selectedDay ? (
    <div className="event-list-dashboard">
      <h3 className="event-list-title">Event List for {`${currentMonth}`}</h3>
      <div className="events-list-container-dashboard-left">
        {selectedDayEvents.map((event, index) => (
          <div className="event-card-dashboard" key={index}>
            <img src={event.coverPhoto} alt="Event Cover" className="event-cover-dashboard" />
            <div className="event-info-dashboard">
              <p className="event-name-dashboard">{event.name.charAt(0).toUpperCase() + event.name.slice(1)}</p>
              <div className="event-detail-dashboard">
                <FaCalendar className="event-icon-dashboard" />
                <p className="event-date-dashboard">
                  {new Date(event.date).toLocaleDateString('default', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
              <div className="event-detail-dashboard">
                <IoLocationSharp className="event-icon-dashboard" />
                <p className="event-venue-dashboard">{event.location}</p>
              </div>
              <div className="event-detail-dashboard">
            <IoTime className="event-icon-dashboard" />
            <p className="event-venue-dashboard">{formatTime(event.time)}</p>
          </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <p>No events selected</p>
  )}
</div>

        <div className="right-side">
          <div className="calendar">
            <div className="calendar-header">
              <span>{currentMonth}</span>
            </div>
            <div className="calendar-body">
              {daysOfWeek.map((day, index) => (
                <div key={index} className="calendar-day-name">
                  {day}
                </div>
              ))}
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
  <div
    key={day}
    className={`calendar-day ${monthlyBookings.includes(day) ? 'has-booking' : ''} ${selectedDay === day ? 'selected' : ''}`}
    onClick={() => handleDayClick(day)}
    style={{ position: 'relative' }}
  >
    <span>{day}</span>
    {monthlyBookings.includes(day) && <div className="calendar-booking-dot"></div>}
  </div>
))}

            </div>
          </div>
          <button className="create-event-button" onClick={() => navigate('/create-event')}>
            Create an Event
          </button>
          <button className="events-button" onClick={() => navigate('/events')}>
            Events
          </button>
        </div>
      </div>
      <div className="packages-section-dashboard">
        <h2>Packages</h2>
        <div className="events-list-container-dashboard">
          {packages.map((item) => renderPackageItem(item))}
        </div>
      </div>


      {/* Event Details Overlay */}
      {showDetailsOverlay && selectedEvent && (
        <div className="details-overlay-dashboard">
          <div className="overlay-content-dashboard">
            <div className="event-details-dashboard">
              <h3>{selectedEvent.name}</h3>
              <p>Date: {new Date(selectedEvent.date).toLocaleDateString()}</p>
              <p>Pax: {selectedEvent.pax}</p>
              <p>Venue: {selectedEvent.venue}</p>
              <button className="close-button-dashboard" onClick={handleCloseOverlay}>
                Close
              </button>
            </div>
            <div className="image-section-dashboard">
              <img src={require('./images/details.png')} alt="Event Details" style={{ width: '100%', borderRadius: '10px' }} />
            </div>
          </div>
        </div>
      )}

      {/* Package Overlay */}
      {showPackageOverlay && selectedPackage && (
  <div className="details-overlay-dashboard-overlay">
    <div className="overlay-content-dashboard-overlay">
      <button className="close-button-dashboard-overlay" onClick={handleClosePackageOverlay}>
        X
      </button>
      <img
        src={selectedPackage.image}
        alt={selectedPackage.packageName}
        className="image-dashboard-overlay"
      />
      <h3>{selectedPackage.packageName}</h3>
      <h3>Price: {selectedPackage.totalPrice}</h3>
      <p>{selectedPackage.description}</p>
      <h4>Inclusions:</h4>
      <ul>
        {selectedPackage.services && selectedPackage.services.length > 0 ? (
          selectedPackage.services.map((service, index) => (
            <li key={index}>
              {service.serviceName} - {service.basePrice}
            </li>
          ))
        ) : (
          <li>No services available</li>
        )}
      </ul>
      {/* Footer Section */}
      <div className="overlay-footer-dashboard">
      <button
          className="edit-button-dashboard"
          onClick={() => handleEditPackage(selectedPackage)} // Use an arrow function to explicitly pass selectedPackage
        >
          Edit
        </button>

        <button
          className="delete-button-dashboard"
          onClick={() => {
            setShowDeleteConfirmation(true); // Show confirmation overlay
            setPackageToDelete(selectedPackage); // Set the selected package for deletion
          }}
        >
          Delete
        </button>
      </div>
      {showDeleteConfirmation && (
  <div className="delete-confirmation-overlay">
    <div className="confirmation-content">
      <h3>Are you sure you want to delete this package?</h3>
      <p>{packageToDelete?.packageName}</p>
      <div className="confirmation-buttons">
        <button
          className="confirm-delete-button"
          onClick={() => handleConfirmDelete(packageToDelete)}
        >
          Yes, Delete
        </button>
        <button
          className="cancel-delete-button"
          onClick={() => setShowDeleteConfirmation(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}


    </div>
  </div>
)}

    </div>
  );
}

export default Dashboard;
