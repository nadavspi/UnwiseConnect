import * as TicketsActions from '../../actions/tickets';
import AddProject from '../Tickets/AddProject';
import Projects from '../Tickets/Projects';
import React, { Component } from 'react';
import ToggleProjects from '../Tickets/ToggleProjects';
import classnames from 'classnames';
import sortBy from 'sort-by';
import { connect } from 'react-redux';
import { search } from '../../actions/tickets';
import BudgetHealth from './BudgetHealth';
import BudgetRemaining from './BudgetRemaining';
import PhasesHealth from './PhasesHealth';

class Insights extends Component {
  constructor() {
    super();

    this.state = {
      expanded: '',
    }

    this.addProject = this.addProject.bind(this);
    this.expand = this.expand.bind(this);
    this.projects = this.projects.bind(this);
    this.search = this.search.bind(this);
  }

  projects() {
    // We can use the first ticket from each project to get the project's metadata
    const projects = Object.keys(this.props.tickets.nested).map(projectId => {
      return this.props.tickets.nested[projectId][0];
    });

    return projects.sort(sortBy('company.name', 'project.name'));
  }

  addProject(projectId) {
    this.props.dispatch(TicketsActions.updateTickets({ projectId }));
  }

  search(query, incremental) {
    let nextQuery = query;
    if (incremental) {
      nextQuery = {
        ...this.props.tickets.query,
        ...query,
      };
    }

    this.props.dispatch(search(nextQuery));
  }

  expand(id) {
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
    const ticketCollection = this.props.tickets.flattened;
    const areTicketsLoading = this.props.tickets.loading;

    return (
      <div>
        <div className="panel-uc panel panel-default">
          <div className="panel-uc__heading panel-heading clearfix">
            <h4>Insights
              {areTicketsLoading ? (
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
            <div className="panel-body col-md-6">
              <h2>Active Projects</h2>
              <Projects
                projects={this.projects()}
                searchProject={({ company, project }) => this.search({
                  'company.name': company,
                  'project.name': project,
                }, true)}
              />
            </div>
          </div>
          <div className="row panel-body graphs__wrapper">
            <div className="panel-body col-md-6">
              <BudgetHealth tickets={ticketCollection} loading={areTicketsLoading} />
            </div>
            <div className="panel-body col-md-6">
              <PhasesHealth tickets={ticketCollection} loading={areTicketsLoading} />
            </div>
            <div className="panel-body col-md-6">
              <BudgetRemaining tickets={ticketCollection} loading={areTicketsLoading} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tickets: state.tickets,
});

export default connect(mapStateToProps)(Insights);
