import React from 'react';

function Calendar(props) {
  // Define a function to handle changes in the date input value
  const handleDateChange = (event) => {
    // Access the selected date entered by the user using event.target.value
    const selectedDate = event.target.value;
    // Pass the selected date to the parent component via props
    props.onDateChange(selectedDate);
  };

  return (
    <div>
      <label htmlFor="calendarInput">Select Date:</label>
      <input
        type="date"
        id="calendarInput"
        name="calendarInput"
        onChange={handleDateChange}
        // You can add additional attributes and props as needed
      />
    </div>
  );
}

export default Calendar;
