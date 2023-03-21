const { getWeather } = require("./weather/getWeather");
const { locationValidation } = require("./weather/validation");
const { getCities } = require("./city/getCities");
const { cityValidation } = require("./city/validation");

const attachRouter = (app) => {
  app.get("/", (req, res) => {
    res.send("Hello world!");
  });
  app.get("/weather", locationValidation, getWeather);
  app.get("/cities", cityValidation, getCities);
};

module.exports = {
  attachRouter,
};
