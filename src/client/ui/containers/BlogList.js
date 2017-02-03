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
  }

  componentDidMount() {
    fetch(`${server}${config.apis.blog}/list`, {
      credentials: 'include'
    })
    .then((response) => {
      response.json().then((json) => {
        const dataSet = json.map((data) => {
          return <div className={localStyle.blog} id="callout-btn-group-accessibility" key={data.blogNumber}>
            <Link to={"/blogs/" + data.blogNumber}><h3>{data.topic}</h3></Link>
            <hr/>
            <p>{data.shortInfo}</p>
          </div>
        });

        this.setState({
          blogList: dataSet
        });
      });
    })
  }

  render() {
    return (
      <Blog info={this.state.blogList} />
    );
  }
}
