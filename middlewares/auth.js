// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
      // User is authenticated
      return next();
    }
    // Redirect to login if not authenticated
    res.redirect("/login");
  }
  