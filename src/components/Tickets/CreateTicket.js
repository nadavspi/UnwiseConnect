import React, { PureComponent } from 'react';
import Autocomplete from 'react-autocomplete';

class CreateTicket extends PureComponent {
  state = {
    expanded: false,
    ticketType: 'default',
    phases: [],
    value: ''
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

    this.props.tickets.map(ticket => {
      phases.push({
        path: ticket.phase.path,
        id: ticket.id
      });
    });
    
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
              <Autocomplete
                items={this.state.phases}
                shouldItemRender={(item, value) => item.path.toLowerCase().indexOf(value.toLowerCase()) > -1}
                getItemValue={item => item.path}
                renderItem={(item, highlighted) =>
                  <div
                    key={item.id}
                    style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
                  >
                    {item.path}
                  </div>
                }
                value={this.state.value}
                onChange={e => this.setState({ value: e.target.value })}
                onSelect={value => this.setState({ value })}
              />
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
