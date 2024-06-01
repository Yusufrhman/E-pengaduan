const Auth = require("../models/auth-model");

async function createUserSession(req, userData, action) {
  req.session.userData = userData[0];
  req.session.isLoggedIn = true;
  req.session.save(action);
}
module.exports = {
  createUserSession: createUserSession,
};
