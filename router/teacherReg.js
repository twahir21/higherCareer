const express = require("express");
const { saveToJSONFile } = require("./temp");
const router = express.Router();
const path = require("path");
const { body, validationResult } = require("express-validator");

router.post('/auth/teacher-register', [
    body('username').isAlphanumeric().withMessage('Username should only contain letters and numbers').trim().escape(),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long').trim().escape(),
    body('email').isEmail().withMessage('Invalid email format').normalizeEmail(),
    body('tel').isMobilePhone().withMessage('Invalid phone number').trim().escape(),
    body('qualifications').notEmpty().withMessage('Qualification is required').trim().escape(),
    body('fullName').notEmpty().withMessage('Your full name is required').trim().escape(),
    body('subjectTaught').notEmpty().withMessage('Subject Taught field is required').trim().escape()
], async (req, res) => {

    const { username, password, fullName, email, tel, qualifications, subjectTaught } = req.body;

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: errors.array()[0].msg, redirect: "/teacher-register" });
    }

    const filePath = path.join(__dirname, 'json', 'tempUsers.json');

    // Define the data to be saved
    const newUser = {
        username,
        password,
        fullName,
        email,
        tel,
        qualifications,
        subjectTaught,
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
                redirect:"/teacher-register"
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


module.exports = router;