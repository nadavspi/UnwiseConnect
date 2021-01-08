import React, { PureComponent } from 'react';
import Autocomplete from 'react-autocomplete';
import { createTicket } from '../../../helpers/cw';
import TicketLink from '../TicketLink';
import CreateTicketModal from './CreateTicketModal';

class CreateTicketForm extends PureComponent {
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

    this.setState({
      phases: deduplicatedPhases
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
      initialDescription: this.state.initialDescription,
    });

    // @todo allow service ticket creation
    const serviceTicketDetails = ({
      summary: this.state.summary,
      recordType: 'ServiceTicket',
      company: { id: this.state.selectedProject[0].companyId },
      agreement: '', // where is this?
      budgetHours: this.state.budget,
      initialDescription: this.state.initialDescription,
    });

    if (this.state.ticketType === 'project') {
      createTicket(projectTicketDetails).then(res => {
        this.setState({
          newTicketId: res.result.id
        });
      });
    }

    if (this.state.ticketType === 'service') {
      createTicket(serviceTicketDetails);
    }
  };

  toggleCreateTicketForm = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  selectTicketType = event => {
    this.setState({
      ticketType: event.target.value
    });
  }

  resetTicketDetails = () => {
    this.setState({
      ...this.emptyTicketState,
      expanded: true,
    });

    this.getPhases();
  }

  render() {
    return (
      <div className="create-ticket-form">
        {this.props.selectedProject['company.name'] && (
          <button
            className="btn btn-default btn-md btn-expand"
            type="button"
            onClick={() => this.toggleCreateTicketForm()}
          >
            {this.state.expanded ? '—' : '＋'} Create Ticket
          </button>
        )}
        <CreateTicketModal
          contentLabel="Create Ticket Modal"
          expanded={this.state.expanded}
          toggleCreateTicketForm={this.toggleCreateTicketForm}
        >
          <form>
            <button type="button" className="close-btn btn" aria-label="close" onClick={() => this.toggleCreateTicketForm()}>✕</button>
            <div>
              <label htmlFor="projects">Project</label>
              <input
                id="projects"
                className="form-control"
                disabled="disabled"
                value={`${this.props.selectedProject['company.name']} — ${this.props.selectedProject['project.name']}`}
              />
            </div>
            <div className="autocomplete-field">
              <label htmlFor="phases">Phase</label>
              <Autocomplete
                id="phases"
                items={this.state.phases}
                getItemValue={item => item.path}
                shouldItemRender={(item, value) => item.path.toLowerCase().indexOf(value.toLowerCase()) > -1}
                renderItem={item => (
                  <div key={`${item.phaseId}-${item.ticketId}`}>
                    {item.path}
                  </div>
                )}
                value={this.state.phaseValue}
                inputProps={{ className: "autocomplete-input form-control" }}
                onChange={e => this.setState({ phaseValue: e.target.value })}
                onSelect={value => {
                  this.setState({
                    phaseValue: value,
                    selectedPhase: this.state.phases.filter(phase => phase.path === value),
                  })
                }}
              />
            </div>
            <div>
              <label htmlFor="summary">Summary</label>
              <input
                className="form-control"
                type="text"
                id="summary"
                onChange={(e) => this.setState({ summary: e.target.value })}
                required
                value={this.state.summary}
                autoComplete="off"
              ></input>
            </div>
            <div>
              <label htmlFor="budget-hours">Budget Hours</label>
              <input
                type="number"
                id="budget-hours"
                className="form-control"
                onChange={(e) => this.setState({ budget: e.target.value })}
                required
                min="0"
                step="0.25"
                placeholder="1"
                autoComplete="off"
                value={this.state.budget}
              ></input>
              {this.state.budget > 10 && (<p>Warning: This is a higher than normal budget</p>)}
            </div>
            <div>
              <label htmlFor="initial-description">Description</label>
              <textarea
                id="initial-description"
                rows="4"
                cols="50"
                className="form-control"
                placeholder="This is optional"
                value={this.state.initialDescription}
                onChange={(e) => this.setState({ initialDescription: e.target.value })}
              ></textarea>
            </div>
            <button
              type="button"
              className="btn btn-submit btn-primary"
              disabled={!this.state.budget || !this.state.summary || !this.state.phaseValue}
              onClick={() => {
                this.setState({ hasCompletedTicket: true });
                this.createNewTicket();
              }}
            >
              Create Ticket
            </button>
            {(this.state.hasCompletedTicket && (
              <React.Fragment>
                <div className="new-ticket-message">
                  <p>You created a new ticket:
                    {this.state.newTicketId && (
                      <TicketLink ticketNumber={this.state.newTicketId}/>
                    )}
                  </p>
                </div>
                <button type="button" className="btn btn-default btn-md btn-create-ticket" onClick={() => this.resetTicketDetails()}>Create another ticket</button>
              </React.Fragment>
            ))}
          </form>
        </CreateTicketModal>
      </div>
    )
  }
}

export default CreateTicketForm;
