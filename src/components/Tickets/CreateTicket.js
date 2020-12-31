import React, { PureComponent } from 'react';
import Autocomplete from 'react-autocomplete';

class CreateTicket extends PureComponent {
  state = {
    expanded: false,
    ticketType: 'default',
    phases: [],
    projects: [],
    value: '',
    phaseValue: '',
    projectValue: '',
    hasSelectedProject: false,
    hasSelectedPhase: false
  }

  componentDidMount = () => {
    this.getPhases();
    this.getProjects();
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.projects !== this.props.projects) {
      this.getPhases();
      this.getProjects();      
    }
  }
  

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

  getPhases = () => {
    let phases = [];

    this.props.tickets.map(ticket => {
      phases.push({
        path: ticket.phase.path,
        id: ticket.id
      });
    });
    
    this.setState({
      phases
    });
  }

  getProjects = () => {
    let projects = [];

    this.props.projects.map(project => {
      projects.push({
        name: project.company.name,
        id: project.company.id
      });
    });
    
    this.setState({
      projects
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
              <option disabled value="default">Select Ticket Type</option>
              <option value="project">Project Ticket</option>
              <option value="service">Service Ticket</option>
            </select>
            {this.state.ticketType === 'project' ? (
              <React.Fragment>
                <div>
                  <Autocomplete
                    items={this.state.projects}
                    getItemValue={item => item.name}
                    shouldItemRender={(item, value) => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1}
                    renderItem={(item, highlighted) =>
                      <div key={item.id} style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}>
                        {item.name}
                      </div>
                    }
                    value={this.state.projectValue}
                    onChange={e => this.setState({ projectValue: e.target.value })}
                    onSelect={value => {
                      this.setState({
                        projectValue: value,
                        hasSelectedProject: true
                      })
                    }}
                  />
                </div>
                <div>
                  {this.state.hasSelectedProject && (
                    <Autocomplete
                      items={this.state.phases}
                      getItemValue={item => item.path}
                      shouldItemRender={(item, value) => item.path.toLowerCase().indexOf(value.toLowerCase()) > -1}
                      renderItem={(item, highlighted) =>
                        <div key={item.id} style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}>
                          {item.path}
                        </div>
                      }
                      value={this.state.phaseValue}
                      onChange={e => this.setState({ phaseValue: e.target.value })}
                      onSelect={value => {
                        this.setState({
                          phaseValue: value,
                          hasSelectedPhase: true
                        })
                      }}
                    />
                  )}
                </div>
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
