const express = require("express");
const { saveToJSONFile } = require("./temp");
const authRouter = express.Router();
const path = require("path");
const fs = require("fs")
const { body, validationResult } = require("express-validator");

// login route
authRouter.get("/login", (req, res) => {
    res.render('auth/login');
});

// registration routes
authRouter.get("/parent-register", (req, res) => {
    res.render('auth/parent-register');
});

authRouter.get("/teacher-register", (req, res) => {
    res.render('auth/teacher-register');
});

// login endpoint
authRouter.post('/auth/login', [
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

// Parent registration endpoint with validation and sanitization
authRouter.post('/auth/parent-register', [
    body('username').isAlphanumeric().withMessage('Username should only contain letters and numbers').trim().escape(),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long').trim().escape(),
    body('email').isEmail().withMessage('Invalid email format').normalizeEmail(),
    body('tel').isMobilePhone().withMessage('Invalid phone number').trim().escape(),
    body('relationship').notEmpty().withMessage('Relationship is required').trim().escape(),
    body('student_fullName').notEmpty().withMessage('Student full name is required').trim().escape(),
    body('student_class').notEmpty().withMessage('Student class is required').trim().escape()
], async (req, res) => {

    const { username, password, fullName, email, tel, relationship, student_fullName, student_class } = req.body;

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }

    const filePath = path.join(__dirname, 'json', 'tempUsers.json');

    // Define the data to be saved
    const newUser = {
        username,
        password,
        fullName,
        email,
        tel,
        relationship,
        student_fullName,
        student_class,
        isApproved: false,
        isVerified: false,
        createdAt: new Date().toISOString()
    };

    try {
        const result = await saveToJSONFile(newUser, filePath);

        if (result.success) {
            return res.status(200).json({
                success: true,
                message: result.message,
                redirect: "/admin"
            });
        } else {
            return res.status(409).json({
                success: false,
                message: result.message, // User already exists
                redirect:"/parent-register"
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while processing the request.',
            redirect: "/"
        });
    }
});


// Route to fetch all users
authRouter.get('/api/users', (req, res) => {
    try {
        const filePath = path.join(__dirname, 'json', 'tempUsers.json');
        const fileData = fs.readFileSync(filePath, 'utf8');
        const users = JSON.parse(fileData);
        res.json(users);
    } catch (error) {
        console.error('Error reading file:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Route to update user approval status
authRouter.patch('/api/users/:username', (req, res) => {
    const { username } = req.params;
    const { isApproved } = req.body;

    try {
        const fileData = fs.readFileSync(filePath, 'utf8');
        let users = JSON.parse(fileData);

        const user = users.find(user => user.username === username);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        user.isApproved = isApproved;

        // Save the updated user data
        fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

        res.json({ success: true, message: `User ${isApproved ? 'accepted' : 'rejected'} successfully.` });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = authRouter;
