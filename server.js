const express = require('express');
const app = express();
const path = require('path');
const compression = require("compression");
const dotenv = require("dotenv");
dotenv.config();


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
const authRouter = require("./router/auth")
const errorsRouter = require('./router/errors');
const pdfRouter = require('./router/generatePDF');

// Middlewares
app.use(express.json()); // this is bodyParser


// create Request counter
let totalRequests = 0; // Global request counter
let rootRequests = 0;  // Tracks requests to the "/" route


app.get("/", (req, res, next) => {
  rootRequests++;
  next();
});

// Router usage
app.use(authRouter);
app.use(pdfRouter);
app.use(publicRouter);


// Route to render the req.ejs page
app.get("/req", (req, res) => {
  res.render("req", { totalRequests, rootRequests });
});

// keep errors router the last
app.use(errorsRouter);

const port = process.env.PORT
// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
