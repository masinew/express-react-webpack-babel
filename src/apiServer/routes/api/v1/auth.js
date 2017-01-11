import { Router } from 'express';
import jwt from 'jsonwebtoken';
import config from '../../../../common/config/config';

import User from '../../../app/models/user';

const router = new Router();
const success = {success: true};
const error = {success: false};

router.post('/generateAuth', function(req, res) {
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

    const token = jwt.sign({id: result._id}, config.sessionKey,{
      expiresIn: config.authExpire/1000
    });

    res.json(Object.assign(successMessage, {userInfo: result.userInfo, token: token}));
  });
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