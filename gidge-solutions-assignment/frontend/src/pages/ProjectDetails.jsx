import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TaskList from '../components/tasks/TasksList';
import TaskForm from '../components/tasks/TaskForm';
import axios from 'axios';
import {toast} from 'react-toastify';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';

function ProjectDetails() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProjectAndTasks();
  }, [projectId]);

  const fetchProjectAndTasks = async () => {
    try {
      setLoading(true);
      
      // Fetch project details
      const {data} = await axios.get(`https://gidge-solutions-assignment-backend.vercel.app/api/projects/${projectId}`, {headers: {"Authorization": `Bearer ${token}`}});
      setProject(data.data);
      
      // Fetch tasks for this project
      const response = await axios.get(`https://gidge-solutions-assignment-backend.vercel.app/api/tasks?projectId=${projectId}`, {headers: {"Authorization": `Bearer ${token}`}});
      setTasks(response.data.data);
      
      setError('');
    } catch (err) {
      setError('Failed to load project details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskCreated = (newTask) => {
    setTasks([...tasks, newTask]);
    setIsTaskFormOpen(false);
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks(tasks.map(task => 
      task._id === updatedTask._id ? updatedTask : task
    ));
  };

  const handleTaskDeleted = (taskId) => {
    setTasks(tasks.filter(task => task._id !== taskId));
  };

  const handleBackToDashboard = () => {
    navigate('/');
  };

  useEffect(() => {
    if(error) {
      toast.error(error);
    }
  }, [error])

  if (loading) {
    return <div className="loading">Loading project details...</div>;
  }

  if (error) {
    return (
      <div className="error-state">
        <button className="btn btn-primary" onClick={handleBackToDashboard}>
          Go to Dashboard
        </button>
      </div>
    );
  }

  if (!project) {
    return (
       <div className="not-found">
        <h2>Project not found</h2>
        <button className="btn btn-primary" onClick={handleBackToDashboard}>
          Go to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="project-details">
      <div style={{display: "flex", justifyContent: "space-between", padding: "5px 1rem"}}>
        
        <h5>Project: {project.name}</h5>
        <div>
          <Button 
          variant='outline-primary'
          style={{marginRight: "10px"}}
          className="btn-sm" 
          onClick={() => setIsTaskFormOpen(true)}
        >
          Add Task
        </Button>
        <Button 
        variant='outline-secondary'
          className="btn-sm" 
          onClick={handleBackToDashboard}
        >
          Go to Dashboard
        </Button>
        </div>
      </div>
      
      <div style={{padding: "0 1rem"}}>
        <p>{project.description}</p>
        <small>Created on: {new Date(project.createdAt).toLocaleDateString()}</small>
      </div>
      
      <div style={{padding: "1rem"}}>
        <h6 style={{textAlign: "center"}}>Tasks of Project</h6>
        <TaskList 
        tasks={tasks} 
        onTaskUpdated={handleTaskUpdated}
        onTaskDeleted={handleTaskDeleted}
      />
      </div>

    {isTaskFormOpen && 
       <Modal show={isTaskFormOpen} onHide={() => setIsTaskFormOpen(false)} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
 <TaskForm 
          projectId={projectId}
          onTaskCreated={handleTaskCreated}
          onCancel={() => setIsTaskFormOpen(false)}
        />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsTaskFormOpen(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    }
    </div>

    
  );
}

export default ProjectDetails;