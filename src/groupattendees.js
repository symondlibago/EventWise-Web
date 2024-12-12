import React, { useState, useEffect } from 'react';
import './App.css'; // Import the CSS file for styling
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import API_URL from './apiconfig';
import { FaTrash } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";

const GroupAttendees = () => {
  const location = useLocation();
  const { eventId } = location.state || {};
  const [guests, setGuests] = useState([]);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isEditGuestModalVisible, setEditGuestModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const guestsPerPage = 10;

  useEffect(() => {
    if (!eventId) {
      console.error('No eventId found');
      return;
    }

    const fetchGuests = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/guest/${eventId}`);
        setGuests(response.data);
      } catch (error) {
        console.error('Error fetching guests:', error);
      }
    };

    fetchGuests();
  }, [eventId]);

  const totalGuests = guests.length;
  const totalPages = Math.ceil(totalGuests / guestsPerPage);
  const indexOfLastGuest = currentPage * guestsPerPage;
  const indexOfFirstGuest = indexOfLastGuest - guestsPerPage;
  const currentGuests = guests.slice(indexOfFirstGuest, indexOfLastGuest);

  const handleDoneEdit = () => {
    setGuests(guests.map(guest =>
      guest.id === selectedGuest.id ? selectedGuest : guest
    ));
    setEditGuestModalVisible(false);
  };

  const handleEditGuest = () => {
    if (selectedGuest) {
      setEditGuestModalVisible(true);
    }
  };

  const handleDeleteGuest = () => {
    if (selectedGuest) {
      setDeleteModalVisible(true);
    }
  };

  const handleSaveEdit = async () => {
    let successMessage = 'Guest details updated successfully!';  
    if (selectedGuest && selectedGuest.id) {
      try {
        const response = await axios.put(`${API_URL}/api/guest/${selectedGuest.id}`, {
          GuestName: selectedGuest.GuestName,
          role: selectedGuest.role,
          phone: selectedGuest.phone,
          email: selectedGuest.email
        });

        const updatedGuest = response.data.guest;
        setGuests(guests.map(guest => guest.id === updatedGuest.id ? updatedGuest : guest));
        setEditGuestModalVisible(false);
      } catch {
        window.alert(successMessage);
      }
    } else {
      console.error('No guest selected or invalid guest data');
      successMessage = 'Invalid guest data.'; // Change message for invalid data
    }
  };

  const handleConfirmDelete = async () => {
    if (selectedGuest && selectedGuest.id) {
      try {
        await axios.delete(`${API_URL}/api/guest/${selectedGuest.id}`);
        setGuests(guests.filter(guest => guest.id !== selectedGuest.id));
        setDeleteModalVisible(false);

        // Show success alert
        window.alert('Guest deleted successfully!');
      } catch (error) {
        console.error('Error deleting guest:', error);
      }
    } else {
      console.error('Selected guest is not valid for deletion.');
    }
  };

  const renderItem = (item, index) => {
    const displayNumber = (currentPage - 1) * guestsPerPage + index + 1;

    return (
      <tr key={item.id} onClick={() => { setSelectedGuest(item);}} className="row-groupattendee">
        <td className="cell-groupattendee cellNo-groupattendee">{displayNumber}</td>
        <td className="cell-groupattendee cellName-groupattendee">{item.GuestName}</td>
        <td className="cell-groupattendee cellRole-groupattendee">{item.role}</td>
        <td className="cell-groupattendee cellMobile-groupattendee">{item.phone}</td>
        <td className="cell-groupattendee cellEmail-groupattendee">{item.email}</td>
        <td className="cell-groupattendee cellActions-groupattendee">
          <FaRegEdit onClick={() => { setSelectedGuest(item); handleEditGuest(); }} className="action-icon edit-icon" />
          <FaTrash onClick={() => { setSelectedGuest(item); handleDeleteGuest(); }} className="action-icon trash-icon" />
        </td>
      </tr>
    );
  };

  return (
    <div className="container-groupattendee">
      <h1 className="headerText-groupattendee">Group Attendees</h1>
      <div className="line-groupattendee"></div>
      <h2 className="eventTypesText-groupattendee">People In Event</h2>
      <div className="tableContainer-groupattendee">
        <table className="table-groupattendee">
          <thead>
            <tr className="headerRow-groupattendee">
              <th className="headerCell-groupattendee headerNo-groupattendee">No.</th>
              <th className="headerCell-groupattendee headerName-groupattendee">Name</th>
              <th className="headerCell-groupattendee headerRole-groupattendee">Role</th>
              <th className="headerCell-groupattendee headerMobile-groupattendee">Mobile Number</th>
              <th className="headerCell-groupattendee headerEmail-groupattendee">Email</th>
              <th className="headerCell-groupattendee headerActions-groupattendee"></th>
            </tr>
          </thead>
          <tbody>
            {currentGuests.map((guest, index) => renderItem(guest, index))}
          </tbody>
        </table>
      </div>
      <button onClick={handleSaveEdit} className="save-changes-groupattendee">Save Changes</button>

      <div className="pagination-controls">
        <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="pagination-button">&lt;</button>
        <span className="pagination-info">{`Page ${currentPage} of ${totalPages}`}</span>
        <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="pagination-button">&gt;</button>
      </div>

      {/* Edit Guest Modal */}
      {isEditGuestModalVisible && (
        <div className="modal-groupattendee">
          <div className="modalContent-groupattendee">
            <h2 className="modalTitle-groupattendee">Edit Guest</h2>
            <input className="input-groupattendee" placeholder="Name" value={selectedGuest?.GuestName || ''} onChange={(e) => setSelectedGuest({ ...selectedGuest, GuestName: e.target.value })} />
            <input className="input-groupattendee" placeholder="Role" value={selectedGuest?.role || ''} onChange={(e) => setSelectedGuest({ ...selectedGuest, role: e.target.value })} />
            <input className="input-groupattendee" placeholder="Mobile Number" value={selectedGuest?.phone || ''} onChange={(e) => setSelectedGuest({ ...selectedGuest, phone: e.target.value })} />
            <input className="input-groupattendee" placeholder="Email" value={selectedGuest?.email || ''} onChange={(e) => setSelectedGuest({ ...selectedGuest, email: e.target.value })} />
            <button onClick={handleDoneEdit} className="done-groupattendee">Done</button>
            <button onClick={() => setEditGuestModalVisible(false)} className="cancel-groupattendee">Cancel</button>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {isDeleteModalVisible && (
        <div className="modal-groupattendee">
          <div className="modalContent-groupattendee">
            <h3>Are you sure you want to delete this guest?</h3>
            <h4>{selectedGuest?.GuestName}</h4>
            <button onClick={handleConfirmDelete} className="confirm">Yes</button>
            <button onClick={() => setDeleteModalVisible(false)} className="cancel">No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupAttendees;
