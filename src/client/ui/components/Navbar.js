import React, { Component } from 'react'
import { Link } from 'react-router';
import ListItemLink from './ListItemLink';
import { browserHistory } from 'react-router';
import config from '../../../common/config/config';

const apiServer = config.apiServer.host + ":" + config.apiServer.port;

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.handleUserForm = this.handleUserForm.bind(this);
    this.handleOnClickProfile = this.handleOnClickProfile.bind(this);
    this.handleOnClickLogout = this.handleOnClickLogout.bind(this);
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
    // set width of userGroupDropdown to the same width of
    const btUserGroupWidth = $("#btUserGroup").outerWidth();
    $("#userGroupDropdown").outerWidth(btUserGroupWidth);
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
            <Link className="navbar-brand" to="/">
              Brand
            </Link>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
                <ListItemLink className="nav-link" to="/" onlyActiveOnIndex={true}>
                  Home
                </ListItemLink>
                <ListItemLink className="nav-link" to="/blogs">
                  Blogs
                </ListItemLink>
            </ul>
            <ul className="nav navbar-nav navbar-right" id="b">
              <li className="dropdown">
                <a id="a" href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Nattajak Grisiam<span className="caret"></span></a>
                <ul className="dropdown-menu">
                  <ListItemLink className="nav-link" to="/user/profile" onClick={this.handleOnClickProfile}>
                    Profile
                  </ListItemLink>
                  <ListItemLink className="nav-link" to="/user/logout" onClick={this.handleOnClickLogout}>
                    Logout
                  </ListItemLink>
                </ul>
              </li>
            </ul>
          </div> {/*collapse navbar-collapse*/}
        </div> {/*container*/}
      </nav>
    );
  }
}
