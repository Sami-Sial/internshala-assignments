import React from 'react';
import { Link } from 'react-router-dom';

function ProjectCard({ project, onDelete }) {
  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // confirm deletion
    if (window.confirm('Are you sure you want to delete this project?')) {
      onDelete(project._id);
    }
  };

  const formattedDate = new Date(project.createdAt).toLocaleDateString();

  return (
    <Link to={`/projects/${project._id}`} className="project-card" style={{color: "black", textDecoration: "none"}}>
      <div className="project-card-header">
        <h5>{project.name}</h5>
      </div>
      <div className="project-card-body">
        <p>{project.description.length > 100 
          ? `${project.description.substring(0, 100)}...` 
          : project.description}
        </p>
      </div>
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <small>Created: {formattedDate}</small>
        <button 
          className="btn btn-danger btn-sm" 
          onClick={handleDelete}
          aria-label="Delete project"
        >
          &times;
        </button>
      </div>
    </Link>
  );
}

export default ProjectCard;