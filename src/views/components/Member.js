import React, { Component } from 'react';

export default class Member extends Component {
  render() {
    return (
      <div>
        <h1>Member</h1>
        {this.props.children}
      </div>
    );
  }
}
