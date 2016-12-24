import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from './ui/components/Layout';
import LoginForm from './ui/components/LoginForm';
import PageNotFound from './ui/components/PageNotFound';
import HelloWorld from './ui/components/HelloWorld';
import Member from './ui/components/Member';

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={LoginForm} />
    <Route path="/blog" component={HelloWorld} />
    <Route path="/member" component={Member}>
      <IndexRoute component={LoginForm} />
      <Route path="/member/login" component={LoginForm} />
    </Route>
    <Route path="*" component={PageNotFound} />
  </Route>
);

export default routes;
