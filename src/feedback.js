import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Feedback = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { eventId } = useParams();  // Get event_id from URL

  useEffect(() => {
    // Fetch feedback data from the API based on event_id
    setLoading(true); // Start loading state
    fetch(`https://eventwise-eventmanagementsystem.onrender.com/get_feedback/${eventId}`)
      .then((response) => response.json())
      .then((data) => {
        setFeedbackData(data);
        setLoading(false); // Stop loading when data is fetched
      })
      .catch((error) => {
        console.error('Error fetching feedback data:', error);
        setError('Failed to load feedback data.');
        setLoading(false);
      });
  }, [eventId]); // Re-fetch if eventId changes

  if (loading) {
    return <div>Loading feedback data...</div>; // Show loading message
  }

  if (error) {
    return <div>{error}</div>; // Show error message if there's a problem fetching data
  }

  return (
    <div style={{ padding: '20px' }}>
      {feedbackData.length > 0 ? (
        feedbackData.map((feedback, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <h3>Feedback for Event {feedback.event_id}</h3>
            <p><strong>Customer:</strong> {feedback.customer_name}</p>

            <div>
              <h4>Accommodation Sentiment: {feedback.accommodation_sentiment.label}</h4>
              <p>{feedback.accommodation_feedback}</p>
            </div>
            <div>
              <h4>Catering Sentiment: {feedback.catering_sentiment.label}</h4>
              <p>{feedback.catering_feedback}</p>
            </div>
            <div>
              <h4>Food Catering Sentiment: {feedback.food_catering_sentiment.label}</h4>
              <p>{feedback.food_catering_feedback}</p>
            </div>
            <div>
              <h4>Event Sentiment: {feedback.event_sentiment.label}</h4>
              <p>{feedback.event_feedback}</p>
            </div>
            <div>
              <h4>Overall Sentiment: {feedback.overall_sentiment}</h4>
            </div>
          </div>
        ))
      ) : (
        <p>No feedback available for this event.</p>
      )}
    </div>
  );
};

export default Feedback;
