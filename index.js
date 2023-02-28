const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();
const { query, validationResult } = require("express-validator");

const { weatherCodes } = require("./utils/weatherCodes");
const { errorHandler } = require("./utils/errorHandler");
const app = express();
const PORT = process.env.PORT || 8080;
const URL = process.env.WEATHER_API_URL;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => console.log("server is running on", PORT));

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.get(
  "/weather",
  [query("lat").isNumeric().toFloat(), query("lon").isNumeric().toFloat()],
  async (req, res, next) => {
    try {
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        const customError = validationErrors.errors.map((error) => {
          return error.msg + ": " + error.param;
        });
        throw new Error(
          customError +
            ". Please provide latitude and longitude! " +
            'like so: "/weather?lat=54.123&lon=25.123"'
        );
      }
      console.log("req.query: ", req.query);
      let lat = req.query.lat;
      let lon = req.query.lon;

      const apiResponse = await axios.get(
        URL +
          "latitude=" +
          lat +
          "&longitude=" +
          lon +
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
  }
);

app.use(errorHandler);
