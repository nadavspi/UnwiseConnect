import React from 'react';
import { formatRelative } from 'date-fns';
import './Projects.css';

const Projects = ({ projects, toggle, update }) => {
  return (
    <ul
      className="ToggleProjects__list list-unstyled"
    >
      {projects.map(project => (
        <li
          key={project.id}
          className="ToggleProjects__project"
        >
          <label className="ToggleProjects__label">
            <input
              checked={project.selected}
              className="ToggleProjects__checkbox"
              type="checkbox"
              onChange={toggle.bind(this, project.id)}
            />
            {project.company} &mdash; {project.name} <small><a href={process.env.REACT_APP_CONNECTWISE_SERVER_URL + "/services/system_io/router/openrecord.rails?recordType=ProjectHeaderFV&recid=" + project.id} target="_blank" rel="noopener noreferrer">(ID: {project.id})</a></small>

            <button
              className="btn-link btn-sm"
              onClick={update.bind(this, project.id)}
              type="button"
            >
              {!project.updating ? 'Update Tickets' : 'Updating Tickets...'}
            </button>

            {project.lastUpdated ? (
              <span className="ToggleProjects__updated">Updated {formatRelative(project.lastUpdated, new Date())}</span>
            ) : null}
          </label>
        </li>
      ))}
    </ul>
  );
};

export default Projects;
