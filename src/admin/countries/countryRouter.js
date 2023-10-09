import express from "express";

import * as countryController from "./countryControllers.js";

const countryRoute = express.Router();

countryRoute.get("/", countryController.getCountryPage);
countryRoute.post("/", countryController.createCountry);
countryRoute.put("/:id", countryController.updateCountry);
countryRoute.delete("/:id", countryController.deleteCountry);

export default countryRoute;
