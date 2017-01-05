import { Router } from 'express';
import jwt from 'jsonwebtoken';
import User from '../../../app/models/user';
import config from '../../../../common/config/config';

const router = new Router();
const success = {success: true};
const error = {success: false};

router.get('/isAuth', function(req, res) {
  if (!req.session.token) {
    res.json(Object.assign(error, {message: 'Your session is expired.'}));
    return;
  }

  res.json(Object.assign(success, {message: ''}));
});

router.post('/login', function(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const successMessage = Object.assign(success, {message: 'Success'});
  const errMessage = Object.assign(error, {message: 'Username or Password incorrect'});
  User.findOne({
    username: username
  }, function(err, result) {
    if (err || !result || password != result.password) {
      res.json(errMessage);
      return;
    }

    const token = req.session.token = jwt.sign({id: result._id}, config.sessionKey,{
      expiresIn: config.authExpire
    });

    res.json(Object.assign(successMessage, {userInfo: result.userInfo}));
  });
});

router.get('/logout', function(req, res) {
  req.session.destroy(function(err) {
    res.json(Object.assign(success, {
      message: 'Logout Successful'
    }));
  });
});

router.get('/setup', function(req, res) {
  const newUser = new User({
    username: 'champ1',
    password: 'password',
    admin: false,
    userInfo: {
      firstName: "CHAMP",
      lastName: "555"
    }
  });

  newUser.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully.');
    res.json({success: true});
  });
});

export default router;
