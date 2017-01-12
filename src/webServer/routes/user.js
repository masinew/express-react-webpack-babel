import { Router } from 'express';
import request from 'request';

const router = new Router();
const success = {success: true};

router.post('/login', function(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  request.post({url: 'http://localhost:3000/api/v1/user/login',
    form: {username: username, password: password}}, function(err, httpResponse, body) {
      let json = JSON.parse(body);
      console.log(json.token);
      req.session.token = json.token
      delete json.token;
      res.json(json);
    }
  );
});

router.get('/logout', function(req, res) {
  const token = req.session.token;
  req.session.destroy(function(err) {
    if (err) console.log('destroy session error');

    request.post({url: 'http://localhost:3000/api/v1/auth/logout', headers: {'Authorization': token}}, function(err, httpResponse, body) {
      // TODO: if err what is next to do
      res.json(Object.assign(success, {
        message: 'Logout Successful'
      }));
    });
  });
});

export default router;
