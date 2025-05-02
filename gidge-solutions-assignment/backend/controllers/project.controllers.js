const Project = require("../models/project.model")

exports.fetchProjects = async (req, res) => {
    try {
      const projects = await Project.find({ userId: req.user._id });
      
      res.status(200).json({
        success: true,
        count: projects.length,
        data: projects
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message
      });
    }
  }

  exports.createProject =  async (req, res) => {
    try {
      // Check if user has reached the project limit
      const canCreate = await Project.checkProjectLimit(req.user._id);
      if (!canCreate) {
        return res.status(400).json({
          success: false,
          message: 'You have reached the limit of 4 projects'
        });
      }
  
      // Add user ID to project
      req.body.userId = req.user._id;
      
      const project = await Project.create(req.body);
      
      res.status(201).json({
        success: true,
        data: project
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message
      });
    }
  }

  exports.getSingleProject = async (req, res) => {
    try {
      const project = await Project.findOne({
        _id: req.params.id,
        userId: req.user._id
      });
      
      if (!project) {
        return res.status(404).json({
          success: false,
          message: 'Project not found'
        });
      }
      
      res.status(200).json({
        success: true,
        data: project
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message
      });
    }
  }

  exports.updateProject = async (req, res) => {
    try {
      let project = await Project.findOne({
        _id: req.params.id,
        userId: req.user._id
      });
      
      if (!project) {
        return res.status(404).json({
          success: false,
          message: 'Project not found'
        });
      }
      
      project = await Project.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
      
      res.status(200).json({
        success: true,
        data: project
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message
      });
    }
  }

  exports.deleteProject = async (req, res) => {
    try {
      const project = await Project.findOne({
        _id: req.params.id,
        userId: req.user._id
      });
      
      if (!project) {
        return res.status(404).json({
          success: false,
          message: 'Project not found'
        });
      }
      
      await project.deleteOne();
      
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