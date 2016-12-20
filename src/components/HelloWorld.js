import React, { Component } from 'react'
import { render } from 'react-dom'
import Navbar from './Navbar'
import localStyle from './button2.scss';


export default class HelloWorld extends Component {

  render() {
    return (
      <div>
        <h1 className={localStyle.greeting}>HelloWorld</h1>
      </div>
    );
  }
}
