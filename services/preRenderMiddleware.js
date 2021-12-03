module.exports = function(req,res,next) {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.google_analytics = process.env?.GA_MEASUREMENT_ID;
  next();
}
