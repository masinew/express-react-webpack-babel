import { Router } from 'express';
import jwt from 'jsonwebtoken';
import authRoute from './auth';
import blogRoute from './blog';
import tokenRoute from './token';
import config from '../../../../common/config/config';
import BlacklistToken from '../../../app/models/blacklistToken';

const routes = new Router();
routes.use('/auth', authRoute);

// below apis require auth
routes.use(function(req, res, next) {
  const errMessage = {success: false, message: "Require Authorization"};
  // have token?
  if (!req.get('Authorization')) {
    res.json(errMessage);
    return;
  }

  req.token = req.get('Authorization');
  // Is token verify?
  jwt.verify(req.token, config.sessionKey, function(err, decoded) {
    if (err) {
      res.json(errMessage);
      return;
    }

    // token is in blacklist?
    BlacklistToken.findOne({
      token: req.token
    }, function(err, result) {
      if (err || result) {
        console.log('asdqwe123');
        res.json(errMessage);
        return;
      }

      next();
    });
  });
});

routes.use('/token', tokenRoute);
routes.use('/blog', blogRoute);

export default routes;
