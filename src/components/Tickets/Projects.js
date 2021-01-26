import React from 'react';
import classnames from 'classnames';
import CreateTicketForm from '../Tickets/CreateTicketForm';

const Projects = props => {
  return (
    <div className="projects list-group">
      {props.projects.map(ticket => {
        const className = classnames('list-group-item', {
          'active': props.selectedProject['company.name'] === ticket.company.name,
        });

        return (
          <button
            key={ticket.project.id}
            type="button"
            className={className}
            onClick={props.searchProject.bind(this, {
              company: ticket.company.name,
              project: ticket.project.name,
            })}
          >
            <strong>{ticket.company.name}</strong> &mdash; {ticket.project.name}
            <CreateTicketForm
              addNewTicketToColumns={props.addNewTicketToColumns}
              projects={props.projects}
              selectedProject={props.selectedProject}
              tickets={props.tickets}
              useIcon={true}
            />
          </button>
        );
      })}
    </div>
  );
};

export default Projects;
