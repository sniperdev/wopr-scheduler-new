const express = require("express");
const auth = require("../controllers/Auth");
const verify = require("./verifyToken");
const UsersWorkShifts = require("../controllers/UsersWorkShifts");

const router = express.Router();

router.post("/register", auth.registerUser);
router.post("/login", auth.loginUser);

router.get(
  "/UsersWorkShifts/:id",
  verify,
  UsersWorkShifts.getAllUserWorkShifts,
);
router.post(
  "/UsersWorkShifts/add",
  verify,
  UsersWorkShifts.addAllUserWorkShifts,
);

module.exports = router;
