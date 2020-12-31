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
      <React.Fragment>
        <button
          className="btn btn-default btn-lg"
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
              <option value="volvo">Project Ticket</option>
              <option value="saab">Service Ticket</option>
            </select>
          </form>
        )}
      </React.Fragment>
    )
  }
}

export default CreateTicket;
