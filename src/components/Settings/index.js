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
          <div className="pull-right">
            <button
              onClick={() => this.props.dispatch(logout())}
              className="btn btn-danger"
            >
              Logout

              <span
                className="glyphicon glyphicon-log-out"
                aria-hidden="true"
              >
              </span>

            </button>
          </div>
          <h1>Settings</h1>
        </div>
        <h2>Toggl Integration</h2>
        <div className="row">
          <div className="col-md-4">
            <Toggl
              apiKey={this.props.toggl ? this.props.toggl.apiKey : undefined}
              onSubmit={this.saveToggl}
            />
          </div>
          <div className="col-md-8">
            <p>Having issues with your Toggl API key? Use the button below to test the integration.<br/>It should start a time entry called "Test by UnwiseConnect".</p>
            <button
              type="button"
              className="btn btn-default"
              onClick={e => this.startTimer()}
            >
              Start test timer
            </button>
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => state.user;
export default connect(mapStateToProps)(Settings);
