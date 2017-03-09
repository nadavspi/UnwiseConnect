import AddProject from './AddProject';
import Projects from './Projects';
import React, { Component } from 'react';
import Table from './Table';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { fetchTickets } from '../../../helpers/cw';
import { ref } from '../../../config/constants';
import { search, subscribe } from '../../../actions/tickets';

class Tickets extends Component {
  constructor() {
    super();

    this.state = {
      expanded: '',
    }

    this.addProject = this.addProject.bind(this);
    this.search = this.search.bind(this);
    this.expand = this.expand.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(subscribe());
  }

  addProject(projectId) {
    fetchTickets(projectId).then(tickets => {
      ref.child(`tickets/${projectId}`)
        .set(tickets);
    });
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
        <h1>Ticket Center</h1>
        <div className={addClassnames}>
          <button 
            className="btn btn-default dropdown-toggle"
            type="button"
            onClick={this.expand.bind(this, 'addProject')}
          >
            {'Add Project '}
            <span className="caret"></span>
          </button>
          <div className="dropdown-menu">
            <AddProject 
              onAdd={this.addProject}
            />
          </div>
        </div>

        <h2>Loaded Projects</h2>
        <Projects 
          loadProject={this.addProject}
          projects={this.props.tickets.nested} 
          searchProject={project => this.search({ 'project.name': project }, true)}
        />

      <h2>Tickets</h2>
      {this.props.tickets.loading ? (
        <p>Loading tickets&hellip;</p>
      ) : (
        <p>{this.props.tickets.flattened.length} tickets from {Object.keys(this.props.tickets.nested).length} projects.</p>
      )}
      {this.props.tickets.flattened.length > 0 && (
        <Table 
          tickets={this.props.tickets.flattened} 
          query={this.props.tickets.query}
          search={this.search}
        />
      )}
    </div>
    );
  }
}

const mapStateToProps = state => ({
  tickets: state.tickets,
});

export default connect(mapStateToProps)(Tickets);
