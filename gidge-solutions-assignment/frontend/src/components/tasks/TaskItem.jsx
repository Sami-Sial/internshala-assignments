import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/esm/Button';
import TaskUpdateForm from './TaskUpdateForm';
import Modal from 'react-bootstrap/Modal';


function TaskItem({ task, onTaskUpdated, onTaskDeleted }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const token = localStorage.getItem("token");
  
  const statusColors = {
    'todo': 'status-todo',
    'in-progress': 'status-progress',
    'completed': 'status-completed'
  };
  
  const statusLabels = {
    'todo': 'To Do',
    'in-progress': 'In Progress',
    'completed': 'Completed'
  };

  const handleStatusChange = async (newStatus) => {
    try {
      setIsUpdating(true);
      const response = await axios.put(`https://gidge-solutions-assignment-backend.vercel.app/api/tasks/${task._id}`, {
        ...task,
        status: newStatus
      }, {headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`}});
      onTaskUpdated(response.data.data);
    } catch (err) {
      console.error('Failed to update task status:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`https://gidge-solutions-assignment-backend.vercel.app/api/tasks/${task._id}`, {headers: {"Authorization": `Bearer ${token}`}});
        onTaskDeleted(task._id);
      } catch (err) {
        console.error('Failed to delete task:', err);
      }
    }
  };

  const formattedCreatedDate = new Date(task.createdAt).toLocaleDateString();
  const formattedCompletedDate = task.completedAt 
    ? new Date(task.completedAt).toLocaleDateString() 
    : null;

   

  return (
    <div className={`task-item ${statusColors[task.status]}`}>
      <div className="task-header">
        <h6>{task.title}</h6>
        
      </div>
      
      <div style={{fontSize: "13px", height: "100px", overflowY: "auto", scrollbarWidth: "thin"}} >
        <p >Task Description: {task.description}</p>
      </div>
      
      <div className="task-footer">
        <div className="task-dates">
          <small>Created: {formattedCreatedDate}</small>
          {formattedCompletedDate && (
            <small>Completed: {formattedCompletedDate}</small>
          )}
        </div>
        
        <div className="task-status">
          <span className={`status-badge ${statusColors[task.status]}`}>
            Status: {statusLabels[task.status]}
          </span>

          <div style={{marginTop: "15px"}}>
          <Button  style={{marginBottom: "5px", marginRight: "5px"}}
           variant='outline-secondary'
            className="btn-sm"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
          <Button style={{marginBottom: "5px", marginRight: "5px"}}
          variant='outline-danger' 
            className="btn-sm"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
          
          <div style={{marginTop: "5px"}}>
            {task.status !== 'todo' && (
              <Button style={{marginBottom: "5px", marginRight: "5px"}}
               variant='outline-success'
                className="btn-sm"
                onClick={() => handleStatusChange('todo')}
                disabled={isUpdating}
              >
                Move to Todo
              </Button>
            )}
            
            {task.status !== 'in-progress' && (
              <Button style={{marginBottom: "5px", marginRight: "5px"}}
               variant='outline-success'
                className="btn-sm"
                onClick={() => handleStatusChange('in-progress')}
                disabled={isUpdating}
              >
                Move to In Progress
              </Button>
            )}
            
            {task.status !== 'completed' && (
              <Button style={{marginBottom: "5px", marginRight: "5px"}}
              variant='outline-success'
                className="btn-sm"
                onClick={() => handleStatusChange('completed')}
                disabled={isUpdating}
              >
                Mark Completed
              </Button>
            )}
          </div>
        </div>
      </div>

      {isEditing && <Modal show={isEditing} onHide={() => setIsEditing(false)} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit task</Modal.Title>
        </Modal.Header>
        <Modal.Body>  <TaskUpdateForm 
        task={task}
        onTaskUpdated={(updatedTask) => {
          onTaskUpdated(updatedTask);
          setIsEditing(false);
        }}
        onCancel={() => setIsEditing(false)}
      /></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsEditing(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>}

       
    </div>
  );
}

export default TaskItem;
