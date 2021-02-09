import * as UserActions from '../../../actions/user';
import * as TicketsActions from '../../../actions/tickets';
import Projects from './Projects';
import React, { Component } from 'react';
import classnames from 'classnames';
import enhanceWithClickOutside from 'react-click-outside';
import sortBy from 'sort-by';
import { connect } from 'react-redux';
import './index.css';

class ToggleProjects extends Component {
  state = {
    expanded: '',
    searchTerm: ''
  };

  toggle = (projectId, e) => {
    const { checked } = e.target;
    this.props.dispatch(UserActions.toggleProject({
      add: checked,
      projectId,
    }));
  }

  updateTickets = (projectId) => {
    this.props.dispatch(TicketsActions.updateTickets({ projectId }));
  }

  handleSearchChange = (event) => {
    this.setState({searchTerm: event.target.value});
  }

  handleClickOutside() {
    this.setState({
      expanded: false,
    })
  }

  matchesSearchTerm(value) {
    const { searchTerm } = this.state;
    return value.toLowerCase().includes(searchTerm.toLowerCase());
  }

  mappedProjects() {
    const userProjects = this.props.userProjects || [];
    return this.props.projects.map(project => {
      return {
        ...project,
        selected: userProjects.includes(project.id),
      };
    }).filter((project, index, self) => (
      // Remove any duplicate projects from array and match search term.
      index === self.findIndex(p => project.id === p.id)
      && (this.matchesSearchTerm(project.company) || this.matchesSearchTerm(project.name))
    ));
  }

  render() {
    const { expanded, searchTerm } = this.state;
    const projects = this.mappedProjects();
    const className = classnames('dropdown', {
      'open': expanded,
    });

    const selectedProjects = projects.filter(project => project.selected);
    const availableProjects = projects.filter(project => !project.selected);

    return (
      <span className={className}>
        <button
          className="btn btn-default btn-lg dropdown-toggle"
          type="button"
          onClick={e => this.setState({ expanded: !expanded})}
        >
          My Projects {' '}
          <span className="caret"></span>
        </button>
        <div className="dropdown-menu dropdown-menu-right ToggleProjects__menu">
          <div className="form-group project-search">
            <input
              className="form-control"
              type="search"
              placeholder="Project Search"
              value={searchTerm}
              onChange={this.handleSearchChange}
            />
          </div>
          <Projects
            projects={selectedProjects}
            toggle={this.toggle}
            update={this.updateTickets}
          />
          {(selectedProjects.length ?
            <hr />
          : '')}
          <Projects
            projects={availableProjects}
            toggle={this.toggle}
            update={this.updateTickets}
          />
        </div>
      </span>
    );
  }
}

const mapStateToProps = state => ({
  projects: state.projects.sort(sortBy('company', 'name')),
  userProjects: state.user.projects,
});
export default connect(mapStateToProps)(enhanceWithClickOutside(ToggleProjects));
