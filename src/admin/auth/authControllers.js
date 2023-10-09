import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import AdminModel from "../../../models/admin.js";
import { JWT_EXPIRES, JWT_SECRET } from "../../../constants/config-constant.js";

export const getLoginPage = (req, res) => {
  console.log("admin login page");
  try {
    let message = req.flash("error");
    if (message.length > 0) {
      message = message[0];
    } else {
      message = null;
    }

    if (req.session.admin) {
      const token = req.session.admin;
      jwt.verify(token, JWT_SECRET, (err, decode) => {
        if (err) {
          return res.render("admin/login", { errorMessage: message });
        } else {
          return res.redirect("/admin/dashboard");
        }
      });
    } else {
      return res.render("admin/login", { errorMessage: message });
    }
  } catch (error) {
    console.log("error_getLoginPage : ", error);
    res.redirect("/admin/login");
  }
};

export const getDashboard = async (req, res) => {
  console.log("admin Dashboard");
  try {
    const admin = await AdminModel.findOne();
    return res.render("admin/dashboard/index", { page: "dashboard", admin });
  } catch (error) {
    console.log("error_getDashboard : ", error);
  }
};

export const login = async (req, res) => {
  console.log("admin login");
  try {
    const { email, password } = req.body;
    console.log("email : ", email);
    console.log("password : ", password);

    const admin = await AdminModel.findOne({ where: { email: email } });

    if (admin) {
      const matchHashedPwd = await bcrypt.compare(password, admin.password);

      if (matchHashedPwd) {
        const token = jwt.sign({ admin }, JWT_SECRET, {
          expiresIn: JWT_EXPIRES,
        });
        req.session.admin = token;
        console.log("token generated : ", req.session.admin);

        return res.redirect("/admin/dashboard");
      } else {
        req.flash("error", "email or password incorrect");
        return res.redirect("/admin/login");
      }
    } else {
      req.flash("error", "email or password incorrect");
      return res.redirect("/admin/login");
    }
  } catch (error) {
    console.log("error_login : ", error);
  }
};

export const logout = async (req, res) => {
  console.log("admin logout");
  try {
    delete req.session.admin;

    return res.redirect("/admin/login");
  } catch (error) {
    console.log("error_logout : ", error);
  }
};
