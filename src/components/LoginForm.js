import React, { Component } from 'react'
import HelloWorld from './HelloWorld'

export default class LoginForm extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          <form>
            <div className="form-group row">
              <label className="col-xs-3 col-form-label">Username</label>
              <div className="col-xs-9">
                <input type="text" className="form-control" />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-xs-3 col-form-label">Password</label>
              <div className="col-xs-9">
                <input type="password" className="form-control" />
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
