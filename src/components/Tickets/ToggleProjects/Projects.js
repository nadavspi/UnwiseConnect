import React from 'react';

const Projects = ({ projects }) => {
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
            <input type="checkbox" style={{ marginRight: '10px' }} />
            {project.company} &mdash; {project.name} ({project.id})
          </label>
        </li>
      ))}
    </ul>
  );
};

export default Projects;
