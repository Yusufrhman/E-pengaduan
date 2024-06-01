const imageUploadMiddleware = require("../middleware/image-upload");

const express = require("express");
const router = express();
const adminController = require("../controllers/admin.controller");

// router.get("/tambah-berita", userController.getPengaduan);

router.get("/pengaduan-terkirim", adminController.getPengaduanTerkirim);
router.get("/pengaduan-diproses", adminController.getPengaduanDiproses);
router.get("/pengaduan-selesai", adminController.getPengaduanSelesai);
router.get("/pengaduan-ditolak", adminController.getPengaduanDitolak);

router.post(
  "/pengaduan-change-status/:id/:status",
  adminController.changeStatusPengaduan
);

router.post(
  "/delete-berita/:id",
  adminController.deleteBerita
);

router.post("/berita-change-status/:id", adminController.changeStatusberita);

router.get("/tambah-berita", adminController.getTambahBerita);
router.get("/list-berita", adminController.getListBerita);
router.get("/arsip-berita", adminController.getListArsipBerita);
router.get("/edit-berita/:id", adminController.getEditBerita);



router.post(
  "/tambah-berita",
  imageUploadMiddleware.single("berita-image-input"),
  adminController.addBerita
);
router.post(
  "/edit-berita/:id",
  imageUploadMiddleware.single("berita-image-input"),
  adminController.editBerita
);

module.exports = router;
