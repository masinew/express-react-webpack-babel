import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class Blog extends Component {
  render() {
    return (
      <div className="blog-list">
        <div className="jumbotron" style={{marginBottom: 0, paddingTop: 20, paddingBottom: 20}}>
          <div className="container">
            <h3 className="display-3">
              <Link to="/blogs">Blog</Link>
              {
                !this.props.header ? '' :
                [<span key="1">{" > "}{this.props.header}</span>]
              }
            </h3>
          </div>
        </div>
        <div className="container">
          {this.props.info}
        </div>
      </div>
    );
  }
}

Blog.propTypes = {
  info: PropTypes.array.isRequired
}
