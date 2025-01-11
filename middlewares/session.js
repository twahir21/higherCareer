const session = require("express-session")
const dotenv = require("dotenv");
dotenv.config();
// Set up session middleware
const sessionMiddleware = session({
  secret: process.env.session_key,
  resave: false,
  saveUninitialized: true,
  cookie: { 
    maxAge: 60000,    // 1 minute session expiration
    secure: false,  // set true if in https
    httpOnly: true,  // Prevent JavaScript from accessing cookies
  }, 
})


module.exports = sessionMiddleware;
