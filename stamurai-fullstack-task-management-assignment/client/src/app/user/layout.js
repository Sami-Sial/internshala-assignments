"use client";

import { useEffect, useState } from "react";
import UserSidebar from "@/components/layout/UserSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";
import io from "socket.io-client";
import { useSocket } from "@/contexts/SocketContext";
const ENDPOINT = "http://localhost:8080";

export default function Layout({ children }) {
  const { currentUser } = useAuth();
  let { socket, setSocketConnected } = useSocket();

  // const connectSocket = () => {
  //   socket = io(ENDPOINT, {
  //     transports: ["websocket"], // Force WebSocket only
  //   });
  //   console.log(currentUser);

  //   socket.emit("setup", currentUser);
  //   socket.on("connected", () => setSocketConnected(true));
  // };

  if (currentUser?.role === "user") {
    // connectSocket();
    return (
      <div id="container" style={{ display: "flex" }}>
        <div>
          <UserSidebar />
        </div>
        <div id="user-main" style={{ width: "calc(100vw - 1rem)" }}>
          {children}
        </div>
      </div>
    );
  }
}
