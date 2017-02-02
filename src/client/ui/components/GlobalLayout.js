import React, { Component } from 'react'

export default class GlobalLayout extends Component {
  componentDidMount() {
    this.socket = socket('http://localhost:3000', {resource: '/champ'});
    this.socket.on('user connected', function(message) {
      alertify.success(message);
    });
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}
