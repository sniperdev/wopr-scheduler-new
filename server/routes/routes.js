const express = require("express");
const auth = require("../controllers/Auth");

const router = express.Router();

router.post("/register", auth.registerUser);

module.exports = router;
