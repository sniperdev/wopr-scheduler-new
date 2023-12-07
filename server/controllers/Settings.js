const Companies = require("../models/Companies");
const companyInfo = async (req, res) => {
  try {
    const companyInfo = await Companies.findOne({
      where: {
        id: req.params.id,
      },
    });
    return res.send(companyInfo);
  } catch (err) {
    return res.status(500);
  }
};

module.exports = { companyInfo };
