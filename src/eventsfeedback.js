import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faMapMarker, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Chart as ChartJS, ArcElement, CategoryScale, Tooltip, Legend } from 'chart.js';
import API_URL from './apiconfig';

// Register the necessary chart elements
ChartJS.register(ArcElement, CategoryScale, Tooltip, Legend);

function EventsFeedback() {
  const [search, setSearch] = useState('');
  const [events, setEvents] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [sentimentData, setSentimentData] = useState([]);  // Added state for sentiment counts
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedEventFeedback, setSelectedEventFeedback] = useState(null);
  const [detailsVisibility, setDetailsVisibility] = useState({}); // Track details visibility for each service

  const toggleDetails = (serviceName) => {
    setDetailsVisibility(prevState => ({
      ...prevState,
      [serviceName]: !prevState[serviceName],
    }));
  };

  useEffect(() => {
    const fetchEventsAndFeedbacks = async () => {
      try {
        const eventResponse = await axios.get(`${API_URL}/api/events`);
        const feedbackResponse = await axios.get('https://eventwise-eventmanagementsystem.onrender.com/get_feedback');
        const sentimentResponse = await axios.get('https://eventwise-eventmanagementsystem.onrender.com/get_events_with_sentiment_counts');  // Fetch sentiment counts
        
        setEvents(eventResponse.data);
        setFeedbacks(feedbackResponse.data);
        setSentimentData(sentimentResponse.data.events);  // Store sentiment data
        setFilteredEvents(eventResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventsAndFeedbacks();
  }, []);

  const handleSearch = (text) => {
    setSearch(text);
    if (text) {
      const newData = events.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredEvents(newData);
    } else {
      setFilteredEvents(events);
    }
  };

  const handleOpenModal = (eventId) => {
    const feedbackForEvent = feedbacks.filter(feedback => feedback.event_id === eventId);
    if (feedbackForEvent.length > 0) {
      setSelectedEventFeedback(feedbackForEvent);
      setShowModal(true);
    } else {
      console.log("No feedback found for event with ID:", eventId);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEventFeedback(null);
  };

  const renderEventItem = (item) => {
    // Get sentiment data for the event
    const sentimentForEvent = sentimentData.find(sentiment => sentiment.event_id === item.id) || { positive: 0, negative: 0, neutral: 0 };

    // Check if there's any sentiment data
    if (sentimentForEvent.positive === 0 && sentimentForEvent.negative === 0 && sentimentForEvent.neutral === 0) {
      return null;
    }

    return (
      <div key={item.id} className="item-container-eventfeedback">
        <div className="pie-chart-container-eventfeedback">
          {sentimentForEvent ? (
            <Pie
              data={{
                labels: ['Positive', 'Negative', 'Neutral'],
                datasets: [
                  {
                    data: [
                      sentimentForEvent.positive,
                      sentimentForEvent.negative,
                      sentimentForEvent.neutral,
                    ],
                    backgroundColor: ['green', 'red', 'yellow'],
                    hoverBackgroundColor: ['green', 'red', 'yellow'],
                  },
                ],
              }}
              options={{
                width: 150,
                height: 150,
                maintainAspectRatio: false,
              }}
            />
          ) : (
            <div className="no-feedback-message">No feedback available</div>
          )}
        </div>
        <h3 className="title-eventfeedback">{item.name}</h3>
        <div className="detail-container-eventfeedback">
          <div className="detail-row-eventfeedback">
            <FontAwesomeIcon icon={faCalendar} size="lg" color="#eeba2b" />
            <span className="detail-text-eventfeedback">{item.date}</span>
          </div>
          <div className="detail-row-eventfeedback">
            <FontAwesomeIcon icon={faMapMarker} size="lg" color="#eeba2b" />
            <span className="detail-text-eventfeedback">{item.location}</span>
          </div>
        </div>
        <div className="buttons-container-eventfeedback">
          <button
            className="button-eventfeedback"
            onClick={() => handleOpenModal(item.id)}
          >
            Feedback
          </button>
        </div>
      </div>
    );
  };

  if (loading) {
    return <div>Loading events...</div>;
  }

  return (
    <div className="gradient-container-eventfeedback">
      <div className="container-eventfeedback">
        <div className="search-container-eventfeedback">
          <FontAwesomeIcon icon={faSearch} size="lg" color="#888" className="search-icon-eventfeedback" />
          <input
            type="text"
            className="search-box-eventfeedback"
            placeholder="Search Event"
            onChange={(e) => handleSearch(e.target.value)}
            value={search}
          />
        </div>
        <div className="event-list-eventfeedback">
          {filteredEvents.map(renderEventItem)}
        </div>
      </div>

      {showModal && selectedEventFeedback && (
  <div className="overlay-feedback">
    <div className="modal-feedback">
      <button className="close-button-feedback" onClick={handleCloseModal}>X</button>
      <div className="feedback-content">
        {events && events.length > 0 &&
          events.map(event => {
            if (event.id === selectedEventFeedback[0]?.event_id) {
              return (
                <div key={event.id}>
                  <h3
                  style={{
                            color: 'black',
                            fontSize: '20px',
                            marginBottom: '20px',
                            textDecoration: 'underline',
                          }}
                  >Feedback for Event: {event.name}</h3>
                  {Object.entries(selectedEventFeedback[0]).map(([key, value]) => {
                    // Filter out services with zero sentiments (where compound, pos, neu, neg are 0.0)
                    if (key.includes('sentiment') && value?.compound !== undefined) {
                      const serviceName = key.replace('_sentiment', '').replace(/([A-Z])/g, ' $1');
                      const formattedServiceName = serviceName.charAt(0).toUpperCase() + serviceName.slice(1);
                      
                      // Check if the sentiment is real (not zero values)
                      const sentiment = value;
                      if (sentiment.compound !== 0.0 || sentiment.pos !== 0.0 || sentiment.neu !== 0.0 || sentiment.neg !== 0.0) {
                        // Count sentiments for the specific service
                        let positiveCount = 0;
                        let neutralCount = 0;
                        let negativeCount = 0;
                        let customerNames = [];

                        selectedEventFeedback.forEach(feedback => {
                          if (feedback[`${serviceName.toLowerCase()}_sentiment`]?.label === 'positive') {
                            positiveCount++;
                          }
                          if (feedback[`${serviceName.toLowerCase()}_sentiment`]?.label === 'neutral') {
                            neutralCount++;
                          }
                          if (feedback[`${serviceName.toLowerCase()}_sentiment`]?.label === 'negative') {
                            negativeCount++;
                          }

                          // Collect customer names for feedback
                          if (feedback[`${serviceName.toLowerCase()}_feedback`]) {
                            customerNames.push(feedback.customer_name || 'Unknown');
                          }
                        });

                        return (
                          (positiveCount || neutralCount || negativeCount) > 0 && (
                            <div key={key}>
                            <h4
                          style={{
                            cursor: 'pointer',
                            color: 'black', // Food_catering Sentiment is black
                          }}
                          onClick={() => toggleDetails(formattedServiceName)}
                        >
                          {formattedServiceName} Sentiment: 
                          <span style={{ color: 'green' }}> Positive: {positiveCount} </span>
                          <span style={{ color: '#FFD700' }}> Neutral: {neutralCount} </span>
                          <span style={{ color: 'red' }}> Negative: {negativeCount} </span>
                        </h4>

                              {detailsVisibility[formattedServiceName] && (
                                <div style={{ marginLeft: '20px', color: '#555' }}>
                                  <p><strong>Customer Names:</strong> {customerNames.join(', ')}</p>
                                  {customerNames.map((name, index) => (
                                    <div key={index}>
                                      <p><strong>{name} Feedback:</strong> {selectedEventFeedback[index][`${serviceName.toLowerCase()}_feedback`] || 'No feedback provided'}</p>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )
                        );
                      }
                    }
                    return null;
                  })}
                </div>
              );
            }
            return null;
          })
        }
      </div>
    </div>
  </div>
)}
    </div>
  );
}

export default EventsFeedback;
