const express = require('express');
const router = express.Router();
const Project = require('../models/project.model');
const { protect } = require('../middlewares/auth.middleware');
const projectControllers = require("../controllers/project.controllers")

// Apply auth middleware to all routes
router.use(protect);

router.get('/', projectControllers.fetchProjects);
router.post('/',projectControllers.createProject);
router.get('/:id', projectControllers.getSingleProject);
router.put('/:id', projectControllers.updateProject);
router.delete('/:id', projectControllers.deleteProject);


module.exports = router;