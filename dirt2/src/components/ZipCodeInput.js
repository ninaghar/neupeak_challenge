import React from 'react';

function ZipCodeInput(props) {
  // Define a function to handle changes in the input value
  const handleChange = (event) => {
    // Access the ZIP code entered by the user using event.target.value
    const zipCode = event.target.value;
    // Pass the ZIP code to the parent component via props
    props.onZipCodeChange(zipCode);
  };

  return (
    <div>
      <label htmlFor="zipCodeInput">Center Zip Code:</label>
      <input
        type="text"
        id="zipCodeInput"
        name="zipCodeInput"
        onChange={handleChange}
        // You can add additional attributes and props as needed
      />
    </div>
  );
}

export default ZipCodeInput;

// // ZipCodeInput.js
// import React from 'react';
//
// // Inside child components (e.g., ZipCodeInput.js)
// const handleZipCodeChange = (newZipCode) => {
//   console.log('newZipCode:', newZipCode); // Check if newZipCode is being received correctly
//   setZipCode(newZipCode);
// };
//
// function ZipCodeInput(props) {
//   // Define a function to handle changes in the input value
//   const handleChange = (event) => {
//     // You can access the ZIP code entered by the user using event.target.value
//     // const zipCode = event.target.value;
//     // console.log(zipCode)
//       try{
//         const zipCode = event.target.value;
//         console.log(zipCode)
//         // setZipCode(newZipCode);
//         // console.log(newZipCode)
//       } catch(error){
//         console.error('Error handling zip code change:', error);
//       }
//     // Do something with the ZIP code value, such as storing it in state or passing it to a parent component via props
//     // Example: props.onZipCodeChange(zipCode);
//   };
//
//   return (
//     <div>
//       <label htmlFor="zipCodeInput">Center Zip Code:</label>
//       <input
//         type="text"
//         id="zipCodeInput"
//         name="zipCodeInput"
//         onChange={handleChange}
//         // You can add additional attributes and props as needed
//       />
//     </div>
//   );
// }
//
// export default ZipCodeInput;
