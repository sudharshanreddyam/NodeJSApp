import app from './src/express-app.js'
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`App listening to port ${port}`));
