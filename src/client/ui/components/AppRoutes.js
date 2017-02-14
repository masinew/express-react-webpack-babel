import React, { Component } from 'react';
import { Router, browserHistory } from 'react-router';
import routes from '../../routes';

import 'bootstrap';
import 'alertifyjs';
import 'bootstrap/dist/css/bootstrap.css';
import 'alertifyjs/build/css/alertify.min.css';
import 'alertifyjs/build/css/themes/bootstrap.min.css';
import 'sweetalert/dist/sweetalert.css';

export default class AppRoutes extends Component {
  render() {
    return (
      <Router history={browserHistory} routes={routes} />
    );
  }
}
