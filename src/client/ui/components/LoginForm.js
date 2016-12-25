import React, { Component } from 'react'
import { polyfill } from 'es6-promise'; polyfill();
import 'isomorphic-fetch';

import localStyle from './button2.scss';

import HelloWorld from './HelloWorld'

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
      body: formData
    };

    fetch('http://localhost:3000/api/v1/auth/login', {
      method: 'POST',
      body: formData,
      credentials: 'include'
    })
      .then((response) => {
        response.json().then((result) => {
          const status = result.success;
          const message = result.message;
          if (status) {
            alertify.success(message);
          }
          else {
            alertify.error(message);
          }
        });
      });


      // .then(function(response) {
      //   response.json().then(function(jsonObj) {
      //     const status = jsonObj.success;
      //     console.log(status + '123');
      //     console.log(this);
      //     // this.state.isErr = jsonObj.success;
      //     // console.log(this.state.isErr);
      //   })
      // });

    // fetch('http://localhost:3000/checktoken', {
    //   credentials: 'include'
    // })
    //   .then(function(response) {
    //     response.text().then(function(text) {
    //       alert(text)
    //     })
    //   });
  }

  render() {
    return (
      <div className="container">
        <h1 className={localStyle.greeting}>Hello World</h1>
        <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          <form onSubmit={this.handleOnSubmit} name="login-form">
            <div className="form-group row">
              <label className={"col-xs-3 col-form-label " + localStyle.greeting}>Username</label>
              <div className="col-xs-9">
                <input type="text" name="username" className="form-control" value={this.state.username} onChange={this.handleUserName} />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-xs-3 col-form-label">Password</label>
              <div className="col-xs-9">
                <input type="password" name="password" className="form-control" value={this.state.password} onChange={this.handlePassword} />
              </div>
            </div>
            <div className="form-group row">
              <span className="col-xs-3"></span>
              <div className="col-xs-9">
                <input type="submit" className="btn btn-primary" value="Login" />
                <input type="submit" className="btn btn-outline-secondary" style={{marginLeft: 10}} value="Forget Password" />
              </div>
            </div>
          </form>
        </div>
        <div className="col-sm-2"></div>
        </div>
      </div>
    );
  }
}
