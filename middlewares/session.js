const session = require("express-session");
const dotenv = require("dotenv");

dotenv.config();

const sessionMiddleware = session({
  secret: process.env.session_key,
  resave: false,
  saveUninitialized: true,
  cookie: { 
    maxAge: 24 * 60 * 60 * 1000, // 1-day session expiration
    secure: false,              // Set true if using HTTPS
    httpOnly: true,             // Prevent JavaScript access to cookies
  }, 
});

module.exports = sessionMiddleware;
