import React, { Component } from 'react';
import { polyfill } from 'es6-promise'; polyfill();
import 'isomorphic-fetch';
import { browserHistory } from 'react-router';

import LoginForm from '../../../client/ui/components/LoginForm';
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
    this.onGoogleSubmitListener = this.onGoogleSubmitListener.bind(this);
    this.onGoogleLoggedIn = this.onGoogleLoggedIn.bind(this);

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

    fetch(`${server}/admin/login`, fetchOptions)
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
      fetch(`${server}/admin/loginWithFacebook`, {
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

  onGoogleSubmitListener(cb) {
    gapi.load('auth2', () => {
      const auth2 = gapi.auth2.init({
        client_id: '866864651822-f79j3umd74dtu5adb8fj5q5jl6kvu1j3.apps.googleusercontent.com'
      })
// auth2.signOut()

      if (auth2.isSignedIn.get()) {
        const profile = auth2.currentUser.get().getBasicProfile();
        this.onGoogleLoggedIn(profile, cb);
      }
      else {
        auth2.signIn().then((result) => {
          const profile = result.getBasicProfile();
          this.onGoogleLoggedIn(profile, cb);
        })
      }
    });
  }

  onGoogleLoggedIn(profile, cb) {
    const formData = new FormData();
    formData.append("googleUserId", profile.getId());
    formData.append("firstName", profile.getGivenName());
    formData.append("lastName", profile.getFamilyName());
    formData.append("email", profile.getEmail());
    fetch(`${server}/admin/loginWithGoogle`, {
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

    // console.log('ID: ' + profile.getId());
    // console.log('Full Name: ' + profile.getName());
    // console.log('Given Name: ' + profile.getGivenName());
    // console.log('Family Name: ' + profile.getFamilyName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail());
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
      browserHistory.push('/admin');
    }
  }

  setUserInfo(result) {
    const firstName = result.userInfo.firstName || '';
    const lastName = result.userInfo.lastName || '';
    const email = result.userInfo.email || '';
    const gender = result.userInfo.gender || '';
    const token = result.token;
    localStorage.setItem("userFullName", firstName + " " + lastName);
    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);
    localStorage.setItem("email", email);
    localStorage.setItem("gender", gender);
    if (token) {
      localStorage.setItem("token", token);
    }
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
      <LoginForm onSubmitListener={this.onSubmitListener} onFacebookSubmitListener={this.onFacebookSubmitListener} onGoogleSubmitListener={this.onGoogleSubmitListener} />
    );
  }
}
