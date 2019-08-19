import * as express from 'express';
import passport from 'passport';
import {
  authenticate, login,
  facebookLogin, facebookRedirect,
  googleLogin, googleRedirect,
  twitterLogin, twitterRedirect,
} from '.';
import controllers from '../controllers';

export default function registerAuthRoutes(secretCode) {
  const authRouter = express.Router();
  authRouter.post(authenticate, controllers.authenticate.authentication(secretCode));
  authRouter.post(login, passport.authenticate('local'), controllers.authenticate.loginController);
  authRouter.get(facebookLogin, passport.authenticate('facebook'));
  authRouter.get(facebookRedirect, passport.authenticate('facebook'), controllers.authenticate.facebookLogin);
  authRouter.get(googleLogin, passport.authenticate('google', { scope: ['profile'] }));
  authRouter.get(googleRedirect, passport.authenticate('google', { failureRedirect: '/login' }), controllers.authenticate.googleLogin);
  authRouter.get(twitterLogin, passport.authenticate('twitter'));
  authRouter.get(twitterRedirect, passport.authenticate('twitter', { failureRedirect: '/login' }), controllers.authenticate.twitterLogin);

  return authRouter;
}
