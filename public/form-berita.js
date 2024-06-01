const beritaImagePicker = document.getElementById("berita-image-input");
const beritaImageElement = document.getElementById("berita-image");

function updateBeritaImagePreview() {
  let files = beritaImagePicker.files;
  if (!files || files.length === 0) {
    return;
  }
  const pickedImage = files[0];
  beritaImageElement.src = URL.createObjectURL(pickedImage);
}

beritaImagePicker.addEventListener("change", updateBeritaImagePreview);
