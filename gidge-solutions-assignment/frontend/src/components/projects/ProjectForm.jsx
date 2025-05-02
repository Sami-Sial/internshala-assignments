import React, { useEffect, useState } from 'react';
import {toast} from "react-toastify";
import axios from 'axios';

function ProjectForm({ onProjectCreated, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

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
      
      const {data} = await axios.post('http://localhost:8080/api/projects', formData, {headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`}});
      onProjectCreated(data.data);
      console.log(data);
    } catch (err) {
      console.log(error);
      setError(err.response?.data?.message || 'Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div className="form-container">
      
      <form onSubmit={handleSubmit}>
        <div className='input' style={{marginBottom: "1rem"}}>
          <label htmlFor="name">Project Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            maxLength="100"
          />
        </div>
        
        <div className='input'>
          <label htmlFor="description">Description</label>
          <textarea
          style={{width: "100%", border: "1px solid lightgrey", borderRadius: "5px", height: "200px"}}
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        
        <div>
          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Project'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProjectForm;