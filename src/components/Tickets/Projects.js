import React from 'react';

const Projects = props => {
  return (
    <div className="projects list-group">
      {Object.keys(props.projects).map(projectId => {
        const ticket = props.projects[projectId][0];
        return (
          <button
            key={projectId}
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
