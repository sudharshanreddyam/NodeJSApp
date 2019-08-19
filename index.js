/* eslint-disable no-console */
import app from './src/express-app';
import { sequelize } from './src/config/connect';

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`App listening to port ${port}`));

sequelize
  .authenticate()
  .then(() => {
    console.log('DB Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
