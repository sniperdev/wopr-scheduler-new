const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv/config");
const Router = require("./routes/routes");

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

const PORT = process.env.EXPRESS_PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}. (http://localhost:${PORT})`);
});

app.use(Router);

const mysqlConnection = require("./config/database");

mysqlConnection.connect((err) => {
  if (!err) {
    console.log("Connected to database");
  } else {
    console.log("Connected to database ", err);
  }
});
mysqlConnection.end();

// Syncing database tabels
//
const sequelize = require("./config/sequelize");
// const Users = require("./models/Users");
// const UsersWorkShifts = require("./models/UsersWorkShifts");
// const ScheduledWorkShifts = require("./models/ScheduledWorkShifts");
// const Companies = require("./models/Companies");
// const Shifts = require("./models/Shifts");
//
// sequelize.sync({ force: true });
sequelize.sync({ alter: true });
