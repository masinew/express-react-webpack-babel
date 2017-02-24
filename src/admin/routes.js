import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { polyfill } from 'es6-promise'; polyfill();
import 'isomorphic-fetch';

import config from '../common/config/client';

// Admin components
import GlobalLayout from './ui/components/GlobalLayout';
import Dashboard from './ui/components/Dashboard';
import Layout from './ui/components/Layout';

import Login from './ui/containers/Login';

// Client components
import PageNotFound from '../client/ui/components/PageNotFound';
import Home from '../client/ui/components/Home';

import BlogList from '../client/ui/containers/BlogList';
import BlogDetail from '../client/ui/containers/BlogDetail';

const port = config.server.port;
const server = `${config.server.protocal}://${config.server.host}${ port ? `:${port}` : ''}`;

const routes = (
  <Route component={GlobalLayout}>
    <Route path="/">
      <Route path="admin/login" component={Login} />
      <Route path="admin" component={Layout}>
        <IndexRoute component={Home} />
        <Route path="blogs">
          <IndexRoute component={BlogList} />
          <Route path=":id" component={BlogDetail} />
        </Route>
        <Route path="dashboard">
          <IndexRoute component={Dashboard} />
        </Route>
      </Route>
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
