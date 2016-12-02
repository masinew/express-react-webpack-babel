import React from 'react'
import { render } from 'react-dom'
import LoginForm from './components/LoginForm'


window.onload = () => {
  render(<LoginForm />, document.getElementById('app'));
};
