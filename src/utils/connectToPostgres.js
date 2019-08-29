import Sequelize from 'sequelize';
import dbConfig from '../config/db.json';

const { dialect, username, password, host, database } = dbConfig.development;

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
});

export default sequelize;
