function isAuthenticated(req, res, next) {
  if (req.session.userId) return next();
  res.redirect('/login');
}

function isAdmin(req, res, next) {
  if (req.session.role === 'admin') return next();
  res.redirect('/books'); // Redirect readers to read-only page
}

module.exports = { isAuthenticated, isAdmin };
