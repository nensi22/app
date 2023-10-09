import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";
import AdsTypesModel from "./ads_types.js";
import CountryModel from "./countries.js";

class AdsTypesCountryModel extends Model {}

AdsTypesCountryModel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  ads_type_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: AdsTypesModel,
      key: "id",
    },
  },
  country_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: CountryModel,
      key: "id",
    },
  },
}, {
  sequelize,
  tableName: "ads_type_countries",
  timestamps: true,
});

AdsTypesCountryModel.belongsTo(AdsTypesModel, {
  foreignKey: "ads_type_id",
  as: "ads_type",
  onDelete: "CASCADE",
});
AdsTypesCountryModel.belongsTo(CountryModel, {
  foreignKey: "country_id",
  as: "country",
  onDelete: "CASCADE",
});

export default AdsTypesCountryModel;
