import React, { Component } from 'react';

// TODO:
// - remove button
// - ticket budget
// - dispatch hours override
// - total hours for selected tickets

export default class Queue extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <h2>Queue</h2>
        <p>{this.props.selectedTickets.length} tickets selected.</p>
        <ul>
          {this.props.selectedTickets.map(ticket => (
            <li key={ticket.id}>{ticket.id}</li>
          ))}
        </ul>
      </div>
    );
  }
}

