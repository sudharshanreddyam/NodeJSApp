import express from 'express';
import cookieParser from './middlerwares/cookieParser';
import queryParser from './middlerwares/queryParser';
import setupPassport from './middlerwares/passport';
import registerAuthRoutes from './routes/authRoute';
import registerAPIRoutes from './routes/apiRoute';
import credentails from './data/credentials';
import bodyParser from 'body-parser';
import passport from 'passport';
import expressSession from 'express-session';

const SECRET_CODE = 'secret';
const app = express();

app.use(cookieParser);
app.use(queryParser);
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: 'secret'
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(function(req, res, next) {
    res.setHeader("Content-Security-Policy", "default-src 'none'; font-src 'self' data:; style-src 'self' 'unsafe-inline' data:; img-src 'self' data:; script-src 'self' 'unsafe-inline'; connect-src 'self';");
    return next();
});
const router = express.Router();
app.use(router);

app.use(passport.initialize());
setupPassport(credentails);

app.use(registerAPIRoutes(SECRET_CODE));
app.use(registerAuthRoutes(SECRET_CODE));

export default app;