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
        const filePath = path.join(__dirname, 'json', 'tempUsers.json');
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

// DELETE route to delete a user by username
router.delete('/api/users/:username', (req, res) => {
    const { username } = req.params;
    const filePath = path.join(__dirname, 'json', 'tempUsers.json');

    try {
        // Read the JSON file
        const fileData = fs.readFileSync(filePath, 'utf8');
        const users = JSON.parse(fileData);

        // Filter out the user to delete
        const filteredUsers = users.filter(user => user.username !== username);

        if (users.length === filteredUsers.length) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        // Write the updated users list back to the file
        fs.writeFileSync(filePath, JSON.stringify(filteredUsers, null, 2));

        res.json({ success: true, message: "User rejected successfully." });
    } catch (error) {
        console.error("Error rejecting a user:", error);
        res.status(500).json({ success: false, message: "An error occurred while rejecting the user." });
    }
});

module.exports = router;