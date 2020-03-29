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
        console.log(result);
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
    let startDate = entry.dateStart;
    let endDate = entry.dateEnd;

    if (startDate) {
      const startDateObj = new Date(startDate);
      startDate = startDateObj.toLocaleDateString() + ' ' + startDateObj.toLocaleTimeString();
    }

    if (endDate) {
      const endDateObj = new Date(endDate);
      endDate = endDateObj.toLocaleDateString() + ' ' + endDateObj.toLocaleTimeString();
    }

    return(
      <React.Fragment>
        <td>{entry.member.name}</td>
        <td>{startDate}</td>
        <td>{endDate}</td>
        <td>{entry.hours}</td>
        <td>{(entry.doneFlag) ? <div class="glyphicon glyphicon-ok" aria-hidden="true"></div> : ''}</td>
      </React.Fragment>
    );
  }

  render() {
    return (
      <div>
          <h4>Schedule Entries</h4>
          {(this.state.isLoading) && (
            <p style={{textAlign: 'center'}}>Loading . . . </p>
          )}
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Member Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Hours</th>
                <th>Done</th>
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

export default ScheduleEntries;
