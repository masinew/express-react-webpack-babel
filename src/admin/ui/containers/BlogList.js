import React, { Component } from 'react';
import { polyfill } from 'es6-promise'; polyfill();
import 'isomorphic-fetch';
import { Link } from 'react-router';
import Blog from '../components/Blog';
import localStyle from '../style/BlogList.scss';

import config from '../../../common/config/client';

const port = config.server.port;
const server = `${config.server.protocal}://${config.server.host}${ port ? `:${port}` : ''}`;

export default class BlogList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      blogList: []
    };

    this.createBlogListItem = this.createBlogListItem.bind(this);
  }

  componentDidMount() {
    fetch(`${server}/${config.apis.blog}/list`, {
      credentials: 'include'
    })
    .then((response) => {
      response.json().then((json) => {
        const dataSet = json.map((data) => {
          const blogListItem = this.createBlogListItem(data.blogNumber, data.topic, data.shortInfo);
          return blogListItem;
        });

        this.setState({
          blogList: dataSet
        });
      });
    })
  }

  componentWillReceiveProps(nextProps) {
    if (typeof nextProps.blogList.blogNumber !== 'undefined') {
      const blogList = this.state.blogList;
      const data = nextProps.blogList;
      const blogListItem = this.createBlogListItem(data.blogNumber, data.topic, data.shortInfo);
      blogList.unshift(blogListItem);
    }
  }

  createBlogListItem(blogNumber, topic, shortInfo) {
    return (
      <div className={localStyle.blog} id="callout-btn-group-accessibility" key={blogNumber+1}>
        <Link to={"/blogs/" + blogNumber}><h3>{topic}</h3></Link>
        <hr/>
        <p>{shortInfo}</p>
      </div>
    );
  }

  render() {
    return (
      <Blog info={this.state.blogList} />
    );
  }
}
