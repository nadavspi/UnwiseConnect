import React, { PureComponent } from 'react';
import { fetchTicketById, updateTicketDetails, fetchTicketNotes } from '../../../helpers/cw';
import { getPhases } from '../helpers';
import EditForm from './EditForm';
import EditModal from './EditModal';

class EditTicketForm extends PureComponent {
  state = {
    budget: '',
    description: '',
    expanded: false,
    fullName: '',
    hasCompletedTicket: false,
    hasSubmittedTicketId: false,
    notes: '',
    phases: [],
    phaseValue: '',
    summary: '',
    ticketDetails: '',
    ticketId: '',
    ticketIdExists: true,
  }

  getTicketDetails = () => {
    setTimeout(() => {
      this.setState({
        hasSubmittedTicketId: true
      });
    }, 300);

    if (!this.state.ticketId) {
      return;
    }

    fetchTicketById(this.state.ticketId).then(res => {
      const phases = getPhases(res, this.props.tickets)

      this.setState({
        budget: res.budgetHours,
        description: this.state.description,
        expanded: true,
        fullName: res.company.name + ' - ' + res.project.name,
        phaseValue: res.phase.name,
        summary: res.summary,
        ticketIdExists: true,
        ticketDetails: res,
        phases,
      });

      this.getDescription()
    }).catch(() => {
      this.setState({
        ticketIdExists: false
      });
    });
  }

  updateTicketDetails = () => {
    updateTicketDetails({
      ticketId: this.state.ticketId,
      budget: this.state.budget,
      initialDescription: this.state.description,
      phaseValue: this.state.phaseValue,
      summary: this.state.summary,
      phaseId: this.state.phases.filter(phase => phase.path === this.state.phaseValue && phase.id)
    }).catch((e) => {
      console.log(e);
    })
  }

  getDescription = () => {
    fetchTicketNotes(this.state.ticketId).then(results => {
      this.setState({
        description: results[0].text
      });
    }).catch((e) => {
      console.log(e);
    })
  }

  setTicketId = ticketId => {
    this.setState({
      hasSubmittedTicketId: false,
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
            <label htmlFor="ticket-number">Ticket Number</label>
            <div className="edit-ticket-input">
            <input
              className="form-control"
              id="ticket-number"
              onChange={(e) => this.setTicketId(e.target.value)}
              type="number"
              placeholder="123456"
              value={this.state.ticketId}
            ></input>
            <button type="button" className="btn btn-default" onClick={this.getTicketDetails}>Edit</button>
          </div>
        </div>
        {!this.state.ticketIdExists && this.state.hasSubmittedTicketId && (
          this.state.ticketId.length === 6 ? (
            <p className="edit-ticket-warning">Cannot find ticket with id: <strong>{this.state.ticketId}</strong></p>
          ) : (
            <p className="edit-ticket-warning">Tickets are 6 digits</p>
          )
        )}
        <EditModal
          contentLabel="Edit Ticket Modal"
          expanded={this.state.expanded}
          toggleEditModal={this.toggleEditModal}
        >
          <EditForm
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
        </EditModal>
      </div>
    )
  }
}


export default EditTicketForm;
