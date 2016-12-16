import Express, { Router } from 'express';
import User from '../app/models/user';
import jwt from 'jsonwebtoken';
import config from '../config';
import Session from 'express-session';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';

const SessionStore = new MongoStore(Session);
const app = new Express();
const apiRoute =  new Router();

apiRoute.get('/', function(req, res) {
  res.json({message: 'Welcome to API route'});
});

apiRoute.get('/setup', function(req, res) {
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

apiRoute.post('/authenticate', function(req, res, next) {
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
        var token = jwt.sign(user, app.get('secretKey'), {
          expiresIn: 60000
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

apiRoute.get('/test', function(req, res, next) {
  const token = jwt.sign({champ: 'champ'}, app.get('secretKey'), {
    expiresIn: 60000
  });

  next()
});

apiRoute.use(function(req, res, next) {
  req.session.champ = 1;
  // res.end('asd');
  next();
});

apiRoute.get('/token', function(req, res) {
  if (req.session.id) {
    res.end(req.session.id);
  }
  else {
    res.end('No Token Cookie!!');
  }
});

apiRoute.use(function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, app.get('secretKey'), function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      }
      else {
        req.decoded = decoded;
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

apiRoute.get('/welcome', function(req, res) {
  res.json({message: 'Welcome to API route'});
});

apiRoute.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});



module.exports = apiRoute;
