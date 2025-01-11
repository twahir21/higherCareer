const trackSession = (req, res, next) => {
  if (req.session) {
    const now = Date.now();
    if (req.session.lastActivity && now - req.session.lastActivity > 60000) {
      // If inactive for more than 1 minute, destroy the session
      req.session.destroy((err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ success: false, message: "Error destroying session" });
        }
      });
      
      // Send a response to inform the frontend
      return res.status(401).json({
        success: false,
        message: "Session expired. Please log in again."
      });
    }
    req.session.lastActivity = now; // Update last activity timestamp
  }
  next();
};

module.exports = trackSession;