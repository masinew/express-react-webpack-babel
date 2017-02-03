import React, { Component } from 'react';
import ContentWithJambotron from './ContentWithJambotron';

export default class Blog extends Component {
  render() {
    return (
      <ContentWithJambotron rootName="Blog" rootPath="/blogs" info={this.props.info} header={this.props.header} />
    );
  }
}
