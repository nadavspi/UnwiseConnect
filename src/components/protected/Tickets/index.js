import AddProject from './AddProject';
import Table from './Table';
import React, { Component } from 'react';
import { fetchTickets } from '../../../helpers/cw';
import { ref } from '../../../config/constants';

export default class Tickets extends Component {
  constructor() {
    super();

    this.state = {
      tickets: {
        nested: {},
        flattened: [],
      },
    };

    this.addProject = this.addProject.bind(this);
    this.subscribe = this.subscribe.bind(this);
  }

  componentDidMount() {
    this.subscribe();
  }

  subscribe() {
    const tickets = ref.child('tickets');
    tickets.on('value', snapshot => {
      const nested = snapshot.val();
      const flattened = Object.keys(nested).map(project => nested[project]).reduce((prev, next) => prev.concat(next), []);
      this.setState({
        tickets: {
          flattened,
          nested,
        },
      });
    });
  }

  addProject(projectId) {
    fetchTickets(projectId).then(tickets => {
      ref.child(`tickets/${projectId}`)
        .set(tickets);
    });
  }

  render() {
    return (
      <div>
        <h1>Ticket Center</h1>

        <h2>Add Project</h2>
        <AddProject 
          onAdd={this.addProject}
        />

        <h2>Tickets</h2>
        <p>{this.state.tickets.flattened.length} tickets from {Object.keys(this.state.tickets.nested).length} projects.</p>
        {this.state.tickets.flattened.length > 0 && (
          <Table tickets={this.state.tickets.flattened} />
        )}
    </div>
    );
  }
}
