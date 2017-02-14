import React, { Component } from 'react'
import { polyfill } from 'es6-promise'; polyfill();
import 'isomorphic-fetch';

import config from '../../../common/config/client';

const port = config.server.port;
const server = `${config.server.protocal}://${config.server.host}${ port ? `:${port}` : ''}`;

/*
socket Context is used by these components:
1. LoginForm: for emitting user login
2. Navbar: for emitting user logout
3. Dashboard: for emitting admin submit new blog
*/
export default class GlobalLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      socket: {},
      blogList: {}
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
      alertify.success(message);
    });

    this.socket.on('user disconnect', function(message) {
      alertify.error(message);
    });

    this.socket.on('new blog', (info) => {
      this.setState({
        blogList: {
          blogNumber: info.blogNumber,
          topic: info.topic,
          shortInfo: info.shortInfo
        }
      });

      alertify.success(info.message);
    });
  }

  render() {
    const children = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
        blogList: this.state.blogList
      })
    })
    return (
      <div>
        {children}
      </div>
    )
  }
}

GlobalLayout.childContextTypes = {
  socket: React.PropTypes.object
}
