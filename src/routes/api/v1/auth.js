import { Router } from 'express';
import jwt from 'jsonwebtoken';
import User from '../../../app/models/user';


const router = new Router();

router.post('/', function(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const errMessage = {success: false, message: 'username or password incorrect'};
  User.findOne({
    username: username
  }, function(err, result) {
    if (err) {
      res.json(errMessage);
    }

    if (password != result.password) {
      res.json(errMessage);
    }

    const token = req.session.token = jwt.sign({id: result._id}, 'asd',{
      expiresIn: 6000
    });

    res.end(token);
  });
});

router.get('/d', function(req, res) {
  req.session.destroy(function(err) {
    res.end('bye session');
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
