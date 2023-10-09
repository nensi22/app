import AdminModel from "../../../models/admin.js";
import AppModel from "../../../models/apps.js";

export const getAppPage = async (req, res) => {
  console.log("at getAppPage");
  try {
    const appData = await AppModel.findAll({});
    const admin = await AdminModel.findOne();
    return res.render("admin/app/index", { page: "app", apps: appData, admin });
  } catch (error) {
    console.log("error_getAppPage : ", error);
  }
};

export const createApp = async (req, res) => {
  console.log("at app create");
  try {
    const app = await AppModel.create({
      name: req.body.name,
      is_ads: req.body.is_ads === "on" ? true : false,
    });

    res.send({ success: app });
  } catch (error) {
    console.log("error_createApp : ", error);
  }
};

export const updateApp = async (req, res) => {
  console.log("at app update");
  try {
    const id = req.params.id;
    const { name, is_ads } = req.body;

    const app = await AppModel.findByPk(id);

    if (app) {
      app.name = name, app.is_ads = is_ads === "on" ? true : false;
    }

    await app.save();
    res.send({ success: app });
  } catch (error) {
    console.log("error_updateApp : ", error);
  }
};

export const updateAds = async (req, res) => {
  console.log("at ads update in app");
  try {
    const id = req.params.id;

    const app = await AppModel.findByPk(id);

    if (app) {
      app.is_ads = !app.is_ads;

      await app.save();
    }
    res.send({ success: app });
  } catch (error) {
    console.log("error_changeAds : ", error);
  }
};

export const deleteApp = async (req, res) => {
  console.log("at app delete");
  try {
    const id = req.params.id;

    const app = await AppModel.findByPk(id);

    if (app) {
      await app.destroy({ where: { id: id } });
    }

    res.send({ success: app });
  } catch (error) {
    console.log("error_deleteApp : ", error);
  }
};
