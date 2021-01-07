import Modal from 'react-modal';
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
        createTicket(projectTicketDetails).then(res => {
          this.setState({
            newTicketId: res.result.id
          })
        })
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

    resetTicketDetails = () => {
      this.setState({
        ...this.emptyTicketState,
      });
    }

    return (
      <div className="create-ticket-form">
        {this.props.selectedProject['company.name'] && (
          <button
            className="btn btn-default btn-md btn-expand"
            type="button"
            onClick={() => this.expandAddTicketForm()}
          >
            {this.state.expanded ? '—' : '＋'} Create Ticket
          </button>
        )}
        <Modal
          contentLabel="Create Ticket Modal"
          isOpen={this.state.expanded}
          overlayClassName="modal-overlay ticket-modal"
          onRequestClose={this.expandAddTicketForm}
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
          </form>
        </Modal>
      </div>
    )
  }
}

export default CreateTicket;
