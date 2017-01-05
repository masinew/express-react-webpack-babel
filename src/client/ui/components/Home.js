import React, { Component } from 'react';
import localStyle from '../style/Home.scss';
import Content from './Content';

export default class Home extends Component {
  componentDidMount() {
    localStorage.setItem("asd", "asd");
  }
  render() {
    const a = [
      <div key="1">123</div>
    ]
    return (
      <Content rootName="Home" rootPath="/" info={a} />
    );
  }
}
