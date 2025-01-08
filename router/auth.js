const express = require("express");

const authRouter = express.Router();

// login route
authRouter.get("/login", (req, res) => {
    res.render('auth/login');
});


// registration routes
authRouter.get("/parent-register", (req, res) => {
    res.render('auth/parent-register')
});

authRouter.get("/teacher-register", (req, res) => {
    res.render('auth/teacher-register')
});

// login endpoint
authRouter.post('/auth/login', (req, res) => {

    const {username, password} = req.body;

    // Mock authentication check
    if (username === 'testuser' && password === 'Password123@') {
        res.status(200).json({
            success: true,
            message: 'Login successful!',
            redirect: '/admin',
        });
    } else {
        res.status(401).json({
            success: false,
            message: 'Invalid username or password.',
            redirect: '/login'
        });
    }
})

module.exports = authRouter;