// jshint esversion: 6

document.addEventListener("scroll", function (e) {
  let nav = document.getElementsByClassName("nav")[0];
  nav.classList.toggle('scrolled', window.scrollY > 0);
});
