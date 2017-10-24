import React from 'react';

const Projects = props => {
  return (
    <div className="projects list-group">
      {props.projects.map(ticket => {
        return (
          <button
            key={ticket.project.id}
            type="button"
            className="list-group-item"
            onClick={props.searchProject.bind(this, {
              company: ticket.company.name,
              project: ticket.project.name,
            })}
          >
            <strong>{ticket.company.name}</strong> &mdash; {ticket.project.name}
          </button>
        );
      })}
    </div>
  );
};

export default Projects;
