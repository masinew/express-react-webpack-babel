import path from 'path';
import Express from 'express';
import { Server } from 'http';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

// System configuration
import config from './config';

// Mongoose models
import User from './app/models/user';

// Express routes
import apiRoute from './routes/api-route';
import authRoute from './routes/auth-route';
import apiv1 from './routes/api/v1/auth';

// React for handling routes
import React from 'react';
import { match, RouterContext } from 'react-router';
import { renderToString } from 'react-dom/server';
import routes from './routes'
import PageNotFound from './components/PageNotFound';

// Express Session
import Session from 'express-session';
import MongoStore from 'connect-mongo';

// Express Setting
const app = new Express();
app.set('views', path.join(__dirname, 'static'));
app.set('view engine', 'ejs');
app.set('secretKey', config.secret);

const server = new Server(app);
const SessionStore = new MongoStore(Session);
const sessionOptions = {
  cookie: {
    maxAge: 10000
  },
  secret: app.get('secretKey'),
  resave: false,
  saveUninitialized: true,
  store: new SessionStore({ mongooseConnection: mongoose.connection })
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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
// app.use(Session(sessionOptions));

app.use(Express.static(path.join(__dirname, 'public')));
app.use('/apis', apiRoute);
app.use('/api/v1', apiv1);
app.use('/auth', authRoute);

// app.get('/', function(req, res) {
//   if (req.session.view) {
//     req.session.view++;
//   }
//   else {
//     req.session.view = 1;
//   }
//
//   res.end(req.session.view.toString());
// });

app.get('*', (req, res) => {
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
        markup = renderToString(<NotFoundPage/>);
        res.status(404);
      }

      return res.render('index', { markup });
    }
  );
});



// const port = process.env.PORT || 3000;
// const env = process.env.NODE_ENV || 'production';
// server.listen(port, (err) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//
//   console.info(`Server running on http://localhost:${port} [${env}]`);
// });
