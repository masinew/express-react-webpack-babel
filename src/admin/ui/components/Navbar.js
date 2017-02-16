import React, { Component } from 'react'
import { Link } from 'react-router';
import ListItemLink from './ListItemLink';
import { browserHistory } from 'react-router';
import config from '../../../common/config/client';

const port = config.server.port;
const server = `${config.server.protocal}://${config.server.host}${ port ? `:${port}` : '' }`;

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userFullName: ''
    }

    this.handleOnClickProfile = this.handleOnClickProfile.bind(this);
    this.handleOnClickLogout = this.handleOnClickLogout.bind(this);
    this.handleOnClickNavbar = this.handleOnClickNavbar.bind(this);
  }

  handleOnClickNavbar() {
    $('#myCollapseNavbar').collapse('hide');
  }

  handleOnClickProfile(event) {
    event.preventDefault();
    alertify.error("Coming Soon");
  }

  handleOnClickLogout(event) {
    event.preventDefault()
    fetch(`${server}/user/logout`, {
      credentials: 'include'
    })
    .then((response) => {
      response.json().then((json) => {
        const status = json.success;
        if (status) {
          const firstName = localStorage.firstName;
          const lastName = localStorage.lastName;
          this.context.socket.emit('user disconnect', `${firstName} ${lastName}`);
          alertify.success(json.message);
          localStorage.clear();
          browserHistory.push('/admin/login');
        }
      });
    });
  }

  componentDidMount() {
    const firstName = localStorage.firstName;
    const lastName = localStorage.lastName;
    this.setState({
      userFullName: `${firstName} ${lastName}`
    });
  }

  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#myCollapseNavbar" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to="/">
              Brand
            </Link>
          </div>

          <div className="collapse navbar-collapse" id="myCollapseNavbar">
            <ul className="nav navbar-nav" onClick={this.handleOnClickNavbar}>
                <ListItemLink className="nav-link" to="/admin" onlyActiveOnIndex={true}>
                  Home
                </ListItemLink>
                <ListItemLink className="nav-link" to="/admin/blogs">
                  Blogs
                </ListItemLink>
                <ListItemLink className="nav-link" to="/admin/dashboard">
                  Dashboard
                </ListItemLink>
            </ul>
            <ul className="nav navbar-nav navbar-right" id="b" >
              <li className="dropdown">
                <a id="a" href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{this.state.userFullName}<span className="caret"></span></a>
                <ul className="dropdown-menu" onClick={this.handleOnClickNavbar}>
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

Navbar.contextTypes = {
  socket: React.PropTypes.object
}
