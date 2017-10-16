import React, { Component } from 'react';
export default class Queue extends Component {
  constructor() {
    super();

    this.state = {
      expanded: false,
    }
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
      return remaining;
    }).reduce((a, b) => { return a + b }, 0);
  }

  render() {
    return (
      <div>
        <button
          className="btn btn-lg btn-primary"
          onClick={() => this.setState({ expanded: !this.state.expanded })}
          type="button"
        >
          Queue ({this.props.selectedTickets.length} tickets, {this.totalBudget()} hours)
        </button>
        {this.state.expanded && (
          <div>
            <p>{this.props.selectedTickets.length} tickets selected.</p>
            {this.props.selectedTickets.length > 0 && (
              <button
                onClick={this.props.resetTickets}
                type="button"
              >
                Reset
              </button>
            )}
            <ul>
              {this.props.selectedTickets.map(ticket => (
                <li
                  key={ticket.id}
                  style={ this.isOverBudget(ticket) ? { color: 'darkred' } : {} }
                >
                  {ticket.id} — {ticket.company.name} — {ticket.summary} {' '}
                  ({ticket.actualHours || 0} / {ticket.budgetHours || 0}) {' '}
                  <input
                    style={{ width: '45px', marginLeft: '10px' }}
                    type="number"
                    value={ticket.hours}
                    onChange={(e) => this.props.setTicketHours(ticket.id, e.target.value)}
                  />
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
        )}
      </div>
    );
  }
}

