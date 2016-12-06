import React, { Component } from 'react'
import Search from './Search'
import { Link } from 'react-router';

export default class Navbar extends Component {
  render() {
    return (
      <div className="container">
        <nav className="navbar navbar-light bg-faded">
          <a className="navbar-brand" href="#">
            <img src="http://v4-alpha.getbootstrap.com/assets/brand/bootstrap-solid.svg" width="30" height="30" className="d-inline-block align-top" alt="" />
            {' '}Brand
          </a>
          <ul className="nav navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/blog">
                Blog
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
