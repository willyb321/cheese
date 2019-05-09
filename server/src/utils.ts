export function secured(req, res, next) {
  if (req.user) {
    return next();
  }
  req.session.returnTo = req.originalUrl;
  return res.redirect('/api/auth');
}
