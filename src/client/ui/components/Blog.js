import React, { Component, PropTypes } from 'react';

export default class Blog extends Component {
  render() {
    return (
      <div className="blog-list">
        <div className="jumbotron" style={{marginBottom: 0}}>
          <div className="container">
            <h1 className="display-3">Blog</h1>
          </div>
        </div>
        <div className="container">
          {this.props.blogList}
        </div>
      </div>
    );
  }
}

Blog.propTypes = {
  blogList: PropTypes.array.isRequired
}
