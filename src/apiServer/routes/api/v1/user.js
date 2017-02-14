import { Router } from 'express';

import User from '../../../app/models/user';
import { createToken } from '../utils';

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

    const token = createToken(result._id, result.admin);
    const userInfo = createUserInfo(result);
    res.json(Object.assign(successMessage, {userInfo: userInfo, token: token}));
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
  const { facebookUserId, firstName, lastName, email, gender } = req.body;
  if (facebookUserId === 'undefined' || typeof facebookUserId === 'undefined') {
    res.json(errorMessage)
    return;
  }

  User.findOne({"userInfo.facebookUserId": facebookUserId}, function(err, result) {
    if (err) {
      res.json(errorMessage);
      return;
    }

    if (result) {
      const token = createToken(result._id, result.admin);
      const userInfo = createUserInfo(result);
      res.json(Object.assign(successMessage, {userInfo: userInfo, token: token}));
      return;
    }

    const userInfo = {
      facebookUserId: facebookUserId,
      firstName: firstName,
      lastName: lastName,
      email: email,
      gender: gender
    };

    saveUser(userInfo, successMessage, errorMessage, function(userInfo, token) {
      res.json(Object.assign(successMessage, {userInfo: userInfo, token: token}));
    });
  });
});

router.post('/loginWithGoogle', function(req, res) {
  const successMessage = Object.assign(success, {message: 'Success'});
  const errorMessage = Object.assign(error, {message: "Login with Google unsuccessful"});
  const { googleUserId, firstName, lastName, email } = req.body;
  if (googleUserId === 'undefined' || typeof googleUserId === 'undefined') {
    res.json(errorMessage)
    return;
  }

  User.findOne({"userInfo.googleUserId": googleUserId}, function(err, result) {
    if (err) {
      res.json(errorMessage);
      return;
    }

    if (result) {
      const token = createToken(result._id, result.admin);
      const userInfo = createUserInfo(result);
      res.json(Object.assign(successMessage, {userInfo: userInfo, token: token}));
      return;
    }

    const userInfo = {
      googleUserId: googleUserId,
      firstName: firstName,
      lastName: lastName,
      email: email
    };

    saveUser(userInfo, successMessage, errorMessage, function(userInfo, token) {
      res.json(Object.assign(successMessage, {userInfo: userInfo, token: token}));
    });
  });
});

function saveUser(userInfo, successMessage, errorMessage, cb) {
  const newUser = new User({
    admin: false,
    userInfo: userInfo
  });

  newUser.save(function(err, result) {
    if (err) {
      res.json(errorMessage);
      return;
    }

    const token = createToken(result._id, result.admin);
    const userInfo = createUserInfo(result);
    cb(userInfo, token);
  });
}

function createUserInfo(result, cb) {
  const userInfo = {
    firstName: result.userInfo.firstName,
    lastName: result.userInfo.lastName,
    email: result.userInfo.email,
    gender: result.userInfo.gender
  }

  if (cb) {
    cb(userInfo);
  }

  return userInfo;
}

router.get('/setup', function(req, res) {
  const newUser = new User({
    username: 'champ',
    password: 'password',
    admin: true,
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
