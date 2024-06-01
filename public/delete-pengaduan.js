const deletePengaduanButtons = document.querySelectorAll(".delete-button");
var token = document
  .querySelector('meta[name="csrf-token"]')
  .getAttribute("content");

async function deletePengaduan(event) {
  const deleteButton = event.target;
  const pengaduanid = deleteButton.dataset.pengaduanid;
  const parentRow = deleteButton.closest("tr");

  const confirmation = confirm("hapus pengaduan ini ?");
  if (!confirmation) {
    return;
  }

  if (parentRow) {
    parentRow.remove();
  }

  const response = await fetch(`/user/delete-pengaduan/${pengaduanid}`, {
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

for (deleteButton of deletePengaduanButtons) {
  deleteButton.addEventListener("click", deletePengaduan);
}
