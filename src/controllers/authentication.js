import jwt from 'jsonwebtoken';
import credentails from '../data/credentials';

function authentication(privateKey) {
  return (req, res) => {
    const userInfo = req.body;
    if (credentails[userInfo.name].password === userInfo.password) {
      const token = jwt.sign({ password: userInfo.password }, privateKey);
      const message = {
        code: 200,
        message: 'ok',
        data: {
          user: {
            email: userInfo.email,
            username: userInfo.name,
          },
        },
        token,
      };
      res.json(message);
    } else {
      res.status(404).json({ message: 'Not authorized' });
    }
  };
}

function loginController(req, res) {
  res.status(200).end('Login Success!!');
}

function facebookLogin(req, res) {
  res.status(200).end('Facebook Login Success!!');
}

function googleLogin(req, res) {
  res.status(200).end('Google Login Success!!');
}

function twitterLogin(req, res) {
  res.status(200).end('Twitter Login Success!!');
}

export default { authentication, loginController, facebookLogin, googleLogin, twitterLogin };
