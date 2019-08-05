import passport from 'passport';
import Local from 'passport-local';
import Facebook from 'passport-facebook';
import GoogleStrategy from 'passport-google-oauth20';
import TwitterStrategy from 'passport-twitter';

const FACEBOOK_APP_ID = '2910224275718108';
const FACEBOOK_APP_SECRET = '3e4f5121503f8e7b475df2761956da76';
const GOOGLE_CLIENT_ID = '185224124086-2ad3fu7elol2hjmpdpbsbiv22mpemv22.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = 'jA4mtl4i0j4ZuktRHblPxYlw';
const TWITTER_API_KEY = 'ALaHHfUrycYd1fGQMedCteUUA';
const TWITTER_API_SECRET = 'LMO6vT0XQzV98qEnYLhXCEIt1a2Cmj5wk6VZpz2S1sH6bASJgg';

export default function setupPassport(credentials) {
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

    passport.use(new Local.Strategy({ usernameField: 'name', passwordField: 'password' },
        (username, password, done) => credentials[username] && credentials[username].password === password ?
            done(null, credentials[username]) : done(null, false, "Basic")));

    passport.use(new Facebook.Strategy({
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:8080/login/facebook/callback"
    },
        (accessToken, refreshToken, profile, cb) => cb(null, { facebookId: profile.id })
    ));

    passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/login/google/callback"
    },
        (accessToken, refreshToken, profile, cb) => cb(null, { googleId: profile.id })
    ));

    passport.use(new TwitterStrategy({
        consumerKey: TWITTER_API_KEY,
        consumerSecret: TWITTER_API_SECRET,
        callbackURL: "http://localhost:8080/login/twitter/callback"
    },
        (accessToken, refreshToken, profile, cb) => cb(null, { twitterId: profile.id })
    ));
}