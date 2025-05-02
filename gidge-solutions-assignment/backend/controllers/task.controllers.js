const Task = require('../models/task.model');
const Project = require('../models/project.model');

exports.getAlltasksOfProject = async (req, res) => {
  try {
    const { projectId } = req.query;
    
    // If projectId is provided, filter by project
    const query = projectId 
      ? { projectId, userId: req.user._id }
      : { userId: req.user._id };
    
    const tasks = await Task.find(query);
    
    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
}

exports.createTask = async (req, res) => {
  try {
    const { projectId } = req.body;
    
    // Verify project exists and belongs to user
    const project = await Project.findOne({
      _id: projectId,
      userId: req.user._id
    });
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    // Add user ID to task
    req.body.userId = req.user._id;
    
    const task = await Task.create(req.body);
    
    res.status(201).json({
      success: true,
      data: task
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

exports.getSingleTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user._id
    });
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: task
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
}

exports.updateTask = async (req, res) => {
  try {
    let task = await Task.findOne({
      _id: req.params.id,
      userId: req.user._id
    });
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
    
    // If status is being updated to completed, set completedAt
    if (req.body.status === 'completed' && task.status !== 'completed') {
      req.body.completedAt = new Date();
    } else if (req.body.status !== 'completed') {
      req.body.completedAt = null;
    }
    
    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      data: task
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
}

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user._id
    });
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
    
    await task.remove();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
}