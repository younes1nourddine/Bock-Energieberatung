/* cms-inject.js — lädt Inhalte aus den JSON-Dateien und injiziert sie ins DOM */

(function () {
  const base = window.location.pathname.includes('/pages/') ? '../' : '';

  function applyGlobal(data) {
    document.querySelectorAll('[data-cms="phone"]').forEach(el => {
      if (el.tagName === 'A') { el.href = 'tel:+49' + data.phone.replace(/\s/g, ''); }
      el.textContent = data.phone;
    });
    document.querySelectorAll('[data-cms="email"]').forEach(el => {
      if (el.tagName === 'A') { el.href = 'mailto:' + data.email; }
      el.textContent = data.email;
    });
    document.querySelectorAll('[data-cms="region"]').forEach(el => {
      el.textContent = data.region;
    });
  }

  function applyHomepage(data) {
    const h = data.hero;
    const u = data.ueber;
    const k = data.kontakt;

    const heroTitle = document.querySelector('[data-cms="hero-title"]');
    const heroTitleEm = document.querySelector('[data-cms="hero-title-em"]');
    const heroText = document.querySelector('[data-cms="hero-text"]');
    const heroBanner = document.querySelector('[data-cms="hero-banner"]');
    const btnPrimary = document.querySelector('[data-cms="btn-primary"]');
    const btnGhost = document.querySelector('[data-cms="btn-ghost"]');

    if (heroTitle && h) heroTitle.childNodes[0].textContent = h.title + ' ';
    if (heroTitleEm && h) heroTitleEm.textContent = h.title_em;
    if (heroText && h) heroText.textContent = h.text;
    if (heroBanner && h) heroBanner.textContent = h.banner;
    if (btnPrimary && h) btnPrimary.textContent = h.btn_primary;
    if (btnGhost && h) btnGhost.textContent = h.btn_ghost;

    const ueberTitle = document.querySelector('[data-cms="ueber-title"]');
    const ueberText1 = document.querySelector('[data-cms="ueber-text1"]');
    const ueberText2 = document.querySelector('[data-cms="ueber-text2"]');
    if (ueberTitle && u) ueberTitle.textContent = u.title;
    if (ueberText1 && u) ueberText1.textContent = u.text1;
    if (ueberText2 && u) ueberText2.textContent = u.text2;

    const kontaktTitle = document.querySelector('[data-cms="kontakt-title"]');
    const kontaktText = document.querySelector('[data-cms="kontakt-text"]');
    if (kontaktTitle && k) kontaktTitle.textContent = k.title;
    if (kontaktText && k) kontaktText.textContent = k.text;
  }

  function fetchJSON(path, cb) {
    fetch(base + path)
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data) cb(data); })
      .catch(() => {});
  }

  fetchJSON('content/global.json', applyGlobal);

  if (document.querySelector('[data-cms="hero-title"]')) {
    fetchJSON('content/homepage.json', applyHomepage);
  }
})();
