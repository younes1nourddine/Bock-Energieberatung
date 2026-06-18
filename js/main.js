/* ============================================================
   ENERGIEBERATUNG BOCK — main.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── BURGER NAVIGATION ── */
  const burger = document.querySelector('.nav__burger');
  const navLinks = document.querySelector('.nav__links');
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      burger.setAttribute('aria-expanded', navLinks.classList.contains('open'));
    });
    document.addEventListener('click', (e) => {
      if (!burger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
      }
    });
  }

  /* ── ACTIVE NAV LINK ── */
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/index.html';
  document.querySelectorAll('.nav__links a').forEach(link => {
    const href = link.getAttribute('href').replace(/\/$/, '');
    if (currentPath.endsWith(href) || (href === 'index.html' && (currentPath === '' || currentPath.endsWith('/')))) {
      link.style.color = '#fff';
      link.style.fontWeight = '600';
    }
  });

  /* ── FAQ ACCORDION ── */
  document.querySelectorAll('.faq-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(open => open.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ── KONTAKTFORMULAR ── */
  const form = document.getElementById('kontaktform');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const success = document.getElementById('form-success');
      btn.disabled = true;
      btn.textContent = 'Wird gesendet …';
      setTimeout(() => {
        form.style.display = 'none';
        if (success) success.style.display = 'block';
      }, 800);
    });
  }

  /* ── SMOOTH SCROLL für Anker-Links ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (navLinks) navLinks.classList.remove('open');
      }
    });
  });

  /* ── NAV SHADOW ON SCROLL ── */
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.style.boxShadow = window.scrollY > 10
        ? '0 2px 20px rgba(11,37,69,0.3)'
        : 'none';
    }, { passive: true });
  }

});
