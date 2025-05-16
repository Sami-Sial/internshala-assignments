"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState(null);
  const router = useRouter();

  // Check if user is logged in on page load
  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const { data } = await axios.get("http://localhost:8080/me", {
          withCredentials: true,
        });
        console.log(data);
        setCurrentUser(data);
      } catch (error) {
        console.log(error);
        throw (
          error.response?.data?.message ||
          "Please Login To access this resource"
        );
      }
    };
    getUserProfile();
    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const { data } = await axios.post(
        "http://localhost:8080/login",
        { email, password },
        {
          withCredentials: true,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log(data);
      setCurrentUser(data);
      return data;
    } catch (error) {
      console.log(error);
      throw error.response?.data?.message || "Login failed";
    }
  };

  // Signup function
  const signup = async (userData) => {
    try {
      const { data } = await axios.post(
        "http://localhost:8080/register",
        userData,
        {
          withCredentials: true,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log(data);
      setCurrentUser(data);
      return data;
    } catch (error) {
      console.log(error);
      throw error.response?.data?.message || "Signup failed";
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await axios.get("http://localhost:8080/logout", {
        withCredentials: true,
      });
      setCurrentUser(null);
    } catch (error) {
      console.log(error);
      throw error.response?.data?.message || "Logout failed";
    }
  };

  //Get all users
  const getUsers = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/users", {
        withCredentials: true,
      });
      console.log(data);

      setUsers(data);
    } catch (error) {
      console.log(error);
      throw error.response?.data?.message || "Failed to load users";
    }
  };

  const value = {
    setCurrentUser,
    currentUser,
    login,
    signup,
    logout,
    getUsers,
    users,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
