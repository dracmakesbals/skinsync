const hamburger = document.querySelector(".hamburger");
const menu_links = document.querySelector("ul");
const links = document.querySelectorAll("ul li");

hamburger.addEventListener("click", () => {
  menu_links.classList.toggle("open");
  links.forEach((link) => {
    link.classList.toggle("fade");
  });
});
