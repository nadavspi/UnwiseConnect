import React, { Component } from 'react';

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
          {this.props.selectedTickets.map(id => (
            <li key={id}>{id}</li>
          ))}
        </ul>
      </div>
    );
  }
}

