import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import { IoArrowBack } from 'react-icons/io5';
import { IoMdAddCircle, IoMdRemoveCircle, IoIosDoneAll, IoIosArrowDown } from 'react-icons/io';
import API_URL from './apiconfig';

const Equipment = () => {
  const location = useLocation();
  const [inventoryData, setInventoryData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newItem, setNewItem] = useState("");
  const [newItemCount, setNewItemCount] = useState("");
  const [removeMode, setRemoveMode] = useState(false);
  const [itemsToRemove, setItemsToRemove] = useState([]);
  const [sortItems, setSortItems] = useState({});
  const [statusDropdownVisible, setStatusDropdownVisible] = useState(false);
  const eventId = location.state?.eventId;
  const navigate = useNavigate();

  const fetchInventory = useCallback(async () => {
    if (!eventId) {
      console.error("Event ID is not defined.");
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/api/equipment?event_id=${eventId}`);
      setInventoryData(response.data);
      
      const initialSortItems = response.data.reduce((acc, item) => {
        acc[item.id] = item.number_of_sort_items;
        return acc;
      }, {});
      setSortItems(initialSortItems);
    } catch (error) {
      console.error("Error fetching inventory data:", error.response?.data || error.message);
    }
  }, [eventId]);

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  const handleAddItem = async () => {
    if (newItem.trim() && newItemCount > 0 && eventId) {
      try {
        await axios.post(`${API_URL}/api/equipment`, {
          item: newItem.trim(),
          number_of_items: parseInt(newItemCount),
          number_of_sort_items: 0,
          status: "",  // No initial status when adding
          event_id: eventId
        });
        fetchInventory();
        resetNewItemInputs();
        
      }
      
      catch (error) {
        console.error("Error adding the item:", error.response?.data || error.message);
      }
    } else {
      console.error("Please provide a valid item name and count.");
    }
  };

  const resetNewItemInputs = () => {
    setNewItem("");
    setNewItemCount("");
    setModalVisible(false);
  };

  const handleRemoveItem = (id) => {
    setItemsToRemove(prevItems => 
      prevItems.includes(id) 
        ? prevItems.filter(item => item !== id) 
        : [...prevItems, id]
    );
  };

  const handleRemoveModeToggle = () => {
    setRemoveMode(prev => !prev);
  };

  const totalItems = inventoryData.reduce((sum, item) => sum + item.number_of_items, 0);
  const totalBroken = inventoryData.filter(item => item.status === "Broken").length;
  const totalMissing = inventoryData.filter(item => item.status === "Missing").length;

  const handleIncrementSortItem = (id) => {
    setSortItems(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const handleDecrementSortItem = (id) => {
    setSortItems(prev => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) - 1)
    }));
  };

  const handleSaveItems = async () => {
    try {
      // Save sorted item counts
      await Promise.all(
        Object.keys(sortItems).map(async (id) => {
          await axios.put(`${API_URL}/api/equipment/${id}`, {
            number_of_sort_items: sortItems[id],
            event_id: eventId
          });
        })
      );
  
      // Save updated statuses
      await Promise.all(
        inventoryData.map(async (item) => {
          await axios.put(`${API_URL}/api/equipment/${item.id}`, {
            status: item.status, // Send the updated status for each item
            event_id: eventId
          });
        })
      );
  
      fetchInventory(); // Refresh the inventory after saving
    } catch (error) {
      console.error("Error saving items:", error.response?.data || error.message);
    }
  };
  

  // Status handling
  const handleStatusToggle = (id) => {
    setStatusDropdownVisible(prev => (prev === id ? false : id));
  };

  const handleStatusSelect = (id, status) => {
    const updatedInventory = inventoryData.map(item => 
      item.id === id ? { ...item, status } : item
    );
    setInventoryData(updatedInventory);
    setStatusDropdownVisible(false);
  };

  return (
    <div className="equipment-container">
      <header className="header-equipment">
        <button className="back-button-equipment" onClick={() => navigate('/events')}>
          <IoArrowBack size={32} color="#eeba2b" />
        </button>
        <h1 className="header-text-equipment">
          <span className="header-highlight">Equipment</span> Tracker
        </h1>
      </header>
      <hr className="header-line" />

      <div className="table-container-equipment">
        <div className="table-equipment">
  <div className="table-header-equipment">
    <div className="table-header-cell-equipment">ITEMS</div>
    <div className="table-header-cell-equipment">NO. OF ITEMS</div>
    <div className="table-header-cell-equipment">NO. OF SORT ITEMS</div>
    <div className="table-header-cell-equipment">STATUS</div>
  </div>

  {inventoryData.map((item) => (
    !itemsToRemove.includes(item.id) && (
      <div key={item.id} className="table-row-equipment">
        {removeMode && (
          <button 
            className="remove-button-equipment" 
            onClick={() => handleRemoveItem(item.id)}>
            <IoMdRemoveCircle size={24} color="red" />
          </button>
        )}
        
        {/* Item Name */}
        <div className="table-cell-equipment items">{item.item}</div>

        {/* No. of Items */}
        <div className="table-cell-equipment num-items">
          {item.number_of_items}
        </div>

        {/* No. of Sort Items with +/- buttons */}
        <div className="table-cell-equipment num-sort-items">
          <button 
            className="sort-button" 
            onClick={() => handleDecrementSortItem(item.id)}>
            <IoMdRemoveCircle size={20} color="black" />
          </button>
          {sortItems[item.id] !== undefined ? sortItems[item.id] : item.number_of_sort_items}
          <button 
            className="sort-button" 
            onClick={() => handleIncrementSortItem(item.id)}>
            <IoMdAddCircle size={20} color="black" />
          </button>
        </div>

        {/* Status Dropdown */}
        <div className="table-cell-equipment status">
          <div className="status-dropdown-equipment">
            <button 
              className={`status-dropdown-button ${item.status?.toLowerCase() || ''}`}
              onClick={() => handleStatusToggle(item.id)}>
              {item.status || 'Select Status'} <IoIosArrowDown />
            </button>
            {statusDropdownVisible === item.id && (
              <div className="status-options">
                <div className="status-option status-complete" onClick={() => handleStatusSelect(item.id, 'Complete')}>Complete</div>
                <div className="status-option status-missing" onClick={() => handleStatusSelect(item.id, 'Missing')}>Missing</div>
                <div className="status-option status-broken" onClick={() => handleStatusSelect(item.id, 'Broken')}>Broken</div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  ))}
  
  <button className="add-button-equipment" onClick={() => setModalVisible(true)}>
    <IoMdAddCircle size={24} color="white" />
    <span>Add Item</span>
  </button>
  
  <button className="remove-button-equipment" onClick={handleRemoveModeToggle}>
    <IoMdRemoveCircle size={24} color="white" />
    <span>{removeMode ? 'Cancel Remove' : 'Remove Item'}</span>
  </button>
  
  <button className="add-button-equipment" onClick={handleSaveItems}>
    <IoIosDoneAll size={24} color="white" />
    <span>Save</span>
  </button>
</div>


        <div className="summary-equipment">
          <div className="summary-text-equipment">Total Items: {totalItems}</div>
          <div className="summary-text-equipment">Total Items Broken: {totalBroken}</div>
          <div className="summary-text-equipment">Total Items Missing: {totalMissing}</div>
        </div>
      </div>

      {modalVisible && (
        <div className="modal-overlay-equipment">
          <div className="modal-content-equipment">
            <button className="close-button-equipment" onClick={() => setModalVisible(false)}>×</button>
            <h2 className='modal-title-equipment'>Add New Item</h2>
            <div className="modal-input-group-equipment">
              <label>Name of Item</label>
              <input
                type="text"
                value={newItem}
                onChange={e => setNewItem(e.target.value)}
                className="modal-input-equipment"
              />
            </div>
            <div className="modal-input-group-equipment">
              <label>Number of Items</label>
              <input
                type="number"
                value={newItemCount}
                onChange={e => setNewItemCount(e.target.value)}
                className="modal-input-equipment"
              />
            </div>
            <button className="modal-add-button-equipment" onClick={handleAddItem}>Add Item</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Equipment;
