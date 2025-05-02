const {generateToken} = require("../utils/generateToken");
const User = require("../models/user.model")

exports.registerUser = async (req, res) => {
    try {
      const { name, email, password, country } = req.body;
  
      // Check if user already exists
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({
          success: false,
          message: 'User already exists'
        });
      }
  
      // Create user
      const user = await User.create({
        name,
        email,
        password,
        country
      });
  
      // Generate token
      const token = generateToken(user._id);
  
      res.status(201).json({
        success: true,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          country: user.country
        }
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message
      });
    }
  }

  exports.loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check for user
      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }
  
      // Check if password matches
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }
  
      // Generate token
      const token = generateToken(user._id);
  
      res.status(200).json({
        success: true,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          country: user.country
        }
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message
      });
    }
  }