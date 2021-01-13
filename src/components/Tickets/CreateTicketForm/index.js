import React, { PureComponent } from 'react';
import { createTicket } from '../../../helpers/cw';
import TicketModal from './TicketModal';
import TicketForm from './TicketForm';
import sortBy from 'sort-by';

class CreateTicketForm extends PureComponent {
  emptyTicketState = {
    budget: '',
    description: '',
    expanded: false,
    hasCompletedTicket: false,
    newTicketId: '',
    phases: [],
    phaseValue: '',
    projects: [],
    projectValue: '',
    selectedPhase: {},
    summary: '',
    ticketType: 'project',
  }

  state = {
    ...this.emptyTicketState,
    selectedProject: {},
  }

  componentDidMount = () => {
    this.getProjects();
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.projects !== this.props.projects) {
      this.getProjects();      
    }

    if (prevProps.selectedProject !== this.props.selectedProject) {
      const { selectedProject } = this.props;

      if (this.state.expanded) {
        this.resetTicketDetails();
      }

      if (selectedProject['project.name']) {
        this.getPhases(this.state.projects.filter(project => (
          project.name === selectedProject['project.name'] &&
          project.company.name === selectedProject['project.company']
        )));

        this.setState({
          selectedProject: this.state.projects.filter(project => (
            project.name === `${selectedProject['company.name']} — ${selectedProject['project.name']}`)
          )
        });
      }
    }
  }

  getPhases = () => {
    let phases = [];
    const { selectedProject } = this.props;

    this.props.tickets.map(ticket => {
      if (selectedProject['project.name'] === ticket.project.name && selectedProject['company.name'] === ticket.company.name) {
        phases.push({
          path: ticket.phase.path,
          phaseId: ticket.phase.id,
          ticketId: ticket.id
        });
      }
    });

    const deduplicatedPhases = phases.reduce((uniquePhases, currentPhase) => {
      if (!uniquePhases.some(phase => phase.path === currentPhase.path)) {
        uniquePhases.push(currentPhase);
      }
      return uniquePhases;
    }, []);

    const sortedDeduplicatedPhases = deduplicatedPhases.sort(sortBy('path'));

    this.setState({
      phases: sortedDeduplicatedPhases
    });
  }

  getProjects = () => {
    let projects = [];

    this.props.projects.map(project => {
      projects.push({
        name: `${project.company.name} — ${project.project.name}`,
        id: project.project.id,
        companyId: project.company.id
      });
    });

    this.setState({
      projects
    });
  }

  createNewTicket = () => {
    const projectTicketDetails = ({
      summary: this.state.summary,
      recordType: 'ProjectTicket',
      company: { id: this.state.selectedProject[0].companyId },
      project: { id: this.state.selectedProject[0].id },
      phase: { id: this.state.selectedPhase[0].phaseId },
      budgetHours: this.state.budget,
      initialDescription: this.state.description,
    });

    // @todo allow service ticket creation
    const serviceTicketDetails = ({
      summary: this.state.summary,
      recordType: 'ServiceTicket',
      company: { id: this.state.selectedProject[0].companyId },
      agreement: '', // where is this?
      budgetHours: this.state.budget,
      initialDescription: this.state.description,
    });

    if (this.state.ticketType === 'project') {
      createTicket(projectTicketDetails).then(res => {
        this.setState({
          newTicketId: res.result.id,
        });
        this.props.addNewTicketToColumns(res);
      });
    }

    if (this.state.ticketType === 'service') {
      createTicket(serviceTicketDetails);
    }
  };

  toggleTicketModal = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  resetTicketDetails = () => {
    this.setState({
      ...this.emptyTicketState,
      expanded: true,
    });

    this.getPhases();
  }

  setDescription = description => {
    this.setState({ description });
  }

  setPhaseValue = phaseValue => {
    this.setState({
      phaseValue,
      selectedPhase: this.state.phases.filter(phase => phase.path === phaseValue),
    })
  }
  
  setSummary = summary => {
    this.setState({ summary });
  }

  setBudget = budget => {
    this.setState({ budget });
  }

  setTicketCompleted = hasCompletedTicket => {
    this.setState({ hasCompletedTicket });
  }

  render() {
    return (
      <div className="create-ticket-form">
        {this.props.selectedProject['company.name'] && (
          <button
            className="btn btn-default btn-md btn-expand"
            type="button"
            onClick={() => this.toggleTicketModal()}
          >
            {this.state.expanded ? '—' : '＋'} Create Ticket
          </button>
        )}
        <TicketModal
          contentLabel="Create Ticket Modal"
          expanded={this.state.expanded}
          toggleTicketModal={this.toggleTicketModal}
        >
          <TicketForm
            budget={this.state.budget}
            createNewTicket={this.createNewTicket}
            description={this.state.description}
            expanded={this.state.expanded}
            hasCompletedTicket={this.state.hasCompletedTicket}
            newTicketId={this.state.newTicketId}
            phases={this.state.phases}
            phaseValue={this.state.phaseValue}
            projects={this.state.projects}
            projectValue={this.state.projectValue}
            resetTicketDetails={this.resetTicketDetails}
            selectedPhase={this.state.selectedPhase}
            selectedProject={this.props.selectedProject}
            setBudget={this.setBudget}
            setDescription={this.setDescription}
            setPhaseValue={this.setPhaseValue}
            setSummary={this.setSummary}
            setTicketCompleted={this.setTicketCompleted}
            summary={this.state.summary}
            ticketType={this.state.ticketType}
            toggleTicketModal={this.toggleTicketModal}
          />
        </TicketModal>
      </div>
    )
  }
}

export default CreateTicketForm;
