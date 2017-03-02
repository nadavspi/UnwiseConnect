import React, { Component } from 'react';

export default class AddProject extends Component {
  constructor() {
    super();

    this.state = {
      projectId: '',
    };

    this.submit = this.submit.bind(this);
  }

  submit(e) {
    e.preventDefault();
    this.props.onAdd(this.state.projectId);
  }

  render() {
    return (
      <form onSubmit={this.submit}>
        <div><label htmlFor="projectId">Project ID</label></div>
        <input
          id="projectId"
          onChange={e => this.setState({ projectId: e.target.value })}
          type="number"
          value={this.state.projectId}
        />
        <button type="submit">Add</button>
      </form>
    );
  }
}
