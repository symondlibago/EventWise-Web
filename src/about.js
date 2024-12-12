import React, { useState } from 'react';
import './App.css';

const About = () => {
  const [selectedEvent, setSelectedEvent] = useState('A&A Events');
  const [fade, setFade] = useState(false); // State to handle fade animation

  const descriptions = {
    'A&A Events': `
      A&A Creations is a DTI and BIR registered event organizing team from Cagayan de Oro City.\n\n
      Founded by a married couple, Mr. Arvil and Ms. Alysa, thus the name A&A, of the year 2018.\n\n
      A&A Creations is now a growing team offering event needs and services. Nevertheless, its team is composed of equipped individuals ready to cater to its clients' needs. Even before the team was created, Mr. Arvil and most of his company partners were involved in event planning and coordination.\n\n
      A&A Creations aims to make the clients' plans into reality. The company also believes that a tight budget is not a hindrance in making memories to treasure, with the ones close to our hearts.
    `,
    'EventWise': `
      EventWise is committed to providing the best possible experience for both customers and service providers.\n\n
      Dedicated to creating a welcoming inclusive atmosphere that celebrates diversity & promotes cultural exchange.\n\n
      Continuing to set the standard for event organization and curation in the world event community.
    `,
  };

  const handleEventChange = (event) => {
    setFade(true);
    setTimeout(() => {
      setSelectedEvent(event);
      setFade(false); // Remove fade class after the new description is set
    }, 500); // Duration matches the fade-out animation
  };

  return (
    <div className="about-container-about">
      <h1 className="about-header-about">About</h1>
      <div className="event-buttons-about">
        <button
          onClick={() => handleEventChange('A&A Events')}
          className={selectedEvent === 'A&A Events' ? 'active-button-about' : ''}
        >
          A&A Events
        </button>
        <button
          onClick={() => handleEventChange('EventWise')}
          className={selectedEvent === 'EventWise' ? 'active-button-about' : ''}
        >
          EventWise
        </button>
      </div>
      <div className={`description-container-about ${fade ? 'fade-out-about' : 'fade-in-about'}`}>
        {descriptions[selectedEvent]
          .trim()
          .split('\n\n')
          .map((paragraph, index) => (
            <p key={index} className="description-text-about">
              {paragraph}
            </p>
          ))}
      </div>
    </div>
  );
};

export default About;
