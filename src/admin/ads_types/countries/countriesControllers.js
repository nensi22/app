import AdminModel from "../../../../models/admin.js";
import AdsTypesCountryModel from "../../../../models/ads_type_countries.js";
import CountryModel from "../../../../models/countries.js";

export const getAdsTypeCountryPage = async (req, res) => {
  console.log("at getAdsTypeCountryPage");
  try {
    const ads_type_id = req.params.id;

    const adsTypeCountryData = await AdsTypesCountryModel.findAll({
      where: { ads_type_id: ads_type_id },
      attributes: ["country_id"],
    });

    const countryData = await CountryModel.findAll({});

    const admin = await AdminModel.findOne();

    // const isSelectedCountry = adsTypeCountryData.map((item) => {
    //   if (item.country_id) return item.country_id;
    // });
    const isSelectedCountry = (countryId) => {
      return adsTypeCountryData.some((item) => item.country_id === countryId);
    };

    return res.render("admin/ads_types/countries/index", {
      page: "ads-types",
      adsTypeCountries: adsTypeCountryData,
      countries: countryData,
      admin,
      isSelectedCountry: isSelectedCountry,
      ads_type_id: ads_type_id,
    });
  } catch (error) {
    console.log("error_getAdsTypeCountryPage : ", error);
  }
};

export const createAdsTypeCountries = async (ads_type) => {
  console.log("at create countries in ads types");
  try {
    const countryIds = await CountryModel.findAll({});

    const allCreatedCountriesInAds = [];
    for (const country of countryIds) {
      const createCountries = await AdsTypesCountryModel.create({
        ads_type_id: ads_type.id,
        country_id: country.id,
      });
      allCreatedCountriesInAds.push(createCountries);
    }

    console.log("countries created in ads type");
    return allCreatedCountriesInAds;
  } catch (error) {
    console.log("error_createAdsTypeCountries : ", error);
  }
};

export const updateAdsTypeCountries = async (req, res) => {
  console.log("at update or delete countries in ads types", req.body);
  try {
    const ads_type_id = req.body.ads_type_id;
    const countries = req.body.country_ids;

    await AdsTypesCountryModel.destroy({
      where: { ads_type_id: ads_type_id },
    });

    countries.map(async (country) => {
      const addCountries = await AdsTypesCountryModel.create({
        ads_type_id: ads_type_id,
        country_id: country,
      });
    });

    res.send({ success: true });
  } catch (error) {
    console.log("error_updateAdsTypeCountries : ", error);
  }
};
