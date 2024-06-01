const pengaduanImagePicker = document.getElementById("pengaduan-image-picker");
const pengaduanImageElement = document.getElementById("pengaduan-image");



function updatePengaduanImagePreview() {
  let files = pengaduanImagePicker.files;
  if (!files || files.length === 0) {
    return;
  }
  const pickedImage = files[0];
  pengaduanImageElement.src = URL.createObjectURL(pickedImage);
}


pengaduanImagePicker.addEventListener("change", updatePengaduanImagePreview);


