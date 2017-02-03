import React, { Component } from 'react';
import Navbar from './Navbar';

export default class Layout extends Component {
  render() {
    return (
      <div className="app-container"  style={{paddingTop: 50}}>
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
