const axios = require('axios');

async function makeRequests() {
  for (let i = 0; i < 10000; i++) {
    try {
      const response = await axios.post('http://localhost:3000/update-balance', {
        userId: 1,
        amount: -2
      });
      console.log(`Request ${i + 1}: Status ${response.status}`);
    } catch (error) {
      console.log(`Request ${i + 1}: Status ${error.response ? error.response.status : 'Error'}`);
    }
  }
}

makeRequests();