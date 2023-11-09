import React from 'react';

function RadiusInput(props) {
  // Define a function to handle changes in the input value
  const handleChange = (event) => {
    // Access the radius entered by the user using event.target.value
    const radius = event.target.value;
    // Pass the radius to the parent component via props
    props.onRadiusChange(radius);
  };

  return (
    <div>
      <label htmlFor="radiusInput">Radius (Miles):</label>
      <input
        type="text"
        id="radiusInput"
        name="radiusInput"
        onChange={handleChange}
        // You can add additional attributes and props as needed
      />
    </div>
  );
}

export default RadiusInput;

// ZipCodeInput.js
// import React from 'react';
//
// function RadiusInput(props) {
//   // Define a function to handle changes in the input value
//   const handleChange = (event) => {
//     // You can access the ZIP code entered by the user using event.target.value
//     const radius = event.target.value;
//
//     // Do something with the ZIP code value, such as storing it in state or passing it to a parent component via props
//     // Example: props.onZipCodeChange(zipCode);
//   };
//
//   return (
//     <div>
//       <label htmlFor="radiusInput">Radius</label>
//       <input
//         type="text"
//         id="radiusInput"
//         name="radiusInput"
//         onChange={handleChange}
//         // You can add additional attributes and props as needed
//       />
//
//     </div>
//   );
// }
// // <label htmlFor="radiusInput">Miles</label>
// export default RadiusInput;
