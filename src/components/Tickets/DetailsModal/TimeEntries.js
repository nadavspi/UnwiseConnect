import React, { Component } from 'react';
import { fetchTimeEntryById, fetchTicketTimeEntryIds } from '../../../helpers/cw';

class TimeEntries extends Component {
  constructor() {
    super();

    this.state = { 
      entries: [],
      isLoading: false,
    };

    this.displayEntries = this.displayEntries.bind(this);
  }

  componentWillMount() {
    this.displayEntries();
  }

  displayEntries() {
    fetchTicketTimeEntryIds(this.props.ticketNumber).then(results => {
      return Promise.all(results.map(result => {
        return fetchTimeEntryById(result);
      }));
    }).then(entries => {
      this.setState({
        ...this.state,
        entries: entries,
        isLoading: false,
      });
    });
  }

  entryCard(entry) {
    const date = (new Date(entry.timeStart)).toLocaleDateString() + ' ' + (new Date(entry.timeStart)).toLocaleTimeString();
    return(
      <React.Fragment>
        <td>{entry.member.name}</td>
        <td>{entry.notes}</td>
        <td>{entry.actualHours}</td>
        <td>{date}</td>
      </React.Fragment>
    );
  }

  render() {
    return (
      <div>
          <h4>Time Entries</h4>
          {(this.state.isLoading) && (
            <p style={{textAlign: 'center'}}>Loading . . . </p>
          )}
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Member Name</th>
                <th>Notes</th>
                <th>Actual Hours</th>
                <th>Entry Date</th>
              </tr>
            </thead>
            <tbody>
            {this.state.entries.map(entry =>
              <tr key={entry.id}>
                {this.entryCard(entry)}
              </tr>
            )}
            </tbody>
          </table>
      </div>
    );
  }
}

export default TimeEntries;
