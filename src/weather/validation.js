const { query } = require("express-validator");

const queryValidation = [
  query(["lat", "lon"])
    .notEmpty()
    .withMessage("Parameter missing")
    .isNumeric()
    .withMessage("Parameter should be numerical")
    .not()
    .isArray()
    .withMessage("Cannot have multiple parameters"),
  query("lat")
    .isFloat({ min: -90.0, max: 90.0 })
    .withMessage("A valid latitude must be between -90.0 and 90.0"),
  query("lon")
    .isFloat({ min: -180.0, max: 180.0 })
    .withMessage("A valid longitude may range from -180.0 to 180.0"),
];

module.exports = {
  queryValidation,
};
