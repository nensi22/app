import express from "express";

import * as appController from "./appControllers.js";

const appRoute = express.Router();

appRoute.get("/", appController.getAppPage);
appRoute.post("/", appController.createApp);
appRoute.patch("/is-ads/:id", appController.updateAds);
appRoute.put("/:id", appController.updateApp);
appRoute.delete("/:id", appController.deleteApp);

export default appRoute;
