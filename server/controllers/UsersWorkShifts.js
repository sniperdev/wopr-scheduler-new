const UsersWorkShifts = require("../models/UsersWorkShifts");
const Joi = require("@hapi/joi");

const getAllUserWorkShifts = async (req, res) => {
  try {
    const userWorkShifts = await UsersWorkShifts.findAll({
      where: {
        user_id: req.params.id,
      },
    });
    const newWorkShifts = userWorkShifts.map((item) => {
      return {
        id: item.id,
        start: item.start,
        end: item.end,
        title: item.shift,
      };
    });
    return res.send(newWorkShifts);
  } catch (err) {
    return res.status(500);
  }
};

const addUserShiftSchema = Joi.object({
  start: Joi.string().min(5).max(5).required(),
  end: Joi.string().min(5).max(5).required(),
  shift: Joi.string().required(),
  user_id: Joi.number().required(),
});
const addAllUserWorkShifts = async (req, res) => {
  const { error } = addUserShiftSchema.validate(req.body);
  if (error) return res.status(400).json(error);
  const shift = {
    start: req.body.start,
    end: req.body.end,
    shift: req.body.shift,
    user_id: req.body.user_id,
  };
  await UsersWorkShifts.create(shift)
    .then(() => res.status(200).json({ message: "Users work shifts created" }))
    .catch((err) => {
      res.status(400).json({ message: err });
    });
};

module.exports = {
  getAllUserWorkShifts,
  addAllUserWorkShifts,
};
