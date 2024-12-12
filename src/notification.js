import React, { useState, useEffect } from 'react'; // Import useState, useEffect
import { useNavigate } from 'react-router-dom';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import proPic from './images/pro_pic.png'; // Ensure the path to the image is correct
import event1 from './images/details.png'; // Added image for the event
import Modal from '@mui/material/Modal'; // Import Modal from Material UI
import { getAuthToken } from './apiconfig';
import axios from 'axios'; // Import axios for making API requests

const Notification = () => {
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [modalVisibleDecline, setModalVisibleDecline] = useState(false); // State for modal visibility
  const [overlayVisible, setOverlayVisible] = useState(false); // State for service provider details overlay visibility
  const [selectedService, setSelectedService] = useState(null); 
  const [selectedTab, setSelectedTab] = useState('All');
  const [serviceProviderRequests, setServiceProviderRequests] = useState([]); // State to store service provider requests
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/api/services', {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`, // Ensure correct auth token is used
      },
    })
    .then(response => {
      console.log("Service Provider Data: ", response.data);
      setServiceProviderRequests(response.data); // Populate state with fetched data
    })
    .catch(error => {
      console.error("There was an error fetching the service provider requests!", error);
    });
  }, []);
  

  const handleAccept = () => {
    setModalVisible(true); // Show the overlay when booking an event
  };

  const handleDecline = () => {
    setModalVisibleDecline(true); // Show the overlay when booking an event
  };

  const handleCloseModal = () => {
    setModalVisible(false); // Close the overlay
  };

  const handleCloseModalDecline = () => {
    setModalVisibleDecline(false); // Close the overlay
  };

  const handleViewDetails = (service) => {
    setSelectedService(service); // Set the selected service details
    setOverlayVisible(true); // Show the overlay
  };

  const handleCloseOverlay = () => {
    setOverlayVisible(false); // Close the overlay
  };

  const notificationsData = {
    'This Week': [
      {
        id: '1',
        title: 'Jane Wedding',
        joined: 'Diwata Pares, Heart Catering, and 35 others',
        daysAgo: '1d Ago',
        rightImage: proPic,
      },
      {
        id: '2',
        title: 'John Birthday',
        joined: 'Happy Cakes, DJ Mix, and 20 others',
        daysAgo: '3d Ago',
        rightImage: proPic,
      },
    ],
    'Booking Request': [
      {
        id: '1',
        name: 'Mr. & Mrs. Malik',
        title: 'Wedding',
        date: '2024-07-01',
        address: 'CDO',
        pax: 100,
        image: event1,
        daysAgo: '2d Ago',
      },
      {
        id: '2',
        name: 'John Smith',
        title: 'Birthday',
        date: '2024-08-01',
        address: 'Manila',
        pax: 50,
        image: event1,
        daysAgo: '4d Ago',
      },
    ],
    'Service Provider Request': serviceProviderRequests, // Dynamically use the state here
    'All': [
      {
        id: '1',
        title: 'Jane Wedding',
        joined: 'Diwata Pares, Heart Catering, and 35 others',
        daysAgo: '1d Ago',
        rightImage: proPic,
      },
      {
        id: '2',
        name: 'Jane Doe',
        title: 'Wedding',
        daysAgo: '2d Ago',
      },
      {
        id: '3',
        name: 'Emily Johnson',
        service: 'Photographer',
        daysAgo: '5d Ago',
      },
    ],
  };

  const renderContent = () => {
    if (selectedTab === 'Service Provider Request' && serviceProviderRequests.length === 0) {
      return <p>No service provider requests available.</p>;
    }
  
    switch (selectedTab) {
      case 'Service Provider Request':
        return notificationsData['Service Provider Request'].map(notification => (
          <div key={notification.id} className="notification-box">
            <div className="left-container">
              <img src={notification.image} className="profile-picture" alt="Profile" />
              <div className="notification-details">
                <h3 className="notification-name">{notification.serviceName}</h3> {/* Updated to serviceName */}
                <p className="notification-service-category">{notification.serviceCategory}</p>
                <p className="days-ago">{notification.daysAgo}</p>
              </div>
            </div>
            <div className="buttons-container">
              <button className="accept-button" onClick={handleAccept}>
                <FontAwesomeIcon icon={faCheck} /> Accept
              </button>
              <button className="decline-button" onClick={handleDecline}>
                <FontAwesomeIcon icon={faTimes} /> Decline
              </button>
              <button className="view-details-button" onClick={() => handleViewDetails(notification)}>
                View Details
              </button>
            </div>
          </div>
        ));
      case 'Booking Request':
        return notificationsData['Booking Request'].map(notification => (
          <div key={notification.id} className="notification-box">
            <div className="left-container">
              <img src={proPic} className="profile-picture" alt="Profile" />
              <div className="notification-details">
                <h3 className="notification-name">{notification.name}</h3>
                <p className="notification-title">{notification.title}</p>
                <p className="days-ago">{notification.daysAgo}</p>
              </div>
            </div>
            <div className="buttons-container">
              <button className="accept-button" onClick={handleAccept}>
                <FontAwesomeIcon icon={faCheck} /> Accept
              </button>
              <button className="decline-button" onClick={handleDecline}>
                <FontAwesomeIcon icon={faTimes} /> Decline
              </button>
              <button className="view-details-button" onClick={() => navigate('/book-event-review')}>
                View Details
              </button>
            </div>
          </div>
        ));
      case 'Service Provider Request':
        return notificationsData['Service Provider Request'].map(notification => (
          <div key={notification.id} className="notification-box">
            <div className="left-container">
              <img src={notification.image} className="profile-picture" alt="Profile" />
              <div className="notification-details">
                <h3 className="notification-name">{notification.serviceName}</h3> {/* Updated to serviceName */}
                <p className="notification-service-category">{notification.serviceCategory}</p>
                <p className="days-ago">{notification.daysAgo}</p>
              </div>
            </div>
            <div className="buttons-container">
              <button className="accept-button" onClick={handleAccept}>
                <FontAwesomeIcon icon={faCheck} /> Accept
              </button>
              <button className="decline-button" onClick={handleDecline}>
                <FontAwesomeIcon icon={faTimes} /> Decline
              </button>
              <button className="view-details-button" onClick={() => handleViewDetails(notification)}>
                View Details
              </button>
            </div>
          </div>
        ));
      case 'All':
        return notificationsData['All'].map(notification => (
          <div key={notification.id} className="notification-box">
            <div className="left-container">
              <img src={proPic} className="profile-picture" alt="Profile" />
              <div className="notification-details">
                <h3 className="notification-name">{notification.name}</h3>
                <p className="notification-service">{notification.service}</p>
                <p className="days-ago">{notification.daysAgo}</p>
              </div>
            </div>
          </div>
        ));
      default:
        return null;
    }
  };

  return (
    <div className="notification-container">
      <div className="header">
        <button onClick={() => window.history.back()} className="back-button">
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      </div>
      <div className="tabs-container">
        {['All', 'This Week', 'Booking Request', 'Service Provider Request'].map(tab => (
          <button
            key={tab}
            className={`tab-button ${selectedTab === tab ? 'active' : ''}`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="content-container">
        {renderContent()}
      </div>

      {/* Modal for booking acceptance */}
      <Modal
        open={modalVisible}
        onClose={handleCloseModal}
        className="modal-overlay-guestpage"
      >
        <div className="modal-content-guestpage">
          <button className="close-modal-btn-guestpage" onClick={handleCloseModal}>
            &times; {/* X Button */}
          </button>
          <img src={require('./images/popup-accept.png')} alt="Popup" className="popup-image-guestpage" />
          <h3>Event Booking Confirmed</h3>
          <div className="modal-details">
            <p>Enjoy your event!</p>
          </div>
        </div>
      </Modal>

      {/* Modal for Declining Event */}
      <Modal
        open={modalVisibleDecline}
        onClose={handleCloseModalDecline}
        className="modal-overlay-guestpage"
      >
        <div className="modal-content-guestpage">
          <button className="close-modal-btn-guestpage" onClick={handleCloseModalDecline}>
            &times; {/* X Button */}
          </button>
          <img src={require('./images/popup-delete.png')} alt="Popup" className="popup-image-guestpage" />
          <h3>Event Declined</h3>
          <div className="modal-details">
            <p>You have declined the booking.</p>
          </div>
        </div>
      </Modal>

      {/* Service provider details overlay */}
      {overlayVisible && (
        <div className="overlay">
          <div className="overlay-content">
            <h3>{selectedService?.serviceName}</h3>
            <p>{selectedService?.serviceCategory}</p>
            <p>{selectedService?.serviceFeatures}</p>
            <p>{selectedService?.basePrice}</p>
            <p>{selectedService?.requirements}</p>
            <button onClick={handleCloseOverlay}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
