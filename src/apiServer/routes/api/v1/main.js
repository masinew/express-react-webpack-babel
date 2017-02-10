import { Router } from 'express';
import jwt from 'jsonwebtoken';

import { key, expiration } from '../../../../common/config/server';
import userRoute from './user';
import blogRoute from './blog';
import authRoute from './auth';
import { createToken } from './utils';
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
  jwt.verify(req.token, key.tokenKey, function(tokenErr, decoded) {
    // token is in blacklist?
    BlacklistToken.findOne({
      token: req.token
    }, function(err, blacklistResult) {
      if (err || blacklistResult) {
        res.json(errMessage);
        return;
      }

      if (tokenErr) {
        if (tokenErr.name === 'TokenExpiredError') {
          const oldToken = jwt.verify(req.token, key.tokenKey, {ignoreExpiration: true});
          const now = Math.floor(new Date().getTime()/1000);
          // refreshing condition
          if ((oldToken.exp + expiration.acceptRefreshingToken) > now) {
            const token = createToken(oldToken.id, oldToken.admin);
            res.set('token', token);
            next();
            return;
          }
        }

        res.json(errMessage);
        return;
      }

      next();
    });
  });
});

routes.use('/auth', authRoute);
routes.use('/blog', blogRoute);

export default routes;
