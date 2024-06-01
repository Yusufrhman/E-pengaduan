const Berita = require("../models/berita-model");
const Pengaduan = require("../models/pengaduan-model");
const validation = require("../util/validation");

async function getListBerita(req, res, next) {
  var active = "list-berita";
  var show = "berita";
  var listBerita;
  var searchQuery = req.query.search;
  if (searchQuery == null) {
    searchQuery = "";
  }
  var currentPage = req.query.page;
  if (currentPage == null || currentPage <= 1) {
    currentPage = 1;
  }
  var totalBerita;
  try {
    listBerita = await Berita.findAll(10, (currentPage - 1) * 10, searchQuery);
    totalBerita = await Berita.countLengthWithoutStatus(searchQuery);
  } catch (error) {
    return next(error);
  }
  var totalPage = Math.ceil(totalBerita / 10);
  if (totalPage == 0) {
    totalPage = 1;
  }

  for (let berita of listBerita) {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    berita.waktu_berita = berita.waktu_berita.toLocaleString("id-ID", options);
  }
  res.render("admin/list-berita", {
    listBerita,
    show,
    active,
    searchQuery,
    currentPage,
    totalPage,
  });
}
async function getListArsipBerita(req, res, next) {
  var active = "arsip-berita";
  var show = "berita";
  var listBerita;
  var searchQuery = req.query.search;
  if (searchQuery == null) {
    searchQuery = "";
  }
  var currentPage = req.query.page;
  if (currentPage == null || currentPage <= 1) {
    currentPage = 1;
  }
  var totalBerita;
  try {
    listBerita = await Berita.findAllWithStatus(
      10,
      (currentPage - 1) * 10,
      "archived",
      searchQuery
    );
    totalBerita = await Berita.countLength("archived", searchQuery);
  } catch (error) {
    return next(error);
  }
  var totalPage = Math.ceil(totalBerita / 10);
  if (totalPage == 0) {
    totalPage = 1;
  }

  for (let berita of listBerita) {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    berita.waktu_berita = berita.waktu_berita.toLocaleString("id-ID", options);
  }
  res.render("admin/list-berita", {
    listBerita,
    show,
    active,
    searchQuery,
    currentPage,
    totalPage,
  });
}

async function getPengaduanTerkirim(req, res, next) {
  const status = "terkirim";
  var show = "pengaduan";
  try {
    var searchQuery = req.query.search;
    if (searchQuery == null) {
      searchQuery = "";
    }
    var currentPage = req.query.page;
    if (currentPage == null || currentPage <= 1) {
      currentPage = 1;
    }
    const listPengaduan = await Pengaduan.find10(
      status,
      searchQuery,
      currentPage
    );
    for (let pengaduan of listPengaduan) {
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      pengaduan.waktu_pengaduan = pengaduan.waktu_pengaduan.toLocaleString(
        "id-ID",
        options
      );
    }
    const pengaduanLength = await Pengaduan.countAllPengaduan(
      status,
      searchQuery
    );
    const totalPage = Math.ceil(pengaduanLength / 10);
    return res.render("shared/history-pengaduan", {
      listPengaduan: listPengaduan,
      pengaduanStatus: status,
      totalPage: totalPage,
      currentPage: currentPage,
      searchQuery: searchQuery,
      show: show,
    });
  } catch (error) {
    return next(error);
  }
}
async function getPengaduanDiproses(req, res, next) {
  var show = "pengaduan";

  const status = "diproses";

  try {
    var searchQuery = req.query.search;
    if (searchQuery == null) {
      searchQuery = "";
    }
    var currentPage = req.query.page;
    if (currentPage == null || currentPage <= 1) {
      currentPage = 1;
    }
    const listPengaduan = await Pengaduan.find10(
      status,
      searchQuery,
      currentPage
    );
    for (let pengaduan of listPengaduan) {
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      pengaduan.waktu_pengaduan = pengaduan.waktu_pengaduan.toLocaleString(
        "id-ID",
        options
      );
    }
    const pengaduanLength = await Pengaduan.countAllPengaduan(
      status,
      searchQuery
    );
    const totalPage = Math.ceil(pengaduanLength / 10);

    return res.render("shared/history-pengaduan", {
      listPengaduan: listPengaduan,
      totalPage: totalPage,
      currentPage: currentPage,
      searchQuery: searchQuery,
      pengaduanStatus: status,
      show: show,
    });
  } catch (error) {
    return next(error);
  }
}

async function getPengaduanSelesai(req, res, next) {
  var show = "pengaduan";

  const status = "selesai";

  try {
    var searchQuery = req.query.search;
    if (searchQuery == null) {
      searchQuery = "";
    }
    var currentPage = req.query.page;
    if (currentPage == null || currentPage <= 1) {
      currentPage = 1;
    }
    const listPengaduan = await Pengaduan.find10(
      status,
      searchQuery,
      currentPage
    );
    for (let pengaduan of listPengaduan) {
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      pengaduan.waktu_pengaduan = pengaduan.waktu_pengaduan.toLocaleString(
        "id-ID",
        options
      );
    }
    const pengaduanLength = await Pengaduan.countAllPengaduan(
      status,
      searchQuery
    );
    const totalPage = Math.ceil(pengaduanLength / 10);

    return res.render("shared/history-pengaduan", {
      listPengaduan: listPengaduan,
      pengaduanStatus: status,
      totalPage: totalPage,
      currentPage: currentPage,
      searchQuery: searchQuery,
      show: show,
    });
  } catch (error) {
    return next(error);
  }
}
async function getPengaduanDitolak(req, res, next) {
  var show = "pengaduan";

  const status = "ditolak";

  try {
    var searchQuery = req.query.search;
    if (searchQuery == null) {
      searchQuery = "";
    }
    var currentPage = req.query.page;
    if (currentPage == null || currentPage <= 1) {
      currentPage = 1;
    }
    const listPengaduan = await Pengaduan.find10(
      status,
      searchQuery,
      currentPage
    );
    for (let pengaduan of listPengaduan) {
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      pengaduan.waktu_pengaduan = pengaduan.waktu_pengaduan.toLocaleString(
        "id-ID",
        options
      );
    }
    const pengaduanLength = await Pengaduan.countAllPengaduan(
      status,
      searchQuery
    );
    const totalPage = Math.ceil(pengaduanLength / 10);
    return res.render("shared/history-pengaduan", {
      listPengaduan: listPengaduan,
      pengaduanStatus: status,
      totalPage: totalPage,
      currentPage: currentPage,
      searchQuery: searchQuery,
      show: show,
    });
  } catch (error) {
    return next(error);
  }
}

async function changeStatusPengaduan(req, res, next) {
  const newStatus = req.params.status;
  const pengaduanId = req.params.id;
  var pengaduan;
  try {
    pengaduan = await Pengaduan.findOne(pengaduanId);
    if (!pengaduan) {
      return res.status(404).json({ error: "Pengaduan tidak ditemukan" });
    }
    const currentStatus = pengaduan.status_pengaduan;
    if (currentStatus === "terkirim") {
      if (newStatus === "diproses" || newStatus === "ditolak") {
        await Pengaduan.changeStatusPengaduan(newStatus, pengaduanId);
      } else {
        return res.status(403).render("shared/403");
      }
    } else if (currentStatus === "diproses") {
      if (newStatus === "ditolak" || newStatus === "selesai") {
        await Pengaduan.changeStatusPengaduan(newStatus, pengaduanId);
      } else {
        return res.status(403).render("shared/403");
      }
    } else if (currentStatus === "ditolak" || currentStatus === "selesai") {
      return res.status(403).render("shared/403");
    }

    return res.json({ message: "Status pengaduan berhasil diubah" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Terjadi kesalahan server" });
  }
}

async function changeStatusberita(req, res, next) {
  const beritaId = req.params.id;
  var berita;
  try {
    berita = await Berita.findOne(beritaId);
    if (!berita) {
      return res.status(404).json({ error: "Berita tidak ditemukan" });
    }

    const currentStatus = berita.status;
    console.log(currentStatus);
    if (currentStatus === "published") {
      await Berita.changeStatus("archived", beritaId);
    } else {
      await Berita.changeStatus("published", beritaId);
    }
    return res.json({ message: "Status pengaduan berhasil diubah" });
  } catch (error) {
    return res.status(500).json({ error: "Terjadi kesalahan server" });
  }
}

async function getTambahBerita(req, res, next) {
  var show = "berita";

  let beritaData = req.session.beritaData;
  if (!beritaData) {
    beritaData = null;
  }
  req.session.beritaData = null;

  res.render("admin/tambah-berita", { beritaData, show });
}

async function getEditBerita(req, res, next) {
  var id = req.params.id;
  var show = "berita";
  let beritaData = req.session.beritaData;
  if (!beritaData) {
    beritaData = null;
  }
  req.session.beritaData = null;
  let berita;
  try {
    berita = await Berita.findOne(id);
  } catch (error) {
    return next(error);
  }
  if (!berita) {
    res.status(404).render("shared/404");
    return;
  }

  res.render("admin/edit-berita", { beritaData, show, berita });
}

async function editBerita(req, res, next) {
  const beritaId = +req.params.id;
  let berita;
  const userData = res.locals.userData;

  try {
    berita = await Berita.findOne(beritaId);
  } catch (error) {
    return next(error);
  }
  if (!berita) {
    res.status(404).render("shared/404");
    return;
  }

  const title = req.body.title;
  const description = req.body.description;
  const content = req.body.content;
  const isArsip = req.body["submit-button"];
  var image = req.file;
  var status = "published";
  if (isArsip === "true") {
    status = "archived";
  }
  var imagePath;
  if (image != null) {
    imagePath = `/assets/berita/images/${image.filename}`;
  }
  const beritaIsNotValid = validation.beritaIsNotValid(
    title,
    description,
    content,
    "s"
  );
  if (beritaIsNotValid) {
    req.session.beritaData = {
      message: beritaIsNotValid,
    };
    req.session.save(res.redirect(`/admin/edit-berita/${beritaId}`));
    return;
  }
  console.log(imagePath);
  try {
    await Berita.update(
      title,
      content,
      description,
      status,
      imagePath,
      beritaId
    );
  } catch (error) {
    console.log(error);
    return next(error);
  }
  res.redirect("/admin/list-berita");
}

async function addBerita(req, res, next) {
  const userData = res.locals.userData;
  const title = req.body.title;
  const description = req.body.description;
  const content = req.body.content;
  const isArsip = req.body["submit-button"];

  var status = "published";
  if (isArsip === "true") {
    status = "archived";
  }

  const image = req.file;
  var imagePath;
  if (image != null) {
    imagePath = `/assets/berita/images/${image.filename}`;
  }
  const beritaIsNotValid = validation.beritaIsNotValid(
    title,
    description,
    content,
    imagePath
  );
  if (beritaIsNotValid) {
    req.session.beritaData = {
      message: beritaIsNotValid,
    };
    req.session.save(res.redirect("/admin/tambah-berita"));
    return;
  }
  const userID = userData.user_id;
  const dateAdded = new Date();
  const berita = new Berita(
    title,
    description,
    content,
    imagePath,
    dateAdded,
    userID,
    status
  );
  try {
    await berita.save();
  } catch (error) {
    return next(error);
  }
  res.redirect("/admin/tambah-berita");
}

async function deleteBerita(req, res, next) {
  const id = req.params.id;
  let berita;
  try {
    berita = await Berita.findOne(id);
  } catch (error) {
    return next(error);
  }
  if (!berita) {
    res.status(404).render("shared/404");
    return;
  }
  try {
    await Berita.delete(id);
  } catch (error) {
    return next(error);
  }
  return res.json();
}

module.exports = {
  getPengaduanTerkirim: getPengaduanTerkirim,
  getPengaduanDiproses: getPengaduanDiproses,
  getPengaduanSelesai: getPengaduanSelesai,
  getPengaduanDitolak: getPengaduanDitolak,
  changeStatusPengaduan: changeStatusPengaduan,
  getTambahBerita: getTambahBerita,
  addBerita: addBerita,
  getListBerita,
  getListArsipBerita,
  changeStatusberita,
  deleteBerita,
  getEditBerita,
  editBerita,
};
