"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const NotificationsContext = createContext();

export function useNotifications() {
  return useContext(NotificationsContext);
}

export function NotificationsProvider({ children }) {
  const [notifications, setNotifications] = useState(null);

  const getUsersNotifications = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/notifications`, {
        withCredentials: true,
      });

      console.log(data);
      setNotifications(data);
    } catch (error) {
      console.log(error);
      throw error.response?.data?.message || "Failed to get notifications";
    }
  };

  const markAsReadAllNotifications = async () => {
    try {
      const { data } = await axios.put(
        `http://localhost:8080/notifications/read-all`,
        {},
        {
          withCredentials: true,
        }
      );

      console.log(data);
      setNotifications(data);
    } catch (error) {
      console.log(error);
      throw error.response?.data?.message || "Failed to get notifications";
    }
  };

  // const markAsReadOneNotification = async (id) => {
  //   try {
  //     const { data } = await axios.put(
  //       `http://localhost:8080/notifications/${id}/read`,
  //       {
  //         withCredentials: true,
  //       }
  //     );

  //     console.log(data);
  //     setNotifications(data);
  //   } catch (error) {
  //     console.log(error);
  //     throw error.response?.data?.message || "Failed to get notifications";
  //   }
  // };

  useEffect(() => {
    getUsersNotifications();
  }, []);

  console.log(notifications);

  const value = {
    notifications,
    setNotifications,
    getUsersNotifications,
    markAsReadAllNotifications,
    // markAsReadOneNotification,
  };

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
}
