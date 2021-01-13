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
    hasCompletedTicket: false,
    notes: '',
    phases: [],
    phaseValue: '',
    summary: '',
    ticketDetails: '',
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
    updateTicketDetails({
      ticketId: this.props.ticketNumber,
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
    fetchTicketNotes(this.props.ticketNumber).then(results => {
      this.setState({
        description: results[0].text
      });
    }).catch((e) => {
      console.log(e);
    })
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


const mapStateToProps = state => ({
  tickets: state.tickets.flattened,
});

export default connect(mapStateToProps)(EditTicketForm);
