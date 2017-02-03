import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class ContentWithJambotron extends Component {
  render() {
    const jumbotronInfo = !this.props.header ? null : <span>{" > "}{this.props.header}</span>
    return (
      <div className="content">
        <div className="contentHeader">
          <div className="jumbotron" style={{marginBottom: 0, paddingTop: 0, paddingBottom: 10}}>
            <div className="container">
              <div className="row">
                <h3 className="display-3">
                  <Link to={this.props.rootPath}>{this.props.rootName}</Link>
                  {
                    jumbotronInfo
                  }
                </h3>
              </div>
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

ContentWithJambotron.propTypes = {
  info: PropTypes.array.isRequired
}
