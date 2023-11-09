const axios = require('axios');

// const axios = require('axios');

// Your API key
const apiKey = 'd1TKwT9TzqEsm8g1K3kDThlXrNknhaJKBToQ3ORxGWg';

// Zip code
// const zipCode = '10001';

// Pagination parameters
// const page = 1;
// const size = 50;

// Shovels API endpoint for getting permit IDs by tags
// const idsApiUrl = 'https://api.shovels.ai/v1/permits/zip';

// Shovels API endpoint for getting permit data by ID
// const permitApiUrl = 'https://api.shovels.ai/v1/permits';

// List of tags
// const tags = ['demolition', 'sitework', 'foundation'];

// Initialize an array to store permit IDs
// const permitIds = [];

// const axios = require('axios');

// Your API key
// const apiKey = 'YOUR_API_KEY';

// const axios = require('axios');

// Your API key
// const apiKey = 'YOUR_API_KEY';

// Zip code
const zipCode = '94123';

// Pagination parameters
const page = 1;
const size = 50;

// Shovels API endpoint for getting permit IDs by tags
const idsApiUrl = 'https://api.shovels.ai/v1/permits/zip';

// Shovels API endpoint for getting permit data by ID
const permitApiUrl = 'https://api.shovels.ai/v1/permits';

// List of tags
const tags = ['demolition', 'sitework', 'foundation'];

// Initialize an array to store permit data
const permitData = [];

// Configure and make requests for each tag
const requests = tags.map((tag) => {
  const config = {
    headers: {
      'x-api-key': apiKey,
    },
    params: {
      zip_code: zipCode,
      tags: tag,
      page: page,
      size: size,
    },
  };

  return axios
    .get(idsApiUrl, config)
    .then((response) => {
      // Handle the response to extract permit IDs
      const data = response.data;
      if (data.items) {
        data.items.forEach((item) => {
          permitData.push({ id: item.id, data: null }); // Initialize with null data
        });
      }
    })
    .catch((error) => {
      console.error(`Error fetching permits with tag '${tag}':`, error);
    });
});

Promise.all(requests)
  .then(() => {
    // After all tag requests are complete, use permit IDs to fetch permit data
    return axios.all(
      permitData.map((permit) =>
        axios.get(`${permitApiUrl}/${permit.id}`, {
          headers: {
            'x-api-key': apiKey,
          },
        })
      )
    );
  })
  .then((responses) => {
    // Handle responses for permit data and associate them with the permit IDs
    responses.forEach((response, index) => {
      permitData[index].data = response.data;
    });

    // Now, permitData array contains both permit IDs and data
    permitData.forEach((permit) => {
      console.log(`Permit data for permit ID ${permit.id}:`);
      console.log(permit.data);
      console.log('---------------------------------------');
    });
  })
  .catch((error) => {
    console.error('Error fetching permit data:', error);
  });


// 2nd C0de
// Zip code
// const zipCode = '94123';
//
// // Pagination parameters
// const page = 1;
// const size = 50;
//
// // Shovels API endpoint for getting permit IDs by tags
// const idsApiUrl = 'https://api.shovels.ai/v1/permits/zip';
//
// // Shovels API endpoint for getting permit data by ID
// const permitApiUrl = 'https://api.shovels.ai/v1/permits';
//
// // List of tags
// const tags = ['demolition', 'sitework', 'foundation'];
//
// // Initialize an array to store permit IDs
// const permitIds = [];
//
// // Configure and make requests for each tag
// const requests = tags.map((tag) => {
//   const config = {
//     headers: {
//       'x-api-key': apiKey,
//     },
//     params: {
//       zip_code: zipCode,
//       tags: tag,
//       page: page,
//       size: size,
//     },
//   };
//
//   return axios
//     .get(idsApiUrl, config)
//     .then((response) => {
//       // Handle the response to extract permit IDs
//       const data = response.data;
//       if (data.items) {
//         data.items.forEach((item) => {
//           permitIds.push(item.id);
//         });
//       }
//     })
//     .catch((error) => {
//       console.error(`Error fetching permits with tag '${tag}':`, error);
//     });
// });
//
// Promise.all(requests)
//   .then(() => {
//     // After all tag requests are complete, use permit IDs to fetch permit data
//     return axios.all(
//       permitIds.map((id) =>
//         axios.get(`${permitApiUrl}/${id}`, {
//           headers: {
//             'x-api-key': apiKey,
//           },
//         })
//       )
//     );
//   })
//   .then((responses) => {
//     // Handle responses for permit data
//     responses.forEach((response, index) => {
//       console.log(`Permit data for permit ID ${permitIds[index]}:`);
//       console.log(response.data);
//       console.log('---------------------------------------');
//     });
//   })
//   .catch((error) => {
//     console.error('Error fetching permit data:', error);
//   });


// Configure and make requests for each tag
// tags.forEach((tag) => {
//   const config = {
//     headers: {
//       'x-api-key': apiKey,
//     },
//     params: {
//       zip_code: zipCode,
//       tags: tag,
//       page: page,
//       size: size,
//     },
//   };
//
//   axios
//     .get(idsApiUrl, config)
//     .then((response) => {
//       // Handle the response to extract permit IDs
//       const data = response.data;
//       // console.log(response.data)
//       if (data.items) {
//         data.items.forEach((item) => {
//           console.log(item)
//           console.log(item.id)
//           permitIds.push(item.id);
//           console.log(permitIds)
//         });
//       }
//     })
//     .catch((error) => {
//       console.error(`Error fetching permits with tag '${tag}':`, error);
//     });
// });
//
// console.log(permitIds)
//
// // After all tag requests are complete, use permit IDs to fetch permit data
// axios.all(
//   permitIds.map((id) =>
//     axios.get(`${permitApiUrl}/${id}`, {
//       headers: {
//         'x-api-key': apiKey,
//       },
//     })
//   )
// )
//   .then((responses) => {
//     // Handle responses for permit data
//     responses.forEach((response, index) => {
//       console.log(`Permit data for permit ID ${permitIds[index]}:`);
//       console.log(response.data);
//       console.log('---------------------------------------');
//     });
//   })
//   .catch((error) => {
//     console.error('Error fetching permit data:', error);
//   });




// const apiKey = 'd1TKwT9TzqEsm8g1K3kDThlXrNknhaJKBToQ3ORxGWg'; // Replace with your Shovels API key
// const zipCode = '10016'; // Replace with a test ZIP code
// const zipCode = '10001';
// const startDate = '2021-01-01'; // Replace with a test start date
// const permitid = 'c3e5f94a37eb017c433d5a2670dcfdf4'
// const apiUrl = `https://api.shovels.ai/v1/permits/zip?zip_code=${zipCode}&start_date=${startDate}`;
// const apiUrl = `https://api.shovels.ai/v1/permits/${permitid}`;
//// new code
// const apiUrl = 'https://api.shovels.ai/permits';
// const tags = ['demolition', 'sitework', 'foundation'];
// const tags = ['demolition', 'sitework'];
// const tag = 'foundation'
// const permitId = 'c3e5f94a37eb017c433d5a2670dcfdf4';
// const page = 1;
// const size = 1;
// const apiUrl = `https://api.shovels.ai/v1/permits/zip`;


// Create a comma-separated string of tags
// const tagsStr = tags.join(',');
// const config = {
//   headers: {
//     'x-api-key': apiKey,
//   },
//   params: {
//     zip_code: zipCode,
//     tags: tags.join(','), // Join the tags into a comma-separated string
//     page: page,
//     size: size,
//   },
// };

// const config = {
//   headers: {
//     'x-api-key': apiKey,
//   },
//   params: {
//     zip_code: zipCode,
//     tags: tag, // Join the tags into a comma-separated string
//     page: page,
//     size: size,
//   },
// };

// const params = {
//   tag: tagsStr,
//   permit_id: permitId, // Include the permit ID in the query parameters
// };

// const params = {
//   tag: tagsStr,
// };
//
// const headers = {
//   'x-api-key': apiKey,
// };
// const config = {
//   headers: {
//     'x-api-key': apiKey,
//   },
// };

// Make the GET request
// axios.get(apiUrl, config)
//   .then((response) => {
//     // Check if the request was successful (status code 200)
//     console.log('Response data:', response.data)
//     const keys = Object.keys(response.data);
//     console.log(keys)
//     const values = Object.values(response.data);
//     const entries = Object.entries(response.data);
//
//     // console.log("Keys:", keys);
//     console.log("Values:", values);
//     console.log("Entries:", entries[0][1]);
//     // if (response.status === 200) {
//     //   const permitData = response.data;
//     //   console.log(permitData)
//     //   // Process the permit data as needed
//     // } else {
//     //   console.log(`Request failed with status code ${response.status}`);
//     // }
//   })
//   .catch((error) => {
//     console.error(`Request error: ${error.message}`);
//     if (error.response) {
//       console.error(`Response data: ${JSON.stringify(error.response.data)}`);
//   }
//     // console.error(`Request error: ${error.message}`);
//   });

/// new code
// const config = {
//   headers: {
//     'x-api-key': apiKey,
//   },
// };
//
// axios
//   .get(apiUrl, config)
//   .then((response) => {
//     // Handle the response data
//     console.log('Permits data:', response.data);
//     const keys = Object.keys(response.data);
//     console.log(keys)
//     const values = Object.values(response.data);
//     const entries = Object.entries(response.data);
//
// // console.log("Keys:", keys);
//     console.log("Values:", values);
//     console.log("Entries:", entries[0][1]);
//
//
//     // Access the first item (index 0) within the "items" array
//     // const firstItem = response.data["Permits data"];
//     // console.log(firstItem)
//         // Access the items array within the Permits object
//     // const permitItems = response.data.Permits.items;
//
//     // Access the first item in the array (index 0)
//     // const firstPermit = permitItems[0];
//
//     // Access specific properties within the first permit
//     // const permitId = firstPermit.id;
//     // const permitAddress = firstPermit.address; // You may need to further access address properties
//
//     // Now, you can work with the data you've accessed
//     // console.log("Permit ID:", permitId);
//     // console.log("Permit Address:", permitAddress);
//     // const firstItem = response.data.Permits["items"][0];
//
//     // Now, you can print the information from the first item
//     // console.log("ID:", firstItem.id);
//     // console.log("Address:", firstItem.address);
//   })
//   .catch((error) => {
//     // Handle any errors
//     console.error('Error fetching permits:', error);
//   });
