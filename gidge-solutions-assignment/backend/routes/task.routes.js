// routes/tasks.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth.middleware');
const taskControllers = require("../controllers/task.controllers")

// Apply auth middleware to all routes
router.use(protect);

router.get('/', taskControllers.getAlltasksOfProject);
router.post('/', taskControllers.createTask)
router.get('/:id', taskControllers.getSingleTask);
router.put('/:id', taskControllers.updateTask);
router.delete('/:id', taskControllers.deleteTask);

module.exports = router;