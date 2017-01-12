import React, { Component } from 'react';
import { polyfill } from 'es6-promise'; polyfill();
import 'isomorphic-fetch';
import Blog from '../components/Blog';
import localStyle from '../style/BlogList.scss';
import config from '../../../common/config/client';

const port = config.server.port;
const server = `${config.server.protocal}://${config.server.host}${ port ? `:${port}` : ''}`;

export default class BlogDetail extends Component {
  constructor(props) {
    super(props);
    this.blogId = this.props.params.id;
    this.state = {
      blogDetail: []
    }
  }

  componentDidMount() {
    fetch(`${server}${config.apis.blog}/${this.blogId}`, {
      credentials: 'include'
    }).then((response) => {
      response.json().then((json) => {
        var paragraphCount = 0;
        const header = json.header;
        const detailComponent = [
          <div className={localStyle.blog} id="callout-btn-group-accessibility" key={json.id}>
            {
              json.details.map((detail) => {
                return <p key={++paragraphCount}>{detail}</p>
              })
            }
          </div>
        ];
        this.setState({
          blogDetail: detailComponent,
          header: header
        });
      });
    });
  }

  render() {
    return (
      <Blog info={this.state.blogDetail} header={this.state.header} />
    );
  }
}
