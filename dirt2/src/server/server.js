const express = require('express');
const axios = require('axios')
const fs = require('fs');
const app = express();
// const port = 3001; // You can choose a different port
const port = process.env.PORT || 3000;
app.get('/api/zipcodes/:state', (req, res) => {
  const state = req.params.state;
  const csvFilePath = `zipcodes/${state}Zipcodes.csv`;

  // Read the CSV file and send its contents as JSON response
  fs.readFile(csvFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading CSV file:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const zipcodes = data.trim().split('\n').slice(1);
    res.json({ zipcodes });
  });
});
// Define the route to handle API requests from form.js
// app.get('/api/permits/:zipCode', async (req, res) => {
//   const zipCode = req.params.zipCode;
//
//   try {
//     // Make a request to the Shovel API with the provided zip code
//     const response = await axios.get(`https://api.shovels.ai/v1/permits/zip?zip_code=${zipCode}`, {
//       headers: {
//         'x-api-key': 'd1TKwT9TzqEsm8g1K3kDThlXrNknhaJKBToQ3ORxGWg', // Replace with your Shovel API key
//       },
//     });
//
//     res.json(response.data);
//   } catch (error) {
//     console.error('Error proxying the Shovel API request:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });
app.get('/api/permit/:id', async (req, res) => {
  const id = req.params.id;
  console.log('Received request for permit ID:', id);
  try {

    const response = await axios.get(`https://api.shovels.ai/v1/permits/${id}`, {
      headers: {
        'x-api-key': 'd1TKwT9TzqEsm8g1K3kDThlXrNknhaJKBToQ3ORxGWg',

      },
    });
    console.log(response.data)
    res.json(response.data);

    // Your API request to fetch permit data by ID here...
    // ...
  } catch (error) {
    // Handle errors here...
    console.error(`Error fetching permit data for ID ${id}:`, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




app.get('/api/permits/:zipCode', async (req, res) => {
  const zipCode = req.params.zipCode;
  const startDate = req.query.startDate; // Get the start date from the query parameters
  const tag = req.query.tag; // Get the tag from the query parameters

  try {
    // Make a request to the Shovel API with the provided zip code, start date, and tag
    const response = await axios.get(`https://api.shovels.ai/v1/permits/zip?zip_code=${zipCode}&start_date=${startDate}&tag=${tag}`, {
      headers: {
        'x-api-key': 'd1TKwT9TzqEsm8g1K3kDThlXrNknhaJKBToQ3ORxGWg', // Replace with your Shovel API key
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error proxying the Shovel API request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// app.get('/api/permits/:zipCode/:tags', async (req, res) => {
// app.get('/api/permits/:zipCode', async (req, res) => {
//   const { zipCode, tags } = req.params;
//   console.log('zipCode:', zipCode);
//   // console.log('tags:', tags);
//   // const apiUrl = `https://api.shovels.ai/v1/permits/zip?zip_code=${zipCode}&tags=${tags}`;
//
//   const apiUrl = `https://api.shovels.ai/v1/permits/zip?zip_code=${zipCode}&page=1&size=50`;
//
//   console.log(apiUrl)
//   try {
//     const response = await axios.get(apiUrl, {
//       headers: {
//         'x-api-key': 'd1TKwT9TzqEsm8g1K3kDThlXrNknhaJKBToQ3ORxGWg', // Replace with your Shovels API key
//       },
//     });
//     res.json(response.data);
//   } catch (error) {
//     console.error(`Error proxying request: ${error.message}`);
//     res.status(500).send('Error proxying the request');
//   }
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// app.get('/shovels-api', async (req, res) => {
//   const { zipCode, startDate } = req.query;
// // https://api.shovels.ai/v1/permits/zip?zip_code=19711&tags=string&page=1&size=50
//   try {
//     const response = await axios.get(`https://api.shovels.ai/v1/permits/zip?zip_code=${zipCode}&start_date=${startDate}&page=1&size=50`, {
//       headers: {
//         'x-api-key': 'd1TKwT9TzqEsm8g1K3kDThlXrNknhaJKBToQ3ORxGWg', // Replace with your Shovels API key
//       },
//     });
//
//     res.json(response.data);
//   } catch (error) {
//     console.error('Error proxying the Shovels API:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//     console.error('Error proxying the Shovels API:', error);
//     res.status(500).send('Error');
//   }
// });



// app.get('/api/zipcodes/:state', (req, res) => {
//   const state = req.params.state;
//   // Query your data source or perform calculations here
//   // Return the relevant data as JSON
//   const data = { state, zipcodes: ['12345', '56789'] };
//   res.json(data);
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
