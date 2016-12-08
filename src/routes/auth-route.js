import Express, { Router } from 'express';
import Session from 'express-session';
import config from '../config';

const app = new Express();
const route = new Router();

app.set('secretKey', config.secret);

const sessionOptions = {
  secret: app.get('secretKey'),
  resave: false,
  saveUninitialized: true
}

route.use(Session(sessionOptions));

route.post('/login', function(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username);
  console.log(password);
  res.redirect('/');
});

route.use(function(req, res, next) {
  next();
});

route.get('/', function(req, res) {
  res.end('123');
});

export default route;
