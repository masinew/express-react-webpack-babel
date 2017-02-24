import { Router } from 'express';
import request from 'request';
import jwt from 'jsonwebtoken';

import { key, apiServer, apisPath } from '../../common/config/server';
import { socketInstance } from '../server'

const router = new Router();
const port = apiServer.port;
const server = `${apiServer.protocal}://${apiServer.host}${ port ? `:${port}` : '' }`

router.post('/login', function(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  request.post({url: `${server}/${apisPath.user}/login`,
    form: {username: username, password: password}}, function(err, httpResponse, body) {
      let json = JSON.parse(body);
      req.session.token = json.token;
      isAdmin(json, (isAdmin) => {
        if (isAdmin) {
          res.json(json);
        }
        else {
          res.json({success: false, message: 'Required Admin!!'});
        }
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
  request.post({url: `${server}/${apisPath.user}/loginWithFacebook`,
    form: {
      facebookUserId: facebookUserId,
      firstName: firstName,
      lastName: lastName,
      email: email,
      gender: gender
    }}, function(err, httpResponse, body) {
      let json = JSON.parse(body);
      req.session.token = json.token
      isAdmin(json, (isAdmin) => {
        if (isAdmin) {
          res.json(json);
        }
        else {
          res.json({success: false, message: 'Required Admin!!'});
        }
      });
    }
  );
});

router.post('/loginWithGoogle', function(req, res) {
  const googleUserId = req.body.googleUserId;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  request.post({url: `${server}/${apisPath.user}/loginWithGoogle`,
    form: {
      googleUserId: googleUserId,
      firstName: firstName,
      lastName: lastName,
      email: email
    }}, function(err, httpResponse, body) {
      let json = JSON.parse(body);
      req.session.token = json.token
      isAdmin(json, (isAdmin) => {
        if (isAdmin) {
          res.json(json);
        }
        else {
          res.json({success: false, message: 'Required Admin!!'});
        }
      });
    }
  );
});

function isAdmin(json, cb) {
  request.get({url: `${server}/${apisPath.auth}/isAdmin`, headers: {'Authorization': json.token}}, function(err, httpResponse, body) {
    const jsonBody = JSON.parse(body);
    cb(jsonBody.admin);
  });
}

export default router;
