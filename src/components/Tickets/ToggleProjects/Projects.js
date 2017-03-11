import React from 'react';

const Projects = ({ projects, toggle }) => {
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
            {project.company} &mdash; {project.name} ({project.id})
          </label>
        </li>
      ))}
    </ul>
  );
};

export default Projects;
