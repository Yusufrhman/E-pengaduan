// ini bukan front end javascript, jangan di hapus/diotak atik

function handleErrors(error, req, res, next) {
  if (error.status === 404) {
    return res.status(404).render("shared/404", { pageTitle: "Halaman Tidak Ditemukan" });
  } else {
    console.error(error);
    res.status(500).render("shared/500");
  }
}

module.exports = handleErrors;
