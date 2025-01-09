const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();

router.post('/auth/login', [
    body('username').trim().escape(),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long').trim().escape()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }

    const { username, password } = req.body;

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
});

module.exports = router;