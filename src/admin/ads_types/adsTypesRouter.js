import express from "express";

import * as adsTypesController from "./adsTypesControllers.js";
import adsTypesCountryRoute from "./countries/countriesRouter.js";

const adsTypeRoute = express.Router();

adsTypeRoute.get("/", adsTypesController.getAdsTypePage);
adsTypeRoute.post("/", adsTypesController.createAdsType);
adsTypeRoute.put("/:id", adsTypesController.updateAdsType);
adsTypeRoute.delete("/:id", adsTypesController.deleteAdsType);

// ads_type_countries
adsTypeRoute.use("/countries", adsTypesCountryRoute);

export default adsTypeRoute;
