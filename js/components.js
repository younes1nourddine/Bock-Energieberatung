/* ============================================================
   ENERGIEBERATUNG BOCK — components.js
   Injects shared nav + footer into every page.
   Call injectComponents() after DOM is ready.
   ============================================================ */

function getBasePath() {
  const inPages = window.location.pathname.includes('/pages/');
  return inPages ? '../' : '';
}

function injectComponents() {
  const base = getBasePath();

  /* ── NAVIGATION ── */
  const navHTML = `
<nav class="nav" role="navigation" aria-label="Hauptnavigation">
  <div class="nav__inner">
    <a href="${base}index.html" class="nav__logo" aria-label="Zur Startseite – Energieberatung Bock">
      <span class="nav__logo-name">Energieberatung Bock</span>
      <span class="nav__logo-sub">Ingenieurbüro Andreas Bock</span>
    </a>
    <ul class="nav__links" id="nav-links">
      <li><a href="${base}pages/sanierungsfahrplan.html">Sanierungsfahrplan</a></li>
      <li><a href="${base}pages/energieausweis.html">Energieausweis</a></li>
      <li><a href="${base}pages/foerdermittelberatung.html">Förderberatung</a></li>
      <li><a href="${base}pages/ueber-mich.html">Über mich</a></li>
      <li><a href="${base}index.html#kontakt" class="nav__cta">Beratung anfragen</a></li>
    </ul>
    <button class="nav__burger" aria-label="Menü öffnen" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>`;

  /* ── FOOTER ── */
  const footerHTML = `
<footer class="footer" role="contentinfo">
  <div class="container">
    <div class="footer__grid">
      <div>
        <p class="footer__brand-name">Energieberatung Bock</p>
        <p class="footer__brand-sub">Ingenieurbüro Andreas Bock</p>
        <p>Zertifizierter Energieberater und Ingenieur in Neuhausen und dem gesamten Enzkreis. Persönlich, unabhängig, gefördert – lokale Projekte liegen mir besonders am Herzen.</p>
      </div>
      <div>
        <h4>Leistungen</h4>
        <ul class="footer__links">
          <li><a href="${base}pages/sanierungsfahrplan.html">Sanierungsfahrplan (iSFP)</a></li>
          <li><a href="${base}pages/energieausweis.html">Energieausweis</a></li>
          <li><a href="${base}pages/foerdermittelberatung.html">Fördermittelberatung</a></li>
          <li><a href="${base}pages/energetische-sanierung.html">Energetische Sanierung</a></li>
          <li><a href="${base}pages/ueber-mich.html">Über mich</a></li>
        </ul>
      </div>
      <div>
        <h4>Kontakt</h4>
        <div class="footer__contact">
          <a href="tel:+4915561722088">0155 6172 2088</a>
          <a href="mailto:info@energieberatung-bock.de">info@energieberatung-bock.de</a>
          <span style="font-size:0.82rem;margin-top:0.25rem;">Neuhausen &amp; Enzkreis</span>
        </div>
        <div style="margin-top:1.25rem;">
          <h4>Zertifizierungen</h4>
          <p style="font-size:0.78rem;margin-top:0.5rem;line-height:1.6;">DENA-Energieeffizienz-Experte &nbsp;·&nbsp; BAFA-zugelassen &nbsp;·&nbsp; KfW-Berater</p>
        </div>
      </div>
    </div>
    <div class="footer__bottom">
      <span class="footer__copy">© ${new Date().getFullYear()} Ingenieurbüro Andreas Bock. Alle Rechte vorbehalten.</span>
      <nav class="footer__legal" aria-label="Rechtliche Links">
        <a href="${base}pages/impressum.html">Impressum</a>
        <a href="${base}pages/datenschutz.html">Datenschutz</a>
      </nav>
    </div>
  </div>
</footer>

<!-- JSON-LD Structured Data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://energieberatung-bock.de/#business",
  "name": "Energieberatung Bock – Ingenieurbüro Andreas Bock",
  "description": "Zertifizierter Energieberater für Sanierungsfahrplan, Energieausweis und BAFA-Förderberatung in Neuhausen und dem gesamten Enzkreis.",
  "url": "https://energieberatung-bock.de",
  "telephone": "+4915561722088",
  "email": "info@energieberatung-bock.de",
  "priceRange": "€€",
  "image": "https://energieberatung-bock.de/assets/og-image.jpg",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Neuhausen",
    "addressRegion": "Baden-Württemberg",
    "addressCountry": "DE"
  },
  "areaServed": [
    {"@type": "City", "name": "Neuhausen (Enzkreis)"},
    {"@type": "City", "name": "Pforzheim"},
    {"@type": "City", "name": "Tiefenbronn"},
    {"@type": "City", "name": "Bad Liebenzell"},
    {"@type": "City", "name": "Weil der Stadt"},
    {"@type": "AdministrativeArea", "name": "Enzkreis"}
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Energieberatungsleistungen",
    "itemListElement": [
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Individueller Sanierungsfahrplan (iSFP)"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Energieausweis (Bedarfs- und Verbrauchsausweis)"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Fördermittelberatung BAFA und KfW"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Energetische Sanierungsbegleitung"}}
    ]
  },
  "sameAs": []
}
</script>`;

  const navMount = document.getElementById('nav-mount');
  const footerMount = document.getElementById('footer-mount');
  if (navMount) navMount.innerHTML = navHTML;
  if (footerMount) footerMount.innerHTML = footerHTML;
}

document.addEventListener('DOMContentLoaded', injectComponents);
