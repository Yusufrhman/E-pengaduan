const imageUploadMiddleware = require("../middleware/image-upload");

const express = require("express");
const router = express();
const userController = require("../controllers/user.controller");

router.get("/pengaduan", userController.getPengaduan);

router.get("/pengaduan-terkirim", userController.getPengaduanUserTerkirim);
router.get("/pengaduan-diproses", userController.getPengaduanUserDiproses);
router.get("/pengaduan-selesai", userController.getPengaduanUserSelesai);
router.get("/pengaduan-ditolak", userController.getPengaduanUserDitolak);


router.get("/edit-profil", userController.getEditProfil);

router.get("/tambah-pengaduan", userController.getTambahPengaduan);

router.get("/pengaduan-saya/:id/edit", userController.getEditPengaduan);

router.post(
  "/edit-profil",
  imageUploadMiddleware.single("profile-image-input"),
  userController.editProfil
);
router.post(
  "/tambah-pengaduan",
  imageUploadMiddleware.single("pengaduan-image-picker"),
  userController.addPengaduan
);
router.post(
  "/edit-pengaduan/:id",
  imageUploadMiddleware.single("pengaduan-image-picker"),
  userController.editPengaduan
);
router.post(
  "/delete-pengaduan/:id",
  imageUploadMiddleware.single("pengaduan-image-picker"),
  userController.deletePengaduan
);

module.exports = router;
