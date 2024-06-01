const hamburgerButtonElement = document.querySelector(".hamburger-container");
function clickHamburger() {
  const navBarElement = document.getElementById("nav-bar");
  hamburgerButtonElement.classList.toggle("change");
  navBarElement.classList.toggle("active");
}
hamburgerButtonElement.addEventListener("click", clickHamburger);
