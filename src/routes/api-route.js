import Express from 'express';
import User from '../app/models/user';
import jwt from 'jsonwebtoken';
import config from '../config';
import { LocalStorage } from 'node-localstorage';
const app = Express();
const apiRoute = Express.Router();
let localStorage = new LocalStorage('./scratch');

app.set('superSecret', config.secret);

app.get('/setup', function(req, res) {
  var champ = new User({
    name: 'champ',
    password: 'champpassword',
    admin: true
  });

  champ.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully.');
    res.json({success: true});
  });
});

apiRoute.post('/authenticate', function(req, res) {
  var body = req.body;
  User.findOne({
    name: body.name
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.json({ success: false, messeage: 'User not found'});
    }
    else if (user) {
      if (user.password != body.password) {
        res.json({ sucess: false, message: 'wrong password'})
      }
      else {
        var token = jwt.sign(user, app.get('superSecret'), {
          expiresIn: 600
        });

        res.json({
          success: true,
          message: "Welcome",
          token: token
        });
      }
    }
  });
});

apiRoute.use(function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      }
      else {
        req.decoded = decoded;
        localStorage.setItem('token', token);
        next();
      }
    })
  }
  else {
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });
  }
});

apiRoute.get('/', function(req, res) {
  res.json({message: 'Welcome to API route', token: localStorage.getItem('token')});
});

apiRoute.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});



module.exports = apiRoute;
