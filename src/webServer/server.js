import path from 'path';
import Express from 'express';
import { Server } from 'http';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import Multer from 'multer';
import minifyHTML from 'express-minify-html';
import proxy from 'express-http-proxy';

// System configuration
import config from '../common/config/config';

// Mongoose models
import User from './app/models/user';

// Express routes
import apiV1 from './routes/api/v1/main';
import userRoute from './routes/user';

// React for handling routes
import React from 'react';
import { match, RouterContext } from 'react-router';
import { renderToString } from 'react-dom/server';
import routes from '../client/routes'
import PageNotFound from '../client/ui/components/PageNotFound';

// Express Session
import Session from 'express-session';
import MongoStore from 'connect-mongo';

// Express Setting
const app = new Express();
app.set('views', path.join(__dirname, 'template'));
app.set('view engine', 'ejs');
app.set('sessionKey', config.sessionKey);

const server = new Server(app);
const multer = new Multer();
const SessionStore = new MongoStore(Session);
const sessionOptions = {
  cookie: {
    maxAge: config.authExpire
  },
  store: new SessionStore({mongooseConnection: mongoose.connection}),
  secret: app.get('sessionKey'),
  resave: false, // resave infomation in the db not in the express session
  saveUninitialized: false // initial information when users call the website
};

mongoose.connect(config.database, function(err) {
  if (err) throw err;

  const port = process.env.PORT || 3000;
  const env = process.env.NODE_ENV || 'production';
  server.listen(port, (err) => {
    if (err) {
      console.error(err);
      return;
    }

    console.info(`Server running on http://localhost:${port} [${env}]`);
  });
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(multer.array());
app.use(morgan('dev'));
app.use(Session(sessionOptions));
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  // res.header('Access-Control-Allow-Method', 'GET,POST');
  // res.header('Access-Control-Allow-Header', 'Content-Type');
  next();
});
app.use(minifyHTML(config.minifyHTMLOptions));

app.use(Express.static(path.join(__dirname, 'public')));
app.use('/api', proxy('localhost:5000', {
  decorateRequest: function(proxyReq, originalReq) {
    if (originalReq.session.token) {
      proxyReq.headers['Authorization'] = originalReq.session.token
    }
  }
}));
// app.use('/api/v1', apiV1);
app.use('/user', userRoute);

app.get('/checktoken', function(req, res) {
  console.log(req.session.token);
  if (req.session.token)
    res.end(req.session.token);

  res.end('1');
});

app.post('/checktoken', function(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username);
  console.log(password);
  console.log(req.body);
  res.end(username + "=" + password);
});

app.get('/user/login', function(req, res) {
  if (req.session.token) {
    res.redirect('/');
    return;
  }

  getClientUIPath(req, res);
});

app.get('*', (req, res) => {
  if (!req.session.token) {
    res.redirect('/user/login');
    return;
  }

  getClientUIPath(req, res);
});

function getClientUIPath(req, res) {
  match(
    {routes, location: req.url},
    (err, redirectLocation, renderProps) => {
      if (err) {
        return res.status(500).send(err.message);
      }

      if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }

      let markup;
      if (renderProps) {
        markup = renderToString(<RouterContext {...renderProps}/>);
      } else {
        markup = renderToString(<PageNotFound/>);
        res.status(404);
      }

      return res.render('index', { markup });
    }
  );
}
