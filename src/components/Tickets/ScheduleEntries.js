import React, { Component } from 'react';
import Modal from 'react-modal';
import { fetchTicketNotes } from '../../helpers/cw';

class ScheduleEntries extends Component {
  constructor() {
    super();

    this.state = { 
      expanded: false, 
      entries: [],
    };

    this.displayEntries = this.displayEntries.bind(this);
    this.expand = this.expand.bind(this);
  }

  componentWillMount() {
    Modal.setAppElement('body');
  }

  displayEntries() {
    fetchTicketNotes(this.props.ticketNumber).then(results => {
      const notes = results.map(note => ({
        createdBy: note.member.name,
        dateCreated: note.dateCreated,
        id: note.id,
        text: note.text,
      }));

      this.setState({
      ...this.state,
      entries: [
        {
          id: 1,
          text:'first entry',
          createdBy: 'author 1',
          datCreated: new Date(),
        }, 
        {
          id: 2,
          text:'second entry',
          createdBy: 'author 2',
          datCreated: new Date(),
        },
      ],
    });
    });
  }

  expand() {
    const willExpand = !this.state.expanded;
    this.setState({
      ...this.state,
      expanded: willExpand,
    });

    if(willExpand) {
      this.displayEntries();
    }   
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
          shouldCloseOnOverlayClick={true}
        >
          {this.state.entries.map(message => 
            <div key={message.id}>
              <p>{message.text}</p>
              <p>- {message.createdBy}<br />{message.dateCreated}</p>
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
