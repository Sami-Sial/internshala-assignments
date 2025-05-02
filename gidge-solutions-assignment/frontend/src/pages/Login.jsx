import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {toast} from "react-toastify"

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

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
      
      await login(formData.email, formData.password);
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
    <div className="auth-form" style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "calc(100vh - 5rem)"
    }}>
      <div  style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "300px",
          padding: "1rem 10px",
          border: "1px solid lightgrey",
          borderRadius: "10px",
          backgroundColor: "f7f8f9",
        }}>
      <h4 className='text-primary' style={{fontWeight: "bold"}}>Login</h4>
      
      <form onSubmit={handleSubmit} style={{display: "flex",flexDirection: "column", gap: "15px"}}>
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
          />
        </div>
        
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      
      <p className="auth-redirect">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
      </div>
    </div>
  );
}

export default Login;