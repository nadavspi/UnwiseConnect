import React, { Component } from 'react';

export default class Toggl extends Component {
  constructor() {
    super();

    this.state = {
      apiKey: '',
    };

    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    this.setState({ apiKey: this.props.apiKey });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.apiKey !== nextProps.apiKey) {
      this.setState({ apiKey: nextProps.apiKey });
    }
  }

  submit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.apiKey);
  }

  render() {
    return (
      <div>
        <h2>Toggl Integration</h2>
        <form onSubmit={this.submit}>
          <div className="form-group">
            <label htmlFor="toggl-api">API Key</label>
            <input
              className="form-control" 
              id="toggl-api" 
              onChange={e => this.setState({ apiKey: e.target.value })}
              type="text" 
              value={this.state.apiKey}
            />
          </div>
          <button 
            className="btn btn-default"
            type="submit"
          >
            Save
          </button>
        </form>
      </div>
    );
  }
}

Toggl.propTypes = {
  apiKey: React.PropTypes.string,
  onSubmit: React.PropTypes.func.isRequired,
}
