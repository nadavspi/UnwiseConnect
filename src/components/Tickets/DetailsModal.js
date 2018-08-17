import classnames from 'classnames';
import React, { Component } from 'react';
import Modal from 'react-modal';
import { fetchTicketNotes } from '../../helpers/cw';

class DetailsModal extends Component {
  constructor() {
    super();

    this.state = { 
      expanded: false, 
      notes: [],
    };

    this.displayNotes = this.displayNotes.bind(this);
    this.expand = this.expand.bind(this);
  }

  componentWillMount() {
    Modal.setAppElement('body');
  }

  displayNotes() {
    fetchTicketNotes(this.props.ticketNumber).then(results => {
      const notes = results.map(note => ({
        createdBy: note.member.name,
        dateCreated: note.dateCreated,
        id: note.id,
        text: note.text,
      }));

      this.setState({
        ...this.state,
        notes,
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
      this.displayNotes();
    }   
  }

  render () {
    return (
      <div>
        <button 
          className="btn btn-default"
          onClick={this.expand}>
          Notes
        </button>
        <Modal
          contentLabel="Notes Modal"
          isOpen={this.state.expanded}
          overlayClassName="modal-overlay"
          onRequestClose={this.expand}
          shouldCloseOnOverlayClick={true}
        >
          {this.state.notes.map(message => 
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

export default DetailsModal;




