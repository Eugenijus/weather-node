const { query } = require("express-validator");

const cityValidation = [
  query(["namePrefix"])
    .notEmpty()
    .withMessage("Parameter missing")
    .isString()
    .withMessage("Parameter should be a string")
    .not()
    .isArray()
    .withMessage("Cannot have multiple parameters"),
  query(["minPopulation"])
    .notEmpty()
    .withMessage("Parameter missing")
    .isNumeric()
    .withMessage("Parameter should be a number")
    .not()
    .isArray()
    .withMessage("Cannot have multiple parameters"),
];

module.exports = {
  cityValidation,
};
