import React, { Component } from 'react';
import localStyle from '../style/Home.scss';
import ContentWithJambotron from './ContentWithJambotron';

export default class Home extends Component {
  componentDidMount() {
    localStorage.setItem("asd", "asd");
  }
  render() {
    const a = [
      <div key="1">123</div>
    ]
    return (
      <ContentWithJambotron rootName="Home" rootPath="/" info={a} />
    );
  }
}
