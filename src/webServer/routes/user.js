import { Router } from 'express';
import request from 'request';
import { apiServer, apisPath, key } from '../../common/config/server';
import jwt from 'jsonwebtoken';

const router = new Router();
const success = {success: true};
const error = {success: false};
const port = apiServer.port;
const server = `${apiServer.protocal}://${apiServer.host}${ port ? `:${port}` : '' }`

router.post('/login', function(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  request.post({url: `${server}${apisPath.user}/login`,
    form: {username: username, password: password}}, function(err, httpResponse, body) {
      let json = JSON.parse(body);
      req.session.token = json.token
      removeSomeValues(json, (json) => {
        res.json(json);
      });
    }
  );
});

router.post('/loginWithFacebook', function(req, res) {
  const facebookUserId = req.body.facebookUserId;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const gender = req.body.gender;
  request.post({url: `${server}${apisPath.user}/loginWithFacebook`,
    form: {
      facebookUserId: facebookUserId,
      firstName: firstName,
      lastName: lastName,
      email: email,
      gender: gender
    }}, function(err, httpResponse, body) {
      let json = JSON.parse(body);
      req.session.token = json.token
      removeSomeValues(json, (json) => {
        res.json(json);
      });
    }
  );
});

router.post('/loginWithGoogle', function(req, res) {
  const googleUserId = req.body.googleUserId;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  request.post({url: `${server}${apisPath.user}/loginWithGoogle`,
    form: {
      googleUserId: googleUserId,
      firstName: firstName,
      lastName: lastName,
      email: email
    }}, function(err, httpResponse, body) {
      let json = JSON.parse(body);
      req.session.token = json.token
      removeSomeValues(json, (json) => {
        res.json(json);
      });
    }
  );
});

router.get('/logout', function(req, res) {
  const token = req.session.token;
  const successMessage = Object.assign(success, {message: 'Logout Successful'});
  const errorMessage = Object.assign(error, {message: 'Logout Unsuccessful'});
  request.post({url: `${server}${apisPath.auth}/logout`, headers: {'Authorization': token}}, function(err, httpResponse, body) {
    const json = JSON.parse(body);
    if (err || !json.success) {
      res.json(errorMessage);
      return;
    }

    req.session.destroy(function(err) {
      if (err) {
        res.json(errorMessage);
        return;
      }

      res.json(successMessage);
    });
  });
});

function removeSomeValues(json, cb) {
  jwt.verify(json.token, key.tokenKey, function(err, decoded) {
    if (!decoded.admin) {
      delete json.token
    }
    
    cb(json);
  });
}

export default router;
