const express = require('express');
const app = express();
const path = require('path');

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Route to use public files
app.use(express.static(path.join(__dirname, 'public')));

// Routers imports
const publicRouter = require("./router/public");


// Router usage
// keep public router the last
app.use(publicRouter);

// File download route
app.get('/download/joining-primary', (req, res) => {
    const file = path.join(__dirname, 'downloads', 'joining-Primary.doc');
    res.download(file, 'Joining-Primary.doc', (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error downloading file');
      }
    });
  });
  

app.get("/login", (req, res) => {
    res.render('auth/login')
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
