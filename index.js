const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios'); // For making API calls

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// API route for text summarization
app.post('/summarize', async (req, res) => {
  const { text } = req.body;

  if (!text || text.length < 200) {
    return res.status(400).json({ error: 'Text must be at least 200 characters long.' });
  }

  try {
    // Replace the following with your summarization API integration
    const apiResponse = await axios.post('https://api.example.com/summarize', {
      text,
    }, {
      headers: { 'Authorization': 'Bearer YOUR_API_KEY' } // Add your API key here
    });

    const summary = apiResponse.data.summary;
    res.json({ summary });
  } catch (error) {
    console.error('Error summarizing text:', error.message);
    res.status(500).json({ error: 'Failed to summarize text. Please try again later.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
