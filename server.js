const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { errorHandler } = require("./src/utils/errorHandler");
const { attachRouter } = require("./src/router");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

attachRouter(app);

app.listen(PORT, () => console.log("Server is running on", PORT));

app.use(errorHandler);
