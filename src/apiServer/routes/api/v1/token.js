import { Router } from 'express';
import jwt from 'jsonwebtoken';
import config from '../../../../common/config/config';

import BlacklistToken from '../../../app/models/blacklistToken';

const router = new Router();
const success = {success: true};
const error = {success: false};

router.get('/isActive', function(req, res) {
  res.json(Object.assign(success, {message: ''}));
});

// destroy token by add it to blacklistToken, so I have to use POST method for saving info on the database
router.post('/destroy', function(req, res) {
  if (!req.get('Authorization')) {
    res.json(Object.assign(error, {message: 'Your session is expired.'}));
    return;
  }

  const token = req.get('Authorization');
  jwt.verify(token, config.sessionKey, function(err, decoded) {
    const blacklistToken = new BlacklistToken({
      token: token,
      expireAt: decoded.exp
    });
    
    blacklistToken.save(function(err) {
      if (err) throw err;

      console.log('User saved successfully.');
      res.json({success: true});
    });
  });
});

export default router;