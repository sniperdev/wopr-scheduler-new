const ScheduledWorkShifts = require("../models/ScheduledWorkShifts");

const getScheduledWorkShifts = async (req, res) => {
  try {
    const scheduledWorkShifts = await ScheduledWorkShifts.findAll();
    let newWorkShifts = scheduledWorkShifts.map((item) => {
      return {
        id: item.id,
        start: item.start,
        end: item.end,
        title: item.title,
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
    const shifts = req.body;
    const scheduledWorkShifts = await ScheduledWorkShifts.bulkCreate(shifts);
    return res.send(scheduledWorkShifts);
  } catch (err) {
    return res.status(500);
  }
};
module.exports = { getScheduledWorkShifts, createScheduledWorkShifts };
