const axios = require("axios");
const { weatherCodes } = require("../utils/weatherCodes");
const { customizeErrorMessage } = require("../utils/errorHandler");

const URL = process.env.WEATHER_API_URL;

const getWeather = async (req, res, next) => {
  console.log("req.query: ", req.query);
  try {
    customizeErrorMessage(req, 'Example: "/weather?lat=54.123&lon=25.123"');

    let latitude = req.query.lat;
    let longitude = req.query.lon;

    const apiResponse = await axios.get(
      URL +
        "latitude=" +
        latitude +
        "&longitude=" +
        longitude +
        "&current_weather=true&hourly=temperature_2m,weathercode"
    );

    const jsonResponse = apiResponse.data;

    let responseObject = {};
    if (jsonResponse?.current_weather) {
      const { current_weather } = jsonResponse;
      const weatherText = weatherCodes.get(current_weather.weathercode);
      responseObject = { ...current_weather, weatherText };
    }
    res.send(responseObject);
  } catch (error) {
    next(error); // calling next error handling middleware
  }
};

module.exports = {
  getWeather,
};
