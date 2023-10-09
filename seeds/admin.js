import AdminModel from "../models/admin.js";
import bcrypt from "bcryptjs";

export const createAdmin = async () => {
  const admin = await AdminModel.count();
  const password = "admin";

  if (admin === 0) {
    const hashedPwd = await bcrypt.hash(password, 10);
    await AdminModel.create({
      email: "admin@gmail.com",
      password: hashedPwd,
    }).then(() => {
      console.log("admin created");
    });
  }
};
