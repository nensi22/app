import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";
import AppModel from "./apps.js";

class AdsTypesModel extends Model {}

AdsTypesModel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  app_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: AppModel,
      key: "id",
    },
  },
  platform_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  priority: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ads_placement_type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize,
  tableName: "ads_types",
  timestamps: true,
});

AdsTypesModel.belongsTo(AppModel, {
  foreignKey: "app_id",
  as: "app",
  onDelete: "CASCADE",
});

export default AdsTypesModel;
