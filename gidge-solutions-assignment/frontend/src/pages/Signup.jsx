import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {toast} from "react-toastify";

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }
    
    try {
      setError('');
      setLoading(true);
      
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        country: formData.country
      };
      
      await signup(userData);
      navigate('/');
    } catch (err) {
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  };

 useEffect(() => {
     if(error) {
      toast.error(error);
     }
  }, [error]) 

  return (
    <div className="auth-form"  style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "calc(100vh - 3rem)"
    }}>
      <div   
      style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "300px",
          padding: "1rem 10px",
          border: "1px solid lightgrey",
          borderRadius: "10px",
          backgroundColor: "f7f8f9",
        }}>
      <h4 className='text-primary' style={{fontWeight: "bold"}}>Sign Up Task Tracker</h4>
      
      <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", gap: "15px"}}>
        <div className="form-group input">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder='Jane Doe'
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group input">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder='example@gmail.com'
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group input">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder='write password'
            value={formData.password}
            onChange={handleChange}
            required
            minLength="6"
          />
        </div>
        
        <div className="form-group input">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
          placeholder='confirm password'
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            minLength="6"
          />
        </div>
        
        <div className="form-group input">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            name="country"
            placeholder='e.g. Pakistan'
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>
        
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>
      
      <p className="auth-redirect">
        Already have an account? <Link to="/login">Login</Link>
      </p>
      </div>
    </div>
  );
}

export default Signup;