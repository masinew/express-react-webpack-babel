import { Router } from 'express';
import authRoute from './auth';
import blogRoute from './blog';

const routes = new Router();
routes.use('/auth', authRoute);
routes.use(function(req, res, next) {
  if (!req.get('Authorization')) {
    res.json({success: false, message: "Require Authorization"});
    return;
  }

  req.token = req.get('Authorization');
  next();
});
routes.use('/blog', blogRoute);

export default routes;
