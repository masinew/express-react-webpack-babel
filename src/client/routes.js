import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { polyfill } from 'es6-promise'; polyfill();
import 'isomorphic-fetch';

import config from '../common/config/client';
import Layout from './ui/components/Layout';
import GlobalLayout from './ui/components/GlobalLayout';
import LoginForm from './ui/components/LoginForm';
import PageNotFound from './ui/components/PageNotFound';
import HelloWorld from './ui/components/HelloWorld';
import Home from './ui/components/Home';
import UserProfile from './ui/components/UserProfile';
import Chart from './ui/components/Chart';

import BlogList from './ui/containers/BlogList';
import BlogDetail from './ui/containers/BlogDetail';
import Login from './ui/containers/Login';

const port = config.server.port;
const server = `${config.server.protocal}://${config.server.host}${ port ? `:${port}` : ''}`;

const routes = (
  <Route component={GlobalLayout}>
    <Route path="/user">
      <Route path="login" component={Login} />
      <Route path="forgetPassword" component={HelloWorld} />
    </Route>
    <Route path="/" component={Layout} onChange={requireCredentials}>
      <IndexRoute component={Home} />
      <Route path="blogs">
        <IndexRoute component={BlogList} />
        <Route path=":id" component={BlogDetail} />
      </Route>
      <Route path="profile" component={UserProfile} />
      <Route path="chart" component={Chart} />
    </Route>
    <Route path="*" component={PageNotFound} />
  </Route>
);

function requireCredentials(prevState, nextState, replace, next) {
  fetch(`${server}/${config.apis.auth}/isActive`, {
    credentials: 'include'
  }).then((response) => {
    response.json().then((json) => {
      const status = json.success;
      const message = json.message;
      if (!status) {
        alertify.warning(message);
        localStorage.clear();
        replace({
          pathname: '/user/login',
          state: {lastPathname: prevState.location.pathname}
        })
        next();
      }

      next()
    });
  });
}

export default routes;
