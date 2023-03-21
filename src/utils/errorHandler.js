const { validationResult } = require("express-validator");

const errorHandler = (error, request, response, next) => {
  // Error handling middleware functionality
  console.error(`[${new Date().toJSON()}] ERROR-HANDLER ::: ${error.message}`);
  const status = error.status || 400;

  // send back an easily understandable error message to the caller
  response.status(status).send(error.message);
};

const customizeErrorMessage = (req, customError) => {
  const validationErrors = validationResult(req);
  console.log("validationErrors: ", validationErrors);
  if (!validationErrors.isEmpty()) {
    const validationError = validationErrors.errors.map((error) => {
      return error.msg + ": " + error.param;
    });
    throw new Error(validationError + ". " + customError);
  }
};

module.exports = {
  errorHandler,
  customizeErrorMessage,
};
