"use client";

import AdminSidebar from "@/components/layout/AdminSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

export default function Layout({ children }) {
  const { currentUser } = useAuth();

  if (currentUser?.role === "admin") {
    return (
      <div id="admin-container" style={{ display: "flex" }}>
        <div>
          <AdminSidebar />
        </div>
        <div
          id="admin-main"
          style={{
            overflowY: "auto",
            scrollbarWidth: "thin",
            overflowX: "hidden",
          }}
        >
          {children}
        </div>
      </div>
    );
  }
}
