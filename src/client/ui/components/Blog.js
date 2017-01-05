import React, { Component } from 'react';
import Content from './Content';

export default class Blog extends Component {
  render() {
    return (
      <Content rootName="Blog" rootPath="/blogs" info={this.props.info} header={this.props.header} />
    );
  }
}
