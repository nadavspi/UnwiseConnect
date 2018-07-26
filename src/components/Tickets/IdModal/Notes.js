import React, { Component } from 'react';
import { fetchTicketNotes } from '../../../helpers/cw';

class Notes extends Component {
  constructor() {
    super();

    this.state = { 
      notes: [],
    };

    this.displayNotes = this.displayNotes.bind(this);
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

  render() {
    this.displayNotes();
    
    return (
      <div>
        <h3>Notes</h3>
        {this.state.notes.map(message => 
          <div key={message.id}>
            <p>{message.text}</p>
            <p>- {message.createdBy}<br />{message.dateCreated}</p>
          </div>
        )}
      </div>
    );
  }
}

export default Notes;
