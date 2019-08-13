import Sequelize from "sequelize";
import dbConfig from "./db.json";

const { dialect, username, password, host, port , database, } = dbConfig.development;

export const sequelize = new Sequelize(database, username, password, {
    host: host,
    dialect: dialect
});

