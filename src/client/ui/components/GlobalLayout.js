import React, { Component } from 'react'
import { polyfill } from 'es6-promise'; polyfill();
import 'isomorphic-fetch';

import config from '../../../common/config/client';

const port = config.server.port;
const server = `${config.server.protocal}://${config.server.host}${ port ? `:${port}` : ''}`;

export default class GlobalLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      socket: {}
    }
  }

  getChildContext() {
      return {socket: this.state.socket}
  }

  componentDidMount() {
    this.socket = socket();
    this.setState({
      socket: this.socket
    });

    this.socket.on('user connected', function(message) {
      fetch(`${server}${config.apis.auth}/isActive`, {
        credentials: 'include'
      }).then((response) => {
        response.json().then(function(result) {
          if (result.success) {
            alertify.success(message);
          }
        });
      });
    });

    this.socket.on('user disconnect', function(message) {
      fetch(`${server}${config.apis.auth}/isActive`, {
        credentials: 'include'
      }).then((response) => {
        response.json().then(function(result) {
          if (result.success) {
            alertify.error(message);
          }
        });
      });
    });
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

GlobalLayout.childContextTypes = {
  socket: React.PropTypes.object
}
