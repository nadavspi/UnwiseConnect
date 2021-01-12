import React, { PureComponent } from 'react';
import { fetchTicketById, updateTicketDetails } from '../../../helpers/cw';
import { getPhases } from '../helpers';
import EditModal from './EditModal';
import TicketForm from './EditForm';

class EditTicketForm extends PureComponent {
  state = {
    budget: '',
    description: '',
    fullName: '',
    hasCompletedTicket: false,
    phases: [],
    phaseValue: '',
    summary: '',
    ticketDetails: '',
    ticketId: '',
    expanded: false
  }

  getTicketDetails = () => {
    fetchTicketById(this.state.ticketId).then(res => {
      const phases = getPhases(res, this.props.tickets)

      this.setState({
        budget: res.budgetHours,
        description: res.description,
        fullName: res.company.name + ' - ' + res.project.name,
        phaseValue: res.phase.name,
        summary: res.summary,
        ticketDetails: res,
        phases,
        expanded: true
      });
    });
  }

  updateTicketDetails = () => {
    updateTicketDetails({
      ticketId: this.state.ticketId,
      budget: this.state.budget,
      description: this.state.description,
      phaseValue: this.state.phaseValue,
      summary: this.state.summary,
      phaseId: this.state.phases.filter(phase => phase.path === this.state.phaseValue && phase.id)
    })
  }

  render() {
    return (
      <div className="edit-ticket-form">
        <div className="edit-ticket-form-actions">
          <button type="button" onClick={this.getTicketDetails}>Edit Ticket</button>
          <div className="edit-ticket-input">
            <label htmlFor="ticket-number">Ticket Number</label>
            <input
              className="form-control"
              id="ticket-number"
              onChange={(e) => this.setTicketId(e.target.value)}
              type="number"
              value={this.state.ticketId}
            ></input>
          </div>
        </div>
      </div>
    )
  }
}


export default EditTicketForm;
