import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;
const DB_CONNECTION = process.env.DATABASE_CONNECTION;
const DB_HOST = process.env.DATABASE_HOST;
const DB_USER = process.env.DATABASE_USER;
const DB_PASSWORD = process.env.DATABASE_PASSWORD;
const DB_NAME = process.env.DATABASE_NAME;
const DB_PORT = process.env.DATABASE_PORT;

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRES;

export {
  DB_CONNECTION,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
  JWT_EXPIRES,
  JWT_SECRET,
  PORT,
};
