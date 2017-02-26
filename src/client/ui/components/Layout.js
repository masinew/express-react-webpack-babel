import React, { Component } from 'react';
import Navbar from './Navbar';

export default class Layout extends Component {
  render() {
    const isLoggedIn = this.props.route.isLoggedIn;
    const children = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
        blogList: this.props.blogList
      })
    })

    return (
      <div className="app-container"  style={{paddingTop: 50}}>
        <header>
          <Navbar isLoggedIn={isLoggedIn}/>
        </header>
        <div className="app-content">
          {children}
        </div>
      </div>
    );
  }
}
