import React, { Component } from 'react'
import { polyfill } from 'es6-promise'; polyfill();
import 'isomorphic-fetch';
import { browserHistory } from 'react-router';
import 'bootstrap/dist/css/bootstrap.css';

import localStyle from '../style/utility.scss';
import HelloWorld from './HelloWorld';
import config from '../../../common/config/config';

const apiServer = config.apiServer.host + ":" + config.apiServer.port;

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        username: '',
        password: ''
    };

    this.handleUserName = this.handleUserName.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleOnClickBtForgetPassword = this.handleOnClickBtForgetPassword.bind(this);
  }

  handleUserName(event) {
    const value = event.target.value;
    this.setState({
      username: value
    });
  }

  handlePassword(event) {
    const value = event.target.value;
    this.setState({
      password: value
    });
  }

  handleOnSubmit(event) {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    let formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    const fetchOptions = {
      method: 'POST',
      body: formData,
      credentials: 'include'
    };

    fetch('http://' + apiServer + '/api/v1/auth/login', fetchOptions)
      .then((response) => {
        response.json().then((result) => {
          const status = result.success;
          const message = result.message;
          if (status) {
            alertify.success(message);
            browserHistory.push('/');
          }
          else {
            alertify.error(message);
          }
        });
      });
  }

  handleOnClickBtForgetPassword(event) {
    event.preventDefault();
    browserHistory.push('/user/forgetPassword');
  }

  render() {
    return (
      <div className={"container " + localStyle.middleOfScreen}>
        <div className="row">
          <div className="col-xs-12 col-sm-2 col-md-2"></div>
          <div className="col-xs-12 col-sm-8 col-md-8">
            <form onSubmit={this.handleOnSubmit} name="login-form">

              <div className="form-group row">
                <label className="col-xs-3 col-sm-2 col-md-2 col-form-label">Username</label>
                <div className="col-xs-9 col-sm-10 col-md-10">
                  <div className="col-xs-12 col-sm-12 col-md-12">
                    <input type="text" name="username" className="form-control" value={this.state.username} onChange={this.handleUserName} />
                  </div>
                </div>
              </div>

              <div className="form-group row">
                <label className="col-xs-3 col-sm-2 col-md-2 col-form-label">Password</label>
                <div className="col-xs-9 col-sm-10 col-md-10">
                  <div className="col-xs-12 col-sm-12 col-md-12">
                    <input type="password" name="password" className="form-control" value={this.state.password} onChange={this.handlePassword} />
                  </div>
                </div>
              </div>

              <div className="form-group row">
                <span className="col-xs-12 col-sm-2 col-md-2"></span>
                <div className="col-xs-12 col-sm-10 col-md-10">
                  <div className="col-xs-12 col-sm-6 col-md-6" style={{marginTop: 10}}>
                    <input type="submit" className="btn btn-primary form-control" value="Login" />
                  </div>
                  <div className="col-xs-12 col-sm-6 col-md-6" style={{marginTop: 10}}>
                    <input type="submit" className="btn btn-warning form-control " onClick={this.handleOnClickBtForgetPassword} value="Forget Password" />
                  </div>
                </div>
              </div>

            </form>
          </div>
          <div className="col-xs-12 col-sm-2 col-md-2"></div>
        </div>
      </div>
    );
  }
}
