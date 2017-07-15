import React from 'react';

const Projects = props => {
  return (
    <ul style={{ marginBottom: '0px' }}>
      {Object.keys(props.projects).map(projectId => {
        const ticket = props.projects[projectId][0];
        return (
          <li key={projectId}>
            {ticket.company.name} &mdash;
            <button
              type="button"
              className="btn-link"
              onClick={props.searchProject.bind(this, {
                company: ticket.company.name,
                project: ticket.project.name,
              })}
            >
              {ticket.project.name}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Projects;
