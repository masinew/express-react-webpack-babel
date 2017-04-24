import React, { Component } from 'react';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.handleOnLogin = this.handleOnLogin.bind(this);
  }

  handleOnLogin() {
    // const username = this.
  }

  render() {
    return (
      <div className="modal-footer">
        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={this.handleOnLogin}>Login</button>
      </div>
    );
  }
}
