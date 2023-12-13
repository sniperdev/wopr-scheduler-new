const sequelize = require("../config/sequelize");
const { DataTypes } = require("sequelize");
const Users = require("./Users");
const Companies = require("./Companies");
const Shifts = require("./Shifts");

const UsersWorkShifts = sequelize.define("UsersWorkShifts", {
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
  isScheduled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
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

UsersWorkShifts.belongsTo(Users, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
UsersWorkShifts.belongsTo(Companies, {
  foreignKey: "company_id",
  onDelete: "CASCADE",
});
UsersWorkShifts.belongsTo(Shifts, {
  foreignKey: "shift_id",
  onDelete: "CASCADE",
});

module.exports = UsersWorkShifts;
