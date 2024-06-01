const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);

function createSessionStore() {
  const options = {
    host: "localhost",
    user: "root",
    password: "",
    database: "e_pengaduan",
  };
  const sessionStore = new MySQLStore(options);
  return sessionStore;
}

function createSessionConfig() {
  return {
    secret: "super-secret",
    store: createSessionStore(),
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 9000000,
    },
  };
}
module.exports = createSessionConfig;
