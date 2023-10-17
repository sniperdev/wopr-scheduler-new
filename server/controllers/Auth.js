const Users = require("../models/Users");
const Joi = require("@hapi/joi");
const bcrypt = require("bcryptjs");

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
  if (error) return res.status(400).send(error);

  const emailExist = await Users.findOne({
    where: { email: req.body.email },
  });

  if (emailExist)
    return res.status(400).send({
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

module.exports = {
  registerUser,
};
