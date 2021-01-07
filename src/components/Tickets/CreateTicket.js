import React, { PureComponent } from 'react';
import Autocomplete from 'react-autocomplete';
import Modal from 'react-modal';
import { createTicket } from '../../helpers/cw';

class CreateTicket extends PureComponent {
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

    this.setState({
      phases
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
    });
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
        <Modal
          contentLabel="Create Ticket Modal"
          isOpen={this.state.expanded}
          onRequestClose={this.toggleCreateTicketForm}
          overlayClassName="modal-overlay ticket-modal"
          shouldCloseOnOverlayClick={true}
        >
          <form>
            <div>
              <label htmlFor="projects">Project</label><br></br>
              <input
                id="projects"
                className="form-control"
                disabled="disabled"
                value={`${this.props.selectedProject['company.name']} — ${this.props.selectedProject['project.name']}`}
              />
            </div>
            <div className="autocomplete-field">
              <label htmlFor="phases">Phase</label><br></br>
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
            {this.state.phaseValue && (
              <div>
                <label htmlFor="summary">Summary</label>
                <input
                  className="form-control"
                  type="text"
                  id="summary"
                  onChange={(e) => this.setState({ summary: e.target.value })}
                  required
                  autoComplete="off"
                ></input>
              </div>
            )}
            {this.state.summary && (
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
                ></input>
                {this.state.budget > 10 && (<p>Warning: This is a higher than normal budget</p>)}
              </div>
            )}
            {this.state.budget > 0 && (
              <div>
                <label htmlFor="initial-description">Description</label>
                <textarea
                  id="initial-description"
                  rows="4"
                  cols="50"
                  className="form-control"
                  placeholder="This is optional"
                  onChange={(e) => e.target.value.length > 5 && this.setState({ initialDescription: e.target.value })}
                ></textarea>
              </div>
            )}
            {(this.state.summary && this.state.budget) && (
              <button
                type="button"
                className="btn btn-submit btn-primary"
                onClick={() => {
                  this.setState({ hasCompletedTicket: true });
                  this.createNewTicket();
                }}
              >
                Create Ticket
              </button>
            )}
            {(this.state.hasCompletedTicket && (
              <div>
                <p>You created a new ticket:
                  {this.state.newTicketId && (
                    <a
                      href={process.env.REACT_APP_CONNECTWISE_SERVER_URL + `/services/system_io/Service/fv_sr100_request.rails?service_recid=&${this.state.newTicketId}companyName=sd`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {` #${this.state.newTicketId}`}
                    </a>
                  )}
                </p>
                <button type="button" className="btn btn-default btn-md" onClick={() => this.resetTicketDetails()}>Create another ticket</button>
              </div>
            ))}
          </form>
        </Modal>
      </div>
    )
  }
}

export default CreateTicket;
