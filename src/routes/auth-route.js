import Express, { Router } from 'express';

const app = new Express();
const route = new Router();

route.use(function(req, res, next) {
  
});

route.get('/', function(req, res) {
  res.end('123');
});

export default route;
