import * as UserActions from '../../../actions/user';
import * as TicketsActions from '../../../actions/tickets';
import Projects from './Projects';
import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';

class ToggleProjects extends Component {
  constructor() {
    super();

    this.state = {
      expanded: '',
    }

    this.toggle = this.toggle.bind(this);
    this.updateTickets = this.updateTickets.bind(this);
  }

  toggle(projectId, e) {
    const { checked } = e.target;
    this.props.dispatch(UserActions.toggleProject({
      add: checked,
      projectId,
    }));
  }

  updateTickets(projectId) {
    this.props.dispatch(TicketsActions.updateTickets({ projectId }));
  }

  render() {
    const userProjects = this.props.userProjects || [];
    const projects = this.props.projects.map(project => {
      return {
        ...project,
        selected: userProjects.indexOf(project.id) > -1,
      };
    });
    const className = classnames('dropdown', {
      'open': this.state.expanded,
    });

    return (
      <span className={className}>
        <button
          className="btn btn-default btn-lg dropdown-toggle"
          type="button"
          onClick={e => this.setState({ expanded: !this.state.expanded})}
        >
          Select Projects {' '}
          <span className="caret"></span>
        </button>
        <div
          className="dropdown-menu dropdown-menu-right"
          style={{ width: '700px', height: 'auto', maxHeight: '60vh', overflowY: 'auto' }}
        >
          <Projects
            projects={projects}
            toggle={this.toggle}
            update={this.updateTickets}
          />
        </div>
      </span>
    );
  }
}

const mapStateToProps = state => ({
  projects: state.projects,
  userProjects: state.user.projects,
});
export default connect(mapStateToProps)(ToggleProjects);
