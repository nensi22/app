import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants/config-constant.js";

export const adminVerify = (req, res, next) => {
  console.log("verify admin");
  try {
    if (req.session.admin) {
      const token = req.session.admin;
      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
          console.log("err at admin verify : ", err);
          return res.redirect("/admin/login");
        } else {
          next();
        }
      });
    } else {
      return res.redirect("/admin/login");
    }
  } catch (error) {
    console.log("error_adminVerify : ", error);
  }
};
