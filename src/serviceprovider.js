// import React, { useState } from 'react';
// import { Modal } from '@mui/material';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { useNavigate } from 'react-router-dom'; // Corrected import
// import { faHeart, faHeartBroken, faPlusCircle, faCashRegister, faTrash } from '@fortawesome/free-solid-svg-icons';
// import './App.css';

// const allEventsData = [
//   { id: '1', title: 'Diwata Pares', image: 'event1.png', provider: 'Boss Kenshin', price: '$500', type: 'Photography' },
//   { id: '2', title: 'Diwata Pares', image: 'event2.png', provider: 'Boss Kenshin', price: '$2000', type: 'Photography' },
//   { id: '3', title: 'Diwata Pares', image: 'event3.png', provider: 'Boss Kenshin', price: '$1000', type: 'Photography' },
//   { id: '4', title: 'Diwata Pares', image: 'event1.png', provider: 'Boss Kenshin', price: '$800', type: 'Food Catering' },
//   { id: '5', title: 'Diwata Pares', image: 'event2.png', provider: 'Boss Kenshin', price: '$1200', type: 'Photography' },
//   { id: '6', title: 'Diwata Pares', image: 'event3.png', provider: 'Boss Kenshin', price: '$1500', type: 'Food Catering' },
//   { id: '7', title: 'Diwata Pares', image: 'event1.png', provider: 'Boss Kenshin', price: '$600', type: 'Video Editing' },
//   { id: '8', title: 'Diwata Pares', image: 'event2.png', provider: 'Boss Kenshin', price: '$400', type: 'Food Catering' },
// ];

// const eventServices = ["Food Catering", "Photography", "Video Editing", "Florists"];

// const ChooseServiceProv = () => {
//   const navigate = useNavigate(); // Corrected useNavigate
//   const [selectedType, setSelectedType] = useState(null);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [likedEvents, setLikedEvents] = useState({});
//   const [modalVisible, setModalVisible] = useState(false);
//   const [addedEvents, setAddedEvents] = useState([]);

//   const toggleLike = (eventId) => {
//     setLikedEvents(prevState => ({
//       ...prevState,
//       [eventId]: !prevState[eventId],
//     }));
//   };

//   const handleEventClick = (item) => {
//     setSelectedEvent(item);
//     setModalVisible(true);
//   };

//   const handleCloseModal = () => {
//     setModalVisible(false);
//     setSelectedEvent(null);
//   };

//   const handleNext = () => {
//     if (selectedEvent) {
//       setAddedEvents(prevEvents => [...prevEvents, selectedEvent]);
//       handleCloseModal();
//     }
//   };

//   const handleRemoveEvent = (eventId) => {
//     setAddedEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
//   };

//   const handleFinish = async () => {
//     const eventData = JSON.parse(localStorage.getItem('eventData')) || {};
//     const addedEvents = JSON.parse(localStorage.getItem('addedEvents')) || [];

//     try {
//         const response = await fetch('/api/events', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 ...eventData,
//                 providers: addedEvents,
//             }),
//         });

//         if (!response.ok) {
//             throw new Error('Network response was not ok.');
//         }

//         const data = await response.json();
//         console.log('Event saved successfully:', data);
//         localStorage.removeItem('eventData');
//         localStorage.removeItem('addedEvents');
//         navigate('/dashboard');
//     } catch (error) {
//         console.error('Error saving event:', error);
//     }
// };



//   const filteredEventsData = selectedType
//     ? allEventsData.filter(event => event.type === selectedType)
//     : allEventsData;

//   const renderEventItem = (item) => (
//     <div className="event-item-sp" onClick={() => handleEventClick(item)} key={item.id}>
//       <img src={require(`./images/${item.image}`)} alt={item.title} className="event-image-sp" />
//       <p className="event-title-sp">{item.title}</p>
//       <div className="event-details-sp">
//         <div className="event-detail-row-sp">
//           <FontAwesomeIcon icon={faPlusCircle} size="sm" color="#2A93D5" />
//           <p className="event-detail-text-sp">{item.provider}</p>
//         </div>
//         <div className="event-detail-row-sp">
//           <FontAwesomeIcon icon={faCashRegister} size="sm" color="#2A93D5" />
//           <p className="event-detail-text-sp">{item.price}</p>
//         </div>
//       </div>
//       <div
//         className={`like-icon-sp ${likedEvents[item.id] ? 'liked' : ''}`}
//         onClick={(e) => {
//           e.stopPropagation();
//           toggleLike(item.id);
//         }}
//       >
//         <FontAwesomeIcon
//           icon={likedEvents[item.id] ? faHeart : faHeartBroken}
//           color={likedEvents[item.id] ? '#FF0000' : '#888'}
//           size="lg"
//         />
//       </div>
//     </div>
//   );

//   return (
//     <div className="gradient-background-sp">
//       <div className="main-container-sp">
//         {/* Header section */}
//         <div className="scrollable-conten-spt">
//           <div className="content-sp">
//             {/* Centered Create Event Text */}
//             <p className="header-title-sp">Service Provider</p>
//             {/* Fading Line */}
//             <div className="separator-line-sp"></div>
//             {/* Event Types Section */}
//             <p className="service-type-label-sp">Add Service Provider</p>
//             <div className="horizontal-scroll-sp">
//               {eventServices.map((type, index) => (
//                 <button
//                   key={index}
//                   className={`event-type-button-sp ${selectedType === type ? 'selected' : ''}`}
//                   onClick={() => setSelectedType(type)}
//                 >
//                   <p className={`event-type-text-sp ${selectedType === type ? 'selected' : ''}`}>
//                     {type}
//                   </p>
//                 </button>
//               ))}
//             </div>
            
//             {/* Scrollable Events List */}
//             <div className="event-list-container-sp">
//               {filteredEventsData.map(event => renderEventItem(event))}
//             </div>
            
//             {/* Added Events List */}
//             {addedEvents.length > 0 && (
//               <div className="added-events-section-sp">
//                 <p className="added-events-title-sp">Added Events</p>
//                 <div className="added-events-scroll-sp">
//                   {addedEvents.map(event => (
//                     <div key={event.id} className="added-event-item-sp">
//                       <p className="added-event-text-sp">{event.title}</p>
//                       <p className="added-event-text-sp">{event.type}</p>
//                       <p className="added-event-text-sp">{event.price}</p>
//                       <button
//                         className="remove-event-button-sp"
//                         onClick={() => handleRemoveEvent(event.id)}
//                       >
//                         <FontAwesomeIcon icon={faTrash} size="lg" color="#FF4C4C" />
//                       </button>
//                     </div>
//                   ))}
//                   <div className="footer-buttons-sp">
//                     <button className="modal-cancel-button-sp" onClick={() => window.history.back()}>
//                       <p className="modal-cancel-button-text-sp">Cancel</p>
//                     </button>
//                     <button className="modal-add-button-sp" onClick={handleFinish}>
//                       <p className="modal-add-button-text-sp" onClick={()=> navigate('/add-guest')}>Finish</p>
//                     </button>
//                   </div>
//                 </div>  
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Modal for Event Details */}
//         <Modal
//           open={modalVisible}
//           onClose={handleCloseModal}
//           className="modal-overlay-sp"
//         >
//           <div className="modal-content-container-sp">
//             <div className="modal-body-sp">
//               {selectedEvent && (
//                 <>
//                   <p className="modal-title-sp">{selectedEvent.title}</p>
//                   <p className="modal-provider-sp">Provider: {selectedEvent.provider}</p>
//                   <p className="modal-price-sp">Price: {selectedEvent.price}</p>
//                   <div className="modal-actions-sp">
//                     <button className="modal-add-button-sp" onClick={handleNext}>Add</button>
//                     <button className="modal-cancel-button-sp" onClick={handleCloseModal}>Cancel</button>
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         </Modal>
//       </div>
//     </div>
//   );
// };

// export default ChooseServiceProv;
