import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import moment from "moment";
import './App.css'; // Ensure this path is correct
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCalendar } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [plusOverlayVisible, setPlusOverlayVisible] = useState(false);
  const [eventDetailsOverlayVisible, setEventDetailsOverlayVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventType, setEventType] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [showEventTypes, setShowEventTypes] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const navigate = useNavigate();

  const schedules = {
    "2024-11-21": [
      {
        time: "09:00 AM",
        title: "Team Meeting",
        description: "Discuss project status.",
        timeline: [
          { time: "09:00 AM", description: "Event Start" },
          { time: "09:15 AM", description: "Introduction to the team" },
          { time: "09:30 AM", description: "Updates from each member" },
          { time: "10:00 AM", description: "Discussion on blockers" },
          { time: "10:30 AM", description: "Wrap up and next steps" },
        ],
      },
      {
        time: "02:00 PM",
        title: "Client Call",
        description: "Review client requirements.",
        timeline: [
          { time: "02:00 PM", description: "Event Start" },
          { time: "02:05 PM", description: "Introduction to the client" },
          { time: "02:15 PM", description: "Review requirements" },
          { time: "02:45 PM", description: "Discuss feedback" },
          { time: "03:00 PM", description: "Next steps and follow-up actions" },
        ],
      },
    ],
  };

  const [temporaryEvents, setTemporaryEvents] = useState([]); // Initialize temporary events state
  const openOverlay = (event) => {
    setSelectedEvent(event);
    setOverlayVisible(true);
  };

  const closeOverlay = () => {
    setOverlayVisible(false);
    setSelectedEvent(null);
  };

  const openPlusOverlay = () => {
    setPlusOverlayVisible(true);
  };

  const closePlusOverlay = () => {
    setPlusOverlayVisible(false);
    setEventType('');
    setStartTime('');
    setEndTime('');
    setEventDate('');
    setShowEventTypes(false);
    setShowDatePicker(false);
  };

  const openEventDetailsOverlay = () => {
    setEventDetailsOverlayVisible(true);
  };

  const closeEventDetailsOverlay = () => {
    setEventDetailsOverlayVisible(false);
    setEventName('');
    setEventDescription('');
  };

  const handleSaveEventDetails = () => {
    const newEvent = {
      time: `${startTime} - ${endTime}`,
      title: eventName,
      description: eventDescription,
    };
    setTemporaryEvents([...temporaryEvents, newEvent]); // Now it works
    closeEventDetailsOverlay();
  };

  const renderCalendarDays = () => {
    const daysInMonth = moment().daysInMonth();
    const monthStart = moment().startOf('month');

    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const day = moment(monthStart).date(i);
      const formattedDate = day.format("YYYY-MM-DD");
      const isSelected = selectedDate === formattedDate;

      days.push(
        <div
          key={i}
          className={`date-schedule ${isSelected ? 'selected-schedule' : ''}`}
          onClick={() => setSelectedDate(formattedDate)}
        >
          {i}
          {schedules[formattedDate] && <div className="event-dot-schedule" />}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="sched-bg">
    <div className="schedule-container">
              <div className="schedule-header-container">
          <h2 className="schedule-header">Schedule 
          <button className="add-schedule-button" onClick={() => navigate('/add-schedule')}>
            <FontAwesomeIcon icon={faPlus} /> Add Schedule
          </button></h2>
        </div>
        
<div className="schedule-layout">
        <div className="calendar-schedule">
        <div className="current-month-schedule" style={{ fontSize: '2em', margin: '20px 20px 20px 20px' }}>
          {moment().format("MMMM YYYY")}
        </div>
          <div className="days-header-schedule">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>
          <div className="dates-schedule">
            {renderCalendarDays()}
          </div>
        </div>

        <div className="details-schedule">
          <h3>
            Agenda for {selectedDate ? moment(selectedDate).format("MMMM D, YYYY") : "Select a date"}
          </h3>

          {selectedDate && schedules[selectedDate] ? (
            schedules[selectedDate].map((event, index) => (
              <div
                key={index}
                className="event-container-schedule"
              >
                <FontAwesomeIcon 
                  icon={faPlus} 
                  className="add-icon-schedule" 
                  onClick={openPlusOverlay} 
                />
                <p className="event-time-schedule">{event.time}</p>
                <h4 className="event-title-schedule">{event.title}</h4>
                <p className="event-description-schedule">{event.description}</p>
                <div className="details-button" onClick={() => openOverlay(event)}>View Details</div>
              </div>
            ))
          ) : (
            <p>No events for this date.</p>
          )}
        </div>
      </div>

      {overlayVisible && (
        <div className="overlay-schedule">
          <div className="overlay-content-schedule">
            <div className="overlay-header-schedule">
              <h4>Time Frame</h4>
              <button onClick={closeOverlay}>X</button>
            </div>
            <p>{moment(selectedDate).format("MMMM D, YYYY")}</p>
            <table className="timeline-table-schedule">
              <tbody>
                {selectedEvent?.timeline.map((timeEvent, index) => (
                  <tr key={index} className="timeline-row-schedule">
                    <td>{timeEvent.time}</td>
                    <td>
                      <div className="time-circle-schedule" />
                      <div className="vertical-line" />
                    </td>
                    <td>{timeEvent.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {plusOverlayVisible && (
        <div className="overlay-sched">
          <div className="overlay-content-sched">
            <div className="overlay-header-sched">
              <h4>Add New Event</h4>
              <button className="close-button-sched" onClick={closePlusOverlay}>X</button>
            </div>
            <div className="overlay-body-sched">
              <div className="left-side-sched">
                <div className="form-group-sched">
                  <label>Event Type:</label>
                  <input
                    type="text"
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    placeholder="Enter Event Type (e.g., Wedding)"
                    className="event-type-input-sched"
                    onClick={() => setShowEventTypes(true)}
                  />
                  {showEventTypes && (
                    <div className="custom-dropdown-sched">
                      <ul>
                        {["Wedding", "Meeting", "Party"].map((type) => (
                          <li 
                            key={type} 
                            onClick={() => {
                              setEventType(type);
                              setShowEventTypes(false);
                            }}
                            className="dropdown-item-sched"
                          >
                            {type}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="form-group-sched">
                  <label>Date:</label>
                  <div className="date-field-sched">
                    <input
                      type="text"
                      value={eventDate ? moment(eventDate).format("YYYY-MM-DD") : ''}
                      placeholder="Select Date"
                      readOnly
                      className="date-input-sched"
                      onClick={() => setShowDatePicker(true)}
                    />
                    <FontAwesomeIcon icon={faCalendar} className="calendar-icon-sched" onClick={() => setShowDatePicker(true)} />
                  </div>
                  {showDatePicker && (
                    <DatePicker 
                      selected={eventDate}
                      onChange={(date) => {
                        setEventDate(date);
                        setShowDatePicker(false);
                      }}
                      inline
                    />
                  )}
                </div>
                <div className="form-group-sched">
                  <label>Start Time:</label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="time-input-sched"
                  />
                </div>
                <div className="form-group-sched">
                  <label>End Time:</label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="time-input-sched"
                  />
                </div>
              </div>
              <div className="right-side-sched">
                <h4>Time Frame</h4>
                <table className="time-frame-table-sched" style={{ borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Event</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>09:00 AM</td>
                      <td>Event Start</td>
                      <td>Discussion begins</td>
                    </tr>
                    <tr>
                      <td>10:00 AM</td>
                      <td>Wrap Up</td>
                      <td>Conclude discussions</td>
                    </tr>
                  </tbody>
                </table>
                <div className="button-container-sched">
                  <button className="add-event-button-sched" onClick={openEventDetailsOverlay}>Add Event</button>
                  <button className="delete-event-button-sched">Delete Event</button>
                  <button className="save-button-sched">Save</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {eventDetailsOverlayVisible && (
        <div className="new-overlay">
          <div className="new-overlay-content">
            <button onClick={closeEventDetailsOverlay} className="close-button-newoverlay">X</button>

            <div className="overlay-header">
              <h4>Event Details</h4>
            </div>
            <div className="form-group">
              <label>Time:</label>
              <div className="time-inputs">
                <input 
                  type="time" 
                  value={startTime} 
                  onChange={(e) => setStartTime(e.target.value)} 
                  className="time-input-sched"
                />
              </div>
            </div>
            <div className="form-group">
              <label>Event Name:</label>
              <input 
                type="text" 
                value={eventName} 
                onChange={(e) => setEventName(e.target.value)} 
                placeholder="Enter event name"
                className="event-name-input"
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea 
                value={eventDescription} 
                onChange={(e) => setEventDescription(e.target.value)} 
                placeholder="Enter event description"
                className="description-textarea"
              />
            </div>
            <div className="button-container">
              <button onClick={handleSaveEventDetails} className="save-button">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Schedule;
