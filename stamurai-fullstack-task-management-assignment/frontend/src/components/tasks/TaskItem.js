import React, { useState } from "react";

import Col from "react-bootstrap/Col";
import { useTasks } from "@/contexts/TasksContext";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import { toast } from "react-toastify";
import { useAuth } from "@/contexts/AuthContext";

const TaskItem = ({ task }) => {
  const [editModalShow, setEditModalShow] = useState(false);
  const [viewDetailsModalShow, setViewDetailsModalShow] = useState(false);
  const [assignTaskModalShow, setAssignTaskModalShow] = useState(false);
  const [assignedTo, setAssignedTo] = useState(null);
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority,
    dueDate: task.dueDate.slice(0, 10),
    status: task.status,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { users, getUsers } = useAuth();
  const { fetchAllTasks, updateTask, tasks, deleteTask, assignTask } =
    useTasks();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);

      await updateTask(formData, task._id);
      console.log("hello");
      setEditModalShow(false);

      toast.success("Task updated successfully.");
      await fetchAllTasks();
    } catch (err) {
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  };

  const deleteTaskHandle = async () => {
    try {
      setError("");
      setLoading(true);

      await deleteTask(task._id);
      console.log("hello");

      toast.success("Task removed successfully.");
      await fetchAllTasks();
    } catch (err) {
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  };

  const showAssignModalHandle = async () => {
    setAssignTaskModalShow(true);
    try {
      setError("");

      await getUsers();
      console.log(users);
    } catch (err) {
      console.log(error);

      setError(err.toString());
    } finally {
      setLoading(false);
    }
  };

  const assignUserHandle = (e, user) => {
    console.log(user, e.currentTarget);

    document.querySelectorAll(".user-list-item").forEach((item) => {
      item.style.backgroundColor = "white";
    });

    e.currentTarget.style.backgroundColor = "gray";

    setAssignedTo(user);
  };

  const assignTaskHandle = async () => {
    try {
      setError("");
      setLoading(true);

      await assignTask(assignedTo._id, task._id);
      console.log("hello");
      setAssignTaskModalShow(false);

      toast.success("Task assigned successfully.");
      await fetchAllTasks();
    } catch (err) {
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Col sm="6" md="4" lg="3">
        <div
          style={{
            padding: "10px",
            border: "2px solid lightgrey",
            backgroundColor: "rgba(211, 211, 211, 0.3)",
            borderRadius: "10px",
            marginBottom: "1rem",
          }}
        >
          <h6>{task.title}</h6>
          <p
            style={{
              height: "80px",
              overflowX: "auto",
              scrollbarWidth: "thin",
              fontSize: "13px",
            }}
          >
            {task.description}
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p style={{ fontSize: "12px" }}>
              {task.createdAt.toString().slice(0, 10)}
            </p>
            <p style={{ color: "green", fontSize: "13px" }}>{task.priority}</p>

            <Dropdown style={{ marginBottom: "15px" }}>
              <Dropdown.Toggle
                variant="outline-secondary"
                style={{ padding: "0 5px 0 0" }}
                className="btn-sm"
              >
                <MoreHorizIcon />
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ fontSize: "18px" }}>
                <Dropdown.Item onClick={() => setEditModalShow(true)}>
                  Edit
                </Dropdown.Item>
                <Dropdown.Item onClick={deleteTaskHandle}>Delete</Dropdown.Item>
                <Dropdown.Item onClick={() => setViewDetailsModalShow(true)}>
                  View Deatils
                </Dropdown.Item>
                <Dropdown.Item onClick={() => showAssignModalHandle()}>
                  Assign Task
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </Col>

      {/* edit task modal */}
      <Modal show={editModalShow} onHide={() => setEditModalShow(false)}>
        <Modal.Header closeButton disabled={loading ? true : false}>
          <Modal.Title>Edit Task</Modal.Title>
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
              {loading ? "Updating Task..." : "Update Task"}
            </button>
          </form>
        </Modal.Body>
      </Modal>

      {/* view details task modal */}

      <Modal
        show={viewDetailsModalShow}
        onHide={() => setViewDetailsModalShow(false)}
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
          {task.assignedTo ? (
            <p>
              <b>Assigned To:</b> {task.assignedTo.name} (Email:{" "}
              {task.assignedTo.email})
            </p>
          ) : (
            <></>
          )}
        </Modal.Body>
      </Modal>

      {/* assign task modal */}

      <Modal
        show={assignTaskModalShow}
        onHide={() => setAssignTaskModalShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Assign Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Click on user and then click on assign button to assign this task to
            user.
          </p>

          <div>
            <input
              type="text"
              placeholder="Search users by names"
              style={{
                width: "100%",
                borderRadius: "5px",
                padding: "0 10px",
                border: "2px solid blue",
              }}
            />
          </div>

          <div
            style={{
              margin: "auto",
              padding: "1rem 0",
            }}
          >
            <h6>Users of Taskifyer</h6>
            <div
              style={{
                height: "250px",
                overflowX: "auto",
                scrollbarWidth: "thin",
              }}
            >
              {users?.map((user, i) => (
                <div
                  className="user-list-item"
                  key={i}
                  style={{
                    fontSize: "14px",
                    border: "1px solid lightgrey",
                    borderRadius: "5px",
                    marginBottom: "5px",
                    cursor: "pointer",
                    padding: "0 10px",
                  }}
                  onClick={(e) => assignUserHandle(e, user)}
                >
                  <h6 style={{ padding: "0", margin: "0" }}>{user.name}</h6>
                  <p style={{ padding: "0", margin: "0" }}>
                    Email: {user.email}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <button
            className="btn btn-sm btn-primary"
            disabled={loading || !assignedTo ? true : false}
            onClick={assignTaskHandle}
          >
            Assign Task
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TaskItem;
