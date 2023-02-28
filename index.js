const express = require("express");
const cors = require("cors");
const { weatherCodes } = require("./utils/weatherCodes");
const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => console.log("server is running on", PORT));

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.get("/users/:id", async (req, res) => {
  let response;
  try {
    const { id } = req.params;
    response = await fetch(`https:/reqres.in/api/users/${id}`);
    if (response.status !== 200) {
      throw new Error(`There was an error with status code 
      ${response.status}`);
    }
    const user = await response.json();

    if (!user) {
      res.send("Something went wrong :(");
    }
    res.send(user);
  } catch (error) {
    console.error(error);
    res.sendStatus(response.status);
  }
});

app.get("/weather", async (req, res) => {
  let response;
  try {
    console.log("req.query: ", req.query);
    let lat = req.query.lat;
    let lon = req.query.lon;
    response = await fetch(
      "https://api.open-meteo.com/v1/forecast?" +
        "latitude=" +
        lat +
        "&longitude=" +
        lon +
        "&current_weather=true&hourly=temperature_2m,weathercode"
    );
    if (response.status !== 200) {
      throw new Error(`There was an error with status code 
      ${response.status}`);
    }
    const data = await response.json();
    const { current_weather } = data;
    const weatherText = weatherCodes.get(current_weather.weathercode);
    res.send({ ...current_weather, weatherText });
  } catch (error) {
    console.error(error);
    res.send(error.message);
  }
});
