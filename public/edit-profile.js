const profileImageButton = document.getElementById("profile-image-button");
const profileImageElement = document.getElementById("profile-image");
const profileImageInputElement = document.getElementById("profile-image-input");

function triggerInputImage(event) {
event.preventDefault();
  profileImageInputElement.click();
}

function updateProfileImagePreview() {

  let files = profileImageInputElement.files;
  if (!files || files.length === 0) {
    return;
  }
  const pickedImage = files[0];
  profileImageElement.src = URL.createObjectURL(pickedImage);
}

profileImageButton.addEventListener("click", triggerInputImage);

profileImageInputElement.addEventListener("change", updateProfileImagePreview);
