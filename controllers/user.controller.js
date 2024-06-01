const Pengaduan = require("../models/pengaduan-model");
const User = require("../models/auth-model");
const authentication = require("../util/authentication");
const validation = require("../util/validation");

function getPengaduan(req, res, next) {
  res.render("user/pengaduan");
}
function getTambahPengaduan(req, res, next) {
   var show = "pengaduan";
  let pengaduanData = req.session.pengaduanData;
  if (!pengaduanData) {
    pengaduanData = null;
  }
  req.session.pengaduanData = null;
  res.render("user/dashboard/tambah-pengaduan", { pengaduanData, show});
}

async function getPengaduanUserTerkirim(req, res, next) {
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
    userData = res.locals.userData;
    const listPengaduan = await Pengaduan.findWithID(
      userData.user_id,
      "terkirim",
      currentPage,
      searchQuery
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
    const pengaduanLength = await Pengaduan.countPengaduan(
      userData.user_id,
      "terkirim",
      searchQuery
    );

    const totalPage = Math.ceil(pengaduanLength / 10);

    res.render("shared/history-pengaduan", {
      listPengaduan: listPengaduan,
      pengaduanStatus: "terkirim",
      totalPage: totalPage,
      currentPage: currentPage,
      searchQuery: searchQuery,
      show,
    });
  } catch (error) {
    return next(error);
  }
}
async function getPengaduanUserDiproses(req, res, next) {
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
    userData = res.locals.userData;
    const listPengaduan = await Pengaduan.findWithID(
      userData.user_id,
      "diproses",
      currentPage,
      searchQuery
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
    const pengaduanLength = await Pengaduan.countPengaduan(
      userData.user_id,
      "diproses",
      searchQuery
    );
    const totalPage = Math.ceil(pengaduanLength / 10);

    res.render("shared/history-pengaduan", {
      listPengaduan: listPengaduan,
      pengaduanStatus: "diproses",
      totalPage: totalPage,
      currentPage: currentPage,
      searchQuery: searchQuery,
      show,
    });
  } catch (error) {
    return next(error);
  }
}
async function getPengaduanUserSelesai(req, res, next) {
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
    userData = res.locals.userData;
    const listPengaduan = await Pengaduan.findWithID(
      userData.user_id,
      "selesai",
      currentPage,
      searchQuery
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
    const pengaduanLength = await Pengaduan.countPengaduan(
      userData.user_id,
      "selesai",
      searchQuery
    );
    const totalPage = Math.ceil(pengaduanLength / 10);

    res.render("shared/history-pengaduan", {
      listPengaduan: listPengaduan,
      pengaduanStatus: "selesai",
      totalPage: totalPage,
      currentPage: currentPage,
      searchQuery: searchQuery,
      show,
    });
  } catch (error) {
    return next(error);
  }
}
async function getPengaduanUserDitolak(req, res, next) {
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
    userData = res.locals.userData;
    const listPengaduan = await Pengaduan.findWithID(
      userData.user_id,
      "ditolak",
      currentPage,
      searchQuery
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
    const pengaduanLength = await Pengaduan.countPengaduan(
      userData.user_id,
      "ditolak",
      searchQuery
    );
    const totalPage = Math.ceil(pengaduanLength / 10);
    res.render("shared/history-pengaduan", {
      listPengaduan: listPengaduan,
      pengaduanStatus: "ditolak",
      totalPage: totalPage,
      currentPage: currentPage,
      searchQuery: searchQuery,
      show,
    });
  } catch (error) {
    return next(error);
  }
}
async function getEditProfil(req, res, next) {
   var show = "profil";
  const userData = res.locals.userData;
  res.render("user/dashboard/edit-profile", { userData, show });
}

async function getEditPengaduan(req, res, next) {
   var show = "pengaduan";
  const id = req.params.id;
  let pengaduan;
  try {
    pengaduan = await Pengaduan.findOne(id);
  } catch (error) {
    return next(error);
  }

  console.log(pengaduan);

  const userData = res.locals.userData;
  if (!pengaduan) {
    res.status(404).render("shared/404");
    return;
  }
  if (
    pengaduan.user_id !== userData.user_id ||
    pengaduan.status_pengaduan !== "terkirim"
  ) {
    res.status(403).render("shared/403");
    return;
  }
  res.render("user/dashboard/edit-pengaduan", { pengaduan,show });
}

async function editProfil(req, res, next) {
  const userData = res.locals.userData;
  const name = req.body.name;
  const email = req.body.email;
  const nohp = req.body.phone;
  const jenisKelamin = req.body["jenis-kelamin"];
  const alamat = req.body.alamat;
  const image = req.file;
  var imagePath;

  if (image == null) {
    imagePath = userData.image_url;
  } else {
    imagePath = `/assets/profile/images/${image.filename}`;
  }
  try {
    await User.updateUserProfile(
      userData.user_id,
      email,
      name,
      nohp,
      jenisKelamin,
      alamat,
      imagePath
    );
    const newUserData = [
      {
        user_id: userData.user_id,
        nama_user: name,
        email_user: email,
        kategori_user: userData.kategori_user,
        no_hp: nohp,
        jenis_kelamin: jenisKelamin,
        alamat: alamat,
        image_url: imagePath,
      },
    ];
    authentication.createUserSession(req, newUserData);
    await req.session.save();
  } catch (error) {
    return next(error);
  }

  res.redirect("edit-profil");
}

async function addPengaduan(req, res, next) {
  const userData = res.locals.userData;
  const title = req.body.title;
  const description = req.body.description;
  const category = req.body.category;
  const image = req.file;
  const location = req.body.location;
  const userID = userData.user_id;
  var imagePath;
  if (image != null) {
    imagePath = `/assets/pengaduan/images/${image.filename}`;
  }
  const pengaduanIsNotValid =  validation.pengaduanIsNotValid(
    title,
    description,
    category,
    location,
    imagePath
  );
  if (pengaduanIsNotValid) {
    req.session.pengaduanData = {
      message: pengaduanIsNotValid,
    };
    req.session.save(res.redirect("/user/tambah-pengaduan"));
    return;
  }
  const pengaduan = new Pengaduan(
    title,
    description,
    category,
    imagePath,
    location,
    new Date(),
    userID
  );
  try {
    await pengaduan.save();
  } catch (error) {
    return next(error);
  }
  res.redirect("/user/pengaduan-terkirim");
}
async function editPengaduan(req, res, next) {
  const id = req.params.id;
  let pengaduan;
  try {
    pengaduan = await Pengaduan.findOne(id);
  } catch (error) {
    return next(error);
  }
  const userData = res.locals.userData;
  if (!pengaduan) {
    res.status(404).render("shared/404");
    return;
  }
  if (
    pengaduan.user_id !== userData.user_id ||
    pengaduan.status_pengaduan !== "terkirim"
  ) {
    res.status(403).render("shared/403");
    return;
  }
  const pengaduanId = +req.params.id;
  const title = req.body.title;
  const description = req.body.description;
  const category = req.body.category;
  const image = req.file;
  const location = req.body.location;
  const userID = userData.user_id;
  var imagePath;
  if (image != null) {
    imagePath = `/assets/pengaduan/images/${image.filename}`;
  }
  const pengaduanModel = new Pengaduan(
    title,
    description,
    category,
    imagePath,
    location,
    new Date(),
    userID,
    pengaduanId
  );
  try {
    await pengaduanModel.update();
  } catch (error) {
    console.log(error);
    return next(error);
  }
  res.redirect("/user/pengaduan-terkirim");
}
async function deletePengaduan(req, res, next) {
  const id = req.params.id;
  let pengaduan;
  try {
    pengaduan = await Pengaduan.findOne(id);
  } catch (error) {
    return next(error);
  }
  pengaduan = pengaduan;
  const userData = res.locals.userData;
  if (!pengaduan) {
    res.status(404).render("shared/404");
    return;
  }
  if (
    pengaduan.user_id !== userData.user_id ||
    pengaduan.status_pengaduan !== "terkirim"
  ) {
    res.status(403).render("shared/403");
    return;
  }
  try {
    await Pengaduan.delete(id);
  } catch (error) {
    return next(error);
  }
  return res.json();
}

module.exports = {
  getPengaduan: getPengaduan,
  getPengaduanUserTerkirim: getPengaduanUserTerkirim,
  getPengaduanUserDiproses: getPengaduanUserDiproses,
  getPengaduanUserDitolak: getPengaduanUserDitolak,
  getPengaduanUserSelesai: getPengaduanUserSelesai,
  addPengaduan: addPengaduan,
  getEditPengaduan: getEditPengaduan,
  getTambahPengaduan: getTambahPengaduan,
  getEditProfil: getEditProfil,
  editProfil: editProfil,
  editPengaduan: editPengaduan,
  deletePengaduan: deletePengaduan,
};
