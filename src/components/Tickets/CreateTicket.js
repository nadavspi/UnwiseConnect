import React, { PureComponent } from 'react';
import Autocomplete from 'react-autocomplete';
import { createTicket } from '../../helpers/cw';

class CreateTicket extends PureComponent {
  emptyTicketState = {
    budget: '',
    description: '',
    expanded: false,
    hasCompletedTicket: false,
    initialDescription: '',
    phases: [],
    phaseValue: '',
    projects: [],
    projectValue: '',
    selectedPhase: {},
    selectedProject: {},
    summary: '',
    ticketType: 'default',
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
    })

    // @todo allow service ticket creation
    const serviceTicketDetails = ({
      summary: this.state.summary,
      recordType: 'ServiceTicket',
      company: { id: this.state.selectedProject[0].companyId },
      agreement: '', // where is this?
      budgetHours: this.state.budget,
      initialDescription: this.state.initialDescription,
    })
    
    if (this.state.ticketType === 'project') {
      createTicket(projectTicketDetails);
    }

    if (this.state.ticketType === 'service') {
      createTicket(serviceTicketDetails);
    }
  };

  expandAddTicketForm = () => {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  selectTicketType = event => {
    this.setState({
      ticketType: event.target.value
    })
  }

  getPhases = (selectedProject) => {
    let phases = [];

    this.props.tickets.map(ticket => {
      if (selectedProject[0].id === ticket.project.id) {
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

  resetTicketDetails = () => {
    this.setState({
      ...this.emptyTicketState,
      expanded: true
    });
  }

  render() {
    return (
      <div className="create-ticket-form">
        <button
          className="btn btn-default btn-lg expand"
          type="button"
          aria-label="add"
          onClick={() => this.expandAddTicketForm()}
        >
          {this.state.expanded ? '—' : '＋'} Create Ticket
        </button>
        {this.state.expanded && (
          <form>
            <label htmlFor="type">Type</label>
            <select className="form-control" id="type" name="type" defaultValue={this.state.ticketType} onChange={this.selectTicketType}>
              <option disabled value="default"> - Select Ticket Type - </option>
              <option value="project">Project Ticket</option>
              <option value="service">Service Ticket</option>
            </select>
            {this.state.ticketType === 'project' ? (
              <React.Fragment>
                <div className="autocomplete-field">
                  <label htmlFor="projects">Project</label><br></br>
                  <Autocomplete
                    id="projects"
                    items={this.state.projects}
                    getItemValue={item => item.name}
                    shouldItemRender={(item, value) => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1}
                    renderItem={(item, highlighted) =>
                      <div key={`${item.id}-${item.name}`}>
                        {item.name}
                      </div>
                    }
                    inputProps={{ className: "autocomplete-input" }}
                    value={this.state.projectValue}
                    onChange={e => this.setState({ projectValue: e.target.value })}
                    onSelect={value => {
                      this.setState({
                        projectValue: value,
                        selectedProject: this.state.projects.filter(project => project.name === value),
                      }, this.getPhases(this.state.projects.filter(project => project.name === value)))
                    }}
                  />
                </div>
                <div className="autocomplete-field">
                  {this.state.projectValue && (
                    <React.Fragment>
                      <label htmlFor="phases">Phase</label><br></br>
                      <Autocomplete
                        id="phases"
                        items={this.state.phases}
                        getItemValue={item => item.path}
                        shouldItemRender={(item, value) => item.path.toLowerCase().indexOf(value.toLowerCase()) > -1}
                        renderItem={(item, highlighted) =>
                          <div key={`${item.phaseId}-${item.ticketId}`}>
                            {item.path}
                          </div>
                        }
                        value={this.state.phaseValue}
                        inputProps={{ className: "autocomplete-input" }}
                        onChange={e => this.setState({ phaseValue: e.target.value })}
                        onSelect={value => {
                          this.setState({
                            phaseValue: value,
                            selectedPhase: this.state.phases.filter(phase => phase.path === value),
                          })
                        }}
                      />
                    </React.Fragment>
                  )}
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
                      >
                      </input>
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
                      >
                      </textarea>
                    </div>
                  )}
                  {(this.state.summary && this.state.budget) && (
                    <button
                      type="button"
                      onClick={() => {
                        this.setState({ hasCompletedTicket: true })
                        this.createNewTicket();
                      }}
                      className="btn btn-submit"
                    >
                      Create Ticket
                    </button>
                  )}
                  {(this.state.hasCompletedTicket && (
                    <div>
                      <p>You've created a new <strong>{`${this.state.ticketType}`}</strong> ticket: {'ticketNumber'}</p>
                      <p>{`Project: ${this.state.projectValue}`}</p>
                      <p>{`Phase: ${this.state.phaseValue}`}</p>
                      <p>{`Budget: ${this.state.budget} hours`}</p>
                      <p>{`Summary: ${this.state.summary}`}</p>
                      <button type="button" onClick={() => this.resetTicketDetails()}>Create another ticket</button>
                    </div>
                  ))}
              </React.Fragment>
            ) : (
              console.log('service')
            )}
          </form>
        )}
      </div>
    )
  }
}

export default CreateTicket;
