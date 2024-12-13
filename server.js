const express = require('express');
const app = express();
const path = require('path');
const compression = require("compression")

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Route to use public files
app.use(express.static(path.join(__dirname, 'public')));
app.use(compression());

app.use('/static', express.static('public', {
  maxAge: '1d', // Cache files for 1 day
  etag: true,   // Enable entity tags
  lastModified: true, // Enable last-modified header
}));


// Routers imports
const publicRouter = require("./router/public");
const adminRouter = require("./router/admin");
const authRouter = require("./router/auth")


// Router usage
app.use(adminRouter);
app.use(authRouter);
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
  
// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
