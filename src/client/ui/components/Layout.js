import React, { Component } from 'react';
import Navbar from './Navbar';

export default class Layout extends Component {
  render() {
    const historyState = this.props.location.state;
    return (
      <div className="app-container">
        <header>
          <Navbar />
        </header>
        <div className="app-content">
          {this.props.children}
        </div>
      </div>
    );
  }
}
