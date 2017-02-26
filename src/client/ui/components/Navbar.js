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
    this.handleOnLogin = this.handleOnLogin.bind(this);
    this.handleOnSignUp = this.handleOnSignUp.bind(this);
  }

  handleOnClickNavbar() {
    $('#myCollapseNavbar').collapse('hide');
  }

  handleOnClickProfile(event) {
    event.preventDefault();
    alertify.error("Coming Soon");
  }

  handleOnLogin(event) {
    event.preventDefault();
    console.log(this.refs.username);
    $('#loginModal').modal('show');
  }

  handleOnSignUp(event) {
    event.preventDefault();
    alertify.error('Sign Up');
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
          browserHistory.push('/user/login');
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
    const isLoggedIn = this.props.isLoggedIn;
    const rightLink = isLoggedIn ? (
      <ul className="nav navbar-nav navbar-right">
        <li className="dropdown">
          <a id="a" href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{this.state.userFullName}<span className="caret"></span></a>
          <ul className="dropdown-menu" onClick={this.handleOnClickNavbar}>
            <ListItemLink className="nav-link" to="/user/profile" onClick={this.handleOnClickProfile}>
              Profile
            </ListItemLink>
            <ListItemLink className="nav-link" to="/user/logout" onClick={this.handleOnClickLogout}>
              Logout
            </ListItemLink>
          </ul>
        </li>
      </ul>
    ) : (
      <ul className="nav navbar-nav navbar-right">
        <ListItemLink className="nav-link" to="/user/login" onClick={this.handleOnLogin}>
          Login
        </ListItemLink>
        <ListItemLink className="nav-link" to="/user/signup" onClick={this.handleOnSignUp}>
          Sign Up
        </ListItemLink>
      </ul>
    );

    return (
      <div>
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
                {config.brandName}
              </Link>
            </div>

            <div className="collapse navbar-collapse" id="myCollapseNavbar">
              <ul className="nav navbar-nav" onClick={this.handleOnClickNavbar}>
                  <ListItemLink className="nav-link" to="/" onlyActiveOnIndex={true}>
                    Home
                  </ListItemLink>
                  <ListItemLink className="nav-link" to="/blogs">
                    Blogs
                  </ListItemLink>
              </ul>
              {rightLink}
            </div> {/*collapse navbar-collapse*/}
          </div> {/*container*/}
        </nav>

        {/*Login Modal*/}
        <div className="modal fade" id="loginModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="myModalLabel">User Login</h4>
              </div>
              <div className="modal-body">
                <div className="form-group row">
                  <label className="col-xs-3 col-sm-2 col-md-2 col-form-label">Username</label>
                  <div className="col-xs-9 col-sm-10 col-md-10">
                    <div className="col-xs-12 col-sm-12 col-md-12">
                      <input type="text" name="username" className="form-control" ref="username" />
                    </div>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-xs-3 col-sm-2 col-md-2 col-form-label">Password</label>
                  <div className="col-xs-9 col-sm-10 col-md-10">
                    <div className="col-xs-12 col-sm-12 col-md-12">
                      <input type="password" name="password" className="form-control" ref="password" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Login</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Navbar.contextTypes = {
  socket: React.PropTypes.object
}
