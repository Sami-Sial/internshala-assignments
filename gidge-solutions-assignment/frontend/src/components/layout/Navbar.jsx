import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from 'react-bootstrap/Button';

function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
      <div style={{display: "flex", justifyContent: "space-between", padding: "5px 1rem", borderBottom: "1px solid lightgrey", alignItems: 'center'}}>
        <Link to="/" style={{textDecoration: "none"}}>
          <h4 style={{fontWeight: "bold"}}>Task Tracker</h4>
        </Link>
        <div style={{display: "flex", gap: "1rem", alignItems: "center"}}>
          {currentUser ? (
            <>
              <div style={{fontWeight: "500"}}>
                <span>Welcome, {currentUser.name}</span>
              </div>
              <Button onClick={handleLogout} variant='outline-primary' className='btn-sm'>
                Logout
              </Button>
            </>

          ) : (
            <>
              <Link to="/login" className="btn btn-primary btn-sm">
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary btn-sm" >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
  );
}

export default Navbar