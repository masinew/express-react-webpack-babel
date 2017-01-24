import React, { Component } from 'react';
import Content from './Content';

export default class UserProfile extends Component {
  render() {
    const userProfileForm = [
      <div className="container" key='1'>
        <form>
          <div className="row">
            <div className="col-md-12">
              <input type="text" className="form-control" />
            </div>
          </div>
        </form>
      </div>
    ]
    return (
      <Content rootName="Home" rootPath="/" info={userProfileForm} />
    );
  }
}
