const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user.controllers");
const { protect } = require("../middlewares/auth.middleware");

router.post("/register", userControllers.registerUser);
router.post("/login", userControllers.loginUser);
router.get("/logout", protect, userControllers.logoutUser);
router.get("/me", protect, userControllers.getUserProfile);
router.get("/users", protect, userControllers.getUsersForTaskAssignment);
router.get("/users/search", protect, userControllers.searchUsers);

module.exports = router;
