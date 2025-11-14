import mariadb from "mariadb";
import dotenv from "dotenv";
dotenv.config();

export const pool = mariadb.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "timebomb",
  connectionLimit: 5
});
