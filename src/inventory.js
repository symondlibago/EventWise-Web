import React, { useState, useEffect } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import './App.css';
import API_URL from './apiconfig';

const Inventory = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get location
  const { eventId } = location.state || {}; // Retrieve eventId from state

  const [inventory, setInventory] = useState([]);

  // Fetch equipment data from the backend
  useEffect(() => {
    const fetchInventory = async () => {
      if (!eventId) {
        console.error('No eventId provided');
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/equipment/${eventId}`);
        const data = await response.json();
        console.log('Fetched Inventory Data:', data); // Log the fetched data
        setInventory(data); // Update the inventory state with fetched data
      } catch (error) {
        console.error('Error fetching equipment data:', error);
      }
    };

    fetchInventory();
  }, [eventId]); // Fetch data whenever eventId changes
  
  const totalItems = inventory.reduce((sum, item) => sum + item.total_items, 0);
  const totalBroken = inventory.filter(item => item.status === "Broken").length;
  const totalMissing = inventory.filter(item => item.status === "Missing").length;

  const getStatusStyle = (status) => {
    const statusColors = {
      Complete: 'green',
      Missing: '#eeba2b',
      Broken: 'red',
    };
    return { color: statusColors[status] || 'black' }; // Default to black if no status
  };

  return (
    <div className="inventory-container">
      <div className="content-inventory">
        <div className="header-section-inventory">
          <button className="back-button-inventory" onClick={() => navigate('/events')}>
            <IoArrowBack size={32} color="#eeba2b" />
          </button>
          <h1 className="header-text-inventory">
            <span className="header-highlight-inventory">Inventory</span> Tracker
          </h1>
          <hr className="header-line-inventory" />
        </div>
        <div className="table-inventory">
          <div className="table-header-inventory">
            <div className="table-header-text-inventory">ITEMS</div>
            <div className="table-header-text-inventory">NO. OF ITEMS</div>
            <div className="table-header-text-inventory">NO. OF SORT ITEMS</div>
            <div className="table-header-text-inventory">STATUS</div>
          </div>
          {inventory.length > 0 ? ( // Check if inventory is available
            inventory.map((item) => (
              <div key={item.id} className="table-row-inventory">
                <div className="table-row-text-inventory">{item.item_name}</div>
                <div className="table-row-text-inventory">{item.total_items}</div>
                <div className="table-row-text-inventory">{item.sorted_items}</div>
                <div className="table-row-text-inventory" style={getStatusStyle(item.status)}>
                  {item.status || 'Unknown'}
                </div>
              </div>
            ))
          ) : (
            <div className="no-items-message">No equipment found for this event.</div> // Fallback message
          )}
        </div>
        <div className="summary-inventory">
          <div className="summary-text-inventory">Total Items: {totalItems}</div>
          <div className="summary-text-inventory">Total Items Broken: {totalBroken}</div>
          <div className="summary-text-inventory">Total Items Missing: {totalMissing}</div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
