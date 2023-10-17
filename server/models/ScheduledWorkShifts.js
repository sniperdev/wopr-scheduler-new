const sequelize = require("../config/sequelize");
const { DataTypes } = require("sequelize");
const Users = require("./Users");

const ScheduledWorkShifts = sequelize.define("ScheduledWorkShifts", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  start: {
    type: DataTypes.STRING,
  },
  end: {
    type: DataTypes.STRING,
  },
  title: {
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

ScheduledWorkShifts.belongsTo(Users, {
  foreignKey: "user_id",
});

module.exports = ScheduledWorkShifts;
