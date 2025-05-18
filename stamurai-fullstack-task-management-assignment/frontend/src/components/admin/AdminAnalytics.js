"use client";

import { useTasks } from "@/contexts/TasksContext";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const AdminAnalytics = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [taskAnalytics, setTasksAnalytics] = useState(null);

  useEffect(() => {
    const getTasksAnalytics = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8080/tasks/analytics",
          { withCredentials: true }
        );

        setTasksAnalytics(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    getTasksAnalytics();
  }, []);
  return (
    <div>
      <h4>Analytics</h4>

      <Row>
        <Col style={{ marginBottom: "1rem" }}>
          <div
            style={{
              border: "2px solid gray",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <h6>All Tasks</h6>
            <div style={{ display: "flex", gap: "1rem" }}>
              <div>
                <p>All</p>
                <p>| {taskAnalytics?.totalTasks}</p>
              </div>
              <div>
                <p>Overude</p>
                <p>| {taskAnalytics?.overdueTasks}</p>
              </div>
              <div>
                <p>Assigned</p>
                <p>| {taskAnalytics?.assignedTasks}</p>
              </div>
            </div>
          </div>
        </Col>

        <Col style={{ marginBottom: "1rem" }}>
          <div
            style={{
              border: "2px solid gray",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <h6>Priority Tasks</h6>
            <div style={{ display: "flex", gap: "1rem" }}>
              <div>
                <p>High</p>
                <p>| {taskAnalytics?.highPriorityTasks}</p>
              </div>
              <div>
                <p>Medium</p>
                <p>| {taskAnalytics?.mediumPriorityTasks}</p>
              </div>
              <div>
                <p>Low</p>
                <p>| {taskAnalytics?.lowPriorityTasks}</p>
              </div>
            </div>
          </div>
        </Col>

        <Col style={{ marginBottom: "1rem" }}>
          <div
            style={{
              border: "2px solid gray",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <h6>Tasks Status</h6>
            <div style={{ display: "flex", gap: "1rem" }}>
              <div>
                <p>Completed</p>
                <h6>| {taskAnalytics?.completedTasks}</h6>
              </div>
              <div>
                <p>Progress</p>
                <p>| {taskAnalytics?.inProgressTasks}</p>
              </div>
              <div>
                <p>Review</p>
                <p>| {taskAnalytics?.inReviewTasks}</p>
              </div>
              <div>
                <p>Todo</p>
                <p>| {taskAnalytics?.todoTasks}</p>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AdminAnalytics;
