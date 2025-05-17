const Task = require("../models/task.model");
const User = require("../models/user.model");
const Notification = require("../models/notification.model");

exports.getTasksAnalytics = async (req, res) => {
  const overdueTasks = await Task.find({
    dueDate: { $lt: new Date() },
    status: { $ne: "completed" },
  }).countDocuments();

  const tasks = await Task.find();

  console.log(tasks);
  console.log(tasks.length);

  res.json({
    totalTasks: tasks.length,
    overdueTasks: overdueTasks,
    assignedTasks: tasks.filter((task) => task.assignedTo).length,
    completedTasks: tasks.filter((task) => task.status === "completed").length,
    pendingTasks: tasks.filter((task) => task.status === "pending").length,
    todoTasks: tasks.filter((task) => task.status === "to-do").length,
    inReviewTasks: tasks.filter((task) => task.status === "review").length,
    inProgressTasks: tasks.filter((task) => task.status === "in-progress")
      .length,
    mediumPriorityTasks: tasks.filter((task) => task.priority === "medium")
      .length,
    highPriorityTasks: tasks.filter((task) => task.priority === "high").length,
    lowPriorityTasks: tasks.filter((task) => task.priority === "low").length,
  });
};

exports.getAllTasks = async (req, res) => {
  try {
    console.log(req.query);

    const filters = {};

    // Apply filters if provided
    if (req.query.status && req.query.status !== "all")
      filters.status = req.query.status;
    if (req.query.priority && req.query.priority !== "all")
      filters.priority = req.query.priority;

    // Filter by assignedTo or createdBy
    if (req.query.assigned === "me") filters.assignedTo = req.user._id;
    if (req.query.created === "me") filters.createdBy = req.user._id;

    // Search by title or description
    if (req.query.search) {
      filters.$or = [
        { title: { $regex: req.query.search, $options: "i" } },
        { description: { $regex: req.query.search, $options: "i" } },
      ];
    }

    // Due date filters
    if (req.query.dueBefore) {
      filters.dueDate = { $lte: new Date(req.query.dueBefore) };
    }
    if (req.query.dueAfter) {
      if (filters.dueDate) {
        filters.dueDate.$gte = new Date(req.query.dueAfter);
      } else {
        filters.dueDate = { $gte: new Date(req.query.dueAfter) };
      }
    }

    // If overdue flag is set, get tasks that are past due date and not completed
    if (req.query.overdue === true) {
      filters.dueDate = { $lt: new Date() };
      filters.status = { $ne: "completed" };
    }

    // Get tasks with pagination
    let page,
      limit,
      skip = 0;
    if (req.user.role === "user") {
      page = parseInt(req.query.page) || 1;
      limit = parseInt(req.query.limit) || 10;
      skip = (page - 1) * limit;
    }

    const tasks = await Task.find(filters)
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalTasks = await Task.countDocuments(filters);

    res.json({
      tasks,
      page,
      pages: Math.ceil(totalTasks / limit),
      total: totalTasks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      assignedTo = null,
      dueDate,
      priority,
      status,
    } = req.body;

    const task = await Task.create({
      title,
      description,
      createdBy: req.user._id,
      assignedTo: assignedTo,
      dueDate: dueDate,
      priority: priority,
      status: status,
    });

    const populatedTask = await Task.findById(task._id)
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email");

    res.status(201).json(populatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.assignTask = async (req, res) => {
  // Validate assigned user if provided

  try {
    const assignedTo = req.params.userId;
    const taskId = req.params.id;
    console.log(req.body, req.params);

    if (assignedTo) {
      const assignedUser = await User.findById(assignedTo);
      if (!assignedUser) {
        return res.status(400).json({ message: "Assigned user not found" });
      }

      await Task.findByIdAndUpdate(taskId, { assignedTo: assignedTo });
    }

    // Create notification if task is assigned to someone
    if (assignedTo && assignedTo !== req.user._id.toString()) {
      await Notification.create({
        recipient: assignedTo,
        sender: req.user._id,
        task: taskId,
        type: "task_assigned",
        message: `${req.user.name} assigned you a new task: `,
      });
    }

    res.status(200).json({ message: "Task assigned successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email");

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    console.error(error);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { title, description, assignedTo, dueDate, priority, status } =
      req.body;

    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Only allow creator or assignee to update task
    if (
      task.createdBy.toString() !== req.user._id.toString() &&
      (!task.assignedTo ||
        task.assignedTo.toString() !== req.user._id.toString())
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this task" });
    }

    // Check if assignedTo user exists if it's being updated
    if (assignedTo && assignedTo !== task.assignedTo?.toString()) {
      const assignedUser = await User.findById(assignedTo);
      if (!assignedUser) {
        return res.status(400).json({ message: "Assigned user not found" });
      }

      // Create notification for newly assigned user
      await Notification.create({
        recipient: assignedTo,
        sender: req.user._id,
        task: task._id,
        type: "task_assigned",
        message: `${req.user.name} assigned you a task: ${title || task.title}`,
      });
    }

    // If status changed to 'completed', create notification
    if (status === "completed" && task.status !== "completed") {
      // Notify task creator if completed by assignee
      if (
        task.assignedTo &&
        task.assignedTo.toString() === req.user._id.toString() &&
        task.createdBy.toString() !== req.user._id.toString()
      ) {
        await Notification.create({
          recipient: task.createdBy,
          sender: req.user._id,
          task: task._id,
          type: "task_completed",
          message: `${req.user.name} completed the task: ${task.title}`,
        });
      }
    }

    // Update task
    task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title: title || task.title,
        description: description !== undefined ? description : task.description,
        assignedTo: assignedTo || task.assignedTo,
        dueDate: dueDate || task.dueDate,
        priority: priority || task.priority,
        status: status || task.status,
        updatedAt: Date.now(),
      },
      { new: true }
    )
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email");

    res.json(task);
  } catch (error) {
    console.error(error);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Only allow task creator to delete
    if (task.createdBy.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this task" });
    }

    await Task.findByIdAndDelete(req.params.id);

    // Delete associated notifications
    await Notification.deleteMany({ task: req.params.id });

    res.json({ message: "Task removed" });
  } catch (error) {
    console.error(error);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(500).json({ message: "Server error" });
  }
};
