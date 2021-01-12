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

  setTicketId = ticketId => {
    this.setState({
      ticketId
    });
  }

  toggleEditModal = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  setDescription = description => {
    this.setState({
      description
    });
  }

  setPhaseValue = phaseValue => {
    this.setState({
      phaseValue,
      selectedPhase: this.state.phases.filter(phase => phase.path === phaseValue),
    })
  }

  setSummary = summary => {
    this.setState({
      summary
    });
  }

  setBudget = budget => {
    this.setState({
      budget
    });
  }

  setTicketCompleted = hasCompletedTicket => {
    this.setState({
      hasCompletedTicket
    });
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
        <TicketForm
          budget={this.state.budget}
          description={this.state.description}
          fullName={this.state.fullName}
          phases={this.state.phases}
          phaseValue={this.state.phaseValue}
          setBudget={this.setBudget}
          setDescription={this.setDescription}
          setPhaseValue={this.setPhaseValue}
          setSummary={this.setSummary}
          summary={this.state.summary}
          ticketDetails={this.state.ticketDetails}
          toggleEditModal={this.toggleEditModal}
          updateTicketDetails={this.updateTicketDetails}
        />
      </div>
    )
  }
}


export default EditTicketForm;
