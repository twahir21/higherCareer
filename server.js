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
const adminRouter = require("./router/admin");
const authRouter = require("./router/auth")
const database = require("./config/databaseConfig")
const errorsRouter = require('./router/errors')

// Router usage
app.use(adminRouter);
app.use(authRouter);
app.use(publicRouter);


// keep errors router the last
app.use(errorsRouter);

// connect to database
app.get("/database", async(req, res) => {

  try {
    const result = await database.query(`SELECT * FROM users`);
    console.log(result.rows);
    
  } catch (error) {
    console.error("Error while connecting to the database", error);
    res.status(500).render("errors/serverError", {
      title: "500 Internal Server Error",
      message: "Oops! Something went wrong on our end.",
      suggestion: "Please try again later or go back to the homepage."
  });
  }
})

const port = process.env.PORT
// Start the server
app.listen(port, () => {
    console.log('Server running on http://localhost');
});
