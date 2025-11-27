var typed = new Typed('#element', {
      strings: ['UI/UX DESIGN', 'WEB DEVELOPER', ' ', 'WEB DESIGNER'],
      typeSpeed: 60,
      loop: true
});

const open = document.getElementById("open");
const h = document.getElementById("h");
const a = document.getElementById("a");
const s = document.getElementById("s");
const p = document.getElementById("p");
const c = document.getElementById("c");
const cut = document.getElementById("cut");
const ul = document.getElementById("ul");

open.addEventListener('click', function() {
  ul.style.right = "-15%";
});

cut.addEventListener('click', function() {
  ul.style.right = "-155%";
});

h.addEventListener('click', function() {
  ul.style.right = "-155%";
});

a.addEventListener('click', function() {
  ul.style.right = "-155%";
});

s.addEventListener('click', function() {
  ul.style.right = "-155%";
});

p.addEventListener('click', function() {
  ul.style.right = "-155%";
});

c.addEventListener('click', function() {
  ul.style.right = "-155%";
});