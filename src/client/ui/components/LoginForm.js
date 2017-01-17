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
    this.handleFacebook = this.handleFacebook.bind(this);
  }

  handleFacebook(event) {
    event.preventDefault();
    console.log(this.a);
    // FB.getLoginStatus(function(response) {
    //   console.log(response);
    //   if (response.status !== 'connected') {
    //     FB.login(function(response) {
    //       console.log(response);
    //     })
    //   }
    // });
  }

  handleOnSubmit(event) {
    event.preventDefault();
    const username = this.refs.username.value;
    const password = this.refs.password.value;
    this.props.onSubmitListener(username, password);
  }

  handleOnClickBtForgetPassword(event) {
    event.preventDefault();
    alertify.error("Coming Soon");
    // browserHistory.push('/user/forgetPassword');
  }

  componentDidMount() {
      window.fbAsyncInit = function() {
        FB.init({
          appId      : '379797422386810',
          xfbml      : true,
          version    : 'v2.6'
        });

        // FB.AppEvents.logPageView();
      }.bind(this);

      this.a = (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}

         js = d.createElement(s);
         js.id = id;
         js.src = "//connect.facebook.net/asd/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));

    //  function() {
    //    var e=this.props,t=e.appId,n=e.locale,r=e.version,i=e.xfbml;
    //    window.fbAsyncInit = function() {
    //      FB.init(
    //        {
    //          appId:t,
    //          xfbml:i,
    //          version:r
    //        }
    //      )
    //    },
    //    function(e,t,r) {
    //      var i=e.getElementsByTagName(t)[0],o=i,a=i;
    //      e.getElementById(r)||
    //      (
    //        a=e.createElement(t),
    //        a.id=r,
    //        a.src="//connect.facebook.net/"+n+"/sdk.js",
    //        o.parentNode.insertBefore(a,o)
    //      )
    //    }(document,"script","facebook-jssdk")
    //  }
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
                    <input type="submit" className="btn btn-warning form-control " onClick={this.handleFacebook} value="Facebook" />
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
