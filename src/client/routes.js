import React from 'react';
import { Route, IndexRoute, browserHistory } from 'react-router';
import { polyfill } from 'es6-promise'; polyfill();
import 'isomorphic-fetch';

import config from '../common/config/config';
import Layout from './ui/components/Layout';
import LoginForm from './ui/components/LoginForm';
import PageNotFound from './ui/components/PageNotFound';
import HelloWorld from './ui/components/HelloWorld';
import Home from './ui/components/Home';

import BlogList from './ui/containers/BlogList';
import BlogDetail from './ui/containers/BlogDetail';

const apiServer = config.apiServer.host + ':' + config.apiServer.port;

const routes = (
  <Route>
    <Route path="/user">
      <Route path="login" component={LoginForm} />
      <Route path="forgetPassword" component={HelloWorld} />
    </Route>
    <Route path="/" component={Layout} onChange={isAuth}>
      <IndexRoute component={Home} />
      <Route path="/blogs" component={BlogList}>
        <Route path="/blogs/test" component={HelloWorld} />
      </Route>
    </Route>
    <Route path="*" component={PageNotFound} />
  </Route>
);

function isAuth() {
  fetch('http://' + apiServer + '/api/v1/auth/isAuth', {
    credentials: 'include'
  }).then((response) => {
    response.json().then((json) => {
      const status = json.success;
      const message = json.message;
      if (!status) {
        alertify.warning(message);
        browserHistory.push('/user/login');
      }
    });
  });
}

export default routes;
