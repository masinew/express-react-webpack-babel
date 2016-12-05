import React, { Component } from 'react'

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange() {
    // TODO: get data from database to display auto-complete drop-down tags
  }

  render() {
    return (
      <form className="form-inline float-xs-right">
        <input className="form-control" type="text" placeholder="Search" onChange={this.handleOnChange} />
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    );
  }
}
