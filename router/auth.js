const express = require("express");

const authRouter = express.Router();

authRouter.get("/login", (req, res) => {
    res.render('auth/login');
});

module.exports = authRouter;