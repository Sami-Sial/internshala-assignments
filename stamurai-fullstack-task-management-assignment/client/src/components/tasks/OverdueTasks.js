"use client";

import React, { useEffect, useState } from "react";
import { useTasks } from "@/contexts/TasksContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import TaskItem from "./TaskItem";
import SdCardAlertIcon from "@mui/icons-material/SdCardAlert";

const OverdueTasks = () => {
  const { tasks, setTasks, fetchAllTasks } = useTasks();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getTasks = async () => {
    try {
      setError("");
      setLoading(true);

      await fetchAllTasks({ overdue: true, created: "me" });
    } catch (err) {
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  };

  console.log(tasks);

  useEffect(() => {
    getTasks();
  }, []);
  return (
    <div>
      <h3 style={{ padding: "10px" }}>Overdue Tasks</h3>

      <div>
        <Container fluid>
          <Row>
            {tasks?.tasks?.length > 0 ? (
              tasks?.tasks?.map((task, i) => <TaskItem key={i} task={task} />)
            ) : (
              <div
                style={{
                  display: "flex",
                  marginTop: "5rem",
                  justifyContent: "center",
                }}
              >
                <h5>No Tasks Found</h5>
              </div>
            )}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default OverdueTasks;
