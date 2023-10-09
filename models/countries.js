import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class CountryModel extends Model {}

CountryModel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  country_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  country_code: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  calling_code: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize,
  tableName: "countries",
  timestamps: true,
});

export default CountryModel;
