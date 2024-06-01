const express = require("express");
const router = express();
const baseController = require("../controllers/base.controller");

router.get("/", baseController.getHome)
router.get("/berita", baseController.getBerita);
router.get("/berita/:id", baseController.getOneBerita);



module.exports = router;