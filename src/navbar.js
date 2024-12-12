import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faEnvelope, faBell, faInfoCircle, faUserFriends, faClipboardList, faCommentAlt, faUserCircle, faCog, faSignOutAlt, faChevronDown, faHouse, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import './App.css'; // Make sure this path is correct
import logo from './images/logo.png'; // Make sure this path is correct

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className={`navbar-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <div className="navbar">
        <div className="burger-icon" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} size='lg' style={{ marginLeft: '2rem' }} />
        </div>
        <div className="logo">
          <img src={logo} alt="Logo" className="logonavbar" />
        </div>
        <div className="icons">
            <Link to="/profile" className="icon">
            <FontAwesomeIcon icon={faUserCircle} size='lg' style={{ marginRight: '10px', color: 'black' }} />
          </Link>
         
        </div>
      </div>
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="logo-container">
          <img src={logo} alt="Logo" className="sidebar-logo" />
        </div>
        <div className="menu-items">
          <Link to="/dashboard" className="menu-item" onClick={closeSidebar}>
            <FontAwesomeIcon icon={faHouse} size='lg' style={{ marginRight: '10px' }} />
            <span>Dashboard</span>
          </Link>
          <Link to="/schedule" className="menu-item" onClick={closeSidebar}>
            <FontAwesomeIcon icon={faCalendarAlt} size='lg' style={{ marginRight: '10px' }} />
            <span>Schedule</span>
          </Link>
          <Link to="/events" className="menu-item" onClick={closeSidebar}>
            <FontAwesomeIcon icon={faClipboardList} size='lg' style={{ marginRight: '10px' }} />
            <span>Events</span>
          </Link>
          <Link to="/feedback" className="menu-item" onClick={closeSidebar}>
            <FontAwesomeIcon icon={faCommentAlt} size='lg' style={{ marginRight: '10px' }} />
            <span>Feedback</span>
          </Link>
          <Link to="/groups" className="menu-item" onClick={closeSidebar}>
            <FontAwesomeIcon icon={faUserFriends} size='lg' style={{ marginRight: '10px' }} />
            <span>Groups</span>
          </Link>
          <Link to="/about" className="menu-item" onClick={closeSidebar}>
            <FontAwesomeIcon icon={faInfoCircle} size='lg' style={{ marginRight: '10px' }} />
            <span>About</span>
          </Link>

        </div>
        <div className="user-info">
          <div className="user-details" onClick={toggleDropdown}>
            <span className="user-name">Arvil Carrasco</span>
            <FontAwesomeIcon icon={faChevronDown} className={`dropdown-icon ${isDropdownOpen ? 'open' : ''}`} />
          </div>
          <div className={`dropdown-menu ${isDropdownOpen ? 'open' : ''}`}>
            <Link to="/profile" className="dropdown-item" onClick={closeSidebar}>
              <FontAwesomeIcon icon={faUserCircle} size='lg' style={{ marginRight: '10px' }} />
              <span>Profile</span>
            </Link>
            <Link to="/settings" className="dropdown-item" onClick={closeSidebar}>
              <FontAwesomeIcon icon={faCog} size='lg' style={{ marginRight: '10px' }}/>
              <span>Settings</span>
            </Link>
            <Link to="/logout" className="dropdown-item" onClick={closeSidebar}>
              <FontAwesomeIcon icon={faSignOutAlt} size='lg' style={{ marginRight: '10px' }} />
              <span>Logout</span>
            </Link>
          </div>
        </div>
        <div className="sidebar-footer">
          <div className="footer-text">
            <span>EventWise © 2024</span><br />
            <span>Powered by EventTech</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
