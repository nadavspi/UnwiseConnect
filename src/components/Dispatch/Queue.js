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
          className="btn btn-primary"
          onClick={() => this.setState({ expanded: !this.state.expanded })}
          style={{ marginTop: '20px', marginBottom: '20px', marginRight: '5px' }}
          type="button"
        >
          Show queue
        </button>
        <small>({this.props.selectedTickets.length} tickets, {this.totalBudget()} hours)</small>
        {this.state.expanded && (
          <div>
            <p>{this.props.selectedTickets.length} tickets selected.</p>
            {this.props.selectedTickets.length > 0 && (
              <button
                onClick={this.props.resetTickets}
                type="button"
                className="btn btn-danger btn-sm"
                style={{marginBottom: '10px', float: 'right'}}
              >
                Clear queue
              </button>
            )}
            <ul className="dispatch-list">
              {this.props.selectedTickets.map(ticket => (
                <li
                  key={ticket.id}
                  style={ this.isOverBudget(ticket) ? { color: 'darkred' } : {}, { marginBottom: '10px' } }
                >
                  {ticket.id} — {ticket.company.name} — {ticket.summary} {' '}
                  ({ticket.actualHours || 0}hrs / {ticket.budgetHours || 0}hrs) {' '}
                  <div className="form-inline">
                    <div className="form-group">
                      <div
                        className="input-group"
                        style={{ width: '100px', marginLeft: '10px' }}
                      >
                        <input
                          type="number"
                          value={ticket.hours}
                          className="form-control"
                          placeholder="0"
                          min="0"
                          onChange={(e) => this.props.setTicketHours(ticket.id, e.target.value)}
                        />
                        <div className="input-group-addon">hrs</div>
                      </div>
                    </div>
                    <button
                      className="btn btn-danger btn-xs"
                      onClick={() => this.props.onRemove(ticket.id)}
                      type="button"
                      style={{marginLeft: '5px'}}
                    >
                      <span className="glyphicon glyphicon-remove"></span>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

