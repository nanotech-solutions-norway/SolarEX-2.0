const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => siteNav.classList.toggle('open'));
}

const docLang = (document.documentElement.lang || 'en').toLowerCase();
const isNorwegianPage = docLang.startsWith('no');
const assetPrefix = isNorwegianPage ? '../' : '';
const logoAssetUrl = `${assetPrefix}SIW-v1.0/solarex-logo-only.png`;
const faviconAssetUrl = `${assetPrefix}SIW-v1.0/solarex-favicon-v1-0.png`;
const fontAssetUrl = `${assetPrefix}SIW-v1.0/Fauna-Medium.ttf`;
const emailAddress = 'mail@solarex.no';

const normalizePath = (path) => {
  if (!path) return '/';
  let normalized = path.replace(/\/+/g, '/');
  if (normalized === '/index.html') return '/';
  if (normalized === '/no') return '/no/';
  if (normalized === '/no/index.html') return '/no/';
  return normalized;
};

const normalizedPath = normalizePath(window.location.pathname);
const pageKey = (() => {
  const withoutLocale = normalizedPath.replace(/^\/no(?=\/|$)/, '') || '/';
  return withoutLocale === '' ? '/' : withoutLocale;
})();

const getTargetPath = (lang) => {
  if (lang === 'no') return pageKey === '/' ? '/no/' : `/no${pageKey}`;
  return pageKey === '/' ? '/' : pageKey;
};

const upsertLink = (rel, href) => {
  let link = document.head.querySelector(`link[rel="${rel}"]`);
  if (!link) {
    link = document.createElement('link');
    link.rel = rel;
    document.head.appendChild(link);
  }
  link.href = href;
};

const injectEnhancementStyle = () => {
  if (document.getElementById('solarex-global-enhancements')) return;
  const style = document.createElement('style');
  style.id = 'solarex-global-enhancements';
  style.textContent = `
  @font-face{
    font-family:"FaunaSolarEX";
    src:url("${fontAssetUrl}") format("truetype");
    font-weight:500;
    font-style:normal;
    font-display:swap
  }
  .hero .container{width:min(1180px,calc(100% - 2rem));max-width:1180px;padding:0;margin:0 auto}
  body{
    background:
      radial-gradient(circle at 15% 12%,rgba(20,212,71,.16),transparent 24%),
      radial-gradient(circle at 84% 10%,rgba(60,160,255,.14),transparent 26%),
      radial-gradient(circle at 50% 82%,rgba(20,212,71,.08),transparent 30%),
      linear-gradient(180deg,#040404 0%,#060707 52%,#0a0d0a 100%);
    overflow-x:hidden
  }
  .ambient-grid{
    position:fixed;inset:0;pointer-events:none;z-index:0;opacity:.34;
    background-image:
      linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),
      linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px);
    background-size:64px 64px,64px 64px;
    mask-image:radial-gradient(circle at center,black 35%,transparent 88%);
    animation:gridShift 24s linear infinite
  }
  body::before,body::after{
    content:"";position:fixed;pointer-events:none;z-index:0;border-radius:50%;
    filter:blur(60px);opacity:.38
  }
  body::before{
    width:340px;height:340px;left:-40px;top:120px;
    background:radial-gradient(circle,rgba(20,212,71,.24),transparent 68%);
    animation:floatOrb 16s ease-in-out infinite
  }
  body::after{
    width:300px;height:300px;right:-30px;top:240px;
    background:radial-gradient(circle,rgba(0,180,255,.16),transparent 70%);
    animation:floatOrbAlt 18s ease-in-out infinite
  }
  main,.site-header,.site-footer{position:relative;z-index:1}
  .brand{gap:.8rem}
  .brand-logo{
    width:54px;height:54px;object-fit:contain;border-radius:14px;
    box-shadow:0 8px 26px rgba(0,0,0,.28);background:rgba(255,255,255,.02)
  }
  .brand-wordmark,.footer-wordmark{
    display:inline-flex;align-items:center;
    font-family:"FaunaSolarEX",Inter,ui-sans-serif,system-ui,sans-serif;
    letter-spacing:.02em
  }
  .brand-wordmark{font-size:1.42rem;font-weight:500;color:#fff}
  .brand-wordmark span,.footer-wordmark span{color:#14d447}
  .hero-logo{width:min(100%,320px);height:auto;display:block;margin:0 auto;filter:drop-shadow(0 18px 34px rgba(0,0,0,.36))}
  .hero-visual-card{padding:1.5rem}
  .insight-grid,.download-grid,.matrix-grid,.formula-grid,.pilot-grid,.cta-grid{display:grid;gap:1rem}
  .insight-grid,.download-grid,.pilot-grid,.formula-grid{grid-template-columns:repeat(3,minmax(0,1fr))}
  .matrix-grid,.cta-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
  .insight-card,.download-card,.matrix-card,.formula-card,.pilot-card,.cta-card{
    padding:1.35rem;border-radius:22px;
    background:linear-gradient(180deg,rgba(255,255,255,.03),rgba(255,255,255,.02));
    border:1px solid rgba(255,255,255,.08);
    box-shadow:0 24px 60px rgba(0,0,0,.26)
  }
  .section-title{font-size:clamp(1.9rem,2.6vw,2.7rem);line-height:1.08;margin:0 0 .75rem;color:#fff}
  .section-copy{max-width:860px;color:#b8c3b7;margin:0 0 1.2rem}
  .stack-list,.mini-list{margin:0;padding-left:1.15rem;color:#b8c3b7}
  .stack-list li,.mini-list li{margin:.45rem 0}
  .download-card .hero-actions,.cta-card .hero-actions,.pilot-card .hero-actions{margin-top:1rem}
  .micro-metric{display:block;font-size:.85rem;text-transform:uppercase;letter-spacing:.08em;color:#d0f8da;margin-bottom:.45rem}
  .big-number{display:block;font-size:2rem;font-weight:800;color:#fff;margin-bottom:.3rem}
  .formula-line{
    display:block;margin:.65rem 0;padding:.8rem 1rem;border-radius:16px;
    background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);
    font-family:ui-monospace,SFMono-Regular,Consolas,monospace;color:#eaf0e7
  }
  .matrix-card h3,.insight-card h3,.download-card h3,.formula-card h3,.pilot-card h3,.cta-card h3{margin:0 0 .75rem}
  .matrix-card p,.insight-card p,.download-card p,.formula-card p,.pilot-card p,.cta-card p{color:#b8c3b7}
  .link-chip{
    display:inline-flex;align-items:center;gap:.5rem;padding:.45rem .75rem;border-radius:999px;
    border:1px solid rgba(20,212,71,.24);background:rgba(20,212,71,.08);
    color:#d0f8da;font-size:.82rem;font-weight:700
  }
  .site-footer.shared-footer{
    padding:2.4rem 0 3rem;
    border-top:1px solid rgba(255,255,255,.08);
    background:linear-gradient(180deg,rgba(0,0,0,.12),rgba(0,0,0,.28))
  }
  .shared-footer .footer-shell{display:grid;grid-template-columns:1.05fr 1.45fr .95fr;gap:1rem;align-items:stretch}
  .shared-footer .footer-card{padding:1.35rem}
  .footer-brand-lockup{display:flex;align-items:center;gap:.9rem;margin:0 0 1rem}
  .footer-logo{
    width:74px;height:74px;object-fit:contain;border-radius:18px;
    background:rgba(255,255,255,.03);box-shadow:0 18px 42px rgba(0,0,0,.28)
  }
  .footer-wordmark{font-size:1.8rem;color:#fff}
  .footer-note{margin:0;color:#b8c3b7}
  .footer-sitemap{
    display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.7rem
  }
  .footer-sitemap a,.footer-utility a{
    display:flex;align-items:center;justify-content:flex-start;
    min-height:46px;padding:.8rem 1rem;border-radius:16px;
    background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);
    color:#dbe4da;font-weight:700;transition:transform .18s ease,border-color .18s ease,background .18s ease
  }
  .footer-sitemap a:hover,.footer-utility a:hover{
    transform:translateY(-2px);border-color:rgba(20,212,71,.26);background:rgba(20,212,71,.08)
  }
  .footer-sitemap a.is-active{border-color:rgba(20,212,71,.34);background:rgba(20,212,71,.10);color:#fff}
  .footer-utility{display:grid;gap:.7rem}
  .footer-mini-meta{margin-top:1rem;color:#8ea08d;font-size:.9rem}
  @keyframes gridShift{from{transform:translate3d(0,0,0)}to{transform:translate3d(64px,64px,0)}}
  @keyframes floatOrb{0%,100%{transform:translate3d(0,0,0)}50%{transform:translate3d(34px,18px,0)}}
  @keyframes floatOrbAlt{0%,100%{transform:translate3d(0,0,0)}50%{transform:translate3d(-28px,22px,0)}}
  @media (max-width:980px){
    .hero .container{width:min(1180px,calc(100% - 1.1rem))}
    .insight-grid,.download-grid,.matrix-grid,.formula-grid,.pilot-grid,.cta-grid,.shared-footer .footer-shell,.footer-sitemap{grid-template-columns:1fr}
    .brand-logo{width:46px;height:46px}
  }
  @media (prefers-reduced-motion:reduce){
    .ambient-grid,body::before,body::after{animation:none}
  }
  `;
  document.head.appendChild(style);
};

const ensureAmbientGrid = () => {
  if (document.querySelector('.ambient-grid')) return;
  const div = document.createElement('div');
  div.className = 'ambient-grid';
  div.setAttribute('aria-hidden', 'true');
  document.body.prepend(div);
};

const ensureBrandLogo = () => {
  document.querySelectorAll('.brand').forEach((brand) => {
    const href = brand.getAttribute('href') || `${assetPrefix}index.html`;
    brand.innerHTML = `<img src="${logoAssetUrl}" alt="SolarEX logo" class="brand-logo" /><span class="brand-wordmark" aria-hidden="true">Solar<span>EX</span></span>`;
    brand.setAttribute('href', href);
  });
};

const ensureIcons = () => {
  upsertLink('icon', faviconAssetUrl);
  upsertLink('apple-touch-icon', faviconAssetUrl);
};

const localizedPages = isNorwegianPage
  ? [
      ['index.html', 'Hjem'],
      ['quartz.html', 'Quartz'],
      ['titan.html', 'Titan'],
      ['applications.html', 'Bruksområder'],
      ['proof-results.html', 'Dokumentasjon'],
      ['roi-analysis.html', 'ROI-analyse'],
      ['case-study-norway.html', 'Casestudie'],
      ['technical-specifications.html', 'Tekniske spesifikasjoner'],
      ['application-process.html', 'Applikasjonsprosess'],
      ['contact.html', 'Kontakt']
    ]
  : [
      ['index.html', 'Home'],
      ['quartz.html', 'Quartz'],
      ['titan.html', 'Titan'],
      ['applications.html', 'Applications'],
      ['proof-results.html', 'Proof'],
      ['roi-analysis.html', 'ROI'],
      ['case-study-norway.html', 'Case Study'],
      ['technical-specifications.html', 'Technical Specifications'],
      ['application-process.html', 'Application Process'],
      ['contact.html', 'Contact']
    ];

const currentLocalFile = pageKey === '/' ? 'index.html' : pageKey.replace(/^\//, '');

const switchLanguage = (lang) => {
  localStorage.setItem('solarex_lang', lang);
  const target = getTargetPath(lang);
  if (target && target !== normalizedPath) window.location.href = target;
};

const createFooter = () => {
  const main = document.querySelector('main');
  if (!main) return;

  let footer = document.querySelector('.site-footer');
  if (!footer) {
    footer = document.createElement('footer');
    main.insertAdjacentElement('afterend', footer);
  }

  footer.className = 'site-footer shared-footer';

  const brandTag = isNorwegianPage ? 'SolarEX-plattform' : 'SolarEX platform';
  const sitemapTag = isNorwegianPage ? 'Nettstedskart' : 'Sitemap';
  const utilityTag = isNorwegianPage ? 'Kontakt' : 'Contact';
  const description = isNorwegianPage
    ? 'SolarEX er en mekanismebasert PV-nanobeleggsplattform for renere solglass, redusert vaskebelastning og mer presis pilotkvalifisering.'
    : 'SolarEX is a mechanism-led photovoltaic nanocoating platform for cleaner solar glass, lower wash burden, and sharper pilot qualification.';
  const switchLabel = isNorwegianPage ? 'English version' : 'Norsk versjon';
  const switchLang = isNorwegianPage ? 'en' : 'no';
  const versionLabel = isNorwegianPage ? 'Aktiv språkversjon' : 'Active language version';
  const versionValue = isNorwegianPage ? 'Norsk' : 'English';

  const sitemapHtml = localizedPages.map(([href, label]) => {
    const activeClass = href === currentLocalFile ? ' is-active' : '';
    return `<a href="${href}" class="${activeClass.trim()}">${label}</a>`;
  }).join('');

  footer.innerHTML = `
    <div class="container footer-shell">
      <div class="footer-card footer-brand-panel">
        <p class="tag">${brandTag}</p>
        <div class="footer-brand-lockup">
          <img src="${logoAssetUrl}" alt="SolarEX logo" class="footer-logo" />
          <span class="footer-wordmark" aria-hidden="true">Solar<span>EX</span></span>
        </div>
        <p class="footer-note">${description}</p>
      </div>
      <div class="footer-card footer-sitemap-panel">
        <p class="tag">${sitemapTag}</p>
        <div class="footer-sitemap">
          ${sitemapHtml}
        </div>
      </div>
      <div class="footer-card footer-utility-panel">
        <p class="tag">${utilityTag}</p>
        <div class="footer-utility">
          <a href="mailto:${emailAddress}">${emailAddress}</a>
          <a href="${getTargetPath(switchLang)}" data-lang="${switchLang}">${switchLabel}</a>
        </div>
        <div class="footer-mini-meta">
          <strong>${versionLabel}:</strong> ${versionValue}
        </div>
      </div>
    </div>
  `;

  footer.querySelectorAll('[data-lang]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      switchLanguage(link.dataset.lang);
    });
  });
};

injectEnhancementStyle();
ensureAmbientGrid();
ensureBrandLogo();
ensureIcons();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

const animateCounter = (el) => {
  const target = parseFloat(el.dataset.count || '0');
  const decimals = Number(el.dataset.decimals || (String(target).includes('.') ? 2 : 0));
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  const duration = 1400;
  const start = performance.now();
  const format = (value) => `${prefix}${value.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`;
  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = format(target * eased);
    if (progress < 1) requestAnimationFrame(tick);
  };
  el.textContent = format(0);
  requestAnimationFrame(tick);
};

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.35 });

document.querySelectorAll('[data-count]').forEach((el) => counterObserver.observe(el));

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      fill.style.transition = 'width 1.2s ease';
      fill.style.width = `${fill.dataset.fill || 0}%`;
      barObserver.unobserve(fill);
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('.viz-fill').forEach((fill) => barObserver.observe(fill));

document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
  const href = link.getAttribute('href') || '';
  const query = href.includes('?') ? href.slice(href.indexOf('?')) : '';
  link.setAttribute('href', `mailto:${emailAddress}${query}`);
  if (link.textContent && link.textContent.includes('@')) link.textContent = emailAddress;
});

const browserLang = (navigator.languages && navigator.languages[0]) || navigator.language || '';
const likelyNorway =
  /(^|[-_])(no|nb|nn)([-_]|$)/i.test(browserLang) ||
  Intl.DateTimeFormat().resolvedOptions().timeZone === 'Europe/Oslo';
const preferredLang = localStorage.getItem('solarex_lang');

const topbar = document.querySelector('.topbar');
if (topbar && !topbar.querySelector('.topbar-actions')) {
  const actions = document.createElement('div');
  actions.className = 'topbar-actions';
  actions.innerHTML = `
    <a class="button button-secondary button-sm" href="${getTargetPath('en')}" data-lang="en">English</a>
    <a class="button button-secondary button-sm" href="${getTargetPath('no')}" data-lang="no">Norsk</a>
  `;
  actions.querySelectorAll('[data-lang]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      switchLanguage(btn.dataset.lang);
    });
    if ((btn.dataset.lang === 'no' && isNorwegianPage) || (btn.dataset.lang === 'en' && !isNorwegianPage)) {
      btn.classList.remove('button-secondary');
    }
  });
  topbar.appendChild(actions);
}

createFooter();

if (!preferredLang) {
  if (likelyNorway && !isNorwegianPage) {
    const target = getTargetPath('no');
    if (target && target !== normalizedPath) window.location.replace(target);
  }
  if (!likelyNorway && isNorwegianPage) {
    const target = getTargetPath('en');
    if (target && target !== normalizedPath) window.location.replace(target);
  }
}
