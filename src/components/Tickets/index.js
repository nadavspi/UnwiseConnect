import * as TicketsActions from '../../actions/tickets';
import AddProject from './AddProject';
import Projects from './Projects';
import React, { Component } from 'react';
import Table from './Table';
import ToggleProjects from './ToggleProjects';
import classnames from 'classnames';
import sortOn from 'sort-on';
import { connect } from 'react-redux';
import { search } from '../../actions/tickets';

class Tickets extends Component {
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

    return sortOn(projects, ['company.name', 'project.name']);
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
            {this.props.tickets.flattened.length > 0 && (
              <Table
                query={this.props.tickets.query}
                search={this.search}
                tickets={this.props.tickets.flattened}
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
});

export default connect(mapStateToProps)(Tickets);
