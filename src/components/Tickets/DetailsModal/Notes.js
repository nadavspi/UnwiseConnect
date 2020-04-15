import React, { Component } from 'react';
import { fetchTicketNotes } from '../../../helpers/cw';

class Notes extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      notes: [],
    };

    this.displayNotes = this.displayNotes.bind(this);
  }

  componentWillMount() {
    this.displayNotes();
  }

  displayNotes() {
    fetchTicketNotes(this.props.ticketNumber).then(results => {
      const notes = results.map(note => ({
        createdBy: note.member.name,
        dateCreated: (new Date(note.dateCreated)).toLocaleDateString() + ' ' + (new Date(note.dateCreated)).toLocaleTimeString(),
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
    return (
      <div>
        <h4>Notes</h4>
        <div className="ticket-notes">
        {this.state.notes.map(message => 
          <div key={message.id}>
            <p>{message.text}</p>
            <p><strong>{message.createdBy}, {message.dateCreated}</strong></p>
          </div>
        )}
        </div>
      </div>
    );
  }
}

export default Notes;
