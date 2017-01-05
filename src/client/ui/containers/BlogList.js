import React, { Component } from 'react';
import { polyfill } from 'es6-promise'; polyfill();
import 'isomorphic-fetch';
import { Link } from 'react-router';
import Blog from '../components/Blog';
import localStyle from '../style/BlogList.scss';

export default class BlogList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      blogList: []
    };
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/blog/list')
    .then((response) => {
      response.json().then((json) => {
        const dataSet = json.map((data) => {
          return <div className={localStyle.blog} id="callout-btn-group-accessibility" key={data.id}>
            <Link to={"/blogs/" + data.id}><h3>{data.header}</h3></Link>
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
