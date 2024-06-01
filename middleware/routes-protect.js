// ini bukan front end javascript, jangan di hapus/diotak atik

function protectRoutes(req, res, next) {
  userData = res.locals.userData;
  if (!res.locals.isLoggedIn) {
    return res.status(401).redirect("/login");
  }
  if (req.path.startsWith("/admin") && userData.kategori_user != '1') {
      return res.redirect("/403");
    }

  next();
}
module.exports = protectRoutes;
