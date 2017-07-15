import * as togglActions from '../../actions/toggl';
import React, { Component } from 'react';
import Toggl from './Toggl';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth'

class Settings extends Component {
  constructor() {
    super();

    this.saveToggl = this.saveToggl.bind(this);
  }

  saveToggl(apiKey) {
    this.props.dispatch(togglActions.saveKey(apiKey));
  }

  startTimer() {
    this.props.dispatch(togglActions.startTimer({
      description: 'Test by UnwiseConnect',
    }));
  }

  render() {
    return (
      <div>
        <div className="page-header">
          <h1>Settings</h1>
        </div>
        <div className="row">
          <div className="col-md-8">
            <Toggl
              apiKey={this.props.toggl ? this.props.toggl.apiKey : undefined}
              onSubmit={this.saveToggl}
            />
          </div>
          <div className="col-md-4">
            <p style={{ marginTop: '2em' }}>Use the button below to test the toggl integration. It will start a time entry called "Test by UnwiseConnect".</p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={e => this.startTimer()}
            >
              Start timer
            </button>
          </div>
        </div>
        <hr/>
        <button
          onClick={() => this.props.dispatch(logout())}
          className="btn btn-danger"
        >
          Logout
        </button>
      </div>
    );
  }
};

const mapStateToProps = state => state.user;
export default connect(mapStateToProps)(Settings);
