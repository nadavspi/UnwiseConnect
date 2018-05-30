import React from 'react';

const Projects = ({ projects, toggle, update }) => {
  return (
    <ul
      className="list-unstyled"
      style={{ marginBottom: '0' }}
    >
      {projects.map(project => (
        <li
          key={project.id}
          style={{ display: 'block' }}
        >
          <label style={{ fontWeight: 'normal' }}>
            <input
              checked={project.selected}
              style={{ marginRight: '10px' }}
              type="checkbox"
              onChange={toggle.bind(this, project.id)}
            />
            {project.company} &mdash; {project.name} <small><a href={process.env.REACT_APP_CONNECTWISE_SERVER_URL + "/services/system_io/router/openrecord.rails?recordType=ProjectHeaderFV&recid=" + project.id} target="_blank" rel="noopener">(ID: {project.id})</a></small>

            <button
              className="btn-link btn-sm"
              onClick={update.bind(this, project.id)}
              type="button"
            >
              Update Tickets
            </button>
          </label>
        </li>
      ))}
    </ul>
  );
};

export default Projects;
