const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const { generateToken } = require("../utils/generateToken");
const userControllers = require("../controllers/user.controllers");

router.post('/signup', userControllers.registerUser);
router.post('/login', userControllers.loginUser);

module.exports = router;