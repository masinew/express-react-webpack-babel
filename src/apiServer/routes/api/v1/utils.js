import jwt from 'jsonwebtoken';

import { key, expiration } from '../../../../common/config/server';

export const createToken = function (id, admin, cb) {
  const token = jwt.sign({
    id: id,
    admin: admin
  }, key.tokenKey, {
    expiresIn: expiration.tokenExpired
  });

  if (cb) {
    cb(token);
  }

  return token;
}
