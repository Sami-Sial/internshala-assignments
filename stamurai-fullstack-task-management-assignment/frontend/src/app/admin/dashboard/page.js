"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useTasks } from "@/contexts/TasksContext";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import UpdateDisabledIcon from "@mui/icons-material/UpdateDisabled";
import Button from "react-bootstrap/Button";
import TaskItem from "@/components/tasks/TaskItem";
import { toast } from "react-toastify";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useNotifications } from "@/contexts/NotificationsContext";
import { useAuth } from "@/contexts/AuthContext";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import AdminAnalytics from "@/components/admin/AdminAnalytics";

const page = () => {
  const [showTaskDetailsModal, setShowTaskDetailsModal] = useState(false);
  const [filter, setFilter] = useState({ created: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { tasks, setTasks, fetchAllTasks } = useTasks();
  const { currentUser } = useAuth();

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

  const getTasks = async () => {
    try {
      setError("");
      setLoading(true);

      console.log(filter);

      await fetchAllTasks(filter);
    } catch (err) {
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    links[0].classList.add("active-link");

    getTasks();
  }, []);

  useEffect(() => {
    getTasks();
  }, [filter]);

  const searchTasksHandle = () => {
    let searchInput = document.querySelector("#searchInput");
    if (searchInput.value === "") {
      toast.error("Write something to search");
    } else {
      setFilter({
        ...filter,
        created: "",
        search: searchInput.value,
      });
    }
    searchInput.value = "";
  };

  return (
    <div style={{ padding: "10px" }}>
      <div>
        <div
          id="manage-tasks-top"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <h4>Admin Panel</h4>
        </div>

        <div>
          <AdminAnalytics />
        </div>

        <h4>Tasks</h4>
        <div
          id="admin-task-filter"
          style={{
            display: "flex",
            backgroundColor: "white",
            alignItems: "center",
            marginBottom: "2rem",
            marginTop: "5px",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              overflowX: "auto",
              fontSize: "13px",
              scrollbarWidth: "thin",
              marginTop: "5px",
            }}
          >
            <div style={{ display: "flex", gap: "5px", marginTop: "10px" }}>
              <FormatListBulletedIcon />
              <p
                style={{ cursor: "pointer", padding: "0 3px", width: "60px" }}
                className="link"
                onClick={() =>
                  setFilter({
                    ...filter,
                    assigned: "",
                    created: "",
                    overdue: false,
                    search: "",
                  })
                }
              >
                All Tasks
              </p>
            </div>

            <div style={{ display: "flex", gap: "5px", marginTop: "10px" }}>
              <UpdateDisabledIcon />
              <p
                style={{ cursor: "pointer", padding: "0 3px", width: "60px" }}
                className="link"
                onClick={() =>
                  setFilter({
                    ...filter,
                    assigned: "",
                    created: "",
                    overdue: true,
                    search: "",
                  })
                }
              >
                Overdue
              </p>
            </div>

            <div className="input" style={{ width: "100px" }}>
              <label htmlFor="priority">Priority</label>
              <select
                id="priority"
                name="priority"
                onChange={(e) =>
                  setFilter({ ...filter, priority: e.target.value })
                }
                style={{ width: "100px", padding: "3px 5px" }}
              >
                <option value="all">All</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div className="input" style={{ width: "100px" }}>
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                onChange={(e) =>
                  setFilter({ ...filter, status: e.target.value })
                }
                style={{ width: "100px", padding: "3px 5px" }}
              >
                <option value="all">All</option>
                <option value="to-do">Todo</option>
                <option value="in-progress">In Progress</option>
                <option value="review">Review</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <input
              style={{
                padding: "1px 10px",
                border: "2px solid gray",
                borderRadius: "5px",
              }}
              id="searchInput"
              type="text"
              placeholder="Search tasks by titles and summaries"
            />
            <Button
              variant="outline-dark"
              className="btn-sm"
              onClick={searchTasksHandle}
            >
              Search
            </Button>
          </div>
        </div>
      </div>

      <Container fluid>
        <Row>
          {tasks?.tasks?.length > 0 ? (
            <Table responsive variant="light" striped hover bordered>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Created By</th>
                  <th>Created At</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tasks?.tasks?.map((task, i) => (
                  <>
                    <tr key={i}>
                      <td>{task.title}</td>
                      <td>{task.createdBy?.email}</td>
                      <td>{task.createdAt.slice(0, 10)}</td>
                      <td>{task.status}</td>
                      <td>
                        <Button
                          variant="secondary"
                          className="btn-sm"
                          onClick={() => setShowTaskDetailsModal(true)}
                        >
                          View
                        </Button>
                      </td>
                    </tr>

                    {/*  Task details modal */}
                    <Modal
                      show={showTaskDetailsModal}
                      onHide={() => setShowTaskDetailsModal(false)}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Task Details</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <p>
                          <b>Title:</b> {task.title}
                        </p>
                        <div>
                          <b>Description:</b>
                          <p>{task.description}</p>
                        </div>
                        <p>
                          <b>Created By: </b> {task.createdBy.email}
                        </p>
                        <p>
                          <b>Priority:</b> {task.priority}
                        </p>
                        <p>
                          <b>Status: </b>
                          {task.status}
                        </p>
                        <p>
                          <b>Created At:</b> {task.createdAt.slice(0, 10)}
                        </p>
                        <p>
                          <b>Due Date:</b> {task.dueDate.slice(0, 10)}
                        </p>
                      </Modal.Body>
                    </Modal>
                  </>
                ))}
              </tbody>
            </Table>
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
  );
};

export default page;
