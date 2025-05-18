const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// Import routes
const taskRoutes = require("./routes/task.routes");
const userRoutes = require("./routes/user.routes");
const notificationRoutes = require("./routes/notification.routes");
const Task = require("./models/task.model");
const User = require("./models/user.model");

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/", userRoutes);
app.use("/tasks", taskRoutes);
app.use("/notifications", notificationRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("server is listening on " + PORT);
});

const saveTasks = async () => {
  // 68287daf769fa964ddd5bbe7     68287daf769fa964ddd5bbe6   68287daf769fa964ddd5bbe5   68287daf769fa964ddd5bbe4  68287daf769fa964ddd5bbe3
  const users = await Task.insertMany([
    {
      title: "Set Up CI/CD Pipeline",
      description:
        "Configure continuous integration and deployment using GitHub Actions.",
      dueDate: "2025-05-21",
      priority: "high",
      status: "to-do",
      createdBy: "68287daf769fa964ddd5bbe7",
    },
    {
      title: "Add Dark Mode",
      description: "Implement dark mode toggle in user settings.",
      dueDate: "2025-05-23",
      priority: "medium",
      status: "in-progress",
      createdBy: "68287daf769fa964ddd5bbe7",
    },
    {
      title: "Create User Profile Page",
      description:
        "Build the UI and functionality for user profile management.",
      dueDate: "2025-05-25",
      priority: "high",
      status: "to-do",
      createdBy: "68287daf769fa964ddd5bbe7",
    },
    {
      title: "Write API Documentation",
      description: "Document all API endpoints using Swagger or Postman.",
      dueDate: "2025-05-22",
      priority: "medium",
      status: "review",
      createdBy: "68287daf769fa964ddd5bbe6",
    },
    {
      title: "Setup Email Notifications",
      description: "Enable email notifications for important user actions.",
      dueDate: "2025-05-26",
      priority: "medium",
      status: "to-do",
      createdBy: "68287daf769fa964ddd5bbe6",
    },
    {
      title: "Implement Search Functionality",
      description: "Add search bar with filters to dashboard.",
      dueDate: "2025-05-24",
      priority: "high",
      status: "in-progress",
      createdBy: "68287daf769fa964ddd5bbe6",
    },
    {
      title: "Fix Image Upload Bug",
      description:
        "Resolve the bug causing image uploads to fail intermittently.",
      dueDate: "2025-05-19",
      priority: "high",
      status: "to-do",
      createdBy: "68287daf769fa964ddd5bbe4",
    },
    {
      title: "Database Schema Update",
      description:
        "Update the database schema to support new fields in user data.",
      dueDate: "2025-05-20",
      priority: "medium",
      status: "review",
      createdBy: "68287daf769fa964ddd5bbe4",
    },
    {
      title: "Add Pagination",
      description: "Implement pagination on the product listing page.",
      dueDate: "2025-05-23",
      priority: "low",
      status: "to-do",
      createdBy: "68287daf769fa964ddd5bbe4",
    },
    {
      title: "Code Cleanup",
      description: "Refactor unused imports and dead code across the project.",
      dueDate: "2025-05-22",
      priority: "low",
      status: "completed",
      createdBy: "68287daf769fa964ddd5bbe4",
    },
  ]);

  console.log(users);
};

saveTasks();
