"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const TasksContext = createContext();

export function useTasks() {
  return useContext(TasksContext);
}

export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState(null);

  const fetchAllTasks = async ({
    created = "",
    assigned = "",
    status = "",
    priority = "",
    dueBefore = "",
    dueAfter = "",
    overdue = false,
    search = "",
  }) => {
    try {
      const { data } = await axios.get(
        `https://nextjs-taskifyer-backend.vercel.app/tasks?created=${created}&assigned=${assigned}&status=${status}&priority=${priority}&dueBefore=${dueBefore}&dueAfter=${dueAfter}&overdue=${overdue}&search=${search}`,
        {
          withCredentials: true,
        }
      );

      setTasks(data);
      console.log(data);
    } catch (error) {
      console.log(error);
      throw error.response?.data?.message || "Failed to fetch tasks";
    }
  };

  const createTask = async (formData) => {
    try {
      const { data } = await axios.post(
        "https://nextjs-taskifyer-backend.vercel.app/tasks",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(data);
    } catch (error) {
      console.log(error);
      throw error.response?.data?.message || "Failed to fetch tasks";
    }
  };

  const updateTask = async (formData, taskId) => {
    try {
      const { data } = await axios.put(
        `https://nextjs-taskifyer-backend.vercel.app/tasks/${taskId}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(data);
    } catch (error) {
      console.log(error);
      throw error.response?.data?.message || "Failed to update task";
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const { data } = await axios.delete(
        `https://nextjs-taskifyer-backend.vercel.app/tasks/${taskId}`,
        {
          withCredentials: true,
        }
      );

      console.log(data);
    } catch (error) {
      console.log(error);
      throw error.response?.data?.message || "Failed to delete task";
    }
  };

  const assignTask = async (assignedTo, id) => {
    console.log(id, assignedTo);

    try {
      const { data } = await axios.post(
        `https://nextjs-taskifyer-backend.vercel.app/tasks/${id}/assign/${assignedTo}`,
        {},
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(data);
    } catch (error) {
      console.log(error);
      throw error.response?.data?.message || "Failed to assign task";
    }
  };

  const value = {
    tasks,
    setTasks,
    fetchAllTasks,
    createTask,
    updateTask,
    deleteTask,
    assignTask,
  };

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
}
