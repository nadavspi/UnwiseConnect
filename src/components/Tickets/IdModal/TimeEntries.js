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
    return(
      <div>
        <p>
          User: {entry.member.name} 
          <br />
          Hours: {entry.actualHours} | Start: {entry.timeStart} - End: {entry.timeEnd}
          <br />
          Notes:
          <br />
          {entry.notes}
        </p>
      </div>
    );
  }

  render() {
    return (
      <div>
          <h3>Time Entries</h3>
          {(this.state.isLoading) && (
            <p style={{textAlign: 'center'}}>Loading . . . </p>
          )}
          {this.state.entries.map(entry => 
            <div key={entry.id}>
              {this.entryCard(entry)}
            </div>
          )}
      </div>
    );
  }
}

export default TimeEntries;
