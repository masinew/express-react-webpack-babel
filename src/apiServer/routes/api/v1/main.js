import { Router } from 'express';
import jwt from 'jsonwebtoken';
import userRoute from './user';
import blogRoute from './blog';
import authRoute from './auth';
import { key } from '../../../../common/config/server';
import BlacklistToken from '../../../app/models/blacklistToken';
import User from '../../../app/models/user';

const routes = new Router();
routes.use('/user', userRoute);

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
  jwt.verify(req.token, key.tokenKey, function(err, decoded) {
    if (err) {
      res.json(errMessage);
      return;
    }

    // token is in blacklist?
    BlacklistToken.findOne({
      token: req.token
    }, function(err, blacklistResult) {
      if (err || blacklistResult) {
        res.json(errMessage);
        return;
      }

      // Is a our user?
      User.findOne({_id: decoded.id}, function(err, userResult) {
        if (err || !userResult) {
          res.json(errMessage);
          return;
        }

        next();
      })
    });
  });
});

routes.use('/auth', authRoute);
routes.use('/blog', blogRoute);

export default routes;
