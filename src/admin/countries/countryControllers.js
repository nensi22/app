import AdminModel from "../../../models/admin.js";
import CountryModel from "../../../models/countries.js";

export const getCountryPage = async (req, res) => {
  console.log("at getCountryPage");
  try {
    const countryData = await CountryModel.findAll({});
    const admin = await AdminModel.findOne();

    return res.render("admin/countries/index", {
      page: "countries",
      countries: countryData,
      admin,
    });
  } catch (error) {
    console.log("error_getCountryPage : ", error);
  }
};

export const createCountry = async (req, res) => {
  console.log("at create country");
  try {
    const country = await CountryModel.create({
      country_name: req.body.country_name,
      country_code: req.body.country_code,
      calling_code: req.body.calling_code,
    });

    res.send({ success: country });
  } catch (error) {
    console.log("error_createCountry : ", error);
  }
};

export const updateCountry = async (req, res) => {
  console.log("at update country");
  try {
    const id = req.params.id;
    const { country_name, country_code, calling_code } = req.body;

    const country = await CountryModel.findByPk(id);

    if (country) {
      country.country_name = country_name;
      country.country_code = country_code;
      country.calling_code = calling_code;
    }

    await country.save();
    res.send({ success: country });
  } catch (error) {
    console.log("error_updateCountry : ", error);
  }
};

export const deleteCountry = async (req, res) => {
  console.log("at delete country");
  try {
    const id = req.params.id;

    const country = await CountryModel.findByPk(id);

    if (country) {
      await country.destroy({ where: { id: id } });
    }

    res.send({ success: country });
  } catch (error) {
    console.log("error_deleteCountry : ", error);
  }
};
