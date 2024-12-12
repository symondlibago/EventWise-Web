// import React, { useState } from 'react';
// import './App.css';
// import Modal from '@mui/material/Modal'; // Import Modal from Material UI

// const GuestPage = () => {
//   const [guests, setGuests] = useState([]);
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [modalVisible, setModalVisible] = useState(false); // State for modal visibility

//   const handleAddGuest = () => {
//     if (name && email) {
//       setGuests([...guests, { name, email }]);
//       setName('');
//       setEmail('');
//     }
//   };

//   const handleRemoveGuest = (index) => {
//     const newGuests = guests.filter((_, i) => i !== index);
//     setGuests(newGuests);
//   };

//   const handleBookEvent = () => {
//     setModalVisible(true); // Show the overlay when booking an event
//   };

//   const handleCloseModal = () => {
//     setModalVisible(false); // Close the overlay
//   };

//   return (
//     <div className="guestpage-guestpage">
//       <h1 className="header-guestpage">Add Guest</h1>
//       <div className="guest-container-guestpage">
//         {/* Left Section - Add Guest Form */}
//         <div className="left-section-guestpage">
//           <label className="label-guestpage">Name of the Guest</label>
//           <input
//             type="text"
//             className="input-guestpage"
//             placeholder="Enter name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//           <label className="label-guestpage">Email of the Guest</label>
//           <input
//             type="email"
//             className="input-guestpage"
//             placeholder="Enter email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <button className="add-guest-btn-guestpage" onClick={handleAddGuest}>
//             Add Guest
//           </button>
//         </div>

//         {/* Right Section - Guest Table */}
//         <div className="right-section-guestpage">
//           <table className="guest-table-guestpage">
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {guests.map((guest, index) => (
//                 <tr key={index}>
//                   <td>{guest.name}</td>
//                   <td>{guest.email}</td>
//                   <td>
//                     <button
//                       className="remove-guest-btn-guestpage"
//                       onClick={() => handleRemoveGuest(index)}
//                     >
//                       Remove Guest
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Book Event Button */}
//       <button className="book-event-btn-guestpage" onClick={handleBookEvent}>
//         Book Event
//       </button>

//       {/* Overlay for Booking Event */}
//       <Modal
//         open={modalVisible}
//         onClose={handleCloseModal}
//         className="modal-overlay-guestpage"
//       >
//         <div className="modal-content-guestpage">
//           <button className="close-modal-btn-guestpage" onClick={handleCloseModal}>
//             &times; {/* X Button */}
//           </button>
//           <img src={require('./images/popup.png')} alt="Popup" className="popup-image-guestpage" />
//           <p className="modal-text-guestpage">Your event has been booked!</p>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default GuestPage;
