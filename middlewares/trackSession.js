const trackSession = (req, res, next) => {
  if (req.session) {
    const now = Date.now();
    // Check if the session is inactive for more than 1 minute
    if (req.session.lastActivity && now - req.session.lastActivity > 60000) {
      // If session is expired, destroy it
      console.log('Session expired. Destroying session...');
      req.session.destroy((err) => {
        if (err) {
          console.error('Error destroying session:', err);
          return res.status(500).json({ message: 'Failed to destroy session.' });
        }
        // Respond with status 401 and session expiration message
        return res.status(401).json({ message: 'Session expired. Please log in again.' });
      });
    } else {
      req.session.lastActivity = now; // Update the last activity timestamp
    }
  }
  next();
};


module.exports = trackSession;