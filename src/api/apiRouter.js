import express from "express";

import * as apiController from "./apiControllers.js";

const apiRoute = express.Router();

apiRoute.get("/", apiController.getAppdata);

apiRoute.get("/:id", apiController.getAppDataById);

export default apiRoute;
