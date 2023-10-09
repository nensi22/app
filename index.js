import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import flash from "connect-flash";
import { PORT } from "./constants/config-constant.js";
import sequelize from "./config/database.js";
import { createAdmin } from "./seeds/admin.js";
import mainRoute from "./routes/index.js";

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use(session({
  secret: "sessionsecretkey",
  resave: false,
  saveUninitialized: true,
}));

app.set("view engine", "ejs");
app.set("views", "views");

app.use(flash());

app.use(mainRoute);

sequelize.sync({ alter: true })
  .then(() => {
    console.log("database connected");
    app.listen(PORT, () => {
      console.log(`server listening on port ${PORT}`);
    });

    createAdmin();
  })
  .catch((error) => {
    console.log("error connecting database : ", error);
  });
