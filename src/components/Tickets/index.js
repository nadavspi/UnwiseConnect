import * as TicketsActions from '../../actions/tickets';
import * as UserActions from '../../actions/user';
import AddProject from './AddProject';
import CreateTicketForm from './CreateTicketForm';
import Projects from './Projects';
import React, { Component } from 'react';
import Table from './Table';
import ToggleProjects from './ToggleProjects';
import EditTicketForm from './EditTicketForm';
import classnames from 'classnames';
import sortBy from 'sort-by';
import { connect } from 'react-redux';
import { search } from '../../actions/tickets';

class Tickets extends Component {
  state = {
    expanded: '',
    isEditingTicket: false,
    selectedProject: {},
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.tickets.query !== this.props.tickets.query) {
      this.setSelectedProject();
    }
  }

  setSelectedProject = () => {
    const selectedProject = this.props.tickets.query;

    this.setState({
      selectedProject
    });
  }

  projects = () => {
    // We can use the first ticket from each project to get the project's metadata
    const projects = Object.keys(this.props.tickets.nested).map(projectId => {
      return this.props.tickets.nested[projectId][0];
    });

    return projects.sort(sortBy('company.name', 'project.name'));
  }

  addProject = (projectId) => {
    this.props.dispatch(TicketsActions.updateTickets({ projectId }));
    this.toggleProject(projectId, true);
  }

  toggleProject = (projectId, checked) => {
    this.props.dispatch(UserActions.toggleProject({
      add: checked,
      projectId,
    }));
  }

  toggleColumn = (payload) => {
    this.props.dispatch(UserActions.toggleColumn(payload));
  }

  search = (query, incremental) => {
    let nextQuery = query;
    if (incremental) {
      nextQuery = {
        ...this.props.tickets.query,
        ...query,
      };
    }

    this.props.dispatch(search(nextQuery));
  }

  addNewTicketToColumns = payload => {
    this.props.dispatch(TicketsActions.updateSingleTicket(payload));
  }

  expand = (id) => {
    const isExpanded = this.state.expanded === id;
    let nextState = id;
    if (isExpanded) {
      nextState = '';
    }

    this.setState({ expanded: nextState });
  }

  render() {
    const { expanded } = this.state;
    const addClassnames = classnames('dropdown', {
      'open': expanded === 'addProject',
    });
    return (
      <div>
        <div className="panel-uc panel panel-default">
          <div className="panel-uc__heading panel-heading clearfix">
            <h4>Ticket Center
              {this.props.tickets.loading ? (
                <small> Loading tickets&hellip;</small>
              ) : (
                <small> {this.props.tickets.flattened.length} tickets from {Object.keys(this.props.tickets.nested).length} projects</small>
              )}
            </h4>
            <div className="panel-uc__manage">
              <span className={addClassnames}>
                <button
                  className="btn btn-link dropdown-toggle"
                  type="button"
                  onClick={this.expand.bind(this, 'addProject')}
                >
                  {'Add Project by ID '}
                  <span className="caret"></span>
                </button>
                <div className="dropdown-menu dropdown-menu-right">
                  <AddProject
                    onAdd={this.addProject}
                  />
                </div>
              </span>
              <ToggleProjects />
            </div>
          </div>
          <div className="row panel-body">
            <div className="panel-body projects__wrapper">
              <h2>Active Projects ({this.projects().length})</h2>
              <Projects
                projects={this.projects()}
                searchProject={({ company, project }) => this.search({
                  'company.name': company,
                  'project.name': project,
                }, true)}
              />
            </div>
            <CreateTicketForm
              addNewTicketToColumns={this.addNewTicketToColumns}
              projects={this.projects()}
              selectedProject={this.state.selectedProject}
              tickets={this.props.tickets.flattened}
            />
            {this.props.tickets.flattened.length > 0 && (
              <Table
                id="table-search-tickets"
                query={this.props.tickets.query}
                search={this.search}
                tickets={this.props.tickets.flattened}
                toggleColumn={this.toggleColumn}
                userColumns={this.props.userColumns}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tickets: state.tickets,
  userColumns: state.user.columns,
});

export default connect(mapStateToProps)(Tickets);
