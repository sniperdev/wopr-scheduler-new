const ScheduledWorkShifts = require("../models/ScheduledWorkShifts");

const getScheduledWorkShifts = async (req, res) => {
  try {
    const scheduledWorkShifts = await ScheduledWorkShifts.findAll();
    const newWorkShifts = scheduledWorkShifts.map((item) => {
      return {
        id: item.id,
        start: item.start,
        end: item.end,
        title: item.title,
        user_id: item.user_id,
      };
    });
    return res.send(newWorkShifts);
  } catch (err) {
    return res.status(500);
  }
};

module.exports = { getScheduledWorkShifts };
