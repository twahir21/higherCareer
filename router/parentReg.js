const express = require("express");
const { saveToJSONFile } = require("./temp");
const router = express.Router();
const path = require("path");
const { body, validationResult } = require("express-validator");
const checkUniqueUsername = require("../middlewares/uniqueUsername");

router.post(
    '/auth/parent-register',
    [
        body('username')
            .isAlphanumeric().withMessage('Username should only contain letters and numbers')
            .trim().escape(),
        body('password')
            .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
            .trim().escape(),
        body('email').isEmail().withMessage('Invalid email format').normalizeEmail(),
        body('tel').isMobilePhone().withMessage('Invalid phone number').trim().escape(),
        body('relationship').notEmpty().withMessage('Relationship is required').trim().escape(),
        body('student_fullName').notEmpty().withMessage('Student full name is required').trim().escape(),
        body('student_class').notEmpty().withMessage('Student class is required').trim().escape(),
    ],
    async (req, res, next) => {
        // Middleware to check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: errors.array()[0].msg,
                redirect: "/parent-register",
            });
        }

        // Middleware to check for unique username
        try {
            const { username } = req.body;
            const isUnique = await checkUniqueUsername(username);
            if (!isUnique) {
                return res.status(409).json({
                    success: false,
                    message: "Username is already taken, try by adding numbers",
                    redirect: "/parent-register",
                });
            }
            next(); // Proceed to the next handler if username is unique
        } catch (error) {
            console.error("Error in username uniqueness check:", error);
            return res.status(500).json({
                success: false,
                message: "An error occurred while checking username uniqueness.",
                redirect: "/parent-register",
            });
        }
    },
    async (req, res) => {
        const { username, password, fullName, email, tel, relationship, student_fullName, student_class } = req.body;

        const filePath = path.join(__dirname, 'json', 'tempUsers.json');

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
            createdAt: new Date().toISOString(),
        };

        try {
            const result = await saveToJSONFile(newUser, filePath);

            if (result.success) {
                return res.status(200).json({
                    success: true,
                    message: result.message,
                    redirect: "/admin",
                });
            } else {
                return res.status(409).json({
                    success: false,
                    message: result.message,
                    redirect: "/parent-register",
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: "An error occurred while processing the request.",
                redirect: "/",
            });
        }
    }
);

module.exports = router;
