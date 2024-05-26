const express = require("express");
const auth = require("../controllers/Auth");
const verify = require("./verifyToken");
const UsersWorkShifts = require("../controllers/UsersWorkShifts");
const Shifts = require("../controllers/Shifts");
const ScheduledWorkShifts = require("../controllers/ScheduledWorkShifts");
const Settings = require("../controllers/Settings");

const router = express.Router();

router.post("/register", auth.registerUser);
router.post("/login", auth.loginUser);


// Tu są pod użytkownika
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
router.delete("/UsersWorkShifts/:id", verify, UsersWorkShifts.deleteUserShift);

router.get(
  "/ScheduledWorkShifts/:id",
  verify,
  ScheduledWorkShifts.getScheduledWorkShifts,
);

// Tu są pod administratora
router.get(
  "/AdminUsersWorkShifts/:id",
  verify,
  UsersWorkShifts.getAdminUserWorkShifts,
);
router.post(
  // "/createScheduledWorkShifts/",
  "/AdminUsersWorkShifts",
  verify,
  ScheduledWorkShifts.createScheduledWorkShifts,
);

// router.get("/Shifts/:id", verify, Shifts.getCompanyShifts);
router.get("/dictionaries/shifts/:id", verify, Shifts.getCompanyShifts);

// Tu są ustawienia administratora
router.get("/companyInfo/:id", verify, Settings.companyInfo);
router.put("/companyInfo/:id", verify, Settings.updateCompanyInfo);
router.get("/users/:company_id/:user_id", verify, Settings.allUsers);
router.delete("/users/:id", verify, Settings.deleteUser);
router.post("/users/:id", verify, Settings.addUser);
router.get("/resetSettings", verify, Settings.resetSettings);
router.post("/shift/:id", verify, Settings.addShift);
router.delete("/shift/:id", verify, Settings.removeShift);
router.put("/shift/:id", verify, Settings.updateShift);

module.exports = router;
