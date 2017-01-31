import React, { Component } from 'react';
import Navbar from './Navbar';

export default class Layout extends Component {
  componentDidMount() {
    this.socket = socket();
    this.socket.emit('a', 'asd');
    this.socket.on('a', function(a) {
      console.log(a);
    });
  }

  render() {
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
