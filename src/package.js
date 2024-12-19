import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './App.css';
import { IoArrowBack, IoAdd } from 'react-icons/io5';
import image1 from './images/event1.png';
import image2 from './images/event2.png';
import image3 from './images/event3.png';
import axios from 'axios';
import api from './axiosconfig';
import API_URL from './apiconfig';
import Swal from 'sweetalert2';

const Package = () => {
  const navigate = useNavigate();

  const [packageName, setPackageName] = useState('');
  const [eventType, setEventType] = useState('');
  const [pax, setPax] = useState('');
  const [totalPrice, setTotalPrice] = useState();
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [services, setServices] = useState([]);
  const [availableServices, setAvailableServices] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [showConfirmOverlay, setShowConfirmOverlay] = useState(false);
  const [filteredServices, setFilteredServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const images = [image1, image2, image3];
  const serCategory = ["All", "Food Catering", "Photography", "Video Editing", "Florists", "Venue"];

  const location = useLocation();

  useEffect(() => {
    if (pax) {
      // Filter services where the pax value is greater than the value entered in the pax input
      const filtered = availableServices.filter(service => service.pax > pax);
      setFilteredServices(filtered);
    } else {
      // If pax is not set, show all available services
      setFilteredServices(availableServices);
    }
  }, [pax, availableServices]);

  useEffect(() => {
    if (location.state && location.state.packageDetails) {
      const { packageDetails } = location.state;
      setPackageName(packageDetails.packageName || '');
      setEventType(packageDetails.eventType || '');
      setTotalPrice(packageDetails.totalPrice);
      setPax(packageDetails.pax || '');
      setCoverPhoto(packageDetails.coverPhoto || null);
      setServices(packageDetails.services || []);
    }
  }, [location.state]);

  // Calculate the total price based on the services added or removed
  useEffect(() => {
    const newTotalPrice = services.reduce((acc, service) => acc + parseFloat(service.basePrice), 0);
    setTotalPrice(newTotalPrice.toFixed(2));
  }, [services]);
  
  

  const handleUpdatePackage = () => {
    if (!packageName || !eventType) {
      Swal.fire({
        title: 'Missing Fields',
        text: 'Please fill in all fields and select at least one service.',
        icon: 'warning',
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'custom-ok-button',
      },
      buttonsStyling: false,
      });
      return;
    }
  
    // Prepare data
    const updatedPackageData = {
      packageName: packageName || location.state.packageDetails.packageName,
      eventType: eventType || location.state.packageDetails.eventType,
      services: services.map((service) => service.id), // Ensure this is an array of IDs
      totalPrice: totalPrice || location.state.packageDetails.totalPrice,
      pax: pax || location.state.packageDetails.pax,
      coverPhoto: coverPhoto || location.state.packageDetails.coverPhoto,
    };
  
    // Use the axios instance 'api' instead of axios directly
    api
      .put(`${API_URL}/api/admin/packages/${location.state.packageDetails.id}`, updatedPackageData)
      .then((response) => {
        console.log('Package updated successfully:', response.data);
        Swal.fire({
          title: 'Success!',
          text: 'Package updated successfully!',
          icon: 'success',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: 'custom-ok-button',
        },
        buttonsStyling: false,
        });
        navigate('/profile'); // Redirect to profile or another relevant page
      })
      .catch((error) => {
        console.error('Error updating package:', error.response?.data || error.message);
        const errors = error.response?.data?.errors || {};
  
        Swal.fire({
          title: 'Error!',
          text: `Failed to update package. ${
            Object.keys(errors).length
              ? Object.values(errors).join(', ')
              : 'Please try again.'
          }`,
          icon: 'error',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: 'custom-ok-button',
        },
        buttonsStyling: false,
        });
      });
  };

  useEffect(() => {
    // Axios will automatically include the token because of the interceptor in axiosconfig.js
    api.get(`${API_URL}/api/services`)
  .then((response) => {
    const mappedServices = response.data.map((service) => ({
      id: service.id,
      serviceName: service.serviceName,
      basePrice: parseFloat(service.basePrice), // Ensure basePrice is a number
      serviceCategory: service.serviceCategory,
      pax: service.pax,
      image: images[Math.floor(Math.random() * images.length)],
    }));
    setAvailableServices(mappedServices);
    setFilteredServices(mappedServices);
  })
  .catch((error) => {
    console.error('Error fetching services:', error);
  });

  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredServices(availableServices);
    } else {
      const filtered = availableServices.filter((service) => service.serviceCategory === selectedCategory);
      setFilteredServices(filtered);
    }
  }, [selectedCategory, availableServices]);

  const handleAddCoverPhoto = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setCoverPhoto(imageURL);
    }
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setShowConfirmOverlay(true);
  };

  const handleConfirmService = () => {
    if (selectedService) {
      setServices((prevServices) => {
        const updatedServices = [...prevServices, {
          id: selectedService.id,
          serviceName: selectedService.serviceName,
          serviceCategory: selectedService.serviceCategory,
          basePrice: selectedService.basePrice,
          pax: selectedService.pax,
        }];
  
        // Update totalPrice directly by adding the basePrice of the new service
        setTotalPrice((prevTotal) => parseFloat(prevTotal || 0) + parseFloat(selectedService.basePrice));
  
        return updatedServices;
      });
    }
    setShowConfirmOverlay(false);
    setShowOverlay(false);
  };
  

  const handleCancelService = () => {
    setShowConfirmOverlay(false);
    setShowOverlay(false);
  };

  const handleRemoveService = (serviceId) => {
    setServices((prevServices) => {
      const updatedServices = prevServices.filter(service => service.id !== serviceId);
      // Recalculate the total price
      const updatedTotalPrice = updatedServices.reduce((total, service) => total + service.basePrice, 0);
      setTotalPrice(updatedTotalPrice); // Update total price after removing the service
      return updatedServices;
    });
  };
  

  const handleCreatePackage = () => {
    if (!packageName || !eventType) {
      Swal.fire({
        title: 'Missing Fields',
        text: 'Please fill in all fields and select at least one service.',
        icon: 'warning',
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'custom-ok-button',
      },
      buttonsStyling: false,
      });
      return;
    }
  
    // Map services array to extract only service IDs
    const serviceIds = services.map(service => service.id);
  
    const packageData = {
      packageName,
      eventType,
      packageType: true, // Default value for packageType
      services: serviceIds, // Send only IDs
      totalPrice,
      pax,
      coverPhoto,
      packageCreatedDate: new Date().toISOString().split('T')[0],
    };
  
    // Use the axios instance 'api' instead of axios directly
    api
      .post(`${API_URL}/api/admin/packages`, packageData)
      .then((response) => {
        console.log('Package created successfully:', response.data);
        Swal.fire({
          title: 'Success!',
          text: 'Package created successfully!',
          icon: 'success',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: 'custom-ok-button',
        },
        buttonsStyling: false,
        });
        resetForm(); // Clear form fields after success
      })
      .catch((error) => {
        console.error('Error creating package:', error);
        const status = error.response?.status;
        if (status === 422) {
          Swal.fire({
            title: 'Validation Error',
            text: `Validation error: ${JSON.stringify(error.response.data.errors)}`,
            icon: 'error',
            confirmButtonText: 'OK',
            customClass: {
              confirmButton: 'custom-ok-button',
          },
          buttonsStyling: false,
          });
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Failed to create package. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK',
            customClass: {
              confirmButton: 'custom-ok-button',
          },
          buttonsStyling: false,
          });
        }
      });
  };
  

  const resetForm = () => {
    setPackageName('');
    setEventType('');
    setTotalPrice(0);
    setCoverPhoto(null);
    setServices([]);
    setSelectedCategory('All');
    setFilteredServices([]);
  };

  return (
    <div className="gradient-container-portfolio">
      <button onClick={() => navigate('/profile')} className="back-button-portfolio">
        <IoArrowBack size={24} color="#FFC42B" />
      </button>
      <div className="container-portfolio">
        <div className="header-portfolio">
          <h1 className="header-text-portfolio">Package Details</h1>
        </div>

        <div className="broken-box-container-portfolio">
          {coverPhoto ? (
            <div className="cover-photo-section-portfolio">
              <img src={coverPhoto} alt="Cover" className="cover-photo-preview-portfolio" />
              <button className="choose-cover-button-portfolio">
                <label htmlFor="choose-cover-input" className="choose-cover-text-portfolio">
                  Choose Cover
                </label>
              </button>
              <input
                type="file"
                accept="image/*"
                id="choose-cover-input"
                className="file-input-portfolio"
                onChange={handleAddCoverPhoto}
              />
            </div>
          ) : (
            <label className="cover-photo-container-portfolio">
              <IoAdd size={20} color="white" className="cover-photo-icon-portfolio" />
              <span className="cover-photo-text-portfolio">Add Cover</span>
              <input
                type="file"
                accept="image/*"
                className="file-input-portfolio"
                onChange={handleAddCoverPhoto}
              />
            </label>
          )}
        </div>

        <span className="labels-portfolio">Package Info</span>

        <label className="label-portfolio">Package Name</label>
        <input
          type="text"
          className="text-input-portfolio"
          placeholder="Enter Name"
          value={packageName}
          onChange={(e) => setPackageName(e.target.value)}
        />

        <label className="label-portfolio">Event Type</label>
        <input
          type="text"
          className="text-input-portfolio"
          placeholder="Enter Event Type (e.g., Wedding, Birthday, etc.)"
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
        />
        <label className="label-portfolio">Total Price</label>
          <input
            type="number"
            className="text-input-portfolio"
            placeholder="Total Price"
            value={totalPrice}
            onChange={(e) => setTotalPrice(e.target.value)}
          />
           <label className="label-portfolio">Pax</label>
          <input
            type="number"
            className="text-input-portfolio"
            placeholder="Pax"
            value={pax}
            onChange={(e) => setPax(e.target.value)}
          />




        <div className="services-container-portfolio">
          <h2 className="services-header-portfolio">Services</h2>
          {services.map((service, index) => (
            <div key={index} className="service-item-portfolio">
              <input type="text" placeholder="Service ID" value={service.id} readOnly className="service-input-portfolio" />
              <input type="text" placeholder="Service Name" value={service.serviceName} readOnly className="service-input-portfolio" />
              <input type="text" placeholder="Service Category" value={service.serviceCategory} readOnly className="service-input-portfolio" />
              <input type="text" placeholder="Service Price" value={service.basePrice} readOnly className="service-input-portfolio" />
              <input type="text" placeholder="Service Pax" value={service.pax} readOnly className="service-input-portfolio" />
              <button
                className="delete-service-button-portfolio"
                onClick={() => handleRemoveService(service.id)}
              >
                X
              </button>
            </div>
          ))}
          <div className="center-button-container-portfolio">
            <button className="create-portfolio-button-portfolio" onClick={() => setShowOverlay(true)}>
              <IoAdd size={20} color="white" />
              <span className="create-portfolio-text-portfolio">Choose Service Provider</span>
            </button>
          </div>
        </div>

              {location.state && location.state.packageDetails ? (
        <button className="create-package-button" onClick={handleUpdatePackage}>
          Update Package
        </button>
      ) : (
        <button className="create-package-button" onClick={handleCreatePackage}>
          Create Package
        </button>
      )}


        {showOverlay && (
          <div className="overlay-container-services">        
            <div className="overlay-content-services">            
              <div className="filter-buttons-container">             
                {serCategory.map((category, index) => (
                  <button
                    key={index}
                    className={`filter-button ${selectedCategory === category ? 'selected' : ''}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                  
                ))}
                <button className="close-overlay-services" onClick={() => setShowOverlay(false)}>X</button>

              </div>

              <div className="service-buttons-container-services">
                {filteredServices.map((service, index) => (
                  <div key={index} className="service-item-overlay">

                    <img src={service.image} alt={service.serviceName} className="service-image-overlay" />
                    <div className="service-details-overlay">
                      <h4 style={{ color: '#eeba2b' }}>Service: {service.serviceName}</h4>
                      <p>Category:{service.serviceCategory}</p>
                      <p>Price: {service.basePrice}</p>
                      <p>Pax: {service.pax}</p>
                    </div>
                    <button className="select-service-overlay" onClick={() => handleServiceSelect(service)}>
                      Select Service
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {showConfirmOverlay && selectedService && (
          <div className="overlay-container-buttons">
            <div className="overlay-content-buttons">
              <h3>Confirm Service: {selectedService.serviceName}</h3>
              <p>Category: {selectedService.serviceCategory}</p>
              <p>Base Price:{selectedService.basePrice}</p>
              <p>Pax:{selectedService.pax}</p>
              <div className="confirm-button-container">
                <button className="confirm-button" onClick={handleConfirmService}>
                  Confirm
                </button>
                <button className="cancel-button" onClick={handleCancelService}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Package;