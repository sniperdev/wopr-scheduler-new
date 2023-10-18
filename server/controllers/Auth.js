const Users = require("../models/Users");
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

  const user = {
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    password: hashPassword,
    phone: req.body.phone,
    company: req.body.company,
  };
  try {
    await Users.create(user);
    res.json({
      message: "User registered",
    });
  } catch (err) {
    console.log(err);
  }
};

const loginSchema = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().required(),
});

const loginUser = async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).send(error);

  const user = await Users.findOne({ where: { email: req.body.email } });
  if (!user)
    return res.status(400).send({
      message: "Nie znaleziono adresu email",
    });

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass)
    return res.status(400).send({
      message: "Niepoprawne hasło",
    });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_TOKEN);
  return res.header("auth-token", token).send({
    jwt: token,
  });
};

module.exports = {
  registerUser,
  loginUser,
};
