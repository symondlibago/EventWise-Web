import React, { useState, useEffect } from 'react';
import './App.css'; // Import the CSS file for styling
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import API_URL from './apiconfig';
import Swal from 'sweetalert2';

const Attendees = () => {
  const location = useLocation();
  const { eventId } = location.state || {};
  const [guests, setGuests] = useState([]);
  const [filteredGuests, setFilteredGuests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const guestsPerPage = 10;
  const [statusFilter, setStatusFilter] = useState('all'); // Track selected status filter

  useEffect(() => {
    if (!eventId) {
      console.error('No eventId found');
      return;
    }

    const fetchGuests = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/guest/${eventId}`);
        setGuests(response.data);
        setFilteredGuests(response.data); // Set filtered guests to all initially
      } catch (error) {
        console.error('Error fetching guests:', error);
      }
    };

    fetchGuests();
  }, [eventId]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const filtered = guests.filter((guest) =>
      guest.GuestName && guest.GuestName.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredGuests(filtered);
    setCurrentPage(1); // Reset to the first page when filtering
  };
  

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
  };

  useEffect(() => {
    let filtered = guests.filter((guest) =>
      guest.GuestName && guest.GuestName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    // Apply the status filter
    if (statusFilter === 'present') {
      filtered = filtered.filter((guest) => guest.status === 'Present');
    } else if (statusFilter === 'absent') {
      filtered = filtered.filter((guest) => guest.status === 'Absent');
    }
  
    setFilteredGuests(filtered);
    setCurrentPage(1); // Reset to the first page when filtering
  }, [guests, statusFilter, searchTerm]);

  const totalGuests = filteredGuests.length;
  const totalPages = Math.ceil(totalGuests / guestsPerPage);
  const indexOfLastGuest = currentPage * guestsPerPage;
  const indexOfFirstGuest = indexOfLastGuest - guestsPerPage;
  const currentGuests = filteredGuests.slice(indexOfFirstGuest, indexOfLastGuest);

  const handleStatusChange = async (guest, status) => {
    try {
        console.log(`Updating status for ${guest.GuestName} to ${status}`);
  
        // Optimistically update the state (before the API response)
        setGuests(prevGuests =>
            prevGuests.map(g =>
                g.id === guest.id ? { ...g, status: status } : g
            )
        );
  
        const response = await axios.put(`${API_URL}/api/guest/${guest.id}`, {
            status: status,
        });
  
        // Log the response to inspect the structure
        console.log('API Response:', response.data);
  
        const updatedGuest = response.data;
  
        if (updatedGuest && updatedGuest.id) {
            setGuests(prevGuests =>
                prevGuests.map(g => (g.id === updatedGuest.id ? updatedGuest : g))
            );

            // SweetAlert2 success alert
            Swal.fire({
              title: 'Success!',
              text: `${guest.GuestName} has been marked as ${status}.`,
              icon: 'success',
              confirmButtonText: 'OK',
              customClass: {
                  confirmButton: 'custom-ok-button',
              },
              buttonsStyling: false, // Disable default button styling
          });
          
        } else {
            console.error('Updated guest data is missing or malformed:', response.data);

            // SweetAlert2 error alert
            Swal.fire({
                title: 'Error!',
                text: 'Failed to update the status. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK',
                customClass: {
                  confirmButton: 'custom-ok-button',
              },
              buttonsStyling: false, // Disable default button styling
            });
        }
    } catch (error) {
        console.error('Error updating status:', error);

        // SweetAlert2 error alert
        Swal.fire({
            title: 'Error!',
            text: 'Failed to update the status. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK',
            customClass: {
              confirmButton: 'custom-ok-button',
          },
          buttonsStyling: false, // Disable default button styling
        });
    }
};


  const presentCount = filteredGuests.filter((guest) => guest.status === 'Present').length;
  const absentCount = filteredGuests.filter((guest) => guest.status === 'Absent').length;

  const renderItem = (item, index) => {
    const displayNumber = (currentPage - 1) * guestsPerPage + index + 1;

    return (
      <tr key={item.id} onClick={() => { setSelectedGuest(item); }} className="row-groupattendee">
        <td className="cell-groupattendee cellNo-groupattendee">{displayNumber}</td>
        <td className="cell-groupattendee cellName-groupattendee">{item.GuestName}</td>
        <td className="cell-groupattendee cellRole-groupattendee">{item.role}</td>
        <td className="cell-groupattendee cellMobile-groupattendee">{item.status}</td>
        <td className="cell-groupattendee cellActions-groupattendee">
          {/* Status Update Buttons */}
          <button 
            onClick={() => handleStatusChange(item, 'Present')} 
            className="status-button present-button"
          >
            Present
          </button>
          <button 
            onClick={() => handleStatusChange(item, 'Absent')} 
            className="status-button absent-button"
          >
            Absent
          </button>
        </td>
      </tr>
    );
  };

  return (
    <div className="container-groupattendee">
      <h1 className="headerText-groupattendee">Attendee Tracker</h1>
      <div className="line-groupattendee"></div>
      <h2 className="eventTypesText-groupattendee">People In Event</h2>
      
      <div className="search-container">
        <input 
          type="text" 
          className="search-input" 
          placeholder="Search by name..." 
          value={searchTerm} 
          onChange={handleSearch} 
        />
      </div>
      
      <div className="status-count-container">
        <button 
          onClick={() => handleStatusFilterChange('present')} 
          className="status-count-button present-button"
        >
          Present: {presentCount}
        </button>
        <button 
          onClick={() => handleStatusFilterChange('absent')} 
          className="status-count-button absent-button"
        >
          Absent: {absentCount}
        </button>
        <button 
          onClick={() => handleStatusFilterChange('all')} 
          className="status-count-button"
        >
          All
        </button>
      </div>

      <div className="tableContainer-groupattendee">
        <table className="table-groupattendee">
          <thead>
            <tr className="headerRow-groupattendee">
              <th className="headerCell-groupattendee headerNo-groupattendee">No.</th>
              <th className="headerCell-groupattendee headerName-groupattendee">Name</th>
              <th className="headerCell-groupattendee headerRole-groupattendee">Role</th>
              <th className="headerCell-groupattendee headerMobile-groupattendee">Status</th>
              <th className="headerCell-groupattendee headerActions-groupattendee"></th>
            </tr>
          </thead>
          <tbody>
            {currentGuests.map((guest, index) => renderItem(guest, index))}
          </tbody>
        </table>
      </div>

      <div className="pagination-controls">
        <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="pagination-button">&lt;</button>
        <span className="pagination-info">{`Page ${currentPage} of ${totalPages}`}</span>
        <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="pagination-button">&gt;</button>
      </div>
    </div>
  );
};

export default Attendees;
