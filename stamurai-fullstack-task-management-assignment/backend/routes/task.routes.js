// routes/tasks.js
const express = require("express");
const router = express.Router();
const { protect, isAdmin } = require("../middlewares/auth.middleware");
const taskControllers = require("../controllers/task.controllers");

router.get("/", protect, taskControllers.getAllTasks);
router.get("/analytics", protect, isAdmin, taskControllers.getTasksAnalytics);
router.post("/", protect, taskControllers.createTask);
router.get("/:id", protect, taskControllers.getTaskById);
router.put("/:id", protect, taskControllers.updateTask);
router.delete("/:id", protect, taskControllers.deleteTask);
router.post("/:id/assign/:userId", protect, taskControllers.assignTask);

module.exports = router;
