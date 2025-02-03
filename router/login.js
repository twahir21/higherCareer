const express = require("express");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const router = express.Router();

// File imports
const Database = require("../config/databaseConfig");
const sessionMiddleware = require("../middlewares/session");
const trackSession = require("../middlewares/trackSession");
const isAuthenticated = require("../middlewares/auth");

// Middleware usage
router.use(sessionMiddleware); // Apply session middleware for all routes in this router
router.use(trackSession);      // Apply inactivity tracking for all routes

// Login Route
router.post("/auth/login",
    [
        body("username").trim().notEmpty().withMessage("Username is required"),
        body("password")
            .isLength({ min: 8 })
            .withMessage("Password must be at least 8 characters long")
            .trim(),
    ], 
    async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const result = await Database.query(
        `SELECT * FROM admin WHERE username = $1`,
        [username]
      );
  
      if (result.rows.length === 0) {
        return res.status(401).json({
          success: false,
          message: "Invalid username or password.",
          redirect: "/login", // Ensure redirection goes to login if failed
        });
      }
  
      const user = result.rows[0];
      const isPasswordValid = await bcrypt.compare(password, user.pswd);
  
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "Invalid username or password.",
          redirect: "/login", // Ensure redirection goes to login if failed
        });
      }
  
      // Store user details in session
      req.session.user = {
        id: user.id,
        username: user.username,
        role: user.role,
      };
  
      // Redirect to the admin page after successful login
      res.status(200).json({
        success: true,
        message: `Welcome, ${user.username}`,
        redirect: "/admin", // Redirect to admin page on success
      });
    } catch (error) {
      console.error("Error during login:", error.message);
      res.status(500).json({
        success: false,
        message: "Server error. Please try again later.",
      });
    }
  });
  

router.get("/admin", (req, res) => {
    // let frontUsername = req.session.user.username;
    // frontUsername = frontUsername.charAt(0).toUpperCase() + frontUsername.slice(1).toLowerCase();
    res.render("components/admin/index", { message: 'Admin' });
});

router.get("/parent", (req, res) => {
  // let frontUsername = req.session.user.username;
  // frontUsername = frontUsername.charAt(0).toUpperCase() + frontUsername.slice(1).toLowerCase();
  res.render("components/parent/index", 
    { message: 'Parent' }
  );
});

router.get("/teacher", isAuthenticated, (req, res) => {
  let frontUsername = req.session.user.username;
  frontUsername = frontUsername.charAt(0).toUpperCase() + frontUsername.slice(1).toLowerCase();
  res.render("components/teacher/index", { message: frontUsername });
});


router.post("/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        return res.status(500).send("Could not log out.");
      }
      res.redirect("/login");
    });
  });
  

module.exports = router;
