import React, { useState } from 'react';
import axios from 'axios';

function TaskUpdateForm({ task, onTaskUpdated, onCancel }) {
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
    status: task.status
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      
      const {data} = await axios.put(`http://localhost:8080/api/tasks/${task._id}`, formData, {headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`}});
      onTaskUpdated(data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="task-update-form">
      <form onSubmit={handleSubmit}>
        <div className="input">
          <label htmlFor="title">Task Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            maxLength="100"
          />
        </div>
        
        <div className="input">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            maxLength="500"></textarea>
            </div>

                  <div className="input">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

         <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={loading}
            onClick={(e) => handleSubmit(e)}
          >
            {loading ? 'Updating...' : 'Update Task'}
          </button>
        </div>
            </form>
            </div>
  )
};

export default TaskUpdateForm;