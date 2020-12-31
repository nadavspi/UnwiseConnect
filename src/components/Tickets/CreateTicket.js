import React, { PureComponent } from 'react';

class CreateTicket extends PureComponent {
  state = {
    expanded: false,
  }

  expandAddTicketForm = () => {
    this.setState({
      expanded: true
    })
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
          ＋ Create Ticket
        </button>
        {this.state.expanded && (
          <form>
            <label for="type">Type</label>
            <select className="form-control" id="type" name="type">
              <option value="project" selected="selected">Project Ticket</option>
              <option value="service">Service Ticket</option>
            </select>
          </form>
        )}
      </div>
    )
  }
}

export default CreateTicket;
