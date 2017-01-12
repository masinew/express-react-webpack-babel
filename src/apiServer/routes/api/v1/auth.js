import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { key } from '../../../../common/config/server';

import BlacklistToken from '../../../app/models/blacklistToken';

const router = new Router();
const success = {success: true};
const error = {success: false};

router.get('/isActive', function(req, res) {
  res.json(success);
});

// destroy token by add it to blacklistToken, so I have to use POST method for saving info on the database
router.post('/logout', function(req, res) {
  const token = req.token;
  jwt.verify(token, key.tokenKey, function(err, decoded) {
    if (err) {
      res.json(error);
      return;
    }

    const expireAt = decoded.exp*1000;
    const blacklistToken = new BlacklistToken({
      token: token,
      expireAt: expireAt
    });

    blacklistToken.save(function(err) {
      if (err) {
        res.json(error) ;
        return;
      }

      console.log('User saved successfully.');
      res.json(success);
    });
  });
});

export default router;
