import React, { Component } from 'react'

export default class LoginForm extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          <form>
            <div className="form-group row">
              <label className="col-xs-2 col-form-label">Username</label>
              <div className="col-xs-10">
                <input type="text" className="form-control" />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-xs-2 col-form-label">Password</label>
              <div className="col-xs-10">
                <input type="password" className="form-control" />
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
