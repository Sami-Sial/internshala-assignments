"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const SocketContext = createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }) {
  const [socketConnected, setSocketConnected] = useState(false);
  let socket;

  const value = {
    socketConnected,
    setSocketConnected,
    socket,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
}
