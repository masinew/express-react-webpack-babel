import { Router } from 'express';
import jwt from 'jsonwebtoken';
import User from '../../../app/models/user';
import config from '../../../config';

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

    const token = req.session.token = jwt.sign({id: result._id}, 'asd',{
      expiresIn: config.authExpire
    });

    res.json(success);
  });
});

router.get('/logout', function(req, res) {
  req.session.destroy(function(err) {
    res.json();
  });
});

router.get('/setup', function(req, res) {
  const newUser = new User({
    username: 'champ',
    password: 'password',
    admin: false
  });

  newUser.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully.');
    res.json({success: true});
  });
});

export default router;
