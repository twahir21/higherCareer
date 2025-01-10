function hasRole(role) {
    return (req, res, next) => {
      if (req.session.user && req.session.user.role === role) {
        return next(); // User has the correct role
      }
      res.status(403).send("Access Denied.");
    };
  }
  