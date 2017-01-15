import React, { Component } from 'react';
import { polyfill } from 'es6-promise'; polyfill();
import 'isomorphic-fetch';
import { browserHistory } from 'react-router';

import LoginForm from '../components/LoginForm';
import config from '../../../common/config/client';
import login from '../utils/login';

const port = config.server.port;
const server = `${config.server.protocal}://${config.server.host}${ port ? `:${port}` : '' }`;

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.onSubmitListener = this.onSubmitListener.bind(this);
    this.onLoggedIn = this.onLoggedIn.bind(this);
  }

  onLoggedIn(result) {
    const status = result.success;
    const message = result.message;
    if (status) {
      const firstName = result.userInfo.firstName;
      const lastName = result.userInfo.lastName;
      localStorage.setItem("userFullName", firstName + " " + lastName);
      alertify.success(message);
      const { location } = this.props;
      if (location.state && location.state.lastPathname) {
        browserHistory.push(location.state.lastPathname);
      } else {
        browserHistory.push('/');
      }
    }
    else {
      alertify.error(message);
    }
  }

  onSubmitListener(username, password) {
    login(username, password, this.onLoggedIn);
  }

  render() {
    return (
      <LoginForm onSubmitListener={this.onSubmitListener} />
    );
  }
}
