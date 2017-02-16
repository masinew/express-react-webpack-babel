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
import request from 'request';

// System configuration
import * as serverConfig from '../common/config/server';

// Socket
import Socket from './socket';

// Express routes
import userRoute from './routes/user';
import adminRoute from './routes/admin';

// React for handling routes
import React from 'react';
import { match, RouterContext } from 'react-router';
import { renderToString } from 'react-dom/server';
import fClientRoute from '../client/routes'
import fAdminRoute from '../admin/routes'
import PageNotFound from '../client/ui/components/PageNotFound';

// Express Session
import Session from 'express-session';
import MongoStore from 'connect-mongo';

// Express Setting
const app = new Express();
app.set('views', path.join(__dirname, 'template'));
app.set('view engine', 'ejs');

const server = new Server(app);
export const socketInstance = new Socket(server);
const multer = new Multer();
const SessionStore = new MongoStore(Session);
const sessionOptions = {
  name: serverConfig.cookie.name,
  cookie: {
    maxAge: serverConfig.expiration.sessionExpired,
    httpOnly: true
  },
  store: new SessionStore({mongooseConnection: mongoose.connection}),
  secret: serverConfig.key.sessionKey,
  resave: true, // resave only in the store
  saveUninitialized: false,
  rolling: true // resave session's cookie only on client
};

mongoose.Promise = global.Promise;
mongoose.connect(serverConfig.mongodb.urlConnection, function(err) {
  if (err) throw err;

  const port = serverConfig.webServer.port;
  const env = process.env.NODE_ENV || 'production';
  server.listen(port, (err) => {
    if (err) {
      console.error(err);
      return;
    }

    const serverUrl = `${serverConfig.webServer.protocal}://${serverConfig.webServer.host}:${port}`;
    console.info(`Server running on ${serverUrl} [${env}]`);
  });
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(multer.array());
app.use(morgan('dev'));
app.use(Session(sessionOptions));
app.use(minifyHTML(serverConfig.optimization.minifyHTMLOptions));
app.use(function(req, res, next) {
  // res.header('Access-Control-Allow-Origin', 'http://192.168.105.25:3000');
  // res.header('Access-Control-Allow-Credentials', 'true');
  // res.header('Access-Control-Allow-Method', 'GET,POST');
  // res.header('Access-Control-Allow-Header', 'Content-Type');
  next();
});
app.use(function(req, res, next) {
  if (req.session.token) {
    request.get({url: `http://localhost:5000/api/v1/auth/isAdmin`, headers: {'Authorization': req.session.token}}, function(err, httpResponse, body) {
      const json = JSON.parse(body);
      req.admin = json.admin;
      next();
    });
  }
  else {
    next();
  }
});
app.use(Express.static(path.join(__dirname, 'public')));
app.use('/api', proxy('localhost:5000', {
  decorateRequest: function(proxyReq, originalReq) {
    proxyReq.headers['Content-Type'] = 'application/json';
    if (originalReq.session.token) {
      proxyReq.headers['Authorization'] = originalReq.session.token
    }

    return proxyReq;
  },
  intercept: function(rsp, data, req, res, callback) {
    if (typeof res.get('token') !== 'undefined') {
      req.session.token = res.get('token');
      res.removeHeader('token');
    }

    callback(null, data);
  }
}));
app.use('/user', userRoute);
app.use('/admin', adminRoute);

app.get('/testChart', function(req, res) {
  let max = 100;
  const a1 = Math.random() * max;
  const a2 = Math.random() * max;
  const a3 = Math.random() * max;
  res.json({
    a1: a1,
    a2: a2,
    a3: a3
  });
})

app.get('/facebook_test', function(req, res) {
  res.sendFile(__dirname + '/template/facebook_test.html');
});


const clientIndex = 'index';
const adminIndex = 'admin-index';
app.get('/admin/login', function(req, res) {
  if (req.admin) {
    res.redirect('/admin');
    return;
  }

  getClientUIPath(req, res, adminIndex);
});

app.get('/admin*', (req, res) => {
  if (!req.admin) {
    res.redirect('/admin/login');
    return;
  }

  getClientUIPath(req, res, adminIndex);
});

app.get('/user/login', function(req, res) {
  if (req.session.token) {
    res.redirect('/');
    return;
  }

  getClientUIPath(req, res, clientIndex);
});

app.get('*', (req, res) => {
  if (!req.session.token) {
    res.redirect('/user/login');
    return;
  }

  getClientUIPath(req, res, clientIndex);
});



function getClientUIPath(req, res, pageName) {
  let routes;
  if (pageName === clientIndex) {
    routes = fClientRoute;
  }
  else {
    routes = fAdminRoute;
  }

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

      return res.render(pageName, { markup });
    }
  );
}
