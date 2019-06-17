import React, { Component } from 'react';
import { fetchScheduleEntryById, fetchTicketScheduleEntryIds } from '../../../helpers/cw';

class ScheduleEntries extends Component {
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
    fetchTicketScheduleEntryIds(this.props.ticketNumber).then(results => {
      return Promise.all(results.map(result => {
        return fetchScheduleEntryById(result);
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
          Hours: {entry.hours} | Start: {entry.dateStart} - End: {entry.dateEnd}
          <br />
          Marked as {(entry.doneFlag) ? 'Done' : 'Open'}
        </p>
      </div>
    );
  }

  render() {
    return (
      <div>
          <h3>Schedule Entries</h3>
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

export default ScheduleEntries;
