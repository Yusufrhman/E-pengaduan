var token = document
  .querySelector('meta[name="csrf-token"]')
  .getAttribute("content");

async function changeStatusPengaduan(event, idPengaduan, status) {
  const tolakButton = event;
  const parentRow = tolakButton.closest("tr");
  const confirmation = confirm(`pengaduan ini akan ${status}?`);
  if (!confirmation) {
    return;
  }
  const response = await fetch(
    `/admin/pengaduan-change-status/${idPengaduan}/${status}`,
    {
      headers: {
        "CSRF-Token": token,
      },
      method: "POST",
    }
  );

  if (!response.ok) {
    alert("Something went wrong!");
    return;
  }
  if (parentRow) {
    parentRow.remove();
  }
  alert("success!");
}

async function changeStatusBerita(event, idBerita, status) {
  const button = event;
  var statusElement =
    button.parentElement.previousElementSibling.firstElementChild;
  
  const confirmation = confirm(`berita ini akan di ${status}!`);
  if (!confirmation) {
    return;
  }
  if (status === "arsipkan") {
    button.setAttribute(
      "onclick",
      `changeStatusBerita(this, ${idBerita}, 'publish')`
    );
    button.innerHTML = '<i class="fa-solid fa-eye"></i>';
    statusElement.id = "archived";
    statusElement.innerHTML = "archived";
  } else {
    button.setAttribute(
      "onclick",
      `changeStatusBerita(this, ${idBerita}, 'arsipkan')`
    );
    button.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
    statusElement.id = "published";
    statusElement.innerHTML = "published";
  }
  const response = await fetch(`/admin/berita-change-status/${idBerita}`, {
    headers: {
      "CSRF-Token": token,
    },
    method: "POST",
  });

  if (!response.ok) {
    console.log(response);
    alert("Something went wrong!");
    return;
  }

  alert("success!");
}
async function deleteBerita(event, beritaId) {
  const deleteButton = event;
  const parentRow = deleteButton.closest("tr");

  const confirmation = confirm("hapus berita ini ?");
  if (!confirmation) {
    return;
  }
  if (parentRow) {
    parentRow.remove();
  }

  const response = await fetch(`/admin/delete-berita/${beritaId}`, {
    headers: {
      "CSRF-Token": token,
    },
    method: "POST",
  });

  if (!response.ok) {
    alert("Something went wrong!");
    return;
  }
  alert("success!");
}
