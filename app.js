const express = require("express");

var csurf = require("@dr.pogodin/csurf");

const path = require("path");

const app = express();


const session = require("express-session");
const createSessionConfig = require("./config/session");

const addCsrfTokenMiddleWare = require("./middleware/csrf-token");
const checkAuthStatusMiddleware = require("./middleware/check-auth");
const routesProtectionMiddleware = require("./middleware/routes-protect");
const handleErrors = require("./middleware/error-handler");

const baseRoutes = require("./routes/base.routes");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const adminRoutes = require("./routes/admin.routes");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use("/assets", express.static("web-data"));

app.use(express.urlencoded({ extended: false }));

const sessionConfig = createSessionConfig();

app.use(session(sessionConfig));

app.use(csurf());
app.use(addCsrfTokenMiddleWare);

app.use(checkAuthStatusMiddleware);

app.use(baseRoutes);
app.use(authRoutes);
app.use(routesProtectionMiddleware);
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);

app.use(function (req, res) {
  res.status(404).render("shared/404");
});

app.use(handleErrors);


app.listen(3000);
