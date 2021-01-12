import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default class Queue extends Component {
  state = {
    expanded: false,
  }

  isOverBudget = (ticket) => {
    return ticket.actualHours > ticket.budgetHours;
  }

  overriddenHours = (ticketId) => {
    const override = this.props.overrideHours.find(ticket => ticket.id === ticketId);
    if (!override) {
      return undefined;
    }

    if (!override.hours) {
      return undefined;
    }

    return Number(override.hours);
  }

  totalBudget = () => {
    const { selectedTickets: tickets } = this.props;
    const totalHours = tickets.map(ticket => {
      const override = this.overriddenHours(ticket.id);
      if (override) {
        return override;
      }

      const remaining = (ticket.budgetHours || 0) - (ticket.actualHours || 0);

      if (remaining < 0) {
        return 0;
      }
      return remaining;
    }).reduce((a, b) => { return a + b }, 0);

    // Round to two digits, then change '1.50' to '1.5' and '1.00' to '1'.
    return totalHours.toFixed(2).replace(/\.?0+$/, '');
  }

  onDragEnd = (e) => {
    if (!e.destination) {
      return null;
    }
    const { draggableId: ticketId } = e;
    const prevIndex = e.source.index;
    const nextIndex = e.destination.index;
    this.props.moveTicket(ticketId, prevIndex, nextIndex);
  }

  render() {
    const selectedTicketCount = this.props.selectedTickets.length;
    const ticketCountText = `${selectedTicketCount} ${selectedTicketCount === 1 ? 'ticket' : 'tickets'}`;

    return (
      <div>
        <button 
          className="btn btn-default btn-queue"
          onClick={() => this.setState({ expanded: !this.state.expanded })}
          style={{ marginTop: '20px', marginBottom: '20px' }}
          type="button"
        >
          <h2 style={{ margin: 0 }}>Queue ({ticketCountText}, {`${this.totalBudget()} ${this.totalBudget() == 1 ? 'hour' : 'hours'}`})</h2>
        </button>
        {this.state.expanded && (
          <div>
            <p>{ticketCountText} selected.</p>
            {this.props.selectedTickets.length > 0 && (
              <button
                onClick={this.props.resetTickets}
                type="button"
              >
                Reset
              </button>
            )}
            <DragDropContext onDragEnd={this.onDragEnd}>
              <Droppable droppableId="queue">
                {(provided, snapshot) => (
                  <ol 
                    ref={provided.innerRef} 
                    style={snapshot.isDraggingOver ? { listStyleType: 'none' } : {} }
                    className="queue-list"
                    {...provided.droppableProps}
                  >
                    {this.props.selectedTickets.map((ticket, index) => (
                      <Draggable
                        draggableId={ticket.id}
                        index={index}
                        key={ticket.id}
                      >
                        {(provided, snapshot) => {
                          const active = {
                            border: '1px solid rebeccapurple',
                            padding: '5px',
                            color: 'rebeccapurple',
                            ...provided.draggableProps.style,
                          }

                          return (
                            <li 
                              style={ this.isOverBudget(ticket) ? { color: 'darkred' } : {} }
                            >
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={snapshot.isDragging ? active : provided.draggableProps.style}
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
                              </div>
                            </li>
                          )}}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ol>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        )}
      </div>
    );
  }
}

