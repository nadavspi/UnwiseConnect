import React, { PureComponent } from 'react';

class CreateTicket extends PureComponent {
  render() {
    emptyTicketState = {
      budget: '',
      description: '',
      expanded: false,
      hasCompletedTicket: false,
      initialDescription: '',
      newTicketId: '',
      phases: [],
      phaseValue: '',
      projects: [],
      projectValue: '',
      selectedPhase: {},
      selectedProject: {},
      summary: '',
      ticketType: 'project',
    }

    state = {
      ...this.emptyTicketState
    }

    return (
      <div>

      </div>
    )
  }
}

export default CreateTicket;
