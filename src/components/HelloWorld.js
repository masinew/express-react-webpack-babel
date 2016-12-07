import React, { Component } from 'react'
import { render } from 'react-dom'
import LoginForm from './LoginForm'
import Navbar from './Navbar'


export default class HelloWorld extends Component {
  asd = (val) => {
    // usage arrow function must get babel-plugin-transform-class-properties for node_modules and set it in .babelrc as a plugin
    return 123;
  }

  render() {
    return (
      <div>
        HelloWorld
      </div>
    );
  }
}
