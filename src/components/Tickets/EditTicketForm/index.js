import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import { fetchTicketById, updateTicketDetails, fetchTicketNotes } from '../../../helpers/cw';
import { getPhases } from '../helpers';
import { editIcon } from '../../../helpers/svgs';
import EditForm from './EditForm';
import EditModal from './EditModal';

class EditTicketForm extends PureComponent {
  state = {
    budget: '',
    description: '',
    expanded: false,
    fullName: '',
    hasChangedPhase: false,
    hasCompletedTicket: false,
    notes: '',
    phases: [],
    phaseValue: '',
    summary: '',
    ticketDetails: '',
    updatingTicket: false,
  }

  getTicketDetails = () => {
    fetchTicketById(this.props.ticketNumber).then(res => {
      const phases = getPhases(res, this.props.tickets)

      this.setState({
        budget: res.budgetHours,
        description: this.state.description,
        expanded: true,
        fullName: res.company.name + ' - ' + res.project.name,
        phaseValue: res.phase.name,
        summary: res.summary,
        ticketDetails: res,
        phases,
      });

      this.getDescription()
    }).catch((e) => {
      console.log(e)
    });
  }

  updateTicketDetails = () => {
    this.setState({
      updatingTicket: true,
    });

    this.setTicketCompleted();
    updateTicketDetails({
      ticketId: this.props.ticketNumber,
      budget: this.state.budget,
      initialDescription: this.state.description,
      phase: this.state.hasChangedPhase ? this.state.selectedPhase : this.state.phases.filter(phase => phase.id === this.state.ticketDetails.phase.id),
      summary: this.state.summary,
    }).then(() => {
      this.setState({
        updatingTicket: false,
      });
    }).catch((e) => {
      console.log(e);
    })
  }

  getDescription = () => {
    fetchTicketNotes(this.props.ticketNumber).then(results => {
      if (!results || !results[0] || !results[0].text) {
        return;
      }

      this.setState({
        description: results[0].text
      });
    }).catch((e) => {
      console.log(e);
    })
  }

  toggleEditModal = () => {
    this.setState({
      expanded: !this.state.expanded,
      hasCompletedTicket: false,
    });
  }

  setDescription = description => {
    this.setState({
      description
    });
  }

  setPhaseValue = phaseValue => {
    this.setState({
      hasChangedPhase: true,
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

  setTicketCompleted = () => {
    this.setState({
      hasCompletedTicket: true
    });
  }

  render() {
    return (
      <div className="edit-ticket-form">
        <div className="edit-ticket-form-actions">
          <button type="button" className="btn btn-default" onClick={this.getTicketDetails}>{editIcon}</button>
        </div>
        <EditModal
          contentLabel="Edit Ticket Modal"
          expanded={this.state.expanded}
          toggleEditModal={this.toggleEditModal}
        >
          <EditForm
            budget={this.state.budget}
            description={this.state.description}
            fullName={this.state.fullName}
            hasCompletedTicket={this.state.hasCompletedTicket}
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
            updatingTicket={this.state.updatingTicket}
          />
        </EditModal>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  tickets: state.tickets.flattened,
});

export default connect(mapStateToProps)(EditTicketForm);
