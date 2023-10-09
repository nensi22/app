import express from "express";
import adminRoute from "./admin/index.js";

const mainRoute = express.Router();

mainRoute.use("/admin", adminRoute);

export default mainRoute;
