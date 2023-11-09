// import React from 'react';
import React, { useState } from 'react';
import './App.css'; // You can import your CSS file here if you have one.
// import Form from './components/Form'; // Import your Form component.
import TitleDescription from './components/TitleDescription';
import ZipCodeInput from './components/ZipCodeInput';
import RadiusInput from './components/RadiusInput'
import Calendar from './components/Calendar';
import Form from './components/Form'

function App() {
  const title = 'XDirt 2.0';
  const description = `
  This is a private website, only authorized users may use it and your
  information will be recorded if you use it without permission. Violators
  will be prosecuted.
  `;
  // State to store the ZIP code entered by the user
// const [zipCode, setZipCode] = useState('');
// const [radius, setRadius] = useState('');
// // Handler function to update the ZIP code state
// const [selectedDate, setSelectedDate] = useState('');


  // Handler function to update the selected date state
// const handleDateChange = (newSelectedDate) => {
//   try {
//     // Your code for handling date changes goes here
//     setSelectedDate(newSelectedDate);
//     console.log(newSelectedDate)
//   } catch (error) {
//     console.error('Error handling date change:', error);
//   }
//
//   };
// const handleZipCodeChange = (newZipCode) => {
//   try{
//     setZipCode(newZipCode);
//     console.log(newZipCode)
//   } catch(error){
//     console.error('Error handling zip code change:', error);
//   }


// };

// const handleRadiusChange = (newRadius) => {
//   setRadius(newRadius);
// };
//
// const handleSubmit = (event) => {
//     event.preventDefault();
//
//     // You can use the selectedDate state here or send it to an API, etc.
//     console.log('Selected Date:', selectedDate);
//   };

// Submit function to handle form submission
// const handleSubmit = (event) => {
//   event.preventDefault();
//
//   // You can use the zipCode state here or send it to an API, etc.
//   console.log('Submitted ZIP code:', zipCode);
// };
  return (
    <div className="App">


   <Form />

    </div>
  );
}

// <TitleDescription title={title} description={description} />
// <ZipCodeInput />
// <Calendar  />
// <Calendar onDateChange={handleDateChange} />
// <ZipCodeInput onZipCodeChange={handleZipCodeChange} />
// <RadiusInput onRadiusChange={handleRadiusChange} />
// <Calendar onDateChange={handleDateChange} />
// <button type="submit">Submit</button>



// <h1>Title goes here</h1>
// <p>Desciption goes here.</p>
      // <Form /> {/* Render your Form component here. */}
export default App;

// import React from 'react';
// import './App.css'; // You can import your CSS file here if you have one.
// import Form from './components/Form'; // Import your Form component.
//
// function App() {
//   return (
//     <div className="App">
//       <Form /> {/* Render your Form component here. */}
//     </div>
//   );
// }
//
// export default App;

// import React from 'react';
// import MyForm from './MyForm';
//
// function App() {
//   return (
//     <div className="app">
//       {/* Other components and content */}
//       <MyForm />
//     </div>
//   );
// }
//
// export default App;


// import logo from './logo.svg';
// import './App.css';
//
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
//
// export default App;
