import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class Blog extends Component {
  render() {
    const jumbotron = !this.props.header ? null : <span>{" > "}{this.props.header}</span>
    return (
      <div className="content">
        <div className="contentHeader">
          <div className="jumbotron" style={{marginBottom: 0, paddingTop: 60, paddingBottom: 20}}>
            <div className="container">
              <h3 className="display-3">
                <Link to={this.props.rootPath}>{this.props.rootName}</Link>
                {
                  jumbotron
                }
              </h3>
            </div>
          </div>
        </div>
        <div className="contentInfo">
          <div className="container">
            {this.props.info}
          </div>
        </div>
      </div>
    );
  }
}

Blog.propTypes = {
  info: PropTypes.array.isRequired
}
