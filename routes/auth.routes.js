const express = require("express");
const router = express();
const authController = require("../controllers/auth.controller");

router.get("/login", authController.getLogin);

router.get("/signup", authController.getSignup);

router.post("/login", authController.login);

router.post("/signup", authController.signup);

router.post("/logout", authController.logout);

module.exports = router;
