import React, { Component } from 'react';
import Modal from 'react-modal';
import { fetchScheduleEntryById, fetchTicketScheduleEntryIds } from '../../helpers/cw';

class ScheduleEntries extends Component {
  constructor() {
    super();

    this.state = { 
      expanded: false, 
      entries: [],
      isLoading: false,
    };

    this.displayEntries = this.displayEntries.bind(this);
    this.expand = this.expand.bind(this);
  }

  componentWillMount() {
    Modal.setAppElement('body');
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

  expand() {
    const willExpand = !this.state.expanded;
    this.setState({
      ...this.state,
      expanded: willExpand,
      isLoading: willExpand,
    });

    if(willExpand) {
      this.displayEntries();
    }   
  }

  entryCard(entry) {
    return(
      <div>
        <p>
          User: {entry.member.name} 
          <br />
          Hours: {entry.hours} | Start: {entry.dateStart} - End: {entry.dateEnd}
          <br />
          {(!entry.acknowledgedFlag) ? 'Not' : ''}Acknowledged | {entry.status.name} | {(entry.doneFlag) ? 'Done' : 'Open'}
        </p>
      </div>
    );
  }

  render() {
    return (
      <div>
        <button
          className="btn btn-default"
          onClick={this.expand}>
          Schedule
        </button>
        <Modal
          contentLabel="Entries Modal"
          isOpen={this.state.expanded}
          overlayClassName="modal-overlay"
          onRequestClose={this.expand}
          shouldCloseOnOverlayClick={true}>
          {(this.state.isLoading) && (
            <p style={{textAlign: 'center'}}>Loading . . . </p>
          )}
          {this.state.entries.map(entry => 
            <div key={entry.id}>
              {this.entryCard(entry)}
            </div>
          )}
          <button
            className="btn btn-default"
            onClick={this.expand}>
            close
          </button>
        </Modal>
      </div>
    );
  }
}

export default ScheduleEntries;
