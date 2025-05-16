"use client";

import React, { useEffect, useState } from "react";
import { useTasks } from "@/contexts/TasksContext";
import GroupsIcon from "@mui/icons-material/Groups";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddTaskIcon from "@mui/icons-material/AddTask";
import AssignmentAddIcon from "@mui/icons-material/AssignmentAdd";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import UpdateDisabledIcon from "@mui/icons-material/UpdateDisabled";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { toast } from "react-toastify";
import TaskItem from "./TaskItem";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useNotifications } from "@/contexts/NotificationsContext";

const Tasks = () => {
  const [createTaskModalShow, setCreateTaskModalShow] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
    status: "to-do",
  });
  const [filter, setFilter] = useState({ created: "me" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { tasks, setTasks, fetchAllTasks, createTask } = useTasks();

  let links;

  console.log();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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

      await fetchAllTasks(filter);
    } catch (err) {
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  };

  const getNotifications = async () => {
    try {
      setError("");
      setLoading(true);

      await getUsersNotifications();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);

      await createTask(formData);
      console.log("hello");
      setCreateTaskModalShow(false);

      toast.success("Task Created successfully.");
      getTasks();
    } catch (err) {
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  };

  const searchTasksHandle = () => {
    let searchInput = document.querySelector("#searchInput");
    if (searchInput.value === "") {
      toast.error("Write something to search");
    } else {
      setFilter({
        ...filter,
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
          <h4>Manage Tasks</h4>
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
        <div
          style={{
            display: "flex",
            backgroundColor: "white",
            alignItems: "center",
            marginBottom: "2rem",
            marginTop: "5px",
            gap: "2rem",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              flexGrow: "1",
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
                    created: "me",
                    overdue: false,
                    search: "",
                  })
                }
              >
                My Tasks
              </p>
            </div>
            <div style={{ display: "flex", gap: "5px", marginTop: "10px" }}>
              <AssignmentAddIcon />
              <p
                style={{ cursor: "pointer", padding: "0 3px", width: "100px" }}
                className="link"
                onClick={() =>
                  setFilter({
                    ...filter,
                    assigned: "me",
                    created: "",
                    overdue: false,
                    search: "",
                  })
                }
              >
                Assigned to me
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
                    created: "me",
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

          <div style={{ width: "100px", flexShrink: "0", marginLeft: "auto" }}>
            <Button
              variant="outline-success"
              className="btn-sm"
              onClick={() => setCreateTaskModalShow(true)}
              style={{ marginLeft: "auto", width: "100%" }}
            >
              Create Task
            </Button>
          </div>
        </div>
      </div>

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

      {/* create task modal */}
      <Modal
        show={createTaskModalShow}
        onHide={() => setCreateTaskModalShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={(e) => handleSubmit(e)}
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            <div className="form-group input">
              <label htmlFor="email">Task Title</label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Write task title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group input">
              <label htmlFor="description">Description</label>
              <textarea
                type=""
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              >
                Write Description about task
              </textarea>
            </div>

            <div className="form-group input">
              <label htmlFor="description">Due Date</label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group input">
              <label htmlFor="Priority">Priority</label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                required
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div className="form-group input">
              <label htmlFor="Priority">status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="to-do">Todo</option>
                <option value="in-progress">In Progress</option>
                <option value="review">Review</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Creating Task..." : "Create Task"}
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Tasks;
