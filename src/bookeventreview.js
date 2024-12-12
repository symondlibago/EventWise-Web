import React, { useState } from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import './App.css';

const packagesData = [
    { id: '1', packagename: 'Package A', image: require('./images/package1.png'), price: '100,000', description: 'Perfect for intimate gatherings.' },
    { id: '2', packagename: 'Package B', image: require('./images/package2.png'), price: '150,000', description: 'Ideal for mid-sized events.' },
    { id: '3', packagename: 'Package C', image: require('./images/package3.png'), price: '200,000', description: 'Designed for larger events.' },
    { id: '4', packagename: 'Package D', image: require('./images/package4.png'), price: '250,000', description: 'The ultimate choice for grand celebrations.' },
];

const BookEventReview = () => {
    const [eventDetails, setEventDetails] = useState({
        eventName: 'Birthday Celebrationnn',
        eventType: 'Private Party',
        date: 'November 4, 2024',
        pax: 100,
        venue: 'City Hall',
    });

    const [isEditing, setIsEditing] = useState(false);
    const [guests, setGuests] = useState([
        { name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', role: 'Speaker' },
        { name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210', role: 'Attendee' },
    ]);

    const [showPackageReview, setShowPackageReview] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [showOverlay, setShowOverlay] = useState(false);

    const renderEditableField = (label, value, field) => (
        <div className="field-reviewevent">
            <div className="label-value-container-reviewevent">
                <span className="label-reviewevent">{label}</span>
                <FaPencilAlt
                    className="edit-icon-reviewevent"
                    onClick={() => setIsEditing(!isEditing)}
                />
            </div>
            {isEditing ? (
                <input
                    type="text"
                    value={value}
                    onChange={(e) => handleFieldChange(field, e.target.value)}
                    className="editable-input-reviewevent"
                />
            ) : (
                <div className="value-reviewevent">{value}</div>
            )}
        </div>
    );

    const handleFieldChange = (field, value) => {
        setEventDetails((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSaveChanges = () => {
        setIsEditing(false);
    };

    const removeGuest = (index) => {
        setGuests((prevGuests) => prevGuests.filter((_, i) => i !== index));
    };

    const handleNext = () => {
        if (selectedPackage) {
            // Add your navigation logic here
            console.log('Proceeding to the next step with:', selectedPackage.packagename);
        }
    };

    const handleChoosePackage = (packageData) => {
        setSelectedPackage(packageData);
        setShowOverlay(false); // Close the overlay after selecting
    };

    return (
        <div className="book-event-review-bg">
        <div className={`book-event-review-container-reviewevent ${showOverlay ? 'blurred' : ''}`}>
            {!showPackageReview ? (
                <>
                    <h2 className="event-details-title-reviewevent">Event Details</h2>
                    <div className="content-reviewevent">
                        <div className="event-details-left-reviewevent">
                            {renderEditableField("Event Name", eventDetails.eventName, "eventName")}
                            {renderEditableField("Event Type", eventDetails.eventType, "eventType")}
                            {renderEditableField("Date", eventDetails.date, "date")}
                            {renderEditableField("Pax", eventDetails.pax, "pax")}
                            {renderEditableField("Venue", eventDetails.venue, "venue")}
                            {isEditing && (
                                <button onClick={handleSaveChanges} className="save-button-reviewevent">
                                    Save Changes
                                </button>
                            )}
                        </div>

                        <div className="event-details-right-reviewevent">
                            <h3>{selectedPackage ? selectedPackage.packagename : 'Choose a Package'}</h3>
                            <img
                                src={selectedPackage ? selectedPackage.image : require('./images/package1.png')}
                                alt={selectedPackage ? selectedPackage.packagename : 'Package A'}
                                className={`package-image-reviewevent ${!selectedPackage ? 'blurry' : ''}`}
                            />
                            <p className="package-not-available-reviewevent" style={{ color: 'red' }}>
                                {selectedPackage ? '' : 'Package not available.'}
                            </p>

                            <button onClick={() => setShowOverlay(true)}>Choose Another Package</button>
                        </div>
                    </div>

                    <div className="guest-table-container-reviewevent">
                        <h3 className="guest-table-title-reviewevent">Guest List</h3>
                        <table className="guest-table-reviewevent">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone Number</th>
                                    <th>Role</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {guests.map((guest, index) => (
                                    <tr key={index}>
                                        <td>{guest.name}</td>
                                        <td>{guest.email}</td>
                                        <td>{guest.phone}</td>
                                        <td>{guest.role}</td>
                                        <td>
                                            <FaTrash
                                                className="remove-guest-icon-reviewevent"
                                                onClick={() => removeGuest(index)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <button
                        className="next-button-reviewevent"
                        onClick={handleNext}
                        disabled={!selectedPackage} // Enable when a package is selected
                    >
                        Approve Event
                    </button>
                </>
            ) : (
                <div className="package-review-container-reviewevent">
                    <h2 className="event-details-title-reviewevent">{selectedPackage.packagename}</h2>
                    <img
                        src={selectedPackage.image}
                        alt={selectedPackage.packagename}
                        className="package-image-reviewevent"
                    />
                    <p>{selectedPackage.description}</p>
                </div>
            )}

            {/* Overlay for choosing package */}
            {showOverlay && (
                <div className="overlay-reviewevent">
                    <div className="overlay-content-reviewevent">
                        <button onClick={() => setShowOverlay(false)} className="close-button-reviewevent">X</button>
                        <h2 className="overlay-title-reviewevent">Choose Package</h2>
                        <div className="packages-container-reviewevent">
                            {packagesData.map((pkg) => (
                                <div key={pkg.id} className="package-card-reviewevent">
                                    <h3>{pkg.packagename}</h3>
                                    <img src={pkg.image} alt={pkg.packagename} className="overlay-image-reviewevent" />
                                    <button onClick={() => handleChoosePackage(pkg)} className="choose-button-reviewevent">
                                        Choose
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
        </div>
    );
};

export default BookEventReview;
