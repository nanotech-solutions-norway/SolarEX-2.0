
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => siteNav.classList.toggle('open'));
}

const currentPath = window.location.pathname;
const normalizedPath = currentPath.endsWith('/') ? currentPath : currentPath;
const isNorwegianPage = document.documentElement.lang.toLowerCase().startsWith('no');
const assetPrefix = isNorwegianPage ? '../' : '';
const pageKey = ((normalizedPath.replace(/^\/no(?=\/|$)/, '')) || '/').replace(/\/+/g, '/') || '/';

const logoDataUri = 'data:image/webp;base64,UklGRthRAABXRUJQVlA4TMxRAAAv7sE1AE8gEEj6H6WQIxJCUP+z/6N1GdLdD4jMMez/n7+/7+4Nf9WN/5Xg+v/7P9cuY8yE8d0fZxvX1d7/8o6gH3+7a9l0l9v9jWQ9f4w2r3VtYQ3l+8Z7fG7P+fQh3/m7vAq9mQ9+f1I9jv0o+8Qp7e6m7A7+v8Vv0z7+gJvX5h4g7b0w5t7A4cR3x6m7u+2gP8mT7A4Z5a5w6v8r7k4dQ6b1mP8Zg7JmYJ/3ZP+0eM4QfJg1r/9t4z6v2q6Q3YbQ8mG1P9t2K7h9f5V0m8qV4rS6n9i4r5O8dG5Y6W9g0Fq4hY2mV1lVdS1Cw7d9vN2J7U2O9S2sS1bD+3o5V3l0f3wV0KqX2g4P2XJ0r1v7L3y7Q7R8z3mT2j3u3Z3K2Q6I3u9bP9mW5l2Y0m3sYd6Z8hOa3f0QF9L0fU2bKq8p1rBzqv3V0u+S0EJ4Tg6m1f7Q2wL6r+7P1m1m9iM0m0mBq0v8mV7nF3W9U2e8U1Vh+4J+q0L2p8m0x8+8m7B7d6X7J4w5e7z3y7a7d7X7f7a8v7n+9fR8Vn1u9J8rY8rY9nV4YyQh9+2xqz2qf2nC0xk6b4o8q7X1i0eW3Y3j4t4zQ1bQ3b6o4h+o6N2Hk9m5yB+4J7H6hWn8xYh6l0i6o9n3z0j+u0r7T5V8o7Y4U9n5r7P7U7b7b7c7V7Z7f7f7X7Y7Y7b7b7X7X7X7V7U7X7X7W7V7W7W7W7W7W7W7W7W7W7W7W7W7W7W7W7W7W7W7W7W7W7W7W7W7W7W7W7W7W7W7W7W7W7W7W7W7W7W7W7W7W7W7W7W7W7W7W7W7W7W7W7W7W7W7W7W7W7W7W7W7W7W7W7W7W7W7W7W7W7W7W7W7W7W7QAA/v9WUDggmA8AABBAJbACdADoAPwAPlEkkkQiIyKhICgAgA2JaW7hd2EeB5D6P4vJ/2gAA/v2e9f6E3lW3mS0y1oQK3JwB4kLhM7yJz7o5FQe0Z1mQ4f9w4w2sM6k8H6y9b3cO3K0oM0bXjJv9M8s6bQ0D+1sSxv8F2l9Y3g9x5f4W0wTzQF2g0V1mS6pHn9J7uQ0E9lq6w6e2Yk+Nq3m5JQzQAAAA=';
const faviconDataUri = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAIAAAAlC+aJAAAanElEQVR42u2bXWxUZRjHf5+7M+2m7dbS0tJ6aUtBaUNJbYFSA2rULWqjQhDSpI0xkSpK49QYQ6MoATVNE1E0FQ1pU6P9FMX4Q40fQ4zBfxDpFxJUBNoEA0mkltq2tN3Z7b7n3Jkz53zvPi6Pw+2X6d/5znnP+X7nP+d8zhm5ubn5f+AVnUavF5FIhNlsZrVaWZaF0+nE7/eL4zh2ux2fz0eSJLIs4/F4RCIRh8MhCAI+n4/f75dliWEYDodDLMuSJEkcx2maJk3T5XJhs9lM0xRFkWXZ2traRCLB4/HQdR2Hw0HbtrS0tLi4uMVi8Xg8mqaRZZnhcJjRaKSqqgqfz8dqtRIEgSzL4jgO7/fLsoxOp8Pj8XAch2EYjUZdXV3gOA6n00mWZQ6Hw9fXV2azGdM0KIrC7/eTZZnZbEaSJD6fj9frhWEYiqJQVRWHw0GWZVQqFZIk4fF4ZFnG7/cTBAFVVXE6nSRJwu12EwQBXdeRZRm/34/VaiXLMn6/n9PpRBAEiqJgMpk0TRMEgW3bGIZB0zQ8Hg9VVfF6vQiCwGQyYbFYmEwmPM9jGAY+n4/f74fL5SIKAsuyGIaBzWajKApZlhmNRjKZjMVioWkap9NJFEU0TQPGG6h1X7n1Qx1+0j4WfYV+e3n8mM3m9wNfX7mH8oWn3M2c/4iYz1o9s2n3W1h7jzGv3xV0v8m6nV1P8FzL8j2l7Kf7v3mZ6mT9+WZyYvN3q4yJm0k8e7Y0Vn+0V8r6z9r4xV+F7x5T6Q6k8m1sQn9p4F9r2W9sG8x4j9gkYdWbN0WcO8m7t3z5h8g5e5cWv+eQm0yI8d2r6+O0O2X1m3m0oJ0V1P9h0v9xw8l6m3v2sW7wN2D8n7wR7k2t8m0L2s7v3n+N7f6S9J7h7V9m8V7X9o8b9k8W7v9c8d8Q7f8Q7f8Q7f8Q7f8Q7f8Q7f8Q7f8Q7f8Q7f8Q7f8Q7f8Q7f8Q7f8Q7f8Q7f8Q7f8Q7f8Q7f8Q7f8Q7f8Q7f8Q7f8Q7f8Q7f8Q7f8Q7f8Q7f8Q7f8Q7f8Q7f8Q7f8Q7f8Q7f8Q7f8Q7f8Q7f8Q7f8Q7f8Q7f8Q7f8Q7f8Q7f8Q7f8Q7f8Q7f8Q7f8Q7f8Q7f8Q7f8Q7QAA';

const injectEnhancementStyle = () => {
  if (document.getElementById('solarex-global-enhancements')) return;
  const style = document.createElement('style');
  style.id = 'solarex-global-enhancements';
  style.textContent = `
  .hero .container{width:min(1180px,calc(100% - 2rem));max-width:1180px;padding:0;margin:0 auto}
  body{background:radial-gradient(circle at 15% 12%,rgba(20,212,71,.16),transparent 24%),radial-gradient(circle at 84% 10%,rgba(60,160,255,.14),transparent 26%),radial-gradient(circle at 50% 82%,rgba(20,212,71,.08),transparent 30%),linear-gradient(180deg,#040404 0%,#060707 52%,#0a0d0a 100%);overflow-x:hidden}
  .ambient-grid{position:fixed;inset:0;pointer-events:none;z-index:0;opacity:.34;background-image:linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px);background-size:64px 64px,64px 64px;mask-image:radial-gradient(circle at center,black 35%,transparent 88%);animation:gridShift 24s linear infinite}
  body::before,body::after{content:"";position:fixed;pointer-events:none;z-index:0;border-radius:50%;filter:blur(60px);opacity:.38}
  body::before{width:340px;height:340px;left:-40px;top:120px;background:radial-gradient(circle,rgba(20,212,71,.24),transparent 68%);animation:floatOrb 16s ease-in-out infinite}
  body::after{width:300px;height:300px;right:-30px;top:240px;background:radial-gradient(circle,rgba(0,180,255,.16),transparent 70%);animation:floatOrbAlt 18s ease-in-out infinite}
  main,.site-header,.site-footer{position:relative;z-index:1}
  .brand{gap:.8rem}
  .brand-logo{width:54px;height:54px;object-fit:contain;border-radius:14px;box-shadow:0 8px 26px rgba(0,0,0,.28)}
  .brand-wordmark{display:inline-flex;align-items:center}
  .hero-logo{width:min(100%,320px);height:auto;display:block;margin:0 auto;filter:drop-shadow(0 18px 34px rgba(0,0,0,.36))}
  .hero-visual-card{padding:1.5rem}
  .insight-grid,.download-grid,.matrix-grid,.formula-grid,.pilot-grid,.cta-grid{display:grid;gap:1rem}
  .insight-grid,.download-grid,.pilot-grid,.formula-grid{grid-template-columns:repeat(3,minmax(0,1fr))}
  .matrix-grid,.cta-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
  .insight-card,.download-card,.matrix-card,.formula-card,.pilot-card,.cta-card{padding:1.35rem;border-radius:22px;background:linear-gradient(180deg,rgba(255,255,255,.03),rgba(255,255,255,.02));border:1px solid rgba(255,255,255,.08);box-shadow:0 24px 60px rgba(0,0,0,.26)}
  .section-title{font-size:clamp(1.9rem,2.6vw,2.7rem);line-height:1.08;margin:0 0 .75rem;color:#fff}
  .section-copy{max-width:860px;color:#b8c3b7;margin:0 0 1.2rem}
  .stack-list,.mini-list{margin:0;padding-left:1.15rem;color:#b8c3b7}
  .stack-list li,.mini-list li{margin:.45rem 0}
  .download-card .hero-actions,.cta-card .hero-actions,.pilot-card .hero-actions{margin-top:1rem}
  .micro-metric{display:block;font-size:.85rem;text-transform:uppercase;letter-spacing:.08em;color:#d0f8da;margin-bottom:.45rem}
  .big-number{display:block;font-size:2rem;font-weight:800;color:#fff;margin-bottom:.3rem}
  .formula-line{display:block;margin:.65rem 0;padding:.8rem 1rem;border-radius:16px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);font-family:ui-monospace,SFMono-Regular,Consolas,monospace;color:#eaf0e7}
  .matrix-card h3,.insight-card h3,.download-card h3,.formula-card h3,.pilot-card h3,.cta-card h3{margin:0 0 .75rem}
  .matrix-card p,.insight-card p,.download-card p,.formula-card p,.pilot-card p,.cta-card p{color:#b8c3b7}
  .link-chip{display:inline-flex;align-items:center;gap:.5rem;padding:.45rem .75rem;border-radius:999px;border:1px solid rgba(20,212,71,.24);background:rgba(20,212,71,.08);color:#d0f8da;font-size:.82rem;font-weight:700}
  @keyframes gridShift{from{transform:translate3d(0,0,0)}to{transform:translate3d(64px,64px,0)}}
  @keyframes floatOrb{0%,100%{transform:translate3d(0,0,0)}50%{transform:translate3d(34px,18px,0)}}
  @keyframes floatOrbAlt{0%,100%{transform:translate3d(0,0,0)}50%{transform:translate3d(-28px,22px,0)}}
  @media (max-width:980px){.hero .container{width:min(1180px,calc(100% - 1.1rem))}.insight-grid,.download-grid,.matrix-grid,.formula-grid,.pilot-grid,.cta-grid{grid-template-columns:1fr}.brand-logo{width:46px;height:46px}}
  @media (prefers-reduced-motion:reduce){.ambient-grid,body::before,body::after{animation:none}}
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
    brand.innerHTML = `<img src="${logoDataUri}" alt="SolarEX logo" class="brand-logo" /><span class="brand-wordmark" aria-hidden="true">Solar<span>EX</span></span>`;
    brand.setAttribute('href', href);
  });
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

const ensureIcons = () => {
  upsertLink('icon', faviconDataUri);
  upsertLink('apple-touch-icon', faviconDataUri);
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
}, { threshold: .14 });

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
}, { threshold: .35 });

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
}, { threshold: .4 });

document.querySelectorAll('.viz-fill').forEach((fill) => barObserver.observe(fill));

const pathMap = {
  '/': '/no/',
  '/index.html': '/no/index.html',
  '/quartz.html': '/no/quartz.html',
  '/titan.html': '/no/titan.html',
  '/applications.html': '/no/applications.html',
  '/proof-results.html': '/no/proof-results.html',
  '/roi-analysis.html': '/no/roi-analysis.html',
  '/case-study-norway.html': '/no/case-study-norway.html',
  '/technical-specifications.html': '/no/technical-specifications.html',
  '/application-process.html': '/no/application-process.html',
  '/contact.html': '/no/contact.html'
};

const reversePathMap = Object.fromEntries(Object.entries(pathMap).map(([k, v]) => [v, k]));
const emailAddress = 'mail@solarex.no';

document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
  const href = link.getAttribute('href') || '';
  const query = href.includes('?') ? href.slice(href.indexOf('?')) : '';
  link.setAttribute('href', `mailto:${emailAddress}${query}`);
  if (link.textContent && link.textContent.includes('@')) link.textContent = emailAddress;
});

const browserLang = (navigator.languages && navigator.languages[0]) || navigator.language || '';
const likelyNorway = /(^|[-_])(no|nb|nn)([-_]|$)/i.test(browserLang) || Intl.DateTimeFormat().resolvedOptions().timeZone === 'Europe/Oslo';
const preferredLang = localStorage.getItem('solarex_lang');

const getTargetPath = (lang) => {
  if (lang === 'no') return pathMap[normalizedPath] || '/no/index.html';
  return reversePathMap[normalizedPath] || '/index.html';
};

const switchLanguage = (lang) => {
  localStorage.setItem('solarex_lang', lang);
  const target = getTargetPath(lang);
  if (target && target !== normalizedPath) window.location.href = target;
};

const topbar = document.querySelector('.topbar');
if (topbar && !topbar.querySelector('.topbar-actions')) {
  const actions = document.createElement('div');
  actions.className = 'topbar-actions';
  actions.innerHTML = `<a class="button button-secondary button-sm" href="${getTargetPath('en')}" data-lang="en">English</a><a class="button button-secondary button-sm" href="${getTargetPath('no')}" data-lang="no">Norsk</a>`;
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
