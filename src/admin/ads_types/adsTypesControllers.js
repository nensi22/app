import AdminModel from "../../../models/admin.js";
// import AdsTypesCountryModel from "../../../models/ads_type_countries.js";
import AdsTypesModel from "../../../models/ads_types.js";
import AppModel from "../../../models/apps.js";
import { createAdsTypeCountries } from "./countries/countriesControllers.js";

export const getAdsTypePage = async (req, res) => {
  console.log("at getAdsTypePage");
  try {
    const adsTypesData = await AdsTypesModel.findAll({
      include: [{ model: AppModel, as: "app", attributes: ["name"] }],
    });
    const appData = await AppModel.findAll({});
    const admin = await AdminModel.findOne();
    return res.render("admin/ads_types/index", {
      page: "ads-types",
      apps: appData,
      admin,
      adsTypes: adsTypesData,
    });
  } catch (error) {
    console.log("error_getAdsTypePage : ", error);
  }
};

export const createAdsType = async (req, res) => {
  console.log("at create ads-types");
  try {
    const adsType = await AdsTypesModel.create({
      app_id: req.body.app_id,
      platform_name: req.body.platform_name,
      priority: req.body.priority,
      ads_placement_type: req.body.ads_placement_type,
    });

    res.send({ success: adsType });

    await createAdsTypeCountries(adsType);
  } catch (error) {
    console.log("error_createAdsType : ", error);
  }
};

export const updateAdsType = async (req, res) => {
  console.log("at uodate ads-type");
  try {
    const id = req.params.id;
    const { app_id, platform_name, priority, ads_placement_type } = req.body;

    const adsType = await AdsTypesModel.findByPk(id);

    if (adsType) {
      adsType.app_id = app_id;
      adsType.platform_name = platform_name;
      adsType.priority = priority;
      adsType.ads_placement_type = ads_placement_type;
    }
    await adsType.save();
    res.send({ success: adsType });
  } catch (error) {
    console.log("error_updateAdsType : ", error);
  }
};

export const deleteAdsType = async (req, res) => {
  console.log("at delete ads-type");
  try {
    const id = req.params.id;

    const adsType = await AdsTypesModel.findByPk(id);

    if (adsType) {
      await adsType.destroy({ where: { id: id } });
    }
    res.send({ success: adsType });
  } catch (error) {
    console.log("error_deleteAdsType : ", error);
  }
};

// ads-type-countries
// export const getAdsTypeCountryPage = async (req, res) => {
//   console.log("at getAdsTypeCountryPage");
//   try {
//     const ads_type_id = req.params.id;

//     const adsTypeCountryData = await AdsTypesCountryModel.findAll({
//       where: { ads_type_id: ads_type_id },
//     });
//     const admin = await AdminModel.findOne();

//     return res.render("admin/ads_types/countries/index", {
//       page: "ads-types",
//       adsTypeCountries: adsTypeCountryData,
//       admin,
//       ads_type_id: ads_type_id,
//     });
//   } catch (error) {
//     console.log("error_getAdsTypeCountryPage : ", error);
//   }
// };
