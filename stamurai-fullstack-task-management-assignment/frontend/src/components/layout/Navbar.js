"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Button from "react-bootstrap/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

function Navbar() {
  const { currentUser, logout } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setError("");
      setLoading(true);

      await logout();
      router.push("/login");
      toast.success("Logged you out!");
    } catch (err) {
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   if (error) {
  //     toast.error(error);
  //   }
  // }, [error]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        height: "3rem",
        alignItems: "center",
        padding: "0 1rem",
        borderBottom: "1px solid lightgrey",
        alignItems: "center",
        backgroundColor: "rgba(000, 000, 000, 0.8)",
      }}
    >
      <Link href="/" style={{ textDecoration: "none" }}>
        <h4 style={{ fontWeight: "bold", color: "white" }}>Taskifyer</h4>
      </Link>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        {currentUser ? (
          <>
            <div style={{ fontWeight: "500", color: "white" }}>
              <span>Welcome, {currentUser.name}</span>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline-primary"
              className="btn-sm"
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link href="/login" className="btn btn-primary btn-sm">
              Login
            </Link>
            <Link href="/register" className="btn btn-primary btn-sm">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default React.memo(Navbar);
