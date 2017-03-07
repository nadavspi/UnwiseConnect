import React from 'react';

const Projects = props => {
  return (
    <ul>
      {Object.keys(props.projects).map(projectId => {
        const ticket = props.projects[projectId][0];
        return (
          <li key={projectId}>
            {projectId} - {ticket.project.name} ({ticket.company.name}) 
            <button 
              className="btn-link"
              onClick={props.loadProject.bind(this, projectId)}
              type="button"
            >
              Update Tickets
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Projects;
