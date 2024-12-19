import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHeart, faSearch, faChevronDown, faEllipsisV, faUser, faBox, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { IoTime, IoLocationSharp } from "react-icons/io5";
import { FaCalendar } from "react-icons/fa";
import Swal from 'sweetalert2';
import defaultImage from './images/default.png'; // Import the default image
import API_URL from './apiconfig';

const packageImages = [
  require('./images/pic1.jpg'),
  require('./images/pic2.jpg'),
  require('./images/pic3.jpg'),
  require('./images/pic4.png')
];

function Events() {
  const [search, setSearch] = useState('');
  const [events, setEvents] = useState([]);
  const [likedEvents, setLikedEvents] = useState({});
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState('All');
  const [showMenu, setShowMenu] = useState({});
  const [eventData, setEventData] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [eventId, setEventId] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [showPaymentStatusDropdown, setShowPaymentStatusDropdown] = useState(false);
  const navigate = useNavigate();

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * packageImages.length);
    return packageImages[randomIndex];
  };


  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(`${API_URL}/api/admin/events/${eventId}/payment-status`, {
        payment_status: paymentStatus,
      });
  
      // Success popup
      Swal.fire({
        title: 'Success!',
        text: 'Payment status has been updated successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'custom-ok-button',
      },
      buttonsStyling: false,
      });
  
      console.log('Payment status updated', response.data);
      closeOverlay();
    } catch (error) {
      console.error('Error updating payment status:', error);
  
      // Error popup
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update payment status. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'custom-ok-button',
      },
      buttonsStyling: false,
      });
    }
  };

  function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(hours, minutes);
  
    // Use toLocaleTimeString to format as 3:48 PM
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  }

  const fetchEventPackageDetails = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/events/${id}/packages`);
      return response.data;
    } catch (error) {
      console.error("Error fetching event package details:", error);
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/events`);
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    if (eventId) {
      const fetchEventData = async () => {
        try {
          const eventResponse = await axios.get(`${API_URL}/api/admin/events/${eventId}`);
          const eventDetails = eventResponse.data;
          const packageDetails = await fetchEventPackageDetails(eventId);
          setEventData({ ...eventDetails, packages: packageDetails });
        } catch (error) {
          console.error("Error fetching event or package data:", error);
        }
      };

      fetchEventData();
    }
  }, [eventId]);
  

  const openEventDetails = (id) => {
    setEventId(id); 
    setEventData(null); 
    setShowOverlay(true); 
  };

  const closeOverlay = () => {
    setShowOverlay(false);
    setEventData(null);  
    setEventId(null); 
  };

  const filterEventsByDate = (option) => {
    setSortOption(option);
  };

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      // Filter by search term
      const isMatchingSearch = event.name.toUpperCase().includes(search.toUpperCase());
      
      // Filter by date
      const eventDate = new Date(event.date);
      const today = new Date();
      
      if (sortOption === 'This Week') {
        const weekEnd = new Date(today);
        weekEnd.setDate(today.getDate() + 7);
        return isMatchingSearch && eventDate >= today && eventDate <= weekEnd;
      } 
      else if (sortOption === 'Next Week') {
        const nextWeekStart = new Date(today);
        nextWeekStart.setDate(today.getDate() + 7);
        const nextWeekEnd = new Date(today);
        nextWeekEnd.setDate(today.getDate() + 14);
        return isMatchingSearch && eventDate >= nextWeekStart && eventDate <= nextWeekEnd;
      }
      return isMatchingSearch; // No date filtering for 'All'
    });
  }, [events, search, sortOption]);
  
  const handleInventoryClick = (eventId) => {
    navigate('/inventory', { state: { eventId } });
};

const handleGuestClick = (eventId) => {
  navigate('/group-attendees', { state: { eventId } });
};

const handleAttendeeClick = (eventId) => {
  navigate('/attendees', { state: { eventId } });
};


  const toggleLike = (eventId) => {
    setLikedEvents((prevState) => ({
      ...prevState,
      [eventId]: !prevState[eventId],
    }));
  };

  const toggleMenu = (eventId) => {
    setShowMenu((prev) => ({
      ...prev,
      [eventId]: !prev[eventId],
    }));
  };

  const renderEventItem = (item) => {
    const coverPhotoUrl = item.coverPhoto; 

    return (
      <div key={item.id} className="item-container-events">
      <img src={getRandomImage()} alt={item.name} className="image-events" />
      <h3 className="title-events">{item.name}</h3>
      <div className="detail-container-events">
        <div className="event-detail-dashboard">
          <FaCalendar className="event-icon-dashboard" />
          <p className="event-date-dashboard">
            {new Date(item.date).toLocaleDateString('default', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
        <div className="event-detail-dashboard">
          <IoLocationSharp className="event-icon-dashboard" />
          <p className="event-venue-dashboard">{item.location}</p>
        </div>
        <div className="event-detail-dashboard">
          <IoTime className="event-icon-dashboard" />
          <p className="event-venue-dashboard">{formatTime(item.time)}</p>
        </div>
        <div className="event-detail-dashboard-events">
          <p className="event-venue-dashboard-events">Booked By: {item.user?.name || "Unknown User"}</p>
        </div>

        <div className="event-detail-dashboard-events">
          <p className="event-venue-dashboard-events"> Contact Numer: {item.user?.phone_number || "Unknown User"}</p>
        </div>

        <div className="event-detail-dashboard-events">
          <button className="view-details-button-events" onClick={() => openEventDetails(item.id)}>View Details</button>
        </div>
        
      </div>
      <button
        className={`heart-icon-events ${likedEvents[item.id] ? 'heart-liked-events' : ''}`}
        onClick={() => toggleLike(item.id)}
      >
        <FontAwesomeIcon icon={faHeart} size="lg" />
      </button>
      <div className="dots-container-events" onClick={() => toggleMenu(item.id)}>
        <FontAwesomeIcon icon={faEllipsisV} size="lg" />
      </div>
      {showMenu[item.id] && (
        <div className="menu-overlay-events">
          <div className="menu-item-events" onClick={() => handleAttendeeClick(item.id)}>
            <FontAwesomeIcon icon={faUser} /> Attendee
          </div>
          <div className="menu-item-events" onClick={() => handleInventoryClick(item.id)}>
            <FontAwesomeIcon icon={faBox} /> Inventory
          </div>
          <div className="menu-item-events" onClick={() => handleGuestClick(item.id)}>
            <FontAwesomeIcon icon={faUserFriends} /> Guest
          </div>
        </div>
      )}
    </div>
    
    );
};


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="gradient-container-events">
      <div className="container-events">
        <div className="search-container-events">
          <FontAwesomeIcon icon={faSearch} size="lg" color="#888" className="search-icon-events" />
          <input
            type="text"
            className="search-box-events"
            placeholder="Search Event"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <div className="dropdown-container-events">
            <button className="dropdown-btn-events">
              Sort by: {sortOption} <FontAwesomeIcon icon={faChevronDown} />
            </button>
            <div className="dropdown-content-events">
              <div onClick={() => filterEventsByDate('All')}>All</div>
              <div onClick={() => filterEventsByDate('This Week')}>This Week</div>
              <div onClick={() => filterEventsByDate('Next Week')}>Next Week</div>
            </div>
          </div>
        </div>
        <div className="event-list-events">
          {filteredEvents.map(renderEventItem)}
        </div>
      </div>


      {showOverlay && eventData && (
          <div className="overlay-events">
            <div className="overlay-content-events">
              <button className="close-button-events" onClick={closeOverlay}>X</button>
              <div className="header-events">
                <h2>Event Details</h2>
              </div>
              <div className="detail-group-events">
  <label htmlFor="paymentStatus">Payment Status: </label>
  <div className="custom-dropdown-events">
    <button
      className="custom-dropdown-btn-events"
      onClick={() => setShowPaymentStatusDropdown(!showPaymentStatusDropdown)}
    >
      {paymentStatus || 'Select Payment Status'}
      <FontAwesomeIcon icon={faChevronDown} />
    </button>
    {showPaymentStatusDropdown && (
      <div className="custom-dropdown-content-events">
        <div onClick={() => { setPaymentStatus('Downpayment'); setShowPaymentStatusDropdown(false); }}>
          Downpayment
        </div>
        <div onClick={() => { setPaymentStatus('Paid'); setShowPaymentStatusDropdown(false); }}>
          Paid
        </div>
      </div>
    )}
  </div>
</div>

        

              {/* Event Details */}
              <div className="detail-group-events">
                <p><strong>Event Name:</strong> {eventData.name}</p>
                <p><strong>Date:</strong> {new Date(eventData.date).toLocaleDateString()}</p>
                <p><strong>Location:</strong> {eventData.location}</p>
                <p><strong>Payment Status:</strong> {eventData.payment_status}</p>
              </div>

              {/* Guests */}
              <div className="detail-group-events">
                <h3>Guests:</h3>
                {eventData.guest && eventData.guest.length > 0 ? (
                  eventData.guest.map((guest, index) => (
                    <p key={index}>{guest.GuestName} - {guest.email}</p>
                  ))
                ) : (
                  <p>No guests available.</p>
                )}
              </div>

              {/* Packages */}
              <div className="detail-group-events">
                <h3>Packages:</h3>
                {Array.isArray(eventData.packages) && eventData.packages.length > 0 ? (
                  eventData.packages.map((pkg, index) => (
                    <p key={index}>
                      {pkg.packageName} - {pkg.totalPrice}
                    </p>
                  ))
                ) : (
                  <p>No packages available.</p>
                )}
                <div className="action-buttons">
          <button className="action-buttons" onClick={handleSaveChanges} disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
              </div>
            </div>
          </div>
          
        )}
    </div>

    
  );
}

export default Events;
