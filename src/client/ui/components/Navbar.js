import React, { Component } from 'react'
import { Link } from 'react-router';
import NavLink from './NavLink';
import { browserHistory } from 'react-router';
import config from '../../../common/config/config';

const apiServer = config.apiServer.host + ":" + config.apiServer.port;

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.handleUserForm = this.handleUserForm.bind(this);
    this.handleOnClickProfile = this.handleOnClickProfile.bind(this);
    this.handleOnClickLogout = this.handleOnClickLogout.bind(this);
    this.handleActive = this.handleActive.bind(this);
  }

  handleUserForm(event) {
    event.preventDefault();
  }

  handleOnClickProfile(event) {
    event.preventDefault();
  }

  handleOnClickLogout(event) {
    event.preventDefault()
    fetch('http://' + apiServer + '/api/v1/auth/logout', {
      credentials: 'include'
    })
    .then((response) => {
      response.json().then((json) => {
        const status = json.success;
        if (status) {
          alertify.success(json.message);
          browserHistory.push('/user/login');
        }
      });
    });
  }

  componentDidMount() {
    // set width of userGroupDropdown to the same width of btUserGroup
    const btUserGroupWidth = $("#btUserGroup").outerWidth();
    $("#userGroupDropdown").outerWidth(btUserGroupWidth);
  }

  handleActive() {

  }

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <NavLink className="navbar-brand" to="/">
              Brand
            </NavLink>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li>
                <NavLink className="nav-link" to="/" onlyActiveOnIndex={true}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link" to="/blogs">
                  Blogs
                </NavLink>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span></a>
                <ul className="dropdown-menu">
                  <li><a href="#">Action</a></li>
                  <li><a href="#">Another action</a></li>
                  <li><a href="#">Something else here</a></li>
                  <li role="separator" className="divider"></li>
                  <li><a href="#">Separated link</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
