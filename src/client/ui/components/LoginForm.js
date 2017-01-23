import React, { Component } from 'react'
import { polyfill } from 'es6-promise'; polyfill();
import 'isomorphic-fetch';
import { browserHistory } from 'react-router';

import localStyle from '../style/LoginForm.scss';
import config from '../../../common/config/client';

const port = config.server.port;
const server = `${config.server.protocal}://${config.server.host}${ port ? `:${port}` : '' }`;

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleOnClickBtForgetPassword = this.handleOnClickBtForgetPassword.bind(this);
    this.handleOnFacebookSubmit = this.handleOnFacebookSubmit.bind(this);
    this.loginWithFacebook = this.loginWithFacebook.bind(this);
  }

  loginWithFacebook() {
    FB.api('/me?fields=email,first_name,last_name,gender', function(response) {
      const formData = new FormData();
      formData.append("facebookUserId", response.id);
      formData.append("firstName", response.first_name);
      formData.append("lastName", response.last_name);
      formData.append("email", response.email);
      formData.append("gender", response.gender);
      console.log(`${server}${config.apis.user}/facebookLogin`);
      fetch(`${server}/user/loginWithFacebook`, {
        credentials: 'include',
        method: 'POST',
        body: formData
      }).then((response) => {
        response.json().then((result) => {
          const status = result.success;
          const message = result.message;
          if (status) {
            const firstName = result.userInfo.firstName;
            const lastName = result.userInfo.lastName;
            localStorage.setItem("userFullName", firstName + " " + lastName);
            alertify.success(message);
            const { location } = this.props;
            if (location.state && location.state.lastPathname) {
              browserHistory.push('/');
            } else {
              browserHistory.push('/');
            }
          }
          else {
            alertify.error(message);
          }
        });
      })
    })
  }

  handleOnFacebookSubmit(event) {
    event.preventDefault();
    this.props.onFacebookSubmitListener(function(status, message) {
      if (status) {
        alertify.success(message);
      }
      else {
        alertify.error(message);
      }
    });
  }

  handleOnSubmit(event) {
    event.preventDefault();
    const username = this.refs.username.value;
    const password = this.refs.password.value;
    this.props.onSubmitListener(username, password, function(status, message) {
      if (status) {
        alertify.success(message);
      }
      else {
        alertify.error(message);
      }
    });
  }

  handleOnClickBtForgetPassword(event) {
    event.preventDefault();
    alertify.error("Coming Soon");
    // browserHistory.push('/user/forgetPassword');
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
                    <input type="text" name="username" className="form-control" ref="username" />
                  </div>
                </div>
              </div>

              <div className="form-group row">
                <label className="col-xs-3 col-sm-2 col-md-2 col-form-label">Password</label>
                <div className="col-xs-9 col-sm-10 col-md-10">
                  <div className="col-xs-12 col-sm-12 col-md-12">
                    <input type="password" name="password" className="form-control" ref="password" />
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
                  <div className="col-xs-12 col-sm-6 col-md-6" style={{marginTop: 10}}>
                    <input type="submit" className="btn btn-warning form-control " onClick={this.handleOnFacebookSubmit} value="Facebook" />
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
