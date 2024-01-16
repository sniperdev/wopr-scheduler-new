const Companies = require("../models/Companies");
const Users = require("../models/Users");
const Shifts = require("../models/Shifts");
const bcrypt = require("bcryptjs");
const resetSettingsFunction =
  require("../config/defaultDatabaseValues").resetSettingsFunction();
const companyInfo = async (req, res) => {
  try {
    const companyInfo = await Companies.findOne({
      where: {
        id: req.params.id,
      },
    });
    return res.send(companyInfo);
  } catch (err) {
    return res.status(500);
  }
};

const updateCompanyInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const { companyName, address, name, surname, phone } = req.body;

    const updatedCompanyInfo = await Companies.update(
      { companyName, address, name, surname, phone },
      {
        where: {
          id: id,
        },
      },
    );
    await Users.update(
      { name, surname, phone },
      {
        where: {
          company_id: id,
          email: req.body.email,
        },
      },
    );
    if (updatedCompanyInfo[0] === 0) {
      return res.status(404).send({ message: "Company not found" });
    }

    return res
      .status(200)
      .send({ message: "Company info updated successfully" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const allUsers = async (req, res) => {
  try {
    const { company_id, user_id } = req.params;
    console.log(company_id, user_id);
    const allUsers = await Users.findAll({
      where: {
        company_id: company_id,
      },
    });
    const mappedUsers = allUsers
      .filter((user) => user.id !== parseInt(user_id))
      .map((user) => ({
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        isAdmin: user.isAdmin,
      }));
    return res.send(mappedUsers);
  } catch (err) {
    return res.status(500);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await Users.destroy({
      where: {
        id: id,
      },
    });
    return res.status(200).send({ message: "User deleted successfully" });
  } catch (err) {
    return res.status(500);
  }
};

const generateRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const addUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, surname, email, phone, isAdmin } = req.body;

    const password = Math.random().toString(36).slice(-8);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const color = generateRandomColor();

    await Users.create({
      name,
      surname,
      email,
      phone,
      isAdmin,
      password: hashedPassword,
      color: color,
      company_id: id,
    });

    return res.status(200).send({
      message: "User added successfully",
      newUser: { name, surname, email, password },
    });
  } catch (err) {
    return res.status(500);
  }
};

const addShift = async (req, res) => {
  try {
    await Shifts.create({
      name: req.body.name,
      start: req.body.start,
      end: req.body.end,
      company_id: req.params.id,
    });
    return res.status(200).send({ message: "Shift added successfully" });
  } catch (err) {
    return res.status(500);
  }
};

const removeShift = async (req, res) => {
  try {
    await Shifts.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.status(200).send({ message: "Shift removed successfully" });
  } catch (err) {
    return res.status(500);
  }
};

const resetSettings = (req, res) => {
  try {
    resetSettingsFunction();
    return res.status(200).send({ message: "Settings reset successfully" });
  } catch (err) {
    return res.status(500);
  }
};

const updateShift = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, start, end } = req.body;

    const updatedShift = await Shifts.update(
      { name, start, end },
      {
        where: {
          id: id,
        },
      },
    );

    if (updatedShift[0] === 0) {
      return res.status(404).send({ message: "Shift not found" });
    }

    return res.status(200).send({ message: "Shift updated successfully" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
module.exports = {
  companyInfo,
  updateCompanyInfo,
  allUsers,
  deleteUser,
  addUser,
  resetSettings,
  addShift,
  removeShift,
  updateShift,
};
