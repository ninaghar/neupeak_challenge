import React, { useState } from 'react';
import TitleDescription from './TitleDescription';
import ZipCodeInput from './ZipCodeInput';
import RadiusInput from './RadiusInput';
import Calendar from './Calendar';
import axios from 'axios'; // Import Axios here


function calculateHaversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers
  const lat1Rad = (Math.PI * lat1) / 180;
  const lon1Rad = (Math.PI * lon1) / 180;
  const lat2Rad = (Math.PI * lat2) / 180;
  const lon2Rad = (Math.PI * lon2) / 180;

  const dLat = lat2Rad - lat1Rad;
  const dLon = lon2Rad - lon1Rad;

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1Rad) * Math.cos(lat2Rad) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // Distance in kilometers

  // Convert to miles
  const distanceMiles = distance * 0.621371;

  return distanceMiles;
}



async function getCoordinates(address) {
  try {

    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: address,
        format: 'json',
        countrycodes: 'US',
      },
    });

    if (response.data.length > 0) {
      const { lat, lon } = response.data[0];
      return { lat, lon };
    }
  } catch (error) {
    console.error('Error getting coordinates:', error);
  }
  return null;
}



function Form() {
  const title = 'XDirt 2.0';
  const description = `
  This is a private website, only authorized users may use it and your
  information will be recorded if you use it without permission. Violators
  will be prosecuted.
  `;
  const [zipCode, setZipCode] = useState('');
  const [radius, setRadius] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [processing, setProcessing] = useState(null);
  const [processingStartTime, setProcessingStartTime] = useState(null);
  const [processingEndTime, setProcessingEndTime] = useState(null);
  const [csvData, setCsvData] = useState(null);

  const handleZipCodeChange = (newZipCode) => {
    setZipCode(newZipCode); // Update the zipCode state in Form.js
  };

  const handleRadiusChange = (newRadius) => {
    setRadius(newRadius); // Update the radius state in Form.js
  };

  const handleDateChange = (newSelectedDate) => {
    setSelectedDate(newSelectedDate); // Update the selectedDate state in Form.js
  };

  // Haversine formula to calculate distance

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(selectedDate)
    console.log(typeof selectedDate);
    console.log(radius);
    console.log(typeof radius)
    console.log(zipCode);

    const startTime = new Date();
    setProcessing(startTime);


    let radiusNumber = parseFloat(radius);
    if (isNaN(radiusNumber)) {
      radiusNumber = 50; // Assign a default value if radius is not a valid number
    }
    console.log(radiusNumber)

    let zipCodeList;

    let startDate = "";
    if (selectedDate === "") {
      // If it's empty, set it to two years ago
      const today = new Date();
      today.setFullYear(today.getFullYear() - 2);

      // Format it back to the "YYYY-MM-DD" string
      const twoYearsAgoStr = today.toISOString().split('T')[0];
      startDate = twoYearsAgoStr;

    }else{
      startDate = selectedDate
    }

    const apiKey = '8MYDEV2115R13';

    const url = `https://secure.shippingapis.com/ShippingAPI.dll?API=CityStateLookup&XML=<CityStateLookupRequest USERID="${apiKey}"><ZipCode ID="0"><Zip5>${zipCode}</Zip5></ZipCode></CityStateLookupRequest>`;
    console.log(url);

    try {
      const response = await axios.get(url);
      if (response.data) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, 'text/xml');
        const state = xmlDoc.querySelector('State').textContent;

        console.log(response.data);
        console.log(state)
        console.log(`/api/zipcodes/${state}`)
        const serverResponse = await fetch(`/api/zipcodes/${state}`);

        if (serverResponse.ok) {
          const data = await serverResponse.json();
          zipCodeList = data["zipcodes"];
          console.log('Data from the server:', data);
      }
      }
      const yourCoordinates = await getCoordinates(zipCode);
      // zip code data is from this website
      // https://www.freemaptools.com/find-zip-codes-inside-state-county-city.htm
      const closeZipCodes = [];
      // const nycZipcodes = ["10001","10002","10003","10004","10005","10006","10007","10008","10009"]

      for (const z of zipCodeList) {
              const coordinates = await getCoordinates(z);
              // console.log(coordinates)
              if (coordinates) {

                console.log(typeof zipCode)
                console.log(typeof z)
                console.log(zipCode)
                console.log(z)
                console.log(yourCoordinates)
                console.log(coordinates)
                console.log(calculateHaversineDistance(39.244991,-5.73748635,25.0437822,121.5133209))
                const distance = calculateHaversineDistance(
                  parseFloat(yourCoordinates.lat),
                  parseFloat(yourCoordinates.lon),
                  parseFloat(coordinates.lat),
                  parseFloat(coordinates.lon)
                );

                console.log(distance)
                console.log(radiusNumber)
                if (distance < radiusNumber) {
                  closeZipCodes.push(z);
                }
              }
            }

      console.log('Zip codes within 5 miles:', closeZipCodes);
      const apiKey = 'd1TKwT9TzqEsm8g1K3kDThlXrNknhaJKBToQ3ORxGWg'; // Replace with your API key

      // const tag = 'demolition'; // Use only the "demolition" tag
      console.log(zipCode)

        const tags = ['demolition', 'sitework', 'foundation'];
        const uniqueIds = [];


        // const nyZipcodes = ["10001", "10002", "10003"];


        const fetchPermitDataForZipCode = (zipCode, tag) => {
          return fetch(`/api/permits/${zipCode}?startDate=${startDate}&tag=${tag}`)
            .then((response) => response.json())
            .then((data) => {
              const uniqueIds = [];

              if (Array.isArray(data.items)) {
                data.items.forEach((permit) => {
                  if (!uniqueIds.includes(permit.id)) {
                    uniqueIds.push(permit.id);
                  }
                });
              } else {
                console.error('Received data is not an array:', data);
              }

              return uniqueIds; // Return the unique IDs for this zip code and tag combination
            })
            .catch((error) => {
              console.error(`Error fetching permit data for ${tag} in zip code ${zipCode}:`, error);
              return []; // Return an empty array if there was an error
            });
        };

        // Collect permit data for all zip codes and tags
        Promise.all(
          closeZipCodes.map((zipCode) =>
            Promise.all(tags.map((tag) => fetchPermitDataForZipCode(zipCode, tag)))
          )
        )
          .then((results) => {
            // 'results' will be an array of arrays containing unique IDs for each zip code and tag
            // const allUniqueIds = results.flat(); // Flatten the array of unique IDs
            const allUniqueIds = results.flat().reduce((acc, ids) => {
                  ids.forEach((id) => {
                    if (!acc.includes(id)) {
                      acc.push(id);
                    }
                  });
                  return acc;
                }, []);
            // const uniqueIds = ['ad56d92c8278c65128eaea636c6f7d44', '4e8b932b42624a736534c809f39bf112', 'ae9ab233c835c74e231fd3daeacbf0cc']
            console.log('All Unique IDs:', allUniqueIds);

            // Now, call 'fetchPermitData' with the 'allUniqueIds' array

            const permitDataArray = fetchPermitData(allUniqueIds);
            console.log(permitDataArray)

          })
          .catch((error) => {
            console.error('Error with one or more fetch requests:', error);
          });



          const fetchPermitData = async (uniqueIds) => {
            try {
              const permitDataArray = [];

              // Iterate through the list of unique IDs
              for (const id of uniqueIds) {
                const response = await fetch(`/api/permit/${id}`);
                if (response.ok) {
                  const data = await response.json();
                  permitDataArray.push(data);
                } else {
                  console.error(`Error fetching permit data for ID ${id}:`, response.statusText);
                }
              }

              return permitDataArray; // Return the array of permit data
            } catch (error) {
              console.error('Error fetching permit data:', error);
              return []; // Return an empty array if there was an error
            }
          };

          // Wrap the following code in an async function
          const fetchDataAndProcess = async () => {
            try {
              const results = await Promise.all(
                closeZipCodes.map((zipCode) =>
                  Promise.all(tags.map((tag) => fetchPermitDataForZipCode(zipCode, tag)))
                )
              );

              const allUniqueIds = results.flat().reduce((acc, ids) => {
                ids.forEach((id) => {
                  if (!acc.includes(id)) {
                    acc.push(id);
                  }
                });
                return acc;
              }, []);

              console.log('All Unique IDs:', allUniqueIds);

              const permitDataArray = await fetchPermitData(allUniqueIds);
              console.log(permitDataArray);


              const csvContent = createCsvContent(permitDataArray);
              // Set the CSV data
              setCsvData(csvContent);
              const endTime = new Date();
              setProcessingEndTime(endTime);
              console.log(csvContent);

            } catch (error) {
              console.error('Error with one or more fetch requests:', error);
            }
          };

          // Call the async function to start the data fetching and processing
          fetchDataAndProcess();




        // console.log('Unique IDs before calling fetchAllPermitData:', uniqueIds);
        // const id = "e6115249ae561462fc4edc4e0cf2646b";


        // Function to create a CSV content from your object data
        const createCsvContent = (dataArray) => {
          // Implement logic to create CSV content from your object data.
          // Return the CSV content as a string.
          console.log(dataArray)
          if (!dataArray || dataArray.length === 0){
            return '';
          }
          // Sample implementation based on your object structure:
          console.log(dataArray[0])
          console.log(typeof dataArray[0])
          const headers = Object.keys(dataArray[0]);
          const rows = dataArray.map((data) => {
            return headers.map((header) => {
              const value = data[header];

              // Check if the value is an object and convert it to a string
              if (typeof value === 'object') {
                // Convert the object to a string and escape double quotes
                const formattedValue = `"${JSON.stringify(value).replace(/"/g, '""')}"`;
                return formattedValue;
              } else if (typeof value === 'string' && value.includes(',')) {
                // Wrap string values containing commas in double quotes
                return `"${value}"`;
              } else {
                return value;
              }
            }).join(',');
          });

          return [headers.join(','), ...rows].join('\n');
        };



        // Call the function to fetch all permit data
        console.log('Unique IDs before calling fetchAllPermitData:', uniqueIds);




    } catch (error) {

      // console.error('Error proxying the Shovels API:', error);
      // res.status(500).json({ error: 'Internal Server Error' });

      if (error.response) {
      // If it's an HTTP error response, log the HTML content
        console.log('HTML Error Response:', error.response.data);
      }else{
          console.error(error);
      }
    };
  };


  return (
    <form onSubmit={handleSubmit}>
      <TitleDescription title={title} description={description} />
      <ZipCodeInput onZipCodeChange={handleZipCodeChange} />
      <RadiusInput onRadiusChange={handleRadiusChange} />
      <Calendar onDateChange={handleDateChange} />
      <button type="submit">Submit</button>
      {processing && (
        <p>Processing started on {processing.toLocaleString()}</p>
      )}

      {processing && (
        <p>
          Processing started on {processing.toLocaleString()}
          {processingEndTime && (
            <span>
              {' '}
              completed {processingEndTime.toLocaleString()}.{' '}
              <a
                href={`data:text/csv;charset=utf-8,${encodeURIComponent(csvData)}`}
                download="permitData.csv"
                onClick={() => setProcessingStartTime(null)}
              >
                Download CSV
              </a>
            </span>
          )}
        </p>
      )}
    </form>
  );
}


export default Form;
