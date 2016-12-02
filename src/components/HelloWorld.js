import React, { Component } from 'react'
import { render } from 'react-dom'
import LoginForm from './LoginForm'


export default class HelloWorld extends Component {
  render() {
    return (
      <div>
        <h1>
          HelloWorld
        </h1>
        <label>Username</label>
      </div>
    );
  }
}
