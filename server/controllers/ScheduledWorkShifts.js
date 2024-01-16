const UsersWorkShifts = require("../models/UsersWorkShifts");
const Users = require("../models/Users");
const Shifts = require("../models/Shifts");
const getScheduledWorkShifts = async (req, res) => {
  try {
    const scheduledWorkShifts = await UsersWorkShifts.findAll({
      where: { isScheduled: true, company_id: req.params.id },
      include: [
        {
          model: Users,
          attributes: ["name", "surname"],
        },
        {
          model: Shifts,
          attributes: ["name"],
        },
      ],
    });
    let newWorkShifts = scheduledWorkShifts.map((item) => {
      return {
        id: item.id,
        start: item.start,
        end: item.end,
        title: `${item.Shift.name} - ${item.User.name} ${item.User.surname}`,
        user_id: item.user_id,
      };
    });
    newWorkShifts = newWorkShifts.sort(
      (a, b) => new Date(a.start) - new Date(b.start),
    );
    return res.send(newWorkShifts);
  } catch (err) {
    return res.status(500);
  }
};

const createScheduledWorkShifts = async (req, res) => {
  try {
    const shifts = req.body.events;
    const companyId = req.body.company_id;
    await UsersWorkShifts.update(
      { isScheduled: false },
      { where: { company_id: companyId } },
    );
    for (const shift of shifts) {
      await UsersWorkShifts.update(
        { isScheduled: true },
        { where: { id: shift.id } },
      );
    }
    return res.status(200).send({ message: "Ustawiono grafik" });
  } catch (err) {
    return res.status(500);
  }
};
module.exports = { getScheduledWorkShifts, createScheduledWorkShifts };
