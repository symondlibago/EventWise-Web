import React from 'react';
import './App.css';

const Feedback = () => {
  const feedbackData = {
    total: 100,
    positive: 50,
    neutral: 30,
    negative: 20,
  };

  const serviceProviders = [
    { role: 'Photographer', positive: 70, neutral: 20, negative: 10 },
    { role: 'Videographer', positive: 50, neutral: 30, negative: 20 },
    { role: 'Makeup Artist', positive: 80, neutral: 10, negative: 10 },
    { role: 'DJ', positive: 90, neutral: 5, negative: 5 },
    { role: 'Caterer', positive: 40, neutral: 30, negative: 30 },
    { role: 'Florist', positive: 60, neutral: 20, negative: 20 },
  ];

  return (
    <div className="gradient-container">
      <div className="container-feedback">
        <h1 className="sentiment-analysis-feedback">Sentiment Analysis</h1>
        <div className="line-feedback" />

        <h2 className="welcome-text-feedback">Welcome back, Arvil!</h2>

        <div className="summary-feedback">
          <h3>Summary</h3>
          <div className="feedback-summary-container-feedback">
            <div className="feedback-summary-box-feedback positive-box-feed">
              <p>Total Feedback</p>
              <p>{feedbackData.total}</p>
            </div>
            <div className="feedback-summary-box-feedback positive-box-feed">
              <p>Positive</p>
              <p>{feedbackData.positive}</p>
            </div>
            <div className="feedback-summary-box-feedback neutral-box-feed">
              <p>Neutral</p>
              <p>{feedbackData.neutral}</p>
            </div>
            <div className="feedback-summary-box-feedback negative-box-feed">
              <p>Negative</p>
              <p>{feedbackData.negative}</p>
            </div>
          </div>
        </div>

        <div className="big-box-feedback">
          <div className="big-box-header-feedback">
            <h3 className="big-box-header-left-feedback">Service Providers</h3>
            <h3 className="big-box-header-right-feedback">Ratings</h3>
          </div>
          <table className="service-providers-table-feedback">
            <thead>
              <tr>
                <th>Service Provider</th>
                <th>Ratings</th>
              </tr>
            </thead>
            <tbody>
              {serviceProviders.map((provider, index) => (
                <tr key={index}>
                  <td>{provider.role}</td>
                  <td>
                    <div className="rating-bar-container-feedback">
                      <div
                        className="rating-bar-feedback positive"
                        style={{ width: `${provider.positive}%` }}
                        title={`${provider.positive}% Positive`}
                      ></div>
                      <div
                        className="rating-bar-feedback neutral"
                        style={{ width: `${provider.neutral}%` }}
                        title={`${provider.neutral}% Neutral`}
                      ></div>
                      <div
                        className="rating-bar-feedback negative"
                        style={{ width: `${provider.negative}%` }}
                        title={`${provider.negative}% Negative`}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
