import Modal from 'react-modal';
import React, { Component } from 'react';
import ScheduleEntries from './ScheduleEntries';
import { fetchTicketNotes } from '../../helpers/cw';

class IdModal extends Component {
  constructor() {
    super();

    this.state = { 
      expanded: false, 
      notes: [],
      currTab: 'notes',
    };

    this.displayNotes = this.displayNotes.bind(this);
    this.expand = this.expand.bind(this);
    this.show = this.show.bind(this);
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

  show(tabName) {
    this.setState({
      ...this.state,
      currTab: tabName,
    })
  }

  render () {
    return (
      <div>
        <button 
          className="btn btn-default"
          onClick={this.expand}>
          Details
        </button>
        <Modal
          contentLabel="Notes Modal"
          isOpen={this.state.expanded}
          overlayClassName="modal-overlay"
          onRequestClose={this.expand}
          shouldCloseOnOverlayClick={true}
        > 
        <nav className="navbar navbar-uc navbar-static-top">
              <div className="container">
                <ul className="nav nav-settings">
                  <li>
                    <button 
                      className="btn btn-default"
                      onClick={e => this.show('notes')}>
                      Notes
                    </button>
                  </li>
                  <li>
                    <button 
                      className="btn btn-default"
                      onClick={e => this.show('scheduleEntries')}>
                      Schedule Entries
                    </button>
                  </li>
                </ul>
              </div>
            </nav>
          {this.state.currTab === 'notes' && (
            <div>
              <h3>Notes</h3>
              {this.state.notes.map(message => 
                <div key={message.id}>
                  <p>{message.text}</p>
                  <p>- {message.createdBy}<br />{message.dateCreated}</p>
                </div>
              )}
            </div>
          )}
          {this.state.currTab === 'scheduleEntries' && (
            <ScheduleEntries ticketNumber={this.props.ticketNumber} />
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

export default IdModal;




