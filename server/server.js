const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv/config");

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.EXPRESS_PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}. (http://localhost:${PORT})`);
});

const mysqlConnection = require("./config/database");
mysqlConnection.connect((err) => {
  if (!err) {
    console.log("Connected to database");
  } else console.log("Connected to database ", err);
});
