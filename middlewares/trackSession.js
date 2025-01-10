// Middleware to track inactivity and destroy session
app.use((req, res, next) => {
    if (req.session) {
      const now = Date.now();
      if (req.session.lastActivity && now - req.session.lastActivity > 60000) {
        // If inactive for more than 1 minute, destroy the session
        req.session.destroy((err) => {
          if (err) console.error(err);
        });
        return res.redirect("/login"); // Redirect to login after session timeout
      }
      req.session.lastActivity = now; // Update last activity timestamp
    }
    next();
  });