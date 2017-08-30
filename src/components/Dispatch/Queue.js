import React, { Component } from 'react';
import classnames from 'classnames';

// TODO:
// - dispatch hours override

export default class Queue extends Component {
  constructor() {
    super()
  }

  isOverBudget(ticket) {
    return ticket.actualHours > ticket.budgetHours;
  }

  totalBudget() {
    const { selectedTickets: tickets } = this.props;
    return tickets.map(ticket => {
      const remaining = (ticket.budgetHours || 0) - (ticket.actualHours || 0);

      if (remaining < 0) {
        return 0;
      }
      console.log({ remaining });
      return remaining;
    }).reduce((a, b) => { return a + b }, 0);
  }

  render() {
    return (
      <div>
        <h2>Queue ({this.totalBudget()} hours)</h2>
        <p>{this.props.selectedTickets.length} tickets selected.</p>
        <ul>
          {this.props.selectedTickets.map(ticket => (
            <li 
              key={ticket.id}
              style={ this.isOverBudget(ticket) ? { color: 'darkred' } : {} }
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

