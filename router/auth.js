const express = require("express");

const authRouter = express.Router();

authRouter.get("/login", (req, res) => {
    res.render('auth/login');
});

authRouter.get("/parent-register", (req, res) => {
    res.render('auth/parent-register')
});

authRouter.get("/teacher-register", (req, res) => {
    res.render('auth/teacher-register')
});

module.exports = authRouter;