"use client";

import { useEffect, useState } from "react";
import UserSidebar from "@/components/layout/UserSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

export default function Layout({ children }) {
  const { currentUser } = useAuth();

  if (currentUser?.role === "user") {
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
