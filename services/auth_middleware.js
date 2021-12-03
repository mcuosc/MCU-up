class AuthMiddleware {
  /**
    *  This method check user's login status.
    *  if user is not logged, it redirect user to login page.
   */
  authen(req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect("/auth/login");
    }
  };

  /**
    *  This method just check user's login status and return its state.
   */
  author(req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(401).send("Unauthorized");
    }
  }
}

module.exports = AuthMiddleware;
