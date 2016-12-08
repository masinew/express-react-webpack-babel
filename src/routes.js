import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from './components/Layout';
import LoginForm from './components/LoginForm';
import PageNotFound from './components/PageNotFound';
import HelloWorld from './components/HelloWorld';

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={LoginForm} />
    <Route path="blog" component={HelloWorld} />
    <Route path="member" component={LoginForm}>
      <Route path="/login" component={LoginForm} />
    </Route>
    <Route path="*" component={PageNotFound} />
  </Route>
);

export default routes;
