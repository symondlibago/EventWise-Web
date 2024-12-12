import React, { useState, useEffect } from 'react';
import { getAuthToken } from './apiconfig';
import { Modal } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHeartBroken, faPlusCircle, faCashRegister, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FaChevronDown, FaTimes, FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowRight} from 'react-icons/fa';
import './App.css';
import image1 from "./images/event1.png"; // Example images
import image2 from "./images/event2.png";
import image3 from "./images/event3.png";
import package1Image from './images/package1.png';
import package2Image from './images/package2.png';
import package3Image from './images/package3.png';
import package4Image from './images/package4.png';
import API_URL from './apiconfig';




import Box from '@mui/material/Box';

// CREATE EVENT
const eventTypes = ["Wedding", "Birthday", "Reunion", "Debut", "Others"];
const venues = [
    { id: '1', venuename: 'Cove Garden Resort', image: require('./images/venue1.jpg'), address: 'Zone 3 Old Road, Cagayan de Oro, 9000 Misamis Oriental', description: 'Nestled on the shore of the magnificent Macajalar Bay, Cove Garden Resort is the perfect event venue for you, your loved ones, and your colleagues.' },
    { id: '2', venuename: 'Garcia Residencia', image: require('./images/venue2.jpg'), address: ' Captain E Jabulin St Centro, Cagayan de Oro, 9000 Misamis Oriental', description: 'GARCIA RESIDENCIA -A modern American style venue for any occasion situated in Cagayan de Oro City. We cater venue rental for: ➡️ Weddings ➡️ Debut ➡️ Birthdays ➡️' },
    { id: '3', venuename: 'Elarvee', image: require('./images/venue3.jpg'), address: 'CJVV+C66, S Diversion Rd, Cagayan de Oro, 9000 Misamis Oriental', description: 'Party planner sa Lungsod ng Cagayan de Oro' },
    { id: '4', venuename: 'Casa de Canitoan', image: require('./images/venue4.jpg'), address: 'Macapagal Dr, Cagayan de Oro, 9000 Misamis Oriental', description: 'Property Name: Casa de Canitoan ; Street Address: Macapagal Drive ; Apt, suite, floor etc. : Casa de Canitoan ; City : Cagayan de Oro City - Misamis Oriental.' },
    { id: '5', venuename: '4 Kings Event Center Uptown', image: require('./images/venue5.jpg'), address: 'FJ3C+P5F, Pacific St, Cagayan de Oro, 9000 Misamis Oriental', description: 'Fronting Terrazzo Restaurant, behind Prawn House Seafood Restaurant. 4 KINGS EVENT CENTER is the ideal spot to celebrate your occasions!' },
    { id: '6', venuename: 'Cove Garden Resort', image: require('./images/venue1.jpg'), address: 'Zone 3 Old Road, Cagayan de Oro, 9000 Misamis Oriental', description: 'Nestled on the shore of the magnificent Macajalar Bay, Cove Garden Resort is the perfect event venue for you, your loved ones, and your colleagues.' },
    { id: '7', venuename: 'Garcia Residencia', image: require('./images/venue2.jpg'), address: ' Captain E Jabulin St Centro, Cagayan de Oro, 9000 Misamis Oriental', description: 'GARCIA RESIDENCIA -A modern American style venue for any occasion situated in Cagayan de Oro City. We cater venue rental for: ➡️ Weddings ➡️ Debut ➡️ Birthdays ➡️' },
    { id: '8', venuename: 'Elarvee', image: require('./images/venue3.jpg'), address: 'CJVV+C66, S Diversion Rd, Cagayan de Oro, 9000 Misamis Oriental', description: 'Party planner sa Lungsod ng Cagayan de Oro' },
    { id: '9', venuename: 'Casa de Canitoan', image: require('./images/venue4.jpg'), address: 'Macapagal Dr, Cagayan de Oro, 9000 Misamis Oriental', description: 'Property Name: Casa de Canitoan ; Street Address: Macapagal Drive ; Apt, suite, floor etc. : Casa de Canitoan ; City : Cagayan de Oro City - Misamis Oriental.' },
    { id: '10', venuename: '4 Kings Event Center Uptown', image: require('./images/venue5.jpg'), address: 'FJ3C+P5F, Pacific St, Cagayan de Oro, 9000 Misamis Oriental', description: 'Fronting Terrazzo Restaurant, behind Prawn House Seafood Restaurant. 4 KINGS EVENT CENTER is the ideal spot to celebrate your occasions!' },
];


// CHOOSE PACKAGE
// Array of images to pick from randomly
const image = [package1Image, package2Image, package3Image, package4Image];
const randomDescriptions = [
  'Perfect for intimate gatherings, this package offers a cozy setting with essential amenities for up to 100 guests.',
  'Ideal for mid-sized events, this package includes additional features such as catering and audiovisual support for up to 100 guests.',
  'Designed for larger events, this package accommodates up to 150 guests and provides a comprehensive solution with premium decorations.',
  'The ultimate choice for grand celebrations, this package caters to events of up to 250 guests with bespoke services and expert planning.',
  'An all-inclusive package perfect for corporate events, featuring high-end technology and luxurious amenities for a professional setting.',
  'The ideal choice for outdoor events, offering a spacious venue with full-service catering and customized decor options.',
];


//   SERVICE PROVIDER
 
const eventServices = ["Food Catering", "Photography", "Video Editing", "Florists", "Venue"];
const images = [image1, image2, image3];


  
const CreateEvent = () => {
    const navigate = useNavigate();
    const [selectedType, setSelectedType] = useState('');
    const [customEventType, setCustomEventType] = useState('');
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState(''); // New state for event time
    const [pax, setPax] = useState('');
    const [location, setLocation] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [venueOverlayOpen, setVenueOverlayOpen] = useState(false);
    const [venueDetailsOverlay, setVenueDetailsOverlay] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDateValid, setIsDateValid] = useState(true);
    const [coverPhoto, setCoverPhoto] = useState(null);

    const handleCancel = () => {
        navigate(-1);
    };

    const handleNext = () => {
      const eventType = selectedType === 'Others' ? customEventType : selectedType;
      const eventData = {
          type: eventType,
          name: eventName,
          date: eventDate,
          time: eventTime, // Include time in event data
          pax: parseInt(pax, 10),
          location: location,
          coverPhoto: coverPhoto // Ensure this is in the right format (e.g., URL or File)
      };
      localStorage.setItem('eventData', JSON.stringify(eventData));
      navigate('/choose-package', { state: { eventData } });
  };
  

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleSelectEventType = (type) => {
        setSelectedType(type);
        setDropdownOpen(false);
    };

    const openVenueOverlay = () => {
        setVenueOverlayOpen(true);
    };

    const selectVenue = (location) => {
        setVenueDetailsOverlay(location);
    };

    const confirmVenueSelection = () => {
        setLocation(venueDetailsOverlay.venuename);
        closedVenueDetailsOverlay();
    };

    const closedVenueDetailsOverlay = () => {
        setVenueDetailsOverlay(null);
        setVenueOverlayOpen(false);
    };

    const closeVenueDetailsOverlay = () => {
        setVenueDetailsOverlay(null);
    };

    const closeVenueOverlay = () => {
        setVenueOverlayOpen(false);
    };

    const filteredVenues = venues.filter((location) =>
    location.venuename.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.address.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        setEventDate(selectedDate);

        const today = new Date().toISOString().split('T')[0];
        setIsDateValid(selectedDate >= today);
    };

    const handleTimeChange = (e) => { // New function to handle time change
      setEventTime(e.target.value);
  };



    const handleCoverPhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCoverPhoto(URL.createObjectURL(file)); // Create a URL for the selected photo
        }
    };

    const isFormValid = () => {
        return (
            eventName.trim() !== '' &&
            eventDate !== '' &&
            isDateValid &&
            pax.trim() !== '' &&
            location.trim() !== ''
        );
    };

    return (
        <div className="gradient-container-createevent">
            <div className="container-createevent">
                <div className="content-createevent">
                    <h1 className="header-text-createevent">Create Event</h1>
                    <div className="line-createevent"></div>
                    {/* Cover Photo Section */}
                    <div className="cover-photo-container-createevent">
                            <input 
                                type="file" 
                                accept="image/*" 
                                onChange={handleCoverPhotoChange} 
                                className="upload-button-createevent" 
                                id="file-input" // Add an ID to the file input
                                style={{ display: 'none' }} // Keep it hidden
                            />
                            <div className={`cover-photo-box-createevent ${coverPhoto ? 'has-cover' : ''}`}>
                                {coverPhoto ? (
                                    <img src={coverPhoto} alt="Event Cover" className="cover-photo-image-createevent" />
                                ) : (
                                    <span>No cover photo selected</span>
                                )}
                            </div>
                            <button 
                                className="add-event-cover-button-createevent" 
                                onClick={() => document.getElementById('file-input').click()} // Programmatically click the input
                            >
                                {coverPhoto ? "Re-pick Cover Photo" : "Add Event Cover"}
                            </button>
                        </div>
                    <h2 className="event-types-text-createevent">Choose Event Type</h2>
                    <div className="dropdown-container-createevent">
                        <div className="dropdown-button-createevent" onClick={toggleDropdown}>
                            {selectedType || "Select Event Type"}
                            <FaChevronDown />
                        </div>
                        <div className={`dropdown-menu-createevent ${dropdownOpen ? 'show' : ''}`}>
                            {eventTypes.map((type, index) => (
                                <button key={index} onClick={() => handleSelectEventType(type)}>
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>
                    {selectedType === 'Others' && (
                        <div className="input-container-createevent custom-event-type-container">
                            <input
                                type="text"
                                className="text-input-createevent"
                                placeholder="Enter Custom Event Type"
                                value={customEventType}
                                onChange={(e) => setCustomEventType(e.target.value)}
                            />
                        </div>
                    )}
                    <div className="input-container-createevent">
                        <input
                            type="text"
                            className="text-input-createevent"
                            placeholder="Event Name"
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                        />
                    </div>
                    <div className="input-container-createevent date-input-createevent">
                        <input
                            type="date"
                            className={`text-input-createevent ${!isDateValid ? 'invalid-date' : ''}`}
                            placeholder="Choose Event Date"
                            value={eventDate}
                            onChange={handleDateChange}
                        />
                    </div>
                    <div className="input-container-createevent time-input-createevent"> {/* Time input container */}
                        <input
                            type="time"
                            className="text-input-createevent"
                            placeholder="Choose Event Time"
                            value={eventTime}
                            onChange={handleTimeChange} // Call the new handleTimeChange function
                        />
                    </div>
                    <div className="input-container-createevent">
                        <input
                            type="text"
                            className="text-input-createevent"
                            placeholder="Pax"
                            value={pax}
                            onChange={(e) => setPax(e.target.value)}
                        />
                    </div>
                    <div className="input-container-createevent venue-input-createevent">
                        <input
                            type="text"
                            className="text-input-createevent"
                            placeholder="Choose Venue"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>
                    
                    


                    <div className="button-container-createevent">
                        <button className="cancel-button-createevent" onClick={handleCancel}>
                            Cancel
                        </button>
                        <button className="choose-venue-button-createevent" onClick={openVenueOverlay}>
                            Choose Venue
                        </button>
                        <button
                            className="next-button-createevent"
                            onClick={handleNext}
                            disabled={!isFormValid()}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {venueOverlayOpen && (
                <div className="overlay-createevent">
                    <FaTimes className="close-button1-createevent" onClick={closeVenueOverlay} />
                    <div className="venue-selection-container-createevent">
                        <div className="searchbox-container-createevent">
                            <input
                                type="text"
                                className="search-box-createevent"
                                placeholder="Search your Venue here!"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="venue-selection-container-createevent">
                            {filteredVenues.map((location) => (
                                <div key={location.id} className="venue-item-createevent">
                                    <div className="venue-box-createevent">
                                        <img src={location.image} alt={location.venuename} className="venue-image-createevent" />
                                        <h3 className="venue-name-createevent">{location.venuename}</h3>
                                        <p className="venue-address-createevent">
                                            <FaMapMarkerAlt /> {location.address}
                                        </p>
                                        <button className="venue-choose-button-createevent" onClick={() => selectVenue(location)}>
                                            Choose
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {venueDetailsOverlay && (
                <div className="overlay-createevent">
                    <div className="venue-details-container-createevent">
                        <FaTimes className="close-button-createevent" onClick={closeVenueDetailsOverlay} />
                        <img src={venueDetailsOverlay.image} alt={venueDetailsOverlay.venuename} className="venue-details-image-createevent" />
                        <h2 className="venue-name-createevent">{venueDetailsOverlay.venuename}</h2>
                        <p className="venue-address-createevent">{venueDetailsOverlay.address}</p>
                        <button className="confirm-button-createevent" onClick={confirmVenueSelection}>
                            Confirm Selection
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
  
  

// Blank Page Component
const ChoosePackage = () => {
  const [packagesData, setPackagesData] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const navigate = useNavigate();

  // Fetching packages data from API
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/admin/packages`);
        const data = response.data.map((pkg) => {
          // Don't recalculate totalPrice here, use the one from the database
          const description = pkg.description || randomDescriptions[Math.floor(Math.random() * randomDescriptions.length)];

          return {
            ...pkg,
            image: image[Math.floor(Math.random() * image.length)],
            description,
          };
        });

        setPackagesData(data);
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    };

    fetchPackages();
  }, []);

  // Open the overlay when a package is chosen
  const openOverlay = (pkg) => {
    setSelectedPackage(pkg);
    setIsOverlayOpen(true);
    localStorage.setItem('selectedPackage', JSON.stringify(pkg)); // Save selected package to localStorage
  };

  // Close the overlay
  const closeOverlay = () => {
    setIsOverlayOpen(false);
    setSelectedPackage(null);
  };

  // Handle removal of service
  const removeService = (serviceId) => {
    // Find the removed service
    const removedService = selectedPackage.services.find(service => service.id === serviceId);

    // Subtract the basePrice of the removed service from the totalPrice
    const updatedTotalPrice = selectedPackage.totalPrice - parseFloat(removedService.basePrice);

    // Update the selected package with the new totalPrice
    const updatedServices = selectedPackage.services.filter(service => service.id !== serviceId);
    const updatedPackage = { ...selectedPackage, services: updatedServices, totalPrice: updatedTotalPrice };

    // Update the selectedPackage state and localStorage
    setSelectedPackage(updatedPackage);
    localStorage.setItem('selectedPackage', JSON.stringify(updatedPackage)); // Save updated package to localStorage

    // Update addedEvents in localStorage
    let addedEvents = JSON.parse(localStorage.getItem('addedEvents')) || [];
    addedEvents = addedEvents.filter(service => service.id !== serviceId);
    localStorage.setItem('addedEvents', JSON.stringify(addedEvents));
  };

  // Handle adding a service (navigate to service provider selection page)
  const addService = () => {
    navigate('/choose-service-provider');
  };

  // Handle final confirmation and navigate to the review overlay page
  const confirmPackage = () => {
    localStorage.setItem('services', JSON.stringify(selectedPackage.services)); // Save services array to localStorage
    localStorage.removeItem('addedEvents'); // Clear addedEvents from localStorage after submitting
    navigate('/add-guest'); // Navigate to the review page
  };

  return (
    <div className="container-choosepackage">
      <h1 className="header-choosepackage">Choose Package</h1>

      <button className="customize-btn-choosepackage" onClick={() => navigate('/choose-service-provider')}>
        Click here if you want to customize <FaArrowRight />
      </button>

      <div className="packages-row-choosepackage">
        {packagesData.map((pkg) => (
          <div key={pkg.id} className="package-choosepackage">
            <img src={pkg.image} alt={pkg.packageName} className="image-choosepackage" />
            <h3>{pkg.packageName}</h3>
            <p>{pkg.description}</p>
            <p>Price: ₱{pkg.totalPrice}</p>
            <button className="choose-btn-choosepackage" onClick={() => openOverlay(pkg)}>
              Choose
            </button>
          </div>
        ))}
      </div>

      <button className="next-btn-choosepackage" onClick={() => navigate('/add-guest')}>
        Next
      </button>

      {isOverlayOpen && selectedPackage && (
        <div className="overlay-choosepackage">
          <div className="overlay-content-choosepackage">
            <h2 className="overlay-header-choosepackage">Chosen Package: {selectedPackage.packageName}</h2>
            <button className="close-btn-choosepackage" onClick={closeOverlay}>
              <FaTimes />
            </button>
            <div className="services-list-overlay-choosepackage">
              <h3>Services Included:</h3>
              {selectedPackage.services && selectedPackage.services.length > 0 ? (
                <ul>
                  {selectedPackage.services.map((service) => (
                    <li key={service.id}>
                      <strong>{service.serviceName}</strong> - {service.serviceCategory} - ₱{service.basePrice}
                      <button className="edit-btn-choosepackage" onClick={() => removeService(service.id)}>
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No services available for this package.</p>
              )}
            </div>
            <p>Price: ₱{selectedPackage.totalPrice}</p>
            <button className="add-service-btn-choosepackage" onClick={addService}>
              Add Service
            </button>
            <button className="confirm-btn-choosepackage" onClick={confirmPackage}>
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};






const ChooseServiceProv = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [likedEvents, setLikedEvents] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [addedEvents, setAddedEvents] = useState([]); // Keep track of added events in state
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Fetch services from the API
    axios.get(`${API_URL}/api/services`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`, // Replace with your auth token function
      },
    })
      .then((response) => {
        const mappedServices = response.data.map((service) => ({
          id: service.id,
          serviceName: service.serviceName,
          basePrice: service.basePrice,
          serviceCategory: service.serviceCategory,
          image: images[Math.floor(Math.random() * images.length)], // Add your image logic
        }));
        setServices(mappedServices);
      })
      .catch((error) => {
        console.error('Error fetching services:', error);
      });

    // Load added events from localStorage when the component mounts
    const storedAddedEvents = JSON.parse(localStorage.getItem('addedEvents')) || [];
    setAddedEvents(storedAddedEvents);
  }, []); // Empty array ensures this runs only once on mount

  useEffect(() => {
    // Sync added events with localStorage whenever it changes
    if (addedEvents.length > 0) {
      localStorage.setItem('addedEvents', JSON.stringify(addedEvents));
    }
  }, [addedEvents]); // Runs every time addedEvents is updated

  const toggleLike = (eventId) => {
    setLikedEvents((prevState) => ({
      ...prevState,
      [eventId]: !prevState[eventId],
    }));
  };

  const handleEventClick = (item) => {
    setSelectedEvent(item);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedEvent(null);
  };

  const handleNext = () => {
    if (selectedEvent) {
      const eventToAdd = {
        id: selectedEvent.id,
        serviceName: selectedEvent.serviceName,
        serviceCategory: selectedEvent.serviceCategory,
        basePrice: selectedEvent.basePrice,
      };

      // Merge the new event with previously added events
      const updatedEvents = [...addedEvents, eventToAdd];
      setAddedEvents(updatedEvents); // Update state
      handleCloseModal(); // Close modal
    }
  };

  const handleRemoveEvent = (eventId) => {
    const updatedEvents = addedEvents.filter((event) => event.id !== eventId);
    setAddedEvents(updatedEvents); // Update state
  };

  const handleFinish = async () => {
    const eventData = JSON.parse(localStorage.getItem('eventData')) || {};
    const addedEvents = JSON.parse(localStorage.getItem('addedEvents')) || [];

    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...eventData,
          providers: addedEvents,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  const filteredEventsData = selectedType
    ? services.filter((service) => service.serviceCategory === selectedType)
    : services;

  const renderEventItem = (item) => (
    <div className="event-item-sp" onClick={() => handleEventClick(item)} key={item.id}>
      <img src={item.image} alt={item.title} className="event-image-sp" />
      <p className="event-title-sp">{item.serviceName}</p>
      <div className="event-details-sp">
        <div className="event-detail-row-sp">
          <FontAwesomeIcon icon={faPlusCircle} size="sm" color="#2A93D5" />
          <p className="event-detail-text-sp">{item.serviceCategory}</p>
        </div>
        <div className="event-detail-row-sp">
          <FontAwesomeIcon icon={faCashRegister} size="sm" color="#2A93D5" />
          <p className="event-detail-text-sp">${item.basePrice}</p>
        </div>
      </div>
      <div
        className={`like-icon-sp ${likedEvents[item.id] ? 'liked' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          toggleLike(item.id);
        }}
      >
        <FontAwesomeIcon
          icon={likedEvents[item.id] ? faHeart : faHeartBroken}
          color={likedEvents[item.id] ? '#FF0000' : '#888'}
          size="lg"
        />
      </div>
    </div>
  );

  return (
    <div className="gradient-background-sp">
      <div className="main-container-sp">
        <div className="scrollable-content-sp">
          <div className="content-sp">
            <p className="header-title-sp">Service Provider</p>
            <div className="separator-line-sp"></div>
            <p className="service-type-label-sp">Add Service Provider</p>
            <div className="horizontal-scroll-sp">
              {eventServices.map((serviceCategory, index) => (
                <button
                  key={index}
                  className={`event-type-button-sp ${selectedType === serviceCategory ? 'selected' : ''}`}
                  onClick={() => setSelectedType(serviceCategory)}
                >
                  <p className={`event-type-text-sp ${selectedType === serviceCategory ? 'selected' : ''}`}>
                    {serviceCategory}
                  </p>
                </button>
              ))}
            </div>

            <div className="event-list-container-sp">
              {filteredEventsData.map(renderEventItem)}
            </div>

            {addedEvents.length > 0 && (
              <div className="added-events-section-sp">
                <p className="added-events-title-sp">Added Events</p>
                <div className="added-events-scroll-sp">
                  {addedEvents.map((event) => (
                    <div key={event.id} className="added-event-item-sp">
                      <p className="added-event-text-sp">{event.serviceName}</p>
                      <p className="added-event-text-sp">{event.serviceCategory}</p>
                      <p className="added-event-text-sp">${event.basePrice}</p>
                      <button
                        className="remove-event-button-sp"
                        onClick={() => handleRemoveEvent(event.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} size="lg" color="#FF4C4C" />
                      </button>
                    </div>
                  ))}
                  <div className="footer-buttons-sp">
                    <button className="modal-cancel-button-sp" onClick={() => window.history.back()}>
                      <p className="modal-cancel-button-text-sp">Cancel</p>
                    </button>
                    <button className="modal-add-button-sp" onClick={handleFinish}>
                      <p className="modal-add-button-text-sp" onClick={() => navigate('/add-guest')}>Finish</p>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <Modal open={modalVisible} onClose={handleCloseModal} className="modal-overlay-sp">
          <div className="modal-content-container-sp">
            <div className="modal-body-sp">
              {selectedEvent && (
                <>
                  <p className="modal-title-sp">{selectedEvent.serviceName}</p>
                  <p className="modal-provider-sp">Provider: {selectedEvent.serviceCategory}</p>
                  <p className="modal-price-sp">Price: ${selectedEvent.basePrice}</p>
                  <div className="modal-actions-sp">
                    <button className="modal-add-button-sp" onClick={handleNext}>
                      Add to Event
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};


const ReviewOverlay = ({ isOpen, onClose, packagesData, allEventsData, guests }) => {
  const eventData = JSON.parse(localStorage.getItem('eventData')) || {};
  const selectedPackage = JSON.parse(localStorage.getItem('selectedPackage')) || null;
  const addedEvents = JSON.parse(localStorage.getItem('addedEvents')) || [];
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);

  const handleClose = () => {
    setModalVisible(false);
    navigate('/dashboard'); // Navigate to /dashboard when the X button is clicked
  };

  const handleBookEvent = async () => {
    const eventData = JSON.parse(localStorage.getItem('eventData')) || {};
    let selectedPackage = JSON.parse(localStorage.getItem('selectedPackage')) || null;
    const addedEvents = JSON.parse(localStorage.getItem('addedEvents')) || [];
    const token = getAuthToken();
  
    if (!Array.isArray(addedEvents)) {
      console.error("The services field must be an array.");
      return;
    }
  

    let combinedServices = [];
    if (selectedPackage && Array.isArray(selectedPackage.services)) {
      combinedServices = [...selectedPackage.services, ...addedEvents];
    } else {
      combinedServices = [...addedEvents];
    }  
    // Calculate the total price of the package based on the selected package's price
    let updatedTotalPrice = selectedPackage ? parseFloat(selectedPackage.totalPrice) : 0;
  
    // Sum the base prices of the added services (additional events)
    let addedServicesTotalPrice = addedEvents.reduce((total, service) => total + parseFloat(service.basePrice), 0);
  
    // Final total price = existing package total price + price of added services
    updatedTotalPrice += addedServicesTotalPrice;
  
  
    console.log('Combined Services:', combinedServices);
    console.log('Updated Total Price:', updatedTotalPrice);
  
    if (!selectedPackage || !selectedPackage.id) {
      console.error('Selected package is missing or has no valid ID.');
      return;
    }
  
    console.log('Selected Package ID before update:', selectedPackage.id);
  
    const formData = new FormData();
    formData.append('name', eventData.name);
    formData.append('date', eventData.date);
    formData.append('pax', eventData.pax);
    formData.append('location', eventData.location);
    formData.append('type', eventData.type);


    formData.append('packageType', 'Custom');
    // Add package details (make sure they exist in selectedPackage)
    if (selectedPackage) {
      formData.append('packageName', selectedPackage.packageName);  // Package name
      formData.append('eventType', selectedPackage.eventType);        // Event type
      formData.append('totalPrice', updatedTotalPrice);               // Updated total price (original package + added services)
    }
  
    // Handle cover photo for the event (if exists)
    if (eventData.coverPhoto) {
      try {
        const response = await fetch(eventData.coverPhoto);
        const blob = await response.blob();
        formData.append('cover_photo', blob, 'cover_photo.jpg');
      } catch (fetchError) {
        console.error('Error fetching the cover photo:', fetchError);
      }
    }
  
    guests.forEach((guest, index) => {
      formData.append(`guests[${index}][name]`, guest.name);
      formData.append(`guests[${index}][email]`, guest.email);
      if (guest.phone) formData.append(`guests[${index}][phone]`, guest.phone);
      if (guest.role) formData.append(`guests[${index}][role]`, guest.role);
    });
  
    // Add combined services to FormData
    combinedServices.forEach((service, index) => {
      formData.append(`services[${index}][id]`, service.id);
      formData.append(`services[${index}][serviceName]`, service.serviceName);
      formData.append(`services[${index}][serviceCategory]`, service.serviceCategory);
      formData.append(`services[${index}][basePrice]`, service.basePrice);
    });
  
    try {
      // Send package data to the backend
      if (selectedPackage) {
        const packageResponse = await axios.post(`${API_URL}/api/admin/packages`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        });
  
        if (packageResponse.status === 201) {
          const newPackage = packageResponse.data;
          console.log('New package created:', newPackage);
  
          // Update selectedPackage with new package data
          selectedPackage = newPackage;
          localStorage.setItem('selectedPackage', JSON.stringify(newPackage));
  
          console.log('Updated Package ID:', selectedPackage.id);
        } else {
          console.error('Failed to create package:', packageResponse.statusText);
          return;
        }
      }
  
      // Add the new package ID to the event data
      formData.append('package_id', selectedPackage.id);
  
      // Send event data to the backend
      const eventResponse = await axios.post(`${API_URL}/api/events`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (eventResponse.status === 201) {
        console.log('Event created successfully:', eventResponse.data);
        setModalVisible(true);
      } else {
        console.error('Failed to create event:', eventResponse.statusText);
      }
    } catch (error) {
      console.error('An error occurred:', error.response ? error.response.data : error.message);
    }
  };
  
  
  
  
  

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box>
        <div className="overlay-content-reviewoverlay">
          <div className="overlay-left">
            <div className="overlay-header-reviewoverlay">
              <h2 className="modal-title">Review Details</h2>
              <button onClick={onClose} className="close-button-reviewoverlay">X</button>
            </div>
            <h3>Event Details</h3>
            <p>Event Name: {eventData.name}</p>
            <p>Date: {eventData.date}</p>
            <p>Pax: {eventData.pax}</p>
            <p>Location: {eventData.location}</p>

            <h3>Package Details</h3>
            {selectedPackage ? (
              <>
                <p>Package Name: {selectedPackage.packageName}</p>
                <p>Price: ₱{selectedPackage.totalPrice}</p>
              </>
            ) : (
              <p>No package selected.</p>
            )}
          </div>
          <div className="overlay-right">
            <h3>Service Providers</h3>
            {addedEvents.length > 0 ? (
              addedEvents.map((serviceProvider, index) => (
                <p key={index}>{serviceProvider.id} - {serviceProvider.serviceName} - {serviceProvider.serviceCategory} - {serviceProvider.basePrice}</p>
              ))
            ) : (
              <p>No service providers added.</p>
            )}

            <h3>Guests</h3>
            {guests.slice(0, 5).map((guest, index) => (
              <p key={index}>{guest.name} - {guest.email}</p>
            ))}
            
            <button className="book-event-btn-guestpage" onClick={handleBookEvent}>
              Book Event
            </button>

            <Modal open={modalVisible} onClose={() => setModalVisible(false)} className="modal-overlay-guestpage">
              <div className="modal-content-guestpage">
                <button className="close-modal-btn-guestpage" onClick={handleClose}>
                  &times;
                </button>
                <img src={require('./images/popup.png')} alt="Popup" className="popup-image-guestpage" />
                <p className="modal-text-guestpage">Your event has been booked!</p>
              </div>
            </Modal>
          </div>
        </div>
      </Box>
    </Modal>
  );
};





  
const GuestPage = ({ packagesData, allEventsData, selectedEvent }) => {
  const [guests, setGuests] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(''); // New field
  const [role, setRole] = useState(''); // New field

  // Handling guest addition
  const handleAddGuest = () => {
    if (!name.trim() || !email.trim() || !phone.trim() || !role.trim()) {
      alert("Please fill in all fields.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    setGuests([...guests, { name, email, phone, role }]);
    setName('');
    setEmail('');
    setPhone('');
    setRole('');
  };

  // Handling guest removal
  const handleRemoveGuest = (index) => {
    const newGuests = guests.filter((_, i) => i !== index);
    setGuests(newGuests);
  };

  const handleBookEvent = () => {
    setModalVisible(true); // Show the review overlay
  };

  const handleCloseModal = () => {
    setModalVisible(false); // Close the overlay
  };

  const openOverlay = () => {
    setOverlayVisible(true);
  };

  const closeOverlay = () => {
    setOverlayVisible(false);
  };

  return (
    <div className="guest-page-container-guestpage">
      <h1 className="header-guestpage">Add Guest</h1>
      <div className="guest-container-guestpage">
        <div className="right-section-guestpage">
          <table className="guest-table-guestpage">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile Number</th> {/* New column */}
                <th>Role</th> {/* New column */}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {guests.map((guest, index) => (
                <tr key={index}>
                  <td>{guest.name}</td>
                  <td>{guest.email}</td>
                  <td>{guest.phone}</td> {/* Display mobile number */}
                  <td>{guest.role}</td> {/* Display role */}
                  <td>
                    <button
                      className="remove-btn-guestpage"
                      onClick={() => handleRemoveGuest(index)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <button className="add-guest-btn-guestpage" onClick={openOverlay}>
        Add Guest
      </button>

      <button className="book-event-btn-guestpage" onClick={handleBookEvent}>
        Next
      </button>

      {overlayVisible && (
        <div className="overlay-guestpage">
          <div className="overlay-content-guestpage">
            <button className="close-btn-guestpage" onClick={closeOverlay}>
              X
            </button>
            <h2 className="overlay-header-guestpage">Add Guest</h2>
            
            <label className="name-label-guestpage">Name</label>
            <input
              type="text"
              placeholder="Enter name"
              value={name}
              className="name-input-guestpage"
              onChange={(e) => setName(e.target.value)}
            />
            
            <label className="email-label-guestpage">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              className="email-input-guestpage"
              onChange={(e) => setEmail(e.target.value)}
            />
            
            <label className="mobile-label-guestpage">Mobile Number</label>
            <input
              type="text"
              placeholder="Enter mobile number"
              value={phone}
              className="mobile-input-guestpage"
              onChange={(e) => setPhone(e.target.value)}
            />
            
            <label className="role-label-guestpage">Role</label>
            <input
              type="text"
              placeholder="Enter role"
              value={role}
              className="role-input-guestpage"
              onChange={(e) => setRole(e.target.value)}
            />
            
            <button className="confirm-add-btn-guestpage" onClick={handleAddGuest}>
              Add
            </button>
          </div>
        </div>
      )}

      <ReviewOverlay
        isOpen={modalVisible}
        onClose={handleCloseModal}
        selectedEvent={selectedEvent}
        packagesData={packagesData}
        allEventsData={allEventsData}
        guests={guests}
      />
    </div>
  );
};

export { CreateEvent, ChoosePackage, ChooseServiceProv, GuestPage };
 