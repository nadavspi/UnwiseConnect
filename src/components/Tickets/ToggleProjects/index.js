import * as UserActions from '../../../actions/user';
import * as TicketsActions from '../../../actions/tickets';
import Projects from './Projects';
import React, { Component } from 'react';
import classnames from 'classnames';
import enhanceWithClickOutside from 'react-click-outside';
import sortBy from 'sort-by';
import { connect } from 'react-redux';

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

  render() {
    const {expanded, searchTerm} = this.state;
    const userProjects = this.props.userProjects || [];
    const projects = this.props.projects.map(project => {
      return {
        ...project,
        selected: userProjects.indexOf(project.id) > -1,
      };
    });
    const className = classnames('dropdown', {
      'open': expanded,
    });

    const projectSearchResult = projects.filter((project, index, self) => (
      // Remove any duplicate projects from array and match search term
      index === self.findIndex(p => (project.id === p.id))
      && !project.selected
      && (
        project.company.toLowerCase().includes(searchTerm.toLowerCase())
        || project.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    ));

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
        <div
          className="dropdown-menu dropdown-menu-right"
          style={{ width: '700px', height: 'auto', maxHeight: '60vh', overflowY: 'auto', paddingTop: '0' }}
        >
          <div className="form-group project-search">
            <input
              className="form-control"
              type="text"
              placeholder="Project Search"
              value={searchTerm}
              onChange={this.handleSearchChange}
            />
          </div>
          <Projects
            projects={projects.filter(project => project.selected)}
            toggle={this.toggle}
            update={this.updateTickets}
          />
          {(projects.filter(project => project.selected).length ?
            <hr />
          : '')}
          <Projects
            projects={projectSearchResult}
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
