import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class AdminModel extends Model {}

AdminModel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize,
  tableName: "admin",
  timestamps: true,
});

export default AdminModel;
