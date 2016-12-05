import React from 'react'
import { render } from 'react-dom'
import LoginForm from './components/LoginForm'
import HelloWorld from './components/HelloWorld'
import AppRoutes from './components/AppRoutes'


window.onload = () => {
  render(<AppRoutes />, document.getElementById('app'));
};
