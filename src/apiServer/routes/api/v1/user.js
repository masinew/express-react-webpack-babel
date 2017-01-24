import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { key, expiration } from '../../../../common/config/server';

import User from '../../../app/models/user';

const router = new Router();
const success = {success: true};
const error = {success: false};

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

    const token = jwt.sign({id: result._id}, key.tokenKey, {
      expiresIn: expiration.tokenExpired
    });

    res.json(Object.assign(successMessage, {userInfo: result.userInfo, token: token}));
  });
});

router.post('/register', function(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  // const newUser = new User({
  //   username:
  // });
});

router.post('/loginWithFacebook', function(req, res) {
  const successMessage = Object.assign(success, {message: 'Success'});
  const errorMessage = Object.assign(error, {message: "Login with Facebook unsuccessful"});
  const facebookUserId = req.body.facebookUserId;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const gender = req.body.gender;
  if (facebookUserId === 'undefined') {
    res.json(errorMessage)
    return;
  }

  User.findOne({"userInfo.facebookUserId": facebookUserId}, function(err, result) {
    if (err) {
      res.json(errorMessage);
      return;
    }

    if (result) {
      const token = jwt.sign({id: result._id}, key.tokenKey, {
        expiresIn: expiration.tokenExpired
      });

      res.json(Object.assign(successMessage, {userInfo: result.userInfo, token: token}));
      return;
    }

    const newUser = new User({
      admin: false,
      userInfo: {
        facebookUserId: facebookUserId,
        firstName: firstName,
        lastName: lastName,
        email: email,
        gender: gender
      }
    });

    newUser.save(function(err, result) {
      if (err) {
        res.json(errorMessage);
        return;
      }

      const token = jwt.sign({id: result._id}, key.tokenKey, {
        expiresIn: expiration.tokenExpired
      });

      res.json(Object.assign(successMessage, {userInfo: result.userInfo, token: token}));
    });
  });
});

router.get('/setup', function(req, res) {
  const newUser = new User({
    username: 'champ',
    password: 'password',
    admin: false,
    userInfo: {
      firstName: "Nattajak",
      lastName: "Grisiam",
      email: "champ@champ.com",
      gender: "male"
    }
  });

  newUser.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully.asdasd');
    res.json({success: true});
  });
});

export default router;
