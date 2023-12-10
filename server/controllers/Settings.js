const Companies = require("../models/Companies");
const Users = require("../models/Users");
const bcrypt = require("bcryptjs");
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
    const { id } = req.params;
    const allUsers = await Users.findAll({
      where: {
        company_id: id,
      },
    });
    // const allUsersNoAdmins = allUsers.filter((user) => user.isAdmin !== true);
    const mappedUsers = allUsers.map((user) => ({
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

const addUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, surname, email, phone, isAdmin } = req.body;

    const password = Math.random().toString(36).slice(-8);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await Users.create({
      name,
      surname,
      email,
      phone,
      isAdmin,
      password: hashedPassword,
      company_id: id,
    });

    return res
      .status(200)
      .send({ message: "User added successfully", password });
  } catch (err) {
    return res.status(500);
  }
};
module.exports = {
  companyInfo,
  updateCompanyInfo,
  allUsers,
  deleteUser,
  addUser,
};
