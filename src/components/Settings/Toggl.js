import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Toggl extends Component {
  state = {
    apiKey: '',
  };

  componentDidMount = () => {
    this.setState({ apiKey: this.props.apiKey || '' });
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.apiKey !== nextProps.apiKey) {
      this.setState({ apiKey: nextProps.apiKey });
    }
  }

  submit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.apiKey);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submit}>
          <label htmlFor="toggl-api">API Key</label>
          <div className="input-group">
            <input
              className="form-control"
              id="toggl-api"
              onChange={e => this.setState({ apiKey: e.target.value })}
              type="text"
              value={this.state.apiKey}
            />
            <span className="input-group-btn">
              <button
                className="btn btn-primary"
                type="submit"
              >
                Save
              </button>
            </span>
          </div>
        </form>
        <p>
          <a
            href="https://toggl.com/app/profile"
            target="_blank">
              Find your API key
          </a>
        </p>
      </div>
    );
  }
}

Toggl.propTypes = {
  apiKey: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
}
