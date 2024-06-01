const Berita = require("../models/berita-model");
const Pengaduan = require("../models/pengaduan-model");
const Auth = require("../models/auth-model");

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};

async function getHome(req, res, next) {
  var listBerita;
  var pengaduanSelesaiLength = 0;
  var pengaduanLength = 0;
  var totalUser = 0;
  try {
    pengaduanSelesaiLength = await Pengaduan.countAllPengaduan("selesai", "");
    pengaduanLength = await Pengaduan.countAllWithoutStatus();
    totalUser = await Auth.findAll();
    listBerita = await Berita.findAllWithStatus(4, 0, "published", "");
  } catch (error) {
    return next(error);
  }
  res.render("shared/index.ejs", {
    listBerita,
    pengaduanSelesaiLength,
    pengaduanLength,
    totalUser,
  });
}
async function getBerita(req, res, next) {
  var currentPage = req.query.page;
  if (currentPage == null || currentPage <= 1) {
    currentPage = 1;
  }
  var listBerita;
  var beritaLength;
  try {
    listBerita = await Berita.findAllWithStatus(
      10,
      (currentPage - 1) * 10,
      "published",
      ""
    );
    beritaLength = await Berita.countLength("published", "");
  } catch (error) {
    return next(error);
  }

  const totalPage = Math.ceil(beritaLength / 10);
  res.render("shared/berita", { listBerita, totalPage, currentPage });
}
async function getOneBerita(req, res, next) {
  const idBerita = req.params.id;
  var berita;
  try {
    berita = await Berita.findOne(idBerita);
  } catch (error) {
    return next(error);
  }

  if (!berita || berita.length <= 0) {
    return res.status(404).redirect("/404");
  }
  berita.waktu_berita = berita.waktu_berita.toLocaleString("id-ID", options);
  res.render("shared/one-berita", { berita: berita });
}

module.exports = {
  getHome: getHome,
  getOneBerita: getOneBerita,
  getBerita: getBerita,
};
