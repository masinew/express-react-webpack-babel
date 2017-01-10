import { Router } from 'express';
import jwt from 'jsonwebtoken';
import User from '../../../app/models/user';
import config from '../../../../common/config/config';

const router = new Router();
const success = {success: true};
const error = {success: false};

router.get('/isAuth', function(req, res) {
  if (!req.get('Authorization')) {
    res.json(Object.assign(error, {message: 'Your session is expired.'}));
    return;
  }

  const token = req.get('Authorization');
  jwt.verify(token, config.sessionKey, function(err, decoded) {
    console.log(decoded.exp);
  });
  res.json(Object.assign(success, {message: ''}));
});

router.post('/generateAuth', function(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username);
  const successMessage = Object.assign(success, {message: 'Success'});
  const errMessage = Object.assign(error, {message: 'Username or Password incorrect'});
  User.findOne({
    username: username
  }, function(err, result) {
    if (err || !result || password != result.password) {
      res.json(errMessage);
      return;
    }

    const token = jwt.sign({id: result._id}, config.sessionKey,{
      expiresIn: config.authExpire
    });

    res.json(Object.assign(successMessage, {userInfo: result.userInfo, token: token}));
  });
});

router.get('/logout', function(req, res) {
  // req.session.destroy(function(err) {
  //   res.json(Object.assign(success, {
  //     message: 'Logout Successful'
  //   }));
  // });
});

router.get('/setup', function(req, res) {
  const newUser = new User({
    username: 'champ',
    password: 'password',
    admin: false,
    userInfo: {
      firstName: "Nattajak",
      lastName: "Grisiam"
    }
  });

  newUser.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully.');
    res.json({success: true});
  });
});

export default router;
