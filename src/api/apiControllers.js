import AdsTypesCountryModel from "../../models/ads_type_countries.js";
import AdsTypesModel from "../../models/ads_types.js";
import AppModel from "../../models/apps.js";

export const getAppdata = async (req, res) => {
  console.log("at get app data");
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const offset = (page - 1) * limit;
    // const offset = page * limit;

    const appData = await AppModel.findAll({ limit: limit, offset: offset });
    if (appData) {
      res.status(200).send(appData);
    } else {
      res.status(404).json({ message: "apps not found...!" });
    }
  } catch (error) {
    console.log("error_getAppdataApi : ", error);
    return res.status(500).json({ error: error });
  }
};

export const getAppDataById = async (req, res) => {
  console.log("at get app data by id ");
  try {
    const id = req.params.id;

    const appData = await AppModel.findByPk(id);
    if (!appData) {
      return res.status(404).json({
        message: "The app with the given Id was not found...!",
      });
    }

    const adsTypesData = await AdsTypesModel.findAll({
      where: { app_id: id },
    });
    if (adsTypesData.length > 0) {
      const countriesOfAdsType = await AdsTypesCountryModel.findAll({});
      const responseData = {
        appData: appData,
        adsTypesData: adsTypesData.map((adsType) => ({
          ...adsType.toJSON(),
          countries: countriesOfAdsType.filter(
            (country) => country.ads_type_id === adsType.id,
          ),
        })),
      };
      res.status(200).send(responseData);
    } else {
      const responseData = {
        appData: appData,
        adsTypesData: {
          message: "No ads types found with this given app id...!",
        },
      };

      return res.status(200).json(responseData);
    }
  } catch (error) {
    console.log("error_getAppDataById : ", error);
    return res.status(500).json({ error: error });
  }
};
