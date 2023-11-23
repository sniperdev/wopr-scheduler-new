const Users = require("../models/Users");
const Companies = require("../models/Companies");
const Shifts = require("../models/Shifts");
const Joi = require("@hapi/joi");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const registerSchema = Joi.object({
  name: Joi.string().min(3).required(),
  surname: Joi.string().min(3).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
  phone: Joi.string().length(9).required(),
  company: Joi.string().min(3).required(),
  address: Joi.string().min(5).required(),
  shifts: Joi.array().required(),
  isAdmin: Joi.boolean(),
});

const loginSchema = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().required(),
});

const registerUser = async (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) return res.status(400).json(error);

  const emailExist = await Users.findOne({
    where: { email: req.body.email },
  });

  if (emailExist)
    return res.status(400).json({
      message: "Podany adres email już istnieje",
    });

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const company = {
    companyName: req.body.company,
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    address: req.body.address,
    phone: req.body.phone,
  };
  const shifts = req.body.shifts;
  Companies.create(company)
    .then((newCompany) => {
      const userData = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: hashPassword,
        phone: req.body.phone,
        company_id: newCompany.id,
        isAdmin: req.body.isAdmin,
      };
      let newShifts = shifts.map((element) => ({
        ...element,
        company_id: newCompany.id,
      }));
      Users.create(userData);
      Shifts.bulkCreate(newShifts);
    })
    .then(() => {
      res.status(200).json({ message: "Utworzono użytkownika" });
    })
    .catch((error) => {
      console.error("Błąd:", error);
    });
};

const loginUser = async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).send(error);

  const response = await Users.findOne({
    where: { email: req.body.email },
  });
  const user = response.toJSON();
  if (!user)
    return res.status(400).send({
      message: "Nie znaleziono adresu email",
    });

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass)
    return res.status(400).send({
      message: "Niepoprawne hasło",
    });

  let userNoPassword = {};
  const keys = Object.keys(user);
  for (const key of keys) {
    if (key !== "password") {
      userNoPassword[key] = user[key];
    }
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_TOKEN);
  return res.header("auth-token", token).send({
    jwt: token,
    data: userNoPassword,
  });
};

module.exports = {
  registerUser,
  loginUser,
};
