const sequelize = require("../config/sequelize");
const { DataTypes } = require("sequelize");
const Companies = require("./Companies");

const Shifts = sequelize.define("Shifts", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  start: {
    type: DataTypes.STRING,
  },
  end: {
    type: DataTypes.STRING,
  },
  createdAt: {
    field: "created_at",
    type: DataTypes.DATE,
  },
  updatedAt: {
    field: "updated_at",
    type: DataTypes.DATE,
  },
});

Shifts.belongsTo(Companies, {
  foreignKey: "company_id",
});

module.exports = Shifts;
