// ── CUSTOM CURSOR ──────────────────────────────────────────
const cursor    = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});
(function animRing() {
  rx += (mx - rx) * 0.11;
  ry += (my - ry) * 0.11;
  cursorRing.style.left = rx + 'px';
  cursorRing.style.top  = ry + 'px';
  requestAnimationFrame(animRing);
})();


// ── NAVBAR SCROLL ──────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});


// ── MOBILE MENU ────────────────────────────────────────────
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (mobileMenu.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});


// ── SCROLL REVEAL ──────────────────────────────────────────
const reveals = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 70);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(r => revealObs.observe(r));


// ── SKILL BARS ─────────────────────────────────────────────
const bars = document.querySelectorAll('.skill-bar');
const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.width = e.target.dataset.width + '%';
      barObs.unobserve(e.target);
    }
  });
}, { threshold: 0.4 });
bars.forEach(b => barObs.observe(b));


// ── ACTIVE NAV LINK ────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});


// ── CONTACT FORM ───────────────────────────────────────────
const form      = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', async e => {
  e.preventDefault();

  // clear previous errors
  ['nameErr','emailErr','msgErr'].forEach(id => document.getElementById(id).textContent = '');
  document.getElementById('formSuccess').style.display = 'none';
  document.getElementById('formError').style.display   = 'none';

  const name    = document.getElementById('fname').value.trim();
  const email   = document.getElementById('femail').value.trim();
  const message = document.getElementById('fmsg').value.trim();

  // basic validation
  let valid = true;
  if (!name)    { document.getElementById('nameErr').textContent  = 'Name is required.';    valid = false; }
  if (!email)   { document.getElementById('emailErr').textContent = 'Email is required.';   valid = false; }
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    document.getElementById('emailErr').textContent = 'Enter a valid email.'; valid = false;
  }
  if (!message) { document.getElementById('msgErr').textContent   = 'Message is required.'; valid = false; }
  if (!valid) return;

  // show loading
  submitBtn.querySelector('.btn-text').style.display    = 'none';
  submitBtn.querySelector('.btn-loading').style.display = 'inline';
  submitBtn.disabled = true;

  try {
    const res  = await fetch('/contact', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ name, email, message })
    });
    const data = await res.json();

    if (data.success) {
      document.getElementById('formSuccess').style.display = 'block';
      form.reset();
    } else {
      document.getElementById('formError').style.display = 'block';
    }
  } catch {
    document.getElementById('formError').style.display = 'block';
  } finally {
    submitBtn.querySelector('.btn-text').style.display    = 'inline';
    submitBtn.querySelector('.btn-loading').style.display = 'none';
    submitBtn.disabled = false;
  }
});


// ── SMOOTH HOVER TILT on cards ────────────────────────────
document.querySelectorAll('.skill-card, .service-card, .project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `translateY(-5px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
