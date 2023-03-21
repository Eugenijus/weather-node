const errorHandler = (error, request, response, next) => {
  // Error handling middleware functionality
  console.error(`[${new Date().toJSON()}] ERROR-HANDLER ::: ${error.message}`);
  const status = error.status || 400;

  // send back an easily understandable error message to the caller
  response.status(status).send(error.message);
};

module.exports = {
  errorHandler,
};
