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

const updateCompanyInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const { companyName, address, name, surname, phone } = req.body;

    const updatedCompanyInfo = await Companies.update(
      { companyName, address, name, surname, phone },
      {
        where: {
          id: id,
        },
      },
    );

    if (updatedCompanyInfo[0] === 0) {
      return res.status(404).send({ message: "Company not found" });
    }

    return res
      .status(200)
      .send({ message: "Company info updated successfully" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
module.exports = { companyInfo, updateCompanyInfo };
