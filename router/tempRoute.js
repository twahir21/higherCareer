const express = require("express");

const router = express.Router();

const path = require("path");
const fs = require("fs")

// Route to fetch all users
router.get('/api/users', (req, res) => {
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
router.patch('/api/users/:username', (req, res) => {
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

module.exports = router;