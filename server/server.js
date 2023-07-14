const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());
const apiKey = process.env.API_KEY;
const weatherApiUrl = process.env.WEATHER_API_URL;


// Use the apiKey variable in your server code


app.post('/api/weather', async (req, res) => {  
  const { location } = req.body;

  try {
    const weatherResponse = await axios.get(
      `${weatherApiUrl}?q=${location}&appid=${apiKey}`
    );

    // Extract the relevant weather data from the response
    const { weather, main } = weatherResponse.data;

    // Extract the weather condition, temperature, and humidity
    const weatherCondition = weather[0].main;
    const temperature = main.temp;
    const humidity = main.humidity;
    const temperatureCelsius = (temperature - 273.15).toFixed(0);

    // Create a weatherData object to send in the response
    const weatherData = {
      condition: weatherCondition,
      temperature: temperatureCelsius,
      humidity: humidity,
    };

    res.json(weatherData);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});