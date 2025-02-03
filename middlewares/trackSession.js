const trackSession = (req, res, next) => {
  if (req.session) {
    const now = Date.now();

    // Check if the session is inactive for more than 1 minute
    if (req.session.lastActivity && now - req.session.lastActivity > 60000) {
      console.log('Session expired due to inactivity. Destroying session...');
      req.session.destroy((err) => {
        if (err) {
          console.error('Error destroying session:', err);
          return res.status(500).json({ message: 'Failed to destroy session.' });
        }
        return res.status(401).json({ 
          sessionExpired: true,
          message: 'Session expired due to inactivity. Please log in again.' 
        });
      });
    } else {
      req.session.lastActivity = now; // Update the last activity timestamp
      next();
    }
  } else {
    next();
  }
};

module.exports = trackSession;
