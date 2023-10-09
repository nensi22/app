import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class AppModel extends Model {}

AppModel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  is_ads: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
}, {
  sequelize,
  tableName: "apps",
  timestamps: true,
});

export default AppModel;
