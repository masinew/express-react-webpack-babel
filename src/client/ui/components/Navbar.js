import React, { Component } from 'react'
import Search from './Search'
import NavLink from './NavLink';

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
            <li className="nav-item">
              <NavLink className="nav-link" to="/" onlyActiveOnIndex={true}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/blog">
                Blog
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/member/login">
                Blog
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
