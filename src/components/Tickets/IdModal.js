import classnames from 'classnames';
import React, { Component } from 'react';
import { fetchTicketNotes } from '../../helpers/cw';
class IdModal extends Component {
  constructor() {
    super();

    this.state = { 
      expanded: false, 
      notes: [],
    };

    this.displayNotes = this.displayNotes.bind(this);
    this.expand = this.expand.bind(this);
  }

  displayNotes() {
    console.log(this.props.ticketNumber);
    fetchTicketNotes(this.props.ticketNumber).then(results => {
      console.log(results);
      const notes = results.map(note => ({
        createdBy: note.createdBy,
        dateCreated: note. dateCreated,
        id: note.is,
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
    const className = classnames('btn-group', {
      'open': this.state.expanded,
    });

    return (
      <div className={className}>
        <button 
          className="btn btn-default dropdown-toggle"
          onClick={this.expand}>
          notes
        </button>
        <div className="dropdown-menu">
          {this.state.notes.map(message => 
            <div key={message.id}>
              <p>{message.text}</p>
              <p>{message.createdBy}</p>
              <p>{message.dateCreated}</p>
            </div>
          )}
          <button
            className="btn btn-default"
            onClick={this.expand}>
            close
          </button>
        </div>
      </div>
    );
  }
}

export default IdModal;
