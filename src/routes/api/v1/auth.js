import Express, { Router } from 'express';

const app = new Express();
const router = new Router();

router.get('/', function(req, res, next) {
  res.end('1');
});

export default router;
