/* eslint-disable no-console */
import app from './src/express-app';
import sequelize from './src/utils/connectToPostgres';
import mongodb from './src/utils/connectToMongoDB';

const mongoose = mongodb.connection;
mongoose.on('error', (err) => console.info('connection error: ', err.message));
mongoose.on('open', () => console.info('Connection to MongoDB established...'));
mongoose.on('disconnected', () => console.info('MongoDB connection disconnected...'));

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
