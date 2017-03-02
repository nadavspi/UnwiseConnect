import AddProject from './AddProject';
import React, { Component } from 'react';
import { fetchTickets } from '../../../helpers/cw';
import { ref } from '../../../config/constants';

export default class Tickets extends Component {
  constructor() {
    super();

    this.state = {
      projects: {},
    };

    this.addProject = this.addProject.bind(this);
    this.subscribe = this.subscribe.bind(this);
  }

  componentDidMount() {
    this.subscribe();
  }

  subscribe() {
    const projects = ref.child('projects');
    projects.on('value', snapshot => {
      this.setState({
        projects: snapshot.val(),
      });
    });
  }

  addProject(projectId) {
    fetchTickets(projectId).then(tickets => {
      ref.child(`projects/${projectId}/tickets`)
        .set(tickets);
    });
  }

  render() {
    return (
      <div>
        <AddProject 
          onAdd={this.addProject}
        />
      </div>
    );
  }
}
