"use client";

import React, { useEffect } from "react";
import { useTasks } from "@/contexts/TasksContext";
import GroupsIcon from "@mui/icons-material/Groups";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddTaskIcon from "@mui/icons-material/AddTask";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AllOutIcon from "@mui/icons-material/AllOut";

const Tasks = () => {
  const { tasks, setTasks, fetchAllTasks } = useTasks();
  let links;

  useEffect(() => {
    links = document.querySelectorAll(".link");

    links.forEach((link, i, arr) => {
      link.addEventListener("click", (e) => {
        links.forEach((link) => {
          link.classList.remove("active-link");
        });

        e.currentTarget.classList.add("active-link");
      });
    });
  });

  useEffect(() => {
    links[0].classList.add("active-link");

    const getTasks = async () => {
      await fetchAllTasks();
    };
    getTasks();
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: "2rem",
          paddingTop: "8px",
          paddingLeft: "2rem",
          backgroundColor: "lightgrey",
        }}
      >
        <div style={{ display: "flex", gap: "5px" }}>
          <FormatListBulletedIcon />
          <p style={{ cursor: "pointer" }} className="link">
            All Tasks
          </p>
        </div>
        <div style={{ display: "flex", gap: "5px" }}>
          <AssignmentIndIcon />
          <p style={{ cursor: "pointer" }} className="link">
            Assigned to me
          </p>
        </div>
        <div style={{ display: "flex", gap: "5px" }}>
          <AllOutIcon />
          <p style={{ cursor: "pointer" }} className="link">
            Overdue Tasks
          </p>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
