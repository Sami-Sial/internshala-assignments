import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from "axios"

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on page load
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      setCurrentUser(JSON.parse(user));
    }
    
    setLoading(false);
  }, []);

// Login function
const login = async (email, password) => {
    try {
      const {data} = await axios.post('https://gidge-solutions-assignment-backend.vercel.app/api/auth/login', { email, password }, {headers: {"Content-Type": "application/json"}});
            
      // Save to localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      console.log(data);
      setCurrentUser(data.user);
      return data.user;
    } catch (error) {
      console.log(error);
      throw error.response?.data?.message || 'Login failed';
    }
  };

  // Signup function
  const signup = async (userData) => {
    try {
      const {data} = await axios.post('https://gidge-solutions-assignment-backend.vercel.app/api/auth/signup', userData, {headers: {"Content-Type": "application/json"}});
       console.log(data);     
      // Save to localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
            
      setCurrentUser(data.user);
      return data.user;
    } catch (error) {
      console.log(error);
      throw error.response?.data?.message || 'Signup failed';
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}