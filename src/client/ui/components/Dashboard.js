import React, { Component } from 'react'
import { browserHistory } from 'react-router';
import config from '../../../common/config/client';

const port = config.server.port;
const server = `${config.server.protocal}://${config.server.host}${ port ? `:${port}` : ''}`;

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnSubmit(event) {
    event.preventDefault();
    if (typeof localStorage.token !== 'undefined') {
      const topic = this.refs.topic.value;
      const shortInfo = this.refs.shortInfo.value;
      const details = this.refs.details.value;
      this.context.socket.emit('new blog', {
        topic: topic,
        shortInfo: shortInfo,
        details: details,
        token: localStorage.token
      });
    }
    else {
      alertify.error('Required Admin User!!');
    }
  }

  render() {
    return (
      <div className="container" style={{marginTop: 20, marginBottom: 80}}>
        <div className="row">
          <div className="col-md-12" style={{textAlign: 'center'}}>
            <h2>
              New Blog
            </h2>
          </div>
          <hr />


          <div className="col-md-12">
            <form onSubmit={this.handleOnSubmit}>
              <div className="form-group row">
                <label className="col-xs-3 col-sm-2 col-md-2 col-form-label">Topic</label>
                <div className="col-xs-9 col-sm-10 col-md-10">
                  <div className="col-xs-12 col-sm-12 col-md-12">
                    <input type="text" className="form-control" ref="topic" />
                  </div>
                </div>
              </div>

              <div className="form-group row">
                <label className="col-xs-3 col-sm-2 col-md-2 col-form-label">Detail</label>
                <div className="col-xs-9 col-sm-10 col-md-10">
                  <div className="col-xs-12 col-sm-12 col-md-12">
                    <textarea className="form-control" ref="details" style={{resize: 'none'}} rows="12" />
                  </div>
                </div>
              </div>

              <div className="form-group row">
                <label className="col-xs-3 col-sm-2 col-md-2 col-form-label">Short Detail</label>
                <div className="col-xs-9 col-sm-10 col-md-10">
                  <div className="col-xs-12 col-sm-12 col-md-12">
                    <textarea className="form-control" ref="shortInfo" style={{resize: 'none'}} rows="12" />
                  </div>
                </div>
              </div>

              <div className="col-xs-3 col-sm-2 col-md-2"></div>
              <div className="col-xs-9 col-sm-10 col-md-10">
                <div className="col-xs-12 col-sm-12 col-md-12">
                  <input type="submit" className="form-control btn btn-primary" value="Save" />
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.contextTypes = {
  socket: React.PropTypes.object
}
