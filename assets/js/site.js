const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const emailAddress = 'mail@solarex.no';

const normalizePath = (path) => {
  if (!path) return '/';
  let normalized = path.replace(/\\+/g, '/');
  if (normalized === '/index.html') return '/';
  if (normalized === '/no') return '/no/';
  if (normalized === '/no/index.html') return '/no/';
  return normalized;
};

const normalizedPath = normalizePath(window.location.pathname);
const deploymentPrefix = (() => {
  for (const prefix of ['/v21', '/siw_20']) {
    if (normalizedPath === prefix || normalizedPath.startsWith(prefix + '/')) return prefix;
  }
  return '';
})();

const localPath = (() => {
  if (!deploymentPrefix) return normalizedPath;
  const stripped = normalizedPath.slice(deploymentPrefix.length) || '/';
  return normalizePath(stripped);
})();

const currentLang = localPath.startsWith('/no/') || (document.documentElement.lang || '').toLowerCase().startsWith('no') ? 'no' : 'en';

const pageKey = (() => {
  const withoutLocale = localPath.replace(/^\/no(?=\/|$)/, '') || '/';
  return withoutLocale === '' ? '/' : withoutLocale;
})();

const currentLocalFile = pageKey === '/' ? 'index.html' : pageKey.replace(/^\//, '');

const localizedPages = currentLang === 'no'
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

const pageHref = (file) => {
  if (currentLang === 'no' && file !== 'index.html') return `../${file}`;
  return file;
};

const getTargetPath = (lang) => {
  if (deploymentPrefix) {
    if (lang === 'no') return `${deploymentPrefix}/no/`;
    return `${deploymentPrefix}${pageKey === '/' ? '/' : pageKey}`;
  }
  if (lang === 'no') return pageKey === '/' ? '/no/' : `/no${pageKey}`;
  return pageKey === '/' ? '/' : pageKey;
};

const upsertLink = (rel, href, extras = {}) => {
  const selectorExtras = Object.entries(extras).map(([key, value]) => `[${key}="${value}"]`).join('');
  let link = document.head.querySelector(`link[rel="${rel}"]${selectorExtras}`);
  if (!link) {
    link = document.createElement('link');
    link.rel = rel;
    Object.entries(extras).forEach(([key, value]) => link.setAttribute(key, value));
    document.head.appendChild(link);
  }
  link.href = href;
};

const injectEnhancementStyle = () => {
  if (document.getElementById('solarex-global-enhancements')) return;
  const style = document.createElement('style');
  style.id = 'solarex-global-enhancements';
  style.textContent = `
    @import url("https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&display=swap");
    body,p,li,td,th,.lead,.section-copy,.footer-note,.site-footer p,.site-footer a,.card p,.table-card td,.table-card th,.contact-list span,.contact-list strong,.contact-list a,.footer-card p,.stack-list,.mini-list,.feature-list,.media-caption,.flow-step p,.spec-table td,.spec-table th,.roi-table td,.roi-table th,.case-table td,.case-table th{font-family:"Libre Baskerville",Georgia,"Times New Roman",serif!important}
    h1,h2,h3,h4,h5,h6,.brand-wordmark,.eyebrow,.tag,.button,.button-secondary,.section-title,.micro-metric,.site-nav a,.footer-mini-meta,.stat strong,.band-item strong,.metric-inline .metric-value,.counter{font-family:"Libre Baskerville",Georgia,"Times New Roman",serif!important}
    body{overflow-x:hidden}
    .brand{display:inline-flex;align-items:center;gap:.35rem}
    .brand-wordmark{display:inline-flex;align-items:baseline;gap:0;font-size:clamp(1.8rem,3vw,2.4rem);font-weight:700;line-height:1;white-space:nowrap;color:#fff}
    .brand-wordmark span{color:#14d447}
    .topbar{align-items:center!important;justify-content:space-between!important;gap:.75rem}
    .topbar-actions{display:flex;align-items:center;gap:.5rem;flex-wrap:wrap}
    .topbar-actions .button{width:auto!important;min-height:38px;padding:.45rem .9rem}
    .topbar-version{display:block;font-size:.92rem;opacity:.92;letter-spacing:.08em;text-transform:uppercase;color:#dbe4da}
    .mobile-lang-row{display:none}
    .hero-comparison{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem}
    .hero-comparison-card{padding:1.15rem;border-radius:22px;background:linear-gradient(180deg,rgba(255,255,255,.03),rgba(255,255,255,.02));border:1px solid rgba(255,255,255,.08);box-shadow:0 24px 60px rgba(0,0,0,.22)}
    .hero-comparison-card h3{margin:0 0 .7rem;color:#eaf7ed}
    .hero-comparison-bars{display:grid;gap:.55rem;margin:.95rem 0 1rem}
    .hero-comparison-bars span{display:block;height:14px;border-radius:999px;background:linear-gradient(90deg,#0ea532,#26c654);box-shadow:0 0 18px rgba(20,212,71,.2)}
    .hero-comparison-bars span:nth-child(1){width:88%}
    .hero-comparison-bars span:nth-child(2){width:76%}
    .hero-comparison-bars span:nth-child(3){width:95%}
    .hero-comparison-card--titan .hero-comparison-bars span:nth-child(1){width:80%}
    .hero-comparison-card--titan .hero-comparison-bars span:nth-child(2){width:93%}
    .hero-comparison-card--titan .hero-comparison-bars span:nth-child(3){width:74%}
    .site-footer.shared-footer{padding:2.4rem 0 3rem;border-top:1px solid rgba(255,255,255,.08);background:linear-gradient(180deg,rgba(0,0,0,.12),rgba(0,0,0,.28))}
    .shared-footer .footer-shell{display:grid;grid-template-columns:1.05fr 1.45fr .95fr;gap:1rem;align-items:stretch}
    .shared-footer .footer-card{padding:1.35rem}
    .footer-brand-lockup{display:flex;align-items:center;gap:.9rem;margin:0 0 1rem}
    .footer-wordmark{display:inline-flex;align-items:baseline;font-size:clamp(1.7rem,2.4vw,2.2rem);font-weight:700;line-height:1;color:#fff}
    .footer-wordmark span{color:#14d447}
    .footer-note{margin:0;color:#b8c3b7}
    .footer-sitemap{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.7rem}
    .footer-sitemap a,.footer-utility a{display:flex;align-items:center;justify-content:flex-start;min-height:46px;padding:.8rem 1rem;border-radius:16px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);color:#dbe4da;font-weight:700;transition:transform .18s ease,border-color .18s ease,background .18s ease}
    .footer-sitemap a:hover,.footer-utility a:hover{transform:translateY(-2px);border-color:rgba(20,212,71,.26);background:rgba(20,212,71,.08)}
    .footer-sitemap a.is-active{border-color:rgba(20,212,71,.34);background:rgba(20,212,71,.10);color:#fff}
    .footer-utility{display:grid;gap:.7rem}
    .footer-mini-meta{margin-top:1rem;color:#8ea08d;font-size:.9rem}
    .viz-track{height:14px;border-radius:999px;background:rgba(255,255,255,.08);overflow:hidden;position:relative}
    .viz-fill{height:100%;width:0;border-radius:999px;background:linear-gradient(90deg,#0ea532,#26c654);box-shadow:0 0 18px rgba(20,212,71,.24)}
    .roi-bars,.spec-bars,.case-bars{display:grid;gap:1rem}
    .bar-row{display:grid;gap:.4rem}
    .bar-head{display:flex;justify-content:space-between;gap:1rem;align-items:center;color:#dbe4da;font-size:.96rem}
    @media (max-width:980px){
      .nav-toggle{display:inline-flex!important;align-items:center;justify-content:center;min-height:44px;width:48px;height:48px;min-width:48px;padding:0!important;border-radius:999px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.03);color:transparent;font-size:0;font-weight:800;position:relative}
      .nav-toggle::before{content:"";display:block;width:18px;height:2px;border-radius:999px;background:#fff;box-shadow:0 -6px 0 #fff,0 6px 0 #fff}
      .site-nav{display:none!important;overflow:visible!important;white-space:normal!important;padding-top:.85rem;gap:.7rem!important}
      .site-nav.open{display:grid!important;grid-template-columns:1fr;align-items:stretch}
      .site-nav a{width:100%;text-align:center;justify-content:center;padding:.85rem 1rem!important}
      .site-nav a.button.button-sm{width:100%}
      .topbar-actions{display:none!important}
      .mobile-lang-row{display:grid;grid-template-columns:1fr 1fr;gap:.7rem}
      .mobile-lang-row a{display:flex;align-items:center;justify-content:center;min-height:48px;border-radius:999px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.03);color:#fff;font-weight:700;padding:.8rem 1rem}
      .mobile-lang-row a.active{background:linear-gradient(135deg,#0a6a22,#0f8f2f);border-color:rgba(20,212,71,.38)}
      .topbar{display:grid!important;grid-template-columns:minmax(0,1fr) auto!important;grid-template-areas:"brand toggle" "version version"!important;align-items:center!important;gap:.45rem .75rem!important}
      .topbar>.brand{grid-area:brand;justify-self:start!important;align-self:center}
      .topbar>.nav-toggle{grid-area:toggle;justify-self:end!important;align-self:start}
      .topbar>.topbar-version{grid-area:version;justify-self:start!important}
      .hero h1{font-size:clamp(1.95rem,9vw,3.25rem)!important;line-height:1.04!important}
      .lead{font-size:1rem!important}
      .hero-grid,.hero-stats,.footer-grid,.band,.proof-grid,.flow,.process-diagram,.shared-footer .footer-shell,.footer-sitemap,.matrix-grid,.formula-grid,.pilot-grid,.insight-grid,.download-grid,.cta-grid,.hero-comparison{grid-template-columns:1fr!important}
      .hero,.hero-product{padding-top:4.2rem!important}
      .stat,.band-item,.hero-comparison-card,.matrix-card,.footer-card,.pilot-card,.viz-card,.media-frame{padding:1.05rem!important}
      .site-nav a.contact-chip{margin-top:.15rem}
    }
    @media (max-width:640px){
      .container{width:min(1180px,calc(100% - 20px))!important}
      .button,.button-secondary{width:auto}
      .section{padding:2rem 0 3rem}
      .brand-wordmark{font-size:clamp(1.55rem,7.8vw,2.05rem)!important}
    }
  `;
  document.head.appendChild(style);
};

const ensureBrandWordmark = () => {
  document.querySelectorAll('.brand').forEach((brand) => {
    const href = brand.getAttribute('href') || 'index.html';
    brand.innerHTML = '<span class="brand-wordmark">Solar<span>EX</span></span>';
    brand.setAttribute('href', href);
    brand.setAttribute('aria-label', 'SolarEX home');
    brand.setAttribute('title', 'SolarEX home');
  });
};

const normalizeHeaderStructure = () => {
  const header = document.querySelector('.site-header');
  const topbar = document.querySelector('.topbar');
  if (!header || !topbar) return;

  if (navToggle && navToggle.parentElement !== topbar) topbar.appendChild(navToggle);
  if (navToggle) {
    navToggle.textContent = '';
    navToggle.setAttribute('aria-label', 'Open navigation');
  }

  const versionCandidates = [...header.querySelectorAll('span')].filter((el) => {
    const text = (el.textContent || '').trim();
    return /^v\d/i.test(text) && !el.closest('.brand-wordmark');
  });

  let version = topbar.querySelector('.topbar-version') || versionCandidates[0] || null;
  if (!version) {
    version = document.createElement('span');
    version.textContent = 'v2.1';
  }
  version.className = 'topbar-version';
  if (version.parentElement !== topbar) topbar.appendChild(version);

  versionCandidates.forEach((el) => {
    if (el !== version) el.remove();
  });
};

const ensureIcons = () => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#050505"/><circle cx="32" cy="32" r="14" fill="#14d447"/><text x="32" y="40" font-size="18" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-weight="700">S</text></svg>`;
  const dataUrl = `data:image/svg+xml,${encodeURIComponent(svg)}`;
  upsertLink('icon', dataUrl);
  upsertLink('apple-touch-icon', dataUrl);
  upsertLink('alternate', getTargetPath('en'), { hreflang: 'en' });
  upsertLink('alternate', getTargetPath('no'), { hreflang: 'no' });
  upsertLink('alternate', getTargetPath('en'), { hreflang: 'x-default' });
};

const switchLanguage = (lang) => {
  localStorage.setItem('solarex_lang', lang);
  const target = getTargetPath(lang);
  if (target && target !== normalizedPath) window.location.href = target;
};

const ensureNavigation = () => {
  if (!siteNav) return;
  const navItems = localizedPages.map(([href, label]) => {
    const targetHref = pageHref(href);
    const activeClass = href === currentLocalFile ? 'active' : '';
    const buttonClass = href === 'contact.html' ? 'button button-sm contact-chip' : '';
    const classes = [activeClass, buttonClass].filter(Boolean).join(' ');
    return `<a href="${targetHref}"${classes ? ` class="${classes}"` : ''}>${label}</a>`;
  }).join('');

  const mobileLang = `
    <div class="mobile-lang-row">
      <a href="${getTargetPath('en')}" data-lang="en" class="${currentLang === 'en' ? 'active' : ''}">English</a>
      <a href="${getTargetPath('no')}" data-lang="no" class="${currentLang === 'no' ? 'active' : ''}">Norsk</a>
    </div>
  `;

  siteNav.innerHTML = navItems + mobileLang;
  siteNav.querySelectorAll('[data-lang]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      switchLanguage(link.dataset.lang);
    });
  });
};

const ensureTopbarActions = () => {
  const topbar = document.querySelector('.topbar');
  if (!topbar || topbar.querySelector('.topbar-actions')) return;
  const actions = document.createElement('div');
  actions.className = 'topbar-actions desktop-lang-switch';
  actions.innerHTML = `
    <a class="button button-secondary button-sm ${currentLang === 'en' ? '' : 'button-secondary'}" href="${getTargetPath('en')}" data-lang="en">English</a>
    <a class="button button-secondary button-sm ${currentLang === 'no' ? '' : 'button-secondary'}" href="${getTargetPath('no')}" data-lang="no">Norsk</a>
  `;
  actions.querySelectorAll('[data-lang]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      switchLanguage(btn.dataset.lang);
    });
    if ((btn.dataset.lang === 'en' && currentLang === 'en') || (btn.dataset.lang === 'no' && currentLang === 'no')) {
      btn.classList.remove('button-secondary');
    }
  });
  topbar.appendChild(actions);
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

  const brandTag = currentLang === 'no' ? 'SolarEX-plattform' : 'SolarEX platform';
  const utilityTag = currentLang === 'no' ? 'Kontakt' : 'Contact';
  const description = currentLang === 'no'
    ? 'SolarEX er en mekanismebasert fotovoltaisk nanobeleggsplattform for renere solglass, redusert vaskebelastning og mer presis pilotkvalifisering.'
    : 'SolarEX is a mechanism-led photovoltaic nanocoating platform for cleaner solar glass, lower wash burden, and sharper pilot qualification.';
  const switchLabel = currentLang === 'no' ? 'English version' : 'Norsk versjon';
  const switchLang = currentLang === 'no' ? 'en' : 'no';
  const versionLabel = currentLang === 'no' ? 'Aktiv språkversjon' : 'Active language version';
  const versionValue = currentLang === 'no' ? 'Norsk' : 'English';

  const sitemapHtml = localizedPages.map(([href, label]) => {
    const activeClass = href === currentLocalFile ? 'is-active' : '';
    return `<a href="${pageHref(href)}" class="${activeClass}">${label}</a>`;
  }).join('');

  footer.innerHTML = `
    <div class="container footer-shell">
      <div class="footer-card footer-brand-panel">
        <p class="tag">${brandTag}</p>
        <div class="footer-brand-lockup">
          <a href="${pageHref('index.html')}" aria-label="SolarEX home" title="SolarEX home" class="footer-wordmark">Solar<span>EX</span></a>
        </div>
        <p class="footer-note">${description}</p>
      </div>
      <div class="footer-card footer-sitemap-panel">
        <p class="tag">Sitemap</p>
        <div class="footer-sitemap">${sitemapHtml}</div>
      </div>
      <div class="footer-card footer-utility-panel">
        <p class="tag">${utilityTag}</p>
        <div class="footer-utility">
          <a href="mailto:${emailAddress}">${emailAddress}</a>
          <a href="${getTargetPath(switchLang)}" data-lang="${switchLang}">${switchLabel}</a>
        </div>
        <div class="footer-mini-meta"><strong>${versionLabel}:</strong> ${versionValue}</div>
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

const setupNavToggle = () => {
  if (!navToggle || !siteNav) return;
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 980) {
        siteNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
};

injectEnhancementStyle();
ensureBrandWordmark();
normalizeHeaderStructure();
ensureIcons();
ensureNavigation();
ensureTopbarActions();
createFooter();
setupNavToggle();

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
}, { threshold: 0.35 });

document.querySelectorAll('[data-fill]').forEach((fill) => barObserver.observe(fill));

document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
  const href = link.getAttribute('href') || '';
  const query = href.includes('?') ? href.slice(href.indexOf('?')) : '';
  link.setAttribute('href', `mailto:${emailAddress}${query}`);
  if (link.textContent && link.textContent.includes('@')) link.textContent = emailAddress;
});
