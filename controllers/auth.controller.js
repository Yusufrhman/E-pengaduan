const Auth = require("../models/auth-model");
const validation = require("../util/validation");
const authentication = require("../util/authentication");

function getLogin(req, res, next) {
  if (res.locals.isLoggedIn) {
    res.redirect("/");
    return;
  }
  let loginData = req.session.loginData;
  if (!loginData) {
    loginData = null;
  }
  req.session.loginData = null;
  res.render("auth/login", { loginData });
}
async function login(req, res, next) {
  if (res.locals.isLoggedIn) {
    res.redirect("/");
    return;
  }
  const email = req.body.email;
  const password = req.body.password;
  const loginIsNotvalid = await validation.loginIsNotvalid(email, password);
  if (loginIsNotvalid) {
    req.session.loginData = {
      email: email,
      password: password,
      message: loginIsNotvalid,
    };
    res.redirect("/login");
    return;
  }
  const user = new Auth(email);
  const userData = await user.findUser();
  delete userData[0].password_user;
  authentication.createUserSession(req, userData);
  await req.session.save();

  if (userData[0].kategori_user === "1") {
    res.redirect("/admin/pengaduan-terkirim");
    return
  }
  res.redirect("/");
}
function getSignup(req, res, next) {
  if (res.locals.isLoggedIn) {
    res.redirect("/");
    return;
  }
  let signupData = req.session.signupData;
  if (!signupData) {
    signupData = null;
  }
  req.session.signupData = null;
  res.render("auth/signup", { signupData });
}
async function signup(req, res, next) {
  if (res.locals.isLoggedIn) {
    res.redirect("/");
    return;
  }
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body["confirm-password"];

  const auth = new Auth(email, password, name);
  const signupIsNotValid = await validation.signUpIsNotValid(
    name,
    email,
    password,
    confirmPassword
  );
  if (signupIsNotValid) {
    req.session.signupData = {
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      message: signupIsNotValid,
    };
    req.session.save(res.redirect("/signup"));
    return;
  }
  try {
    await auth.signup();
  } catch (error) {
    return next(error);
  }
  res.redirect("/login");
}
async function logout(req, res, next) {
  if (!res.locals.isLoggedIn) {
    res.redirect("/");
    return;
  }
  delete req.session.userData;
  delete req.session.isLoggedIn;
  res.redirect("/");
}
module.exports = {
  getLogin: getLogin,
  getSignup: getSignup,
  login: login,
  signup: signup,
  logout: logout,
};
