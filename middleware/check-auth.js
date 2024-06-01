// ini bukan front end javascript, jangan di hapus/diotak atik
async function checkAuthStatus(req, res, next) {
  const userData = req.session.userData;
  const isLoggedIn = req.session.isLoggedIn;
  if (!userData) {
    return next();
  }
  res.locals.userData = userData;
  res.locals.isLoggedIn = isLoggedIn;
  next();
}

module.exports = checkAuthStatus;
