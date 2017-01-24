import React, { Component } from 'react';
import { polyfill } from 'es6-promise'; polyfill();
import 'isomorphic-fetch';
import { browserHistory } from 'react-router';

import LoginForm from '../components/LoginForm';
import config from '../../../common/config/client';

const port = config.server.port;
const server = `${config.server.protocal}://${config.server.host}${ port ? `:${port}` : '' }`;

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.onSubmitListener = this.onSubmitListener.bind(this);
    this.onLoggedIn = this.onLoggedIn.bind(this);
    this.onFacebookSubmitListener = this.onFacebookSubmitListener.bind(this);
    this.onFacebookLoggedIn = this.onFacebookLoggedIn.bind(this);

    this.checkFacebookStatus = this.checkFacebookStatus.bind(this);
    this.setPath = this.setPath.bind(this);
    this.setUserInfo = this.setUserInfo.bind(this);
  }

  onLoggedIn(result, cb) {
    const status = result.success;
    const message = result.message;
    if (status) {
      this.setUserInfo(result);
      if (cb) {
          cb(status, message);
      }

      this.setPath();
    }
    else {
      if (cb) {
          cb(status, message);
      }
    }
  }

  onSubmitListener(username, password, cb) {
    let formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    const fetchOptions = {
      method: 'POST',
      body: formData,
      credentials: 'include'
    };

    fetch(`${server}/user/login`, fetchOptions)
      .then((response) => {
        response.json().then((result) => {
          this.onLoggedIn(result, cb)
        });
      });
  }

  onFacebookSubmitListener(cb) {
    if (this.facebookStatus === 'connected') {
      this.onFacebookLoggedIn(cb);
    }
    else {
      FB.login((response) => {
        if (response.error || response.status !== 'connected') {
          if (cb) {
            cb(null, 'Login with Facebook Unsuccessful');
          }

          return;
        }

        this.onFacebookLoggedIn(cb);
      }, {scope: "email"})
    }
  }

  onFacebookLoggedIn(cb) {
    FB.api('/me?fields=email,first_name,last_name,gender', (response) => {
      const formData = new FormData();
      formData.append("facebookUserId", response.id);
      formData.append("firstName", response.first_name);
      formData.append("lastName", response.last_name);
      formData.append("email", response.email);
      formData.append("gender", response.gender);
      fetch(`${server}/user/loginWithFacebook`, {
        credentials: 'include',
        method: 'POST',
        body: formData
      }).then((response) => {
        response.json().then((result) => {
          const status = result.success;
          const message = result.message;
          if (status) {
            this.setUserInfo(result);
            if (cb) {
              cb(status, message);
            }

            this.setPath();
          }
          else {
            if (cb) {
              this.checkFacebookStatus();
              cb(status, message);
            }
          }
        });
      })
    })
  }

  checkFacebookStatus() {
    if (typeof FB !== 'undefined') {
      FB.getLoginStatus((response) => {
        this.facebookStatus = response.status;
      });
    }
  }

  setPath() {
    const { location } = this.props;
    if (location.state && location.state.lastPathname) {
      browserHistory.push(location.state.lastPathname);
    } else {
      browserHistory.push('/');
    }
  }

  setUserInfo(result) {
    const firstName = result.userInfo.firstName;
    const lastName = result.userInfo.lastName;
    localStorage.setItem("userFullName", firstName + " " + lastName);
  }

  componentDidMount() {
    this.checkFacebookStatus();

    window.fbAsyncInit = () => {
      FB.init({
        appId      : '379797422386810',
        xfbml      : true,
        version    : 'v2.6',
        cookie     : true
      });


      FB.AppEvents.logPageView();
      this.checkFacebookStatus();
    };

    (function(d, s, id){
       var fjs = d.getElementsByTagName(s)[0], js=fjs;
       if (d.getElementById(id)) {return;}


       js = d.createElement(s);
       js.id = id;
       js.src = "//connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  }

  render() {
    return (
      <LoginForm onSubmitListener={this.onSubmitListener} onFacebookSubmitListener={this.onFacebookSubmitListener} />
    );
  }
}
