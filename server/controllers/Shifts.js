const Shifts = require("../models/Shifts");

const getCompanyShifts = async (req, res) => {
  try {
    const companyShifts = await Shifts.findAll({
      where: {
        company_id: req.params.id,
      },
    });

    return res.send(companyShifts);
  } catch (err) {
    return res.status(500);
  }
};

module.exports = {
  getCompanyShifts,
};
