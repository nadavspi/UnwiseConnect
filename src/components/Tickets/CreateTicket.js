import React, { PureComponent } from 'react';

class CreateTicket extends PureComponent {
  state = {
    expanded: false,
  }

  render() {
    
    return (
      <React.Fragment>
        <button className="btn btn-default btn-lg" type="button" aria-label="add">＋ Create Ticket</button>
        {this.state.expanded && (
          <form>
            
          </form>
        )}
      </React.Fragment>
    )
  }
}

export default CreateTicket;
