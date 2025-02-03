const express = require("express");
const router = express.Router();


router.get("/login", (req, res) => {
    res.render('auth/login');
});

// registration routes
router.get("/parent-register", (req, res) => {
    res.render('auth/parent-register');
});

router.get("/teacher-register", (req, res) => {
    res.render('auth/teacher-register');
});

module.exports = router;