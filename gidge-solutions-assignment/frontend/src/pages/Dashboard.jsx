import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/projects/ProjectCard';
import ProjectForm from '../components/projects/ProjectForm';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);

      const {data} = await axios.get('https://gidge-solutions-assignment-backend.vercel.app/api/projects', {headers: {"Authorization": `Bearer ${token}`}});
      setProjects(data.data);
      setError('');
      console.log(data);
    } catch (err) {
      setError('Failed to load projects');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleProjectCreated = (newProject) => {
    setProjects([...projects, newProject]);
    setIsFormOpen(false);
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await axios.delete(`https://gidge-solutions-assignment-backend.vercel.app/api/projects/${projectId}`, {headers: {"Authorization": `Bearer ${token}`}});
      setProjects(projects.filter(project => project._id !== projectId));
    } catch (err) {
      setError('Failed to delete project');
      console.error(err);
    }
  };

  useEffect(() => {
    if(error) {
      toast.error(error)
    }
  }, [error])

  return (
    <div style={{padding: "10px 1rem"}}>
      <div style={{display: "flex", justifyContent: "space-between", marginBottom: "2rem"}}>
        <h3>My Projects</h3>
        {projects?.length < 4 && (
          <Button 
          variant="outline-secondary"
            className="btn-sm" 
            onClick={() => setIsFormOpen(true)}
          >
            Create New Project
          </Button>
        )}
      </div>

      {isFormOpen && (
         <Modal show={isFormOpen} onHide={() => setIsFormOpen(false)}>
         <Modal.Header closeButton>
           <Modal.Title>Create New Project</Modal.Title>
         </Modal.Header>

         <Modal.Body>
         <ProjectForm 
          onProjectCreated={handleProjectCreated} 
          onCancel={() => setIsFormOpen(false)}
        />
         </Modal.Body>

         <Modal.Footer>
           <Button variant="secondary" onClick={() => setIsFormOpen(false)}>
             Close
           </Button>
         
         </Modal.Footer>
       </Modal>
        
      )}

      {loading ? (
        <div className="loading">Loading projects...</div>
      ) : projects == undefined ? (
        <div>
          <p>You don't have any projects yet.</p>
          <button className="btn btn-primary" onClick={() => setIsFormOpen(true)}>
            Create Your First Project
          </button>
        </div>
      ) : (
        <div>
            <Row>
          {projects.map((project, i) => (
            <Col key={i} sm={6} md={4} lg={3}>
              <div style={{border: "1px solid lightgrey", marginBottom: "2rem", padding: "5px 10px"}}>
              <ProjectCard 
              key={project._id} 
              project={project} 
              onDelete={handleDeleteProject}
            />
              </div>
           
            </Col>
          ))}
            </Row>
        </div>
      )}
    </div>
  );
}

export default Dashboard;