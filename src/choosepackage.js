// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaArrowRight, FaTimes } from 'react-icons/fa';
// import './App.css'; // External CSS file

// const packagesData = [
//     { id: '1', packagename: 'Package A', image: require('./images/package1.png'), price: '100,000', description: 'Perfect for intimate gatherings, this package offers a cozy setting with essential amenities for up to 100 guests.' },
//     { id: '2', packagename: 'Package B', image: require('./images/package2.png'), price: '150,000', description: 'Ideal for mid-sized events, Package B includes additional features such as catering and audiovisual support for up to 100 guests.' },
//     { id: '3', packagename: 'Package C', image: require('./images/package3.png'), price: '200,000', description: 'Designed for larger events, this package accommodates up to 150 guests and provides a comprehensive solution with premium decorations.' },
//     { id: '4', packagename: 'Package D', image: require('./images/package4.png'), price: '250,000', description: 'The ultimate choice for grand celebrations, Package D caters to events of up to 250 guests with bespoke services and expert planning.' },
//   ];


// const ChoosePackage = () => {
//   const [selectedPackage, setSelectedPackage] = useState(null);
//   const [isOverlayOpen, setIsOverlayOpen] = useState(false);
//   const navigate = useNavigate();

//   const openOverlay = (pkg) => {
//     setSelectedPackage(pkg);
//     setIsOverlayOpen(true);
//   };

//   const closeOverlay = () => {
//     setIsOverlayOpen(false);
//     setSelectedPackage(null);
//   };

//   return (
//     <div className="container-choosepackage">
//       <h1 className="header-choosepackage">Choose Package</h1>

//       <button className="customize-btn-choosepackage" onClick={() => navigate('/choose-service-provider')}>
//         Click here if you want to customize <FaArrowRight />
//       </button>

//       <div className="packages-row-choosepackage">
//         {packagesData.map((pkg) => (
//           <div key={pkg.id} className="package-choosepackage">
//             <img src={pkg.image} alt={pkg.packagename} className="image-choosepackage" />
//             <h3>{pkg.packagename}</h3>
//             <p>{pkg.description}</p>
//             <p>Price: {pkg.price}</p>
//             <button className="choose-btn-choosepackage" onClick={() => openOverlay(pkg)}>
//               Choose
//             </button>
//           </div>
//         ))}
//       </div>

//       <button className="next-btn-choosepackage" onClick={() => navigate('/add-guest')}>Next</button>

//       {isOverlayOpen && selectedPackage && (
//         <div className="overlay-choosepackage">
//           <div className="overlay-content-choosepackage">
//             <h2 className="overlay-header-choosepackage">Chosen Package: {selectedPackage.packagename}</h2>
//             <button className="close-btn-choosepackage" onClick={closeOverlay}>
//               <FaTimes />
//             </button>
//             <img src={selectedPackage.image} alt={selectedPackage.packagename} className="overlay-image-choosepackage" />
//             <p>{selectedPackage.description}</p>
//             <p>Price: {selectedPackage.price}</p>
//             <button className="confirm-btn-choosepackage" onClick={closeOverlay}>
//               Confirm
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChoosePackage;
