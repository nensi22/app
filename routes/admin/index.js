import express from "express";
import * as authController from "../../src/admin/auth/authControllers.js";
import appRoute from "../../src/admin/app/appRouter.js";
import { adminVerify } from "../../middleware/auth.js";
import adsTypeRoute from "../../src/admin/ads_types/adsTypesRouter.js";
import countryRoute from "../../src/admin/countries/countryRouter.js";
import apiRoute from "../../src/api/apiRouter.js";

const adminRoute = express.Router();

adminRoute.get("/", authController.getLoginPage);
adminRoute.get("/login", authController.getLoginPage);
adminRoute.post("/login", authController.login);
adminRoute.get("/logout", authController.logout);
adminRoute.get("/dashboard", adminVerify, authController.getDashboard);

// app
adminRoute.use("/apps", adminVerify, appRoute);

// ads-types
adminRoute.use("/ads-types", adminVerify, adsTypeRoute);

// serve-countries
adminRoute.use("/countries", adminVerify, countryRoute);

adminRoute.use("/get-apps", apiRoute);

export default adminRoute;
