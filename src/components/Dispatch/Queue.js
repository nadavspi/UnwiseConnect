import React, { Component } from 'react';
import classnames from 'classnames';

// TODO:
// - remove button
// - dispatch hours override
// - total hours for selected tickets

export default class Queue extends Component {
  constructor() {
    super()
  }

  render() {
    const overBudget = ticket => ticket.actualHours > ticket.budgetHours;

    return (
      <div>
        <h2>Queue</h2>
        <p>{this.props.selectedTickets.length} tickets selected.</p>
        <ul>
          {this.props.selectedTickets.map(ticket => (
            <li 
              key={ticket.id}
              style={ overBudget(ticket) ? { color: 'darkred' } : {} }
            >
              {ticket.id} — {ticket.company.name} — {ticket.summary} {' '}
              ({ticket.actualHours || 0} / {ticket.budgetHours || 0}) {' '}
              <button 
                className="btn btn-link"
                onClick={() => this.props.onRemove(ticket.id)}
                type="button"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

