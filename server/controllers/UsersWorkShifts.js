const UsersWorkShifts = require("../models/UsersWorkShifts");
const Users = require("../models/Users");
const Shifts = require("../models/Shifts");
const Joi = require("@hapi/joi");

const getAllUserWorkShifts = async (req, res) => {
  try {
    const userWorkShifts = await UsersWorkShifts.findAll({
      where: {
        user_id: req.params.id,
      },
    });
    const user = await Users.findOne({ where: { id: req.params.id } });
    const defaultWorkShifts = await Shifts.findAll({
      where: {
        company_id: user.company_id,
      },
    });
    const newWorkShifts = userWorkShifts.map((item) => {
      const defaultShift = defaultWorkShifts.find(
        (shift) => shift.id === item.shift_id,
      );
      let color = null;
      if (defaultShift && defaultShift.updatedAt > item.createdAt) {
        color = "red";
      }
      return {
        id: item.id,
        start: item.start,
        end: item.end,
        title: defaultShift.name,
        color: color,
      };
    });
    return res.send(newWorkShifts);
  } catch (err) {
    return res.status(500);
  }
};

const getAdminUserWorkShifts = async (req, res) => {
  try {
    const userWorkShifts = await UsersWorkShifts.findAll({
      where: { isScheduled: false },
      include: [
        {
          model: Users,
          attributes: ["name", "surname"],
          where: { company_id: req.params.id },
        },
      ],
    });
    const newWorkShifts = userWorkShifts.map((item) => {
      return {
        id: item.id,
        start: item.start,
        end: item.end,
        title: `${item.shift} - ${item.User.name} ${item.User.surname}`,
        user_id: item.user_id.toString(),
      };
    });
    return res.send(
      newWorkShifts.sort((a, b) => new Date(a.start) - new Date(b.start)),
    );
  } catch (err) {
    return res.status(500);
  }
};

const addUserShiftSchema = Joi.object({
  start: Joi.string().required(),
  end: Joi.string().required(),
  shift: Joi.string().required(),
  user_id: Joi.number().required(),
});

const addAllUserWorkShifts = async (req, res) => {
  const { error } = addUserShiftSchema.validate(req.body);
  if (error) return res.status(400).json(error);
  const user = await Users.findOne({ where: { id: req.body.user_id } });
  const company_id = user ? user.company_id : null;
  const shift = {
    start: req.body.start,
    end: req.body.end,
    shift_id: req.body.shift,
    user_id: req.body.user_id,
    company_id: company_id,
  };
  await UsersWorkShifts.create(shift)
    .then(() => res.status(200).json({ message: "Users work shifts created" }))
    .catch((err) => {
      res.status(400).json({ message: err });
    });
};

const deleteUserShift = async (req, res) => {
  try {
    await UsersWorkShifts.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.status(200).json({ message: "User work shift deleted" });
  } catch (err) {
    return res.status(500);
  }
};
module.exports = {
  getAdminUserWorkShifts,
  getAllUserWorkShifts,
  addAllUserWorkShifts,
  deleteUserShift,
};
