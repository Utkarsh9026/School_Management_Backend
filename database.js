import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(
  process.env.DBNAME,
  process.env.DBUSER,
  process.env.DBPASS,
  {
    host: process.env.DBHOST,
    dialect: "mysql",
  }
);

sequelize
  .authenticate()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log("Error: " + err));

export default sequelize;
