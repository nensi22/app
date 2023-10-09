import express from "express";

import * as adsTypeCountryController from "./countriesControllers.js";

const adsTypesCountryRoute = express.Router();

adsTypesCountryRoute.get(
  "/:id",
  adsTypeCountryController.getAdsTypeCountryPage,
);

adsTypesCountryRoute.post(
  "/",
  adsTypeCountryController.updateAdsTypeCountries,
);

export default adsTypesCountryRoute;
