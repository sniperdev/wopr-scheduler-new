const sequelize = require("./sequelize");
const Users = require("../models/Users");
const UsersWorkShifts = require("../models/UsersWorkShifts");
const ScheduledWorkShifts = require("../models/ScheduledWorkShifts");
const Companies = require("../models/Companies");
const Shifts = require("../models/Shifts");
const bcrypt = require("bcryptjs");

async function resetSettingsFunction() {
  await sequelize.sync({ force: true });
  // UŻYTKOWNIK 1 - ADMIN
  const company = {
    companyName: "ExampleCompany1",
    name: "Jan",
    surname: "Kowalski",
    email: "jankowalski@example.com",
    address: "ul. Przykładowa 1, 00-000 Warszawa",
    phone: "123456789",
    isAdmin: "true",
  };
  const shifts = [
    {
      name: "R",
      start: "06:00",
      end: "16:00",
    },
    {
      name: "1",
      start: "08:00",
      end: "16:00",
    },
    {
      name: "2",
      start: "16:00",
      end: "22:00",
    },
  ];
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash("12345678", salt);
  Companies.create(company).then((newCompany) => {
    const userData = {
      name: company.name,
      surname: company.surname,
      email: company.email,
      password: hashPassword,
      phone: company.phone,
      company_id: newCompany.id,
      isAdmin: company.isAdmin,
    };
    let newShifts = shifts.map((element) => ({
      ...element,
      company_id: newCompany.id,
    }));
    Users.create(userData);
    Shifts.bulkCreate(newShifts);
  });
  // UŻYTKOWNIK 2 - PRACOWNIK
  const userData2 = {
    name: "Katarzyna",
    surname: "Nowak",
    email: "katarzyna.nowak@example.com",
    password: hashPassword,
    phone: 123456789,
    company_id: 1,
    isAdmin: false,
  };
  await Users.create(userData2);
  // Przykładowe zmiany dla usera 2
}

module.exports = {
  resetSettingsFunction,
};
