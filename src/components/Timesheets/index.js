import React, { Component } from 'react';
import Table from './Table';
import { connect } from 'react-redux';
import { search } from '../../actions/timesheets';

class Timesheets extends Component {
  state = {
    members: '',
  };

  findEntries = (e) => {
    this.props.dispatch(search({ members: this.state.members }));
    e.preventDefault();
  }

  render() {
    const { inProgress, response } = this.props.timesheets;

    return (
      <div>
        <div className="panel-uc panel panel-default">
          <div className="panel-uc__heading panel-heading clearfix">
            <h4>Timesheet Review</h4>
          </div>
          <div className="panel-body">
            <header className="dispatch-header">
              <form onSubmit={this.findEntries.bind(this)}>
                <div className="dispatch-fields">
                  <div className="form-group">
                    <span>
                      <label htmlFor="members" style={{ display: 'block' }}>
                        Members
                      </label>
                      <input
                          className="form-control"
                          id="members"
                          onChange={e => this.setState({ members: e.target.value }) }
                          required
                          type="text"
                          value={this.state.members}
                      />
                    </span>
                  </div>
                </div>

                <button
                    className="btn btn-primary"
                    disabled={inProgress}
                    type="submit"
                >
                  {inProgress ? 'Searching…' : 'Search'}
                </button>
              </form>
            </header>
            {response ? (
              <Table id="entries-table" entries={response} />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  timesheets: state.timesheets,
});

export default connect(mapStateToProps)(Timesheets);
