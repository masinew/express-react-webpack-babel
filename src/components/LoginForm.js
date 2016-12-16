import React, { Component } from 'react'
import { polyfill } from 'es6-promise'; polyfill();
import 'isomorphic-fetch';
import HelloWorld from './HelloWorld'

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        username: ''
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
    const a = new FormData(document.getElementById('login-form'));
    const b = new FormData({username: "asd", password: "dsa"});

    const username = this.state.username;
    const password = this.state.password;
    const fetchOptions = {
      method: 'POST',
      body: b
    };

    fetch('http://localhost:3000/checktoken', fetchOptions)
      .then(function(response) {
        response.text().then(function(text) {
          alert(text)
        })
      });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          <form onSubmit={this.handleOnSubmit} name="login-form">
            <div className="form-group row">
              <label className="col-xs-3 col-form-label">Username</label>
              <div className="col-xs-9">
                <input type="text" name="username" className="form-control" value={this.state.username} onChange={this.handleUserName} />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-xs-3 col-form-label">Password</label>
              <div className="col-xs-9">
                <input type="password" name="password" className="form-control" />
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
