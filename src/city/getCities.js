const axios = require("axios");
const { customizeErrorMessage } = require("../utils/errorHandler");

const GEO_API_URL = process.env.RAPID_API_GEO_API_URL;
const GEO_API_HOST = process.env.RAPID_API_GEO_API_HOST;
const RAPID_API_KEY = process.env.RAPID_API_KEY;

const geoApiOptions = {
  headers: {
    "X-RapidAPI-Key": RAPID_API_KEY,
    "X-RapidAPI-Host": GEO_API_HOST,
  },
};

const getCities = async (req, res, next) => {
  console.log("req.query: ", req.query);
  try {
    customizeErrorMessage(
      req,
      'Example: "/cities?namePrefix=vilnius&minPopulation=10000"'
    );
    let namePrefix = req.query.namePrefix;
    let minPopulation = req.query.minPopulation;

    const apiResponse = await axios.get(
      `${GEO_API_URL}/cities?namePrefix=${namePrefix}&minPopulation=${minPopulation}`,
      geoApiOptions
    );

    const jsonResponse = apiResponse.data;

    res.send(jsonResponse);
  } catch (error) {
    console.log("error: ", error);
    next(error); // calling next error handling middleware
  }
};

module.exports = {
  getCities,
};
