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
  }

  render() {
    const className = classnames('dropdown', { 
      'open': this.state.expanded,
    });

    return (
      <span className={className}>
        <button 
          className="btn btn-default dropdown-toggle"
          type="button"
          onClick={e => this.setState({ expanded: !this.state.expanded})}
        >
          Toggle Projects {' '}
          <span className="caret"></span>
        </button>
        <div 
          className="dropdown-menu"
          style={{ width: '700px' }}
        >
          <Projects projects={this.props.projects} />
        </div>
      </span>
    );
  }
}

const mapStateToProps = state => ({
  projects: state.projects,
});
export default connect(mapStateToProps)(ToggleProjects);
