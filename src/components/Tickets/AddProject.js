import React, { Component } from 'react';

export default class AddProject extends Component {
  state = {
    projectId: '',
  };

  submit = (e) => {
    e.preventDefault();
    this.props.onAdd(this.state.projectId);
  }

  render() {
    return (
      <form onSubmit={this.submit}>
        <div><label htmlFor="projectId">Project ID</label></div>
        <div className="input-group input-group-sm">
          <input
            id="projectId"
            onChange={e => this.setState({ projectId: e.target.value })}
            type="number"
            value={this.state.projectId}
            className="form-control"
            placeholder="123"
          />
          <div className="input-group-btn">
            <button type="submit" className="btn btn-primary">Add</button>
          </div>
        </div>
      </form>
    );
  }
}
