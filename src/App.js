import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './login';
import Dashboard from './dashboard';
import Navbar from './navbar'; // Import the Navbar component
import Notification from './notification';
import Events from './events';
import { CreateEvent, ChoosePackage, ChooseServiceProv, GuestPage } from './createevent';
import BookEventReview from './bookeventreview';
import Attendees from './attendees';
import Inventory from './inventory';
import Equipment from './equipment';
import Profile from './profile';
import EditProfile from './editprofile';
import AddRole from './addrole';
import Settings from './settings';
import Package from './package';
import Feedback from './feedback';
import EventsFeedback from './eventsfeedback';
import Group from './group';
import GroupAttendees from './groupattendees';
import Messages from './messages';
import Success from './success';
import PortfolioAdmin from './portfolioadmin';
import Schedule from './schedule';
import About from './about';
import AddSched from './addsched';
function App() {
  return (
    <Router>
      <div className="App">
     
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/dashboard" element={<><Navbar /><Dashboard /></>} />
          <Route path="/notifications" element={<><Navbar /><Notification/></>} />
          <Route path="/events" element={<><Navbar /><Events/></>} />
          <Route path="/create-event" element={<><Navbar /><CreateEvent/></>} />
          <Route path="/choose-package" element={<><Navbar /><ChoosePackage/></>} />
          <Route path="/choose-service-provider" element={<><Navbar /><ChooseServiceProv/></>} />
          <Route path="/attendee-tracker" element={<><Navbar /><Events/></>} />
          <Route path="/inventory-tracker" element={<><Navbar /><Events/></>} />
          <Route path="/attendees" element={<><Navbar /><Attendees/></>} />
          <Route path="/inventory" element={<><Navbar /><Inventory/></>} />
          <Route path="/equipment" element={<><Navbar /><Equipment/></>} />
          <Route path="/portfolioadmin" element={<><Navbar /><PortfolioAdmin/></>} />
          <Route path="/profile" element={<><Navbar /><Profile/></>} />
          <Route path="/edit-profile" element={<><Navbar /><EditProfile/></>} />
          <Route path="/add-role" element={<><Navbar /><AddRole/></>} />
          <Route path="/settings" element={<><Navbar /><Settings/></>} />
          <Route path="/package" element={<><Navbar /><Package/></>} />
          <Route path="/feedback" element={<><Navbar /><EventsFeedback/></>} />
          <Route path="/feedback/feedback-events" element={<><Navbar /><Feedback/></>} />
          <Route path="/groups" element={<><Navbar /><Group/></>} />
          <Route path="/group-attendees" element={<><Navbar /><GroupAttendees/></>} />
          <Route path="/messages" element={<><Navbar /><Messages/></>} />
          <Route path="/success" element={<><Navbar /><Success/></>} />
          <Route path="/schedule" element={<><Navbar /><Schedule/></>} />
          <Route path="/add-guest" element={<><Navbar /><GuestPage/></>} />
          <Route path="/about" element={<><Navbar /><About/></>} />
          <Route path="/add-schedule" element={<><Navbar /><AddSched/></>} />
          <Route path="/book-event-review" element={<><Navbar /><BookEventReview/></>} />
          <Route path="/logout" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
