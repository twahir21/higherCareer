const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

// Path to the user JSON file
const filePath = path.join(__dirname, 'json', 'tempUsers.json');

// Utility function to read JSON data
function readUsersFromFile() {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) reject(err);
            else resolve(JSON.parse(data));
        });
    });
}

// Utility function to write JSON data
function writeUsersToFile(users) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, JSON.stringify(users, null, 2), 'utf8', (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
}

// Route to fetch all users
router.get('/api/users', async (req, res) => {
    try {
        const users = await readUsersFromFile();
        res.json(users);
    } catch (error) {
        console.error('Error reading file:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Route to update user approval status
router.patch('/api/users/:username', async (req, res) => {
    const { username } = req.params;
    const { isApproved } = req.body;

    try {
        const users = await readUsersFromFile();
        const user = users.find(user => user.username === username);
        
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        user.isApproved = isApproved;

        await writeUsersToFile(users);

        res.json({ success: true, message: `User ${isApproved ? 'accepted' : 'rejected'} successfully.` });

        // implement a logic to save to database

        
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// DELETE route to delete a user by username
router.delete('/api/users/:username', async (req, res) => {
    const { username } = req.params;

    try {
        const users = await readUsersFromFile();
        const userIndex = users.findIndex(user => user.username === username);

        if (userIndex === -1) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Remove the user from the array
        users.splice(userIndex, 1);
        await writeUsersToFile(users);

        res.json({ success: true, message: 'User rejected successfully.' });
    } catch (error) {
        console.error('Error rejecting a user:', error);
        res.status(500).json({ success: false, message: 'An error occurred while rejecting the user.' });
    }
});

module.exports = router;
