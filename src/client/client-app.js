import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import AppRoutes from './ui/components/AppRoutes'

import 'bootstrap';
import "bootstrap/dist/css/bootstrap.css";

const rootElement = document.getElementById('app')

render(
  <AppContainer>
    <AppRoutes />
  </AppContainer>,
  rootElement
)

if (module.hot) {
  module.hot.accept('./ui/components/AppRoutes', () => {
    const NextAppRoutes = require('./ui/components/AppRoutes').default

    render(
      <AppContainer>
         <NextAppRoutes />
      </AppContainer>,
      rootElement
    );
  });
}
