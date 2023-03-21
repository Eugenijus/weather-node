const { getWeather } = require("./weather/getWeather");
const { queryValidation } = require("./weather/validation");

const attachRouter = (app) => {
  app.get("/", (req, res) => {
    res.send("Hello world!");
  });
  app.get("/weather", queryValidation, getWeather);
};

module.exports = {
  attachRouter,
};
