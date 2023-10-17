const sequelize = require("../config/sequelize");
const { DataTypes } = require("sequelize");
const Users = require("./Users");

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
  shift: {
    type: DataTypes.INTEGER,
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
  foreignKey: "id",
  onDelete: "CASCADE",
});

module.exports = UsersWorkShifts;
