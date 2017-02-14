import React from 'react'
import { render } from 'react-dom'

import AppRoutes from './ui/components/AppRoutes'

const rootElement = document.getElementById('app')

window.onload = () => {
  render(<AppRoutes />,
    rootElement
  );
};
