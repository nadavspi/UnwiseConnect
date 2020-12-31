import React, { PureComponent } from 'react';
import Select from 'react-select';

class CreateTicket extends PureComponent {
  state = {
    expanded: false,
    ticketType: 'default',
    phases: []
  }

  componentDidMount = () => {
    this.getPhases();
  }
  

  expandAddTicketForm = () => {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  selectTicketType = event => {
    this.setState({
      ticketType: event.target.value
    })
  }

  getPhases = () => {
    let phases = [];

    const deduplicatedTickets = this.props.tickets.filter((ticket, index, tix) => {
      return tix.findIndex(t => (t.id === ticket.id)) === index;
    });

    if (deduplicatedTickets.length) {
      deduplicatedTickets.map(ticket => {
        phases.push(ticket.phase.path);
      });
    }
    
    this.setState({
      phases
    });
  }

  render() {
    
    return (
      <div className="create-ticket-form">
        <button
          className="btn btn-default btn-lg expand"
          type="button"
          aria-label="add"
          onClick={() => this.expandAddTicketForm()}
        >
          {this.state.expanded ? '—' : '＋'} Create Ticket
        </button>
        {this.state.expanded && (
          <form>
            <label htmlFor="type">Type</label>
            <select className="form-control" id="type" name="type" defaultValue={this.state.ticketType} onChange={this.selectTicketType}>
              <option disabled value="default">Select Ticket Type</option>
              <option value="project">Project Ticket</option>
              <option value="service">Service Ticket</option>
            </select>
            {this.state.ticketType === 'project' ? (
              console.log('project')
            ) : (
              console.log('service')
            )}
          </form>
        )}
      </div>
    )
  }
}

export default CreateTicket;
