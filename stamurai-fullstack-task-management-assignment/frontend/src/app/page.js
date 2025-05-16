"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { redirect } from "next/navigation";

export default function Home() {
  const { currentUser } = useAuth();
  console.log(currentUser);

  useEffect(() => {
    if (!currentUser) {
      redirect("/login");
    }
    return;
  }, [currentUser]);

  if (currentUser?.role === "user") {
    redirect("/user/dashboard");
  } else if (currentUser?.role === "admin") {
    redirect("/admin/dashboard");
  }
}
