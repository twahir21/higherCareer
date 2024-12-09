const express = require('express');
const app = express();
const path = require('path');

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Route to use public files
app.use(express.static(path.join(__dirname, 'public')));

app.get("/login", (req, res) => {
    res.render('auth/login')
});

app.get("/parent-register", (req, res) => {
    res.render('auth/parent-register')
});

app.get("/teacher-register", (req, res) => {
    res.render('auth/teacher-register')
});

// Route to render the 'main' view
app.get('/', (req, res) => {
    res.render("index");
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
