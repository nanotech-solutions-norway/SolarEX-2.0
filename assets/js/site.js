
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

const docs = {
  quartzPdf: 'https://drive.google.com/uc?export=download&id=1zpzqEALWRTHPgB321RqzIkkLOOFD6jg9',
  quartzDeck: 'https://drive.google.com/uc?export=download&id=1GtcJxMwnC8L7InyJOxZAdXqUYVcnlmSj',
  titanPdf: 'https://drive.google.com/uc?export=download&id=1FoE5IkSIsTfvKD-xDmBWvkdFcmaOmKpg',
  titanDeck: 'https://drive.google.com/uc?export=download&id=1e8qH_ubhOBPPoRBGszWic1rsJ6jNzzAX',
  titanStudy: 'https://drive.google.com/uc?export=download&id=1zcEGszT-L8xYg6exDYF35PVc46G4EAw4',
  quartzCase: 'https://drive.google.com/uc?export=download&id=1jbuQ1NeOKuYQP5n5d3HJbI0WH166Dxem',
  quartzSds: 'https://drive.google.com/uc?export=download&id=19y9CTo6ZoIS8olhx6JWDuQbJJEhSlGsx',
  combinedPack: 'https://drive.google.com/uc?export=download&id=1I4Ze200GdkaWqL5WNNzXste9bodv180F'
};

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
  .deep-section .container{width:min(1180px,calc(100% - 2rem));margin:0 auto}
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
  @media (max-width:980px){.hero .container,.deep-section .container{width:min(1180px,calc(100% - 1.1rem))}.insight-grid,.download-grid,.matrix-grid,.formula-grid,.pilot-grid,.cta-grid{grid-template-columns:1fr}.brand-logo{width:46px;height:46px}}
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

const t = isNorwegianPage ? 'no' : 'en';

const sectionBlock = (title, copy, inner) =>
  `<section class="section deep-section"><div class="container"><h2 class="section-title">${title}</h2><p class="section-copy">${copy}</p>${inner}</div></section>`;

const L = {
  en: {
    homeTitle: 'Proof-backed surface engineering for cleaner solar output',
    homeCopy: 'SolarEX Quartz and SolarEX Titan are two complementary nanocoating pathways for photovoltaic assets. Quartz is the passive, dirt-repelling SiO₂ route for dust, water spotting, and wash-reduction logic. Titan is the active TiO₂ route for organic fouling, photocatalytic cleaning, and superhydrophilic rinsing.',
    homeBlocks: `<div class="insight-grid">
<div class="insight-card"><span class="micro-metric">Quartz | SiO₂</span><h3>Passive self-cleaning through low surface adhesion</h3><p>Quartz creates a transparent hydrophobic and oleophobic surface engineered to reduce contaminant adhesion, support the lotus effect, and reduce manual wash burden. Field materials frame up to 10% higher output over six months in Northern Europe, 147-day payback in Europe, and 218-day payback in high-insolation Middle East scenarios.</p><a class="link-chip" href="quartz.html">Open Quartz</a></div>
<div class="insight-card"><span class="micro-metric">Titan | TiO₂</span><h3>Active organic cleaning through photocatalysis</h3><p>Titan adds photocatalytic breakdown of organic fouling under UV exposure and superhydrophilic rinsing after activation. The referenced 360-day German rooftop study tracks 63 coated panels versus 315 controls and frames a 5.15% average energy gain with €24,627 annualized plant-level upside when scaled to 4,011 modules.</p><a class="link-chip" href="titan.html">Open Titan</a></div>
<div class="insight-card"><span class="micro-metric">Commercial logic</span><h3>Yield, O&amp;M, and cleaning are linked</h3><p>Across the SolarEX documentation, the business case is never only about incremental kWh. It is built on higher retained transparency, fewer washes, lower water use, lower labor intensity, reduced abrasive cleaning exposure, and better operating consistency between manual interventions.</p><a class="link-chip" href="proof-results.html">Open proof</a></div>
</div>
<div class="download-grid" style="margin-top:1rem">
<div class="download-card"><h3>Documentation downloads</h3><p>Use the primary source pack directly from the supporting SolarEX Drive set.</p><div class="hero-actions"><a class="button" href="${docs.combinedPack}" target="_blank" rel="noopener">Download SolarEX pack</a><a class="button button-secondary" href="${docs.quartzPdf}" target="_blank" rel="noopener">Quartz PDF</a></div></div>
<div class="download-card"><h3>Decision path</h3><ul class="stack-list"><li>Choose Quartz when dust, mineral spotting, and low-wash operations dominate.</li><li>Choose Titan when pollen, bird fouling, algae, or organic films dominate.</li><li>Run a treated-versus-control pilot before full deployment.</li></ul></div>
<div class="download-card"><h3>Navigate faster</h3><div class="hero-actions"><a class="button" href="technical-specifications.html">Technical detail</a><a class="button button-secondary" href="contact.html">Discuss a pilot</a></div></div>
</div>`,
    quartzTitle: 'Quartz detail | Passive SiO₂ self-cleaning pathway',
    quartzCopy: 'The Quartz documentation positions SolarEX as an ultrathin 100–150 nm SiO₂ nanocoating that keeps glass cleaner by lowering adhesion rather than chemically decomposing contaminants. It is the most logical route for dusty, sandy, or mineral-heavy environments where easy-rinse behavior and lower wash frequency matter.',
    quartzBlocks: `<div class="matrix-grid">
<div class="matrix-card"><h3>Technical window</h3><ul class="stack-list"><li>Thickness: 100–150 nm</li><li>Coverage: 5–15 mL/m² depending on method</li><li>Application: HVLP spray or cloth wiping</li><li>pH stability: 1.5–12.5</li><li>Initial dry: ~30 seconds</li><li>Full cure: ~24 hours</li><li>Shelf life: &gt;2 years</li></ul></div>
<div class="matrix-card"><h3>Why operators choose Quartz</h3><ul class="stack-list"><li>Hydrophobic and oleophobic surface for lower dust adhesion</li><li>Passive self-cleaning activated by rain, dew, or rinse water</li><li>UV-stable and abrasion-resistant permanent-treatment framing</li><li>Up to 70% reduction in wash cycles and 30,000 liters water saved per MW/year in presentation material</li></ul></div>
</div>
<div class="formula-grid" style="margin-top:1rem">
<div class="formula-card"><span class="micro-metric">Europe ROI framing</span><span class="big-number">147 days</span><p>Quartz material frames a European case using 90 W/m² panels, 2,335 sun-hours/year, €0.289/kWh, and a 10% performance uplift, producing about €6.07 annual gain per m² and €27.92 five-year net revenue per m² after coating cost.</p></div>
<div class="formula-card"><span class="micro-metric">Middle East ROI framing</span><span class="big-number">218 days</span><p>The Middle East framing uses 3,000 sun-hours/year, €0.759/kWh, and a conservative 2% performance uplift, producing approximately €4.10 annual gain per m² and €9.85 net three-year profit per m² before wash savings.</p></div>
<div class="formula-card"><h3>Download the source material</h3><div class="hero-actions"><a class="button" href="${docs.quartzPdf}" target="_blank" rel="noopener">Quartz PDF</a><a class="button button-secondary" href="${docs.quartzDeck}" target="_blank" rel="noopener">Quartz deck</a></div></div>
</div>`,
    titanTitle: 'Titan detail | Active TiO₂ self-cleaning pathway',
    titanCopy: 'The Titan documentation positions SolarEX as a photovoltaic TiO₂ nanocoating that uses photocatalytic decomposition of organic contaminants plus superhydrophilic water-sheeting. It is strongest where pollen, bird fouling, algae, and other organic films are persistent performance constraints.',
    titanBlocks: `<div class="matrix-grid">
<div class="matrix-card"><h3>Study-backed performance framing</h3><ul class="stack-list"><li>360-day monitored rooftop study</li><li>63 coated modules versus 315 control modules</li><li>Monitoring interval: every 15 minutes</li><li>Average gain: 5.15%</li><li>Individual string gains: 5.62%, 5.22%, and 4.62%</li><li>Annualized upside: €128.94 per coated string and about €24,627 when scaled to 4,011 modules</li></ul></div>
<div class="matrix-card"><h3>Mechanism logic</h3><ul class="stack-list"><li>UV/blue-light activation creates reactive species that decompose organic fouling.</li><li>Surface becomes superhydrophilic after activation, so rain sheets rather than beads.</li><li>Best fit for pollen, bird droppings, biofilm, algae, and leaf-wax contamination.</li><li>Less effective on purely inorganic dust than the Quartz route.</li></ul></div>
</div>
<div class="formula-grid" style="margin-top:1rem">
<div class="formula-card"><span class="micro-metric">Europe ROI framing</span><span class="big-number">292 days</span><p>At 2,335 hours/year and €0.289/kWh, the Titan documentation frames a 5% uplift as about €3.04 annual gain per m² against a ~€2.44 per m² coating cost.</p></div>
<div class="formula-card"><span class="micro-metric">High-insolation ROI framing</span><span class="big-number">87 days</span><p>At 3,000 hours/year and €0.759/kWh, the same 5% uplift is framed at about €10.25 annual gain per m² and a three-month payback window.</p></div>
<div class="formula-card"><h3>Download the source material</h3><div class="hero-actions"><a class="button" href="${docs.titanPdf}" target="_blank" rel="noopener">Titan PDF</a><a class="button button-secondary" href="${docs.titanStudy}" target="_blank" rel="noopener">PV³ study</a></div></div>
</div>`,
    applicationsTitle: 'Application fit | Where each pathway is strongest',
    applicationsCopy: 'Use site conditions, contaminant profile, wash constraints, and climatic exposure to choose the correct SolarEX route. The documentation consistently supports a mechanism-first selection model rather than a generic one-product-for-all-sites approach.',
    applicationsBlocks: `<div class="matrix-grid">
<div class="matrix-card"><h3>Best fit for Quartz</h3><ul class="stack-list"><li>Dust-heavy photovoltaic fields and utility sites</li><li>Desert, semi-arid, and sand-exposed assets</li><li>Sites where rinse behavior, lower adhesion, and reduced wash cycles are the main value drivers</li><li>Panels with mostly inorganic particulate loading</li></ul></div>
<div class="matrix-card"><h3>Best fit for Titan</h3><ul class="stack-list"><li>Sites with pollen, leaf wax, bird fouling, algae, or biofilm pressure</li><li>High-UV operating conditions where photocatalysis can work continuously</li><li>Operators seeking active organic breakdown plus uniform water-sheet cleaning</li><li>Mixed environments where organic deposition dominates performance losses</li></ul></div>
</div>
<div class="pilot-grid" style="margin-top:1rem">
<div class="pilot-card"><h3>Selection checklist</h3><ul class="mini-list"><li>What is the dominant fouling type?</li><li>How often is cleaning done today?</li><li>What is the cost of water, labor, and downtime?</li><li>Is the site rain-assisted, dry-rinse, or fully manual wash dependent?</li></ul></div>
<div class="pilot-card"><h3>Hybrid logic</h3><p>The Titan documentation itself states that many sites use both SiO₂ for dust and dry conditions and TiO₂ for pollen or algal buildup. That makes combination logic worth evaluating in mixed-fouling environments.</p></div>
<div class="pilot-card"><h3>Next action</h3><div class="hero-actions"><a class="button" href="application-process.html">Pilot process</a><a class="button button-secondary" href="contact.html">Send site data</a></div></div>
</div>`,
    proofTitle: 'Proof stack | How the public metrics are grounded',
    proofCopy: 'The SolarEX proof stack is built from product presentations, ROI framing, Quartz field narratives, and the referenced PV³-accompanied Titan study. The key value is that the site can explain not only what the headline numbers are, but what operational context produced them.',
    proofBlocks: `<div class="insight-grid">
<div class="insight-card"><h3>Quartz field narrative</h3><p>The Quartz documentation frames a six-month Norwegian case with about 10% higher output for coated panels, 100–200 kWh/day additional energy for a treated 1 MW section, and roughly €30–€60/day additional daily revenue using European price assumptions.</p><a class="link-chip" href="${docs.quartzCase}" target="_blank" rel="noopener">Download case PDF</a></div>
<div class="insight-card"><h3>Titan monitored study</h3><p>The Titan route is supported by a 360-day German rooftop study with 63 coated modules and 315 controls, 15-minute monitoring intervals, and immediate post-application performance separation that persisted through routine cleaning cycles.</p><a class="link-chip" href="${docs.titanStudy}" target="_blank" rel="noopener">Download PV³ study</a></div>
<div class="insight-card"><h3>How to read the numbers</h3><p>The public metrics should be read as decision-support framing rather than universal guarantees. Site irradiance, fouling chemistry, rainfall, wash practice, and power price still need to be localized during pilot planning and ROI modeling.</p><a class="link-chip" href="roi-analysis.html">Open ROI page</a></div>
</div>`,
    roiTitle: 'ROI logic | Revenue, cleaning, and operating savings',
    roiCopy: 'SolarEX ROI should be evaluated as a combined yield-plus-maintenance model. The source materials already provide baseline economic framing for both Quartz and Titan, but the strongest investment case often emerges after adding water, labor, and downtime savings to the direct kWh uplift.',
    roiBlocks: `<div class="formula-grid">
<div class="formula-card"><h3>Core formula</h3><span class="formula-line">Annual gain/m² = (baseline kWh/m² × uplift %) × electricity price</span><span class="formula-line">Payback days = coating cost per m² ÷ annual gain per m² × 365</span><p>Use the public examples only as calibration anchors, then replace uplift, irradiance, and price with local project values.</p></div>
<div class="formula-card"><h3>Quartz reference assumptions</h3><p>Europe framing: 90 W/m², 2,335 sun-hours/year, €0.289/kWh, +10% uplift. Middle East framing: 90 W/m², 3,000 sun-hours/year, €0.759/kWh, +2% uplift.</p></div>
<div class="formula-card"><h3>Titan reference assumptions</h3><p>Europe framing: 90 W/m², 2,335 hours/year, €0.289/kWh, +5.15% uplift. High-insolation framing: 3,000 hours/year, €0.759/kWh, +5% uplift.</p></div>
</div>
<div class="cta-grid" style="margin-top:1rem">
<div class="cta-card"><h3>Hidden value drivers</h3><ul class="stack-list"><li>Reduced cleaning frequency</li><li>Lower water consumption</li><li>Lower labor hours</li><li>Less abrasive wash damage</li><li>Higher retained output between wash events</li></ul></div>
<div class="cta-card"><h3>Download source material</h3><div class="hero-actions"><a class="button" href="${docs.quartzPdf}" target="_blank" rel="noopener">Quartz ROI source</a><a class="button button-secondary" href="${docs.titanPdf}" target="_blank" rel="noopener">Titan ROI source</a></div></div>
</div>`,
    specTitle: 'Technical detail | Parameters that matter during deployment',
    specCopy: 'The public specification tables are only the starting point. For deployment planning, the critical variables are substrate cleanliness, uniformity of application, climate during curing, formulation choice, and operator safety controls around energized PV equipment and flammable solvents.',
    specBlocks: `<div class="matrix-grid">
<div class="matrix-card"><h3>Quartz implementation detail</h3><ul class="stack-list"><li>Surface must be clean and dry with no oils, residues, or tensides.</li><li>Water-based variants are better in warm climates due to slower evaporation and more even deposition.</li><li>Alcohol-based variants require stronger flammability controls.</li><li>Quartz is framed as UV-inert, thermally stable, and mechanically durable.</li></ul></div>
<div class="matrix-card"><h3>Titan implementation detail</h3><ul class="stack-list"><li>Uniform coverage is critical because missed zones reduce catalytic activity.</li><li>Activation occurs under natural sunlight after curing.</li><li>Titan adds UV shielding for glass and encapsulant protection.</li><li>Best interpreted as an active organic-cleaning surface, not a universal dust solution.</li></ul></div>
</div>
<div class="download-grid" style="margin-top:1rem">
<div class="download-card"><h3>Safety and handling</h3><p>The Quartz SDS classifies the coating as a highly flammable liquid and vapor product, with ethanol listed as a major ingredient. Application planning should therefore include de-energization, ventilation, PPE, and ignition control.</p><div class="hero-actions"><a class="button" href="${docs.quartzSds}" target="_blank" rel="noopener">Download SDS</a></div></div>
<div class="download-card"><h3>Quartz source pack</h3><div class="hero-actions"><a class="button" href="${docs.quartzPdf}" target="_blank" rel="noopener">Quartz PDF</a><a class="button button-secondary" href="${docs.quartzDeck}" target="_blank" rel="noopener">Quartz deck</a></div></div>
<div class="download-card"><h3>Titan source pack</h3><div class="hero-actions"><a class="button" href="${docs.titanPdf}" target="_blank" rel="noopener">Titan PDF</a><a class="button button-secondary" href="${docs.titanDeck}" target="_blank" rel="noopener">Titan deck</a></div></div>
</div>`,
    processTitle: 'Application process | Pilot discipline matters',
    processCopy: 'Across the SolarEX material, successful deployment depends less on exotic installation tooling and more on process discipline: surface preparation, environmental control, consistent coverage, safe handling, controlled curing, and a valid comparison method against untreated controls.',
    processBlocks: `<div class="pilot-grid">
<div class="pilot-card"><h3>Pre-application</h3><ul class="mini-list"><li>Document baseline output and cleaning interval.</li><li>Photograph treated and control zones.</li><li>Clean panels fully and remove surfactants or residues.</li><li>De-energize panels before work starts.</li></ul></div>
<div class="pilot-card"><h3>Application and cure</h3><ul class="mini-list"><li>Apply by HVLP spray or wiping at the recommended dosage.</li><li>Control for misses, runs, and uneven wetness.</li><li>Allow tack dry at about 30 seconds and full cure at about 24 hours.</li><li>Protect from rain or condensation during cure.</li></ul></div>
<div class="pilot-card"><h3>Pilot acceptance logic</h3><ul class="mini-list"><li>Compare treated vs control at fixed monitoring intervals.</li><li>Track wash events, rainfall, irradiance, and fouling photographs.</li><li>Separate energy uplift from simple post-cleaning effects.</li><li>Translate results into both kWh and O&amp;M value.</li></ul></div>
</div>`,
    caseTitle: 'Case-study use | Build the next pilot from a control design',
    caseCopy: 'The strongest way to use the Norwegian SolarEX case is to replicate its logic. Keep a treated zone, keep a control zone, define the operating period, document wash events, and convert observed cleanliness retention into both energy and O&amp;M outcomes.',
    caseBlocks: `<div class="download-grid">
<div class="download-card"><h3>Case-study pack</h3><p>Use the Quartz case and the broader SolarEX pack when building a board-ready or client-facing evidence stack.</p><div class="hero-actions"><a class="button" href="${docs.quartzCase}" target="_blank" rel="noopener">Download case PDF</a><a class="button button-secondary" href="${docs.combinedPack}" target="_blank" rel="noopener">Download SolarEX pack</a></div></div>
<div class="download-card"><h3>Replicable pilot structure</h3><ul class="stack-list"><li>Treated versus untreated comparison</li><li>Defined monitoring period</li><li>Photographic evidence and wash log</li><li>Local energy-price and O&amp;M translation</li></ul></div>
<div class="download-card"><h3>Next commercial step</h3><div class="hero-actions"><a class="button" href="contact.html">Discuss a pilot</a><a class="button button-secondary" href="proof-results.html">Return to proof</a></div></div>
</div>`,
    contactTitle: 'Pilot intake | What to send for a serious assessment',
    contactCopy: 'To move efficiently from interest to project qualification, send the data required to determine mechanism fit, expected fouling behavior, realistic uplift assumptions, and site-specific economic logic.',
    contactBlocks: `<div class="pilot-grid">
<div class="pilot-card"><h3>Site data required</h3><ul class="mini-list"><li>Asset location and climate</li><li>Panel type and installed capacity</li><li>Dominant contamination profile</li><li>Current cleaning interval and method</li><li>Power price or tariff assumptions</li></ul></div>
<div class="pilot-card"><h3>Photos and operating context</h3><ul class="mini-list"><li>Wide photos of representative panel rows</li><li>Close photos of fouling and spotting</li><li>Any history of pollen, algae, bird fouling, or desert dust</li><li>Any restrictions on water use or wash access</li></ul></div>
<div class="pilot-card"><h3>Useful downloads to share internally</h3><div class="hero-actions"><a class="button" href="${docs.quartzPdf}" target="_blank" rel="noopener">Quartz PDF</a><a class="button button-secondary" href="${docs.titanStudy}" target="_blank" rel="noopener">Titan study</a></div></div>
</div>`
  },
  no: {
    homeTitle: 'Dokumentasjonsbasert overflateengineering for renere solenergioutput',
    homeCopy: 'SolarEX Quartz og SolarEX Titan er to komplementære nanobeleggsløsninger for PV-anlegg. Quartz er den passive, smussavvisende SiO₂-ruten for støv, vannflekker og redusert vaskehyppighet. Titan er den aktive TiO₂-ruten for organisk begroing, fotokatalytisk rengjøring og superhydrofil avrenning.',
    homeBlocks: `<div class="insight-grid">
<div class="insight-card"><span class="micro-metric">Quartz | SiO₂</span><h3>Passiv selvrengjøring gjennom lav overflateadhesjon</h3><p>Quartz danner en transparent hydrofob og oleofob overflate som reduserer adhesjon, støtter lotuseffekten og reduserer behovet for manuell vask. Dokumentasjonen rammer inn opptil 10% høyere output over seks måneder i Nord-Europa, 147 dagers tilbakebetaling i Europa og 218 dager i høyinsolasjons-scenarier i Midtøsten.</p><a class="link-chip" href="quartz.html">Åpne Quartz</a></div>
<div class="insight-card"><span class="micro-metric">Titan | TiO₂</span><h3>Aktiv organisk rengjøring gjennom fotokatalyse</h3><p>Titan tilfører fotokatalytisk nedbrytning av organisk begroing under UV-eksponering og superhydrofil avrenning etter aktivering. Den refererte tyske takstudien over 360 dager følger 63 behandlede paneler mot 315 kontrollpaneler og rammer inn 5,15% gjennomsnittlig energiøkning samt ca. €24 627 årlig oppside når dette skaleres til 4 011 moduler.</p><a class="link-chip" href="titan.html">Åpne Titan</a></div>
<div class="insight-card"><span class="micro-metric">Kommersiell logikk</span><h3>Yield, drift og rengjøring henger sammen</h3><p>I SolarEX-dokumentasjonen er business caset ikke bare knyttet til ekstra kWh. Det bygger også på renere glass, færre vasker, lavere vannbruk, mindre arbeid, redusert abrasiv rengjøring og mer stabil ytelse mellom vaskeintervaller.</p><a class="link-chip" href="proof-results.html">Åpne dokumentasjon</a></div>
</div>
<div class="download-grid" style="margin-top:1rem">
<div class="download-card"><h3>Nedlastinger</h3><p>Bruk hovedpakken direkte fra det støttende SolarEX-materialet i Drive.</p><div class="hero-actions"><a class="button" href="${docs.combinedPack}" target="_blank" rel="noopener">Last ned SolarEX-pakke</a><a class="button button-secondary" href="${docs.quartzPdf}" target="_blank" rel="noopener">Quartz PDF</a></div></div>
<div class="download-card"><h3>Valglogikk</h3><ul class="stack-list"><li>Velg Quartz når støv, mineralske flekker og lav vaskehyppighet dominerer.</li><li>Velg Titan når pollen, fugleskitt, alger eller organiske filmer dominerer.</li><li>Kjør en behandlet-mot-kontroll pilot før full utrulling.</li></ul></div>
<div class="download-card"><h3>Naviger raskere</h3><div class="hero-actions"><a class="button" href="technical-specifications.html">Teknisk detalj</a><a class="button button-secondary" href="contact.html">Diskuter pilot</a></div></div>
</div>`,
    quartzTitle: 'Quartz detalj | Passiv SiO₂-selvrengjørende løsning',
    quartzCopy: 'Quartz-dokumentasjonen posisjonerer SolarEX som et ultratynt 100–150 nm SiO₂-nanobelegg som holder glass renere ved å redusere adhesjon fremfor å bryte ned kontaminanter kjemisk. Dette er den mest logiske ruten for støvete, sandutsatte eller mineralrike miljøer der enklere avrenning og lavere vaskehyppighet er viktig.',
    quartzBlocks: `<div class="matrix-grid">
<div class="matrix-card"><h3>Teknisk vindu</h3><ul class="stack-list"><li>Tykkelse: 100–150 nm</li><li>Dekning: 5–15 mL/m² avhengig av metode</li><li>Påføring: HVLP-sprøyte eller klut</li><li>pH-stabilitet: 1,5–12,5</li><li>Initial tørk: ~30 sekunder</li><li>Full herding: ~24 timer</li><li>Holdbarhet på lager: &gt;2 år</li></ul></div>
<div class="matrix-card"><h3>Hvorfor operatører velger Quartz</h3><ul class="stack-list"><li>Hydrofob og oleofob overflate for lavere støvadherens</li><li>Passiv selvrengjøring aktivert av regn, dugg eller avspyling</li><li>UV-stabil og abrasjonsbestandig permanentløsning i dokumentasjonen</li><li>Opptil 70% reduksjon i vaskeintervaller og 30 000 liter spart vann per MW/år i presentasjonsmaterialet</li></ul></div>
</div>
<div class="formula-grid" style="margin-top:1rem">
<div class="formula-card"><span class="micro-metric">Europa ROI-rammeverk</span><span class="big-number">147 dager</span><p>Quartz-materialet rammer inn et europeisk scenario med 90 W/m² paneler, 2 335 soltimer/år, €0,289/kWh og 10% ytelsesøkning. Dette gir ca. €6,07 årlig gevinst per m² og €27,92 netto femårsinntjening per m² etter beleggkostnad.</p></div>
<div class="formula-card"><span class="micro-metric">Midtøsten ROI-rammeverk</span><span class="big-number">218 dager</span><p>Midtøsten-scenariet bruker 3 000 soltimer/år, €0,759/kWh og en konservativ 2% ytelsesøkning. Dette gir omtrent €4,10 årlig gevinst per m² og €9,85 netto treårsinntjening per m² før vaskebesparelser.</p></div>
<div class="formula-card"><h3>Last ned kildemateriale</h3><div class="hero-actions"><a class="button" href="${docs.quartzPdf}" target="_blank" rel="noopener">Quartz PDF</a><a class="button button-secondary" href="${docs.quartzDeck}" target="_blank" rel="noopener">Quartz deck</a></div></div>
</div>`,
    titanTitle: 'Titan detalj | Aktiv TiO₂-selvrengjørende løsning',
    titanCopy: 'Titan-dokumentasjonen posisjonerer SolarEX som et PV-tilpasset TiO₂-nanobelegg som bruker fotokatalytisk nedbrytning av organisk kontaminasjon kombinert med superhydrofil vannfilm. Dette er sterkest der pollen, fugleskitt, alger og andre organiske filmer gir vedvarende ytelsestap.',
    titanBlocks: `<div class="matrix-grid">
<div class="matrix-card"><h3>Studiebasert ytelsesrammeverk</h3><ul class="stack-list"><li>360 dagers overvåket takstudie</li><li>63 behandlede moduler mot 315 kontrollmoduler</li><li>Måleintervall: hvert 15. minutt</li><li>Gjennomsnittlig gevinst: 5,15%</li><li>Individuelle strenggevinster: 5,62%, 5,22% og 4,62%</li><li>Årlig oppside: €128,94 per behandlet streng og ca. €24 627 når dette skaleres til 4 011 moduler</li></ul></div>
<div class="matrix-card"><h3>Mekanismelogikk</h3><ul class="stack-list"><li>UV/blått lys aktiverer reaktive species som bryter ned organisk begroing.</li><li>Overflaten blir superhydrofil etter aktivering slik at regn danner film i stedet for dråper.</li><li>Best egnet for pollen, fugleskitt, biofilm, alger og bladrester.</li><li>Mindre effektiv på rent uorganisk støv enn Quartz-ruten.</li></ul></div>
</div>
<div class="formula-grid" style="margin-top:1rem">
<div class="formula-card"><span class="micro-metric">Europa ROI-rammeverk</span><span class="big-number">292 dager</span><p>Ved 2 335 timer/år og €0,289/kWh rammer Titan-dokumentasjonen inn 5% uplift som omtrent €3,04 årlig gevinst per m² mot en beleggkostnad på rundt €2,44 per m².</p></div>
<div class="formula-card"><span class="micro-metric">Høyinsolasjons-ROI</span><span class="big-number">87 dager</span><p>Ved 3 000 timer/år og €0,759/kWh gir den samme 5% uplift omtrent €10,25 årlig gevinst per m² og tilbakebetaling rundt tre måneder.</p></div>
<div class="formula-card"><h3>Last ned kildemateriale</h3><div class="hero-actions"><a class="button" href="${docs.titanPdf}" target="_blank" rel="noopener">Titan PDF</a><a class="button button-secondary" href="${docs.titanStudy}" target="_blank" rel="noopener">PV³-studie</a></div></div>
</div>`,
    applicationsTitle: 'Bruksområder | Hvor hver løsning er sterkest',
    applicationsCopy: 'Bruk lokasjonsforhold, kontaminasjonsprofil, vaskebegrensninger og klimaeksponering for å velge korrekt SolarEX-rute. Dokumentasjonen støtter konsekvent en mekanismebasert seleksjonsmodell fremfor ett universelt produkt for alle miljøer.',
    applicationsBlocks: `<div class="matrix-grid">
<div class="matrix-card"><h3>Best egnet for Quartz</h3><ul class="stack-list"><li>Støvtunge PV-felt og utility-anlegg</li><li>Ørken, semi-aride og sandeeksponerte lokasjoner</li><li>Anlegg der avrenning, lav adhesjon og redusert vaskehyppighet er hovedverdidriver</li><li>Paneler med hovedsakelig uorganisk partikkelbelastning</li></ul></div>
<div class="matrix-card"><h3>Best egnet for Titan</h3><ul class="stack-list"><li>Lokasjoner med pollen, bladrester, fugleskitt, alger eller biofilm</li><li>Høy UV-eksponering der fotokatalyse kan arbeide kontinuerlig</li><li>Operatører som ønsker aktiv nedbrytning av organiske filmer kombinert med uniform avrenning</li><li>Blandede miljøer der organisk avsetning dominerer tapene</li></ul></div>
</div>
<div class="pilot-grid" style="margin-top:1rem">
<div class="pilot-card"><h3>Valgsjekkliste</h3><ul class="mini-list"><li>Hva er dominerende kontaminasjonstype?</li><li>Hvor ofte vaskes anlegget i dag?</li><li>Hva koster vann, arbeid og nedetid?</li><li>Er lokasjonen regnstøttet, avspylt eller helt avhengig av manuell vask?</li></ul></div>
<div class="pilot-card"><h3>Hybridlogikk</h3><p>Titan-dokumentasjonen sier selv at mange lokasjoner bruker både SiO₂ for støv og tørre forhold og TiO₂ for pollen eller algeoppbygging. Dermed er kombinasjonslogikk verdt å vurdere i blandede fouling-miljøer.</p></div>
<div class="pilot-card"><h3>Neste steg</h3><div class="hero-actions"><a class="button" href="application-process.html">Pilotprosess</a><a class="button button-secondary" href="contact.html">Send sitedata</a></div></div>
</div>`,
    proofTitle: 'Dokumentasjon | Hvordan de offentlige tallene er forankret',
    proofCopy: 'SolarEX-dokumentasjonen er bygget på produktpresentasjoner, ROI-rammeverk, Quartz-feltfortellinger og den refererte PV³-ledsagede Titan-studien. Verdien er at nettsiden kan forklare ikke bare hva tallene er, men også hvilken driftskontekst som produserte dem.',
    proofBlocks: `<div class="insight-grid">
<div class="insight-card"><h3>Quartz-feltfortelling</h3><p>Quartz-dokumentasjonen rammer inn et seksmåneders norsk case med rundt 10% høyere output for behandlede paneler, 100–200 kWh/dag ekstra energi for en behandlet 1 MW-seksjon og omtrent €30–€60/dag ekstra daglig inntekt med europeiske prisforutsetninger.</p><a class="link-chip" href="${docs.quartzCase}" target="_blank" rel="noopener">Last ned case PDF</a></div>
<div class="insight-card"><h3>Titan-overvåket studie</h3><p>Titan-ruten støttes av en 360 dagers tysk takstudie med 63 behandlede moduler og 315 kontroller, 15-minutters måleintervaller og en tydelig ytelsesseparasjon som oppsto rett etter påføring og besto gjennom rutinemessige rengjøringssykluser.</p><a class="link-chip" href="${docs.titanStudy}" target="_blank" rel="noopener">Last ned PV³-studie</a></div>
<div class="insight-card"><h3>Hvordan tallene bør leses</h3><p>De offentlige metriske tallene bør leses som beslutningsstøtte og ikke som universelle garantier. Solinnstråling, fouling-kjemi, nedbør, vaskepraksis og kraftpris må fortsatt lokaliseres i pilot og ROI-modellering.</p><a class="link-chip" href="roi-analysis.html">Åpne ROI-side</a></div>
</div>`,
    roiTitle: 'ROI-logikk | Inntekt, rengjøring og driftsbesparelser',
    roiCopy: 'SolarEX-ROI bør vurderes som en kombinert yield-og-vedlikeholdsmodell. Kildematerialet gir allerede økonomisk basisrammeverk for både Quartz og Titan, men det sterkeste investeringscaset kommer ofte først når vann, arbeid og nedetidsbesparelser legges oppå direkte kWh-uplift.',
    roiBlocks: `<div class="formula-grid">
<div class="formula-card"><h3>Kjerneformel</h3><span class="formula-line">Årlig gevinst/m² = (baseline kWh/m² × uplift %) × strømpris</span><span class="formula-line">Tilbakebetaling dager = beleggkostnad per m² ÷ årlig gevinst per m² × 365</span><p>Bruk de offentlige eksemplene som kalibreringsankre, og bytt deretter uplift, solinnstråling og pris med lokale prosjektverdier.</p></div>
<div class="formula-card"><h3>Quartz referanseforutsetninger</h3><p>Europa: 90 W/m², 2 335 soltimer/år, €0,289/kWh, +10% uplift. Midtøsten: 90 W/m², 3 000 soltimer/år, €0,759/kWh, +2% uplift.</p></div>
<div class="formula-card"><h3>Titan referanseforutsetninger</h3><p>Europa: 90 W/m², 2 335 timer/år, €0,289/kWh, +5,15% uplift. Høyinsolasjon: 3 000 timer/år, €0,759/kWh, +5% uplift.</p></div>
</div>
<div class="cta-grid" style="margin-top:1rem">
<div class="cta-card"><h3>Skjulte verdidrivere</h3><ul class="stack-list"><li>Redusert vaskehyppighet</li><li>Lavere vannforbruk</li><li>Lavere arbeidstimer</li><li>Mindre abrasiv vaskeskade</li><li>Høyere beholdt output mellom vaskeintervaller</li></ul></div>
<div class="cta-card"><h3>Last ned kildemateriale</h3><div class="hero-actions"><a class="button" href="${docs.quartzPdf}" target="_blank" rel="noopener">Quartz ROI-kilde</a><a class="button button-secondary" href="${docs.titanPdf}" target="_blank" rel="noopener">Titan ROI-kilde</a></div></div>
</div>`,
    specTitle: 'Teknisk detalj | Parametere som betyr noe ved utrulling',
    specCopy: 'De offentlige spesifikasjonstabellene er bare startpunktet. For utrulling er de kritiske variablene renhet på substratet, jevn påføring, klima under herding, formulering, og sikkerhetskontroller rundt spenningssatte PV-systemer og brannfarlige løsemidler.',
    specBlocks: `<div class="matrix-grid">
<div class="matrix-card"><h3>Quartz implementeringsdetalj</h3><ul class="stack-list"><li>Overflaten må være ren og tørr uten oljer, rester eller tensider.</li><li>Vannbaserte varianter er bedre i varme klima fordi fordampningen er langsommere og deponeringen jevnere.</li><li>Alkoholbaserte varianter krever sterkere kontroll av brannfare.</li><li>Quartz beskrives som UV-inert, termisk stabilt og mekanisk robust.</li></ul></div>
<div class="matrix-card"><h3>Titan implementeringsdetalj</h3><ul class="stack-list"><li>Jevn dekning er kritisk fordi manglende soner reduserer katalytisk aktivitet.</li><li>Aktivering skjer under naturlig sollys etter herding.</li><li>Titan gir ekstra UV-skjerming for glass og encapsulant.</li><li>Bør tolkes som en aktiv organisk rengjøringsflate, ikke en universalløsning for alt støv.</li></ul></div>
</div>
<div class="download-grid" style="margin-top:1rem">
<div class="download-card"><h3>Sikkerhet og håndtering</h3><p>Quartz-SDS klassifiserer produktet som svært brannfarlig væske og damp, med etanol som hovedkomponent. Påføringsplanlegging må derfor inkludere frakobling, ventilasjon, PPE og kontroll av antennelseskilder.</p><div class="hero-actions"><a class="button" href="${docs.quartzSds}" target="_blank" rel="noopener">Last ned SDS</a></div></div>
<div class="download-card"><h3>Quartz kildepakke</h3><div class="hero-actions"><a class="button" href="${docs.quartzPdf}" target="_blank" rel="noopener">Quartz PDF</a><a class="button button-secondary" href="${docs.quartzDeck}" target="_blank" rel="noopener">Quartz deck</a></div></div>
<div class="download-card"><h3>Titan kildepakke</h3><div class="hero-actions"><a class="button" href="${docs.titanPdf}" target="_blank" rel="noopener">Titan PDF</a><a class="button button-secondary" href="${docs.titanDeck}" target="_blank" rel="noopener">Titan deck</a></div></div>
</div>`,
    processTitle: 'Applikasjonsprosess | Pilotdisiplin er avgjørende',
    processCopy: 'Gjennom SolarEX-materialet avhenger vellykket utrulling mindre av komplisert verktøy og mer av prosessdisiplin: overflateforberedelse, miljøkontroll, jevn dekning, sikker håndtering, kontrollert herding og en gyldig sammenligningsmetode mot ubehandlede kontrollpaneler.',
    processBlocks: `<div class="pilot-grid">
<div class="pilot-card"><h3>Før påføring</h3><ul class="mini-list"><li>Dokumenter baseline output og vaskeintervall.</li><li>Fotografer behandlet og kontrollert sone.</li><li>Rengjør panelene fullstendig og fjern surfaktanter eller rester.</li><li>Frakoble panelene før arbeid starter.</li></ul></div>
<div class="pilot-card"><h3>Påføring og herding</h3><ul class="mini-list"><li>Påfør med HVLP eller klut ved anbefalt dosering.</li><li>Kontroller for mangler, sig og ujevn våthet.</li><li>La produktet tørke ved ca. 30 sekunder og herd fullt ved ca. 24 timer.</li><li>Beskytt mot regn eller kondens under herding.</li></ul></div>
<div class="pilot-card"><h3>Pilotaksept</h3><ul class="mini-list"><li>Sammenlign behandlet mot kontroll ved faste måleintervaller.</li><li>Logg vask, nedbør, irradiance og fouling-foto.</li><li>Skill energiuplift fra rene etter-rengjøringseffekter.</li><li>Oversett resultatene til både kWh og drift/verdi.</li></ul></div>
</div>`,
    caseTitle: 'Bruk av casestudie | Bygg neste pilot på et kontrolloppsett',
    caseCopy: 'Den sterkeste måten å bruke det norske SolarEX-caset på er å kopiere logikken. Hold en behandlet sone, hold en kontrollsone, definer driftsperioden, dokumenter vaskehendelser og konverter observert renhetsretensjon til både energi- og O&amp;M-resultater.',
    caseBlocks: `<div class="download-grid">
<div class="download-card"><h3>Casepakke</h3><p>Bruk Quartz-caset og den bredere SolarEX-pakken når du bygger et styreklart eller kundeorientert dokumentasjonsgrunnlag.</p><div class="hero-actions"><a class="button" href="${docs.quartzCase}" target="_blank" rel="noopener">Last ned case PDF</a><a class="button button-secondary" href="${docs.combinedPack}" target="_blank" rel="noopener">Last ned SolarEX-pakke</a></div></div>
<div class="download-card"><h3>Replikerbar pilotstruktur</h3><ul class="stack-list"><li>Behandlet mot ubehandlet sammenligning</li><li>Definert overvåkingsperiode</li><li>Fotobevis og vaskelogger</li><li>Lokal oversettelse til energipris og O&amp;M-verdi</li></ul></div>
<div class="download-card"><h3>Neste kommersielle steg</h3><div class="hero-actions"><a class="button" href="contact.html">Diskuter pilot</a><a class="button button-secondary" href="proof-results.html">Tilbake til dokumentasjon</a></div></div>
</div>`,
    contactTitle: 'Pilotinntak | Hva som bør sendes for en seriøs vurdering',
    contactCopy: 'For å gå effektivt fra interesse til prosjektkvalifisering bør dere sende dataene som kreves for å bestemme mekanismefit, forventet fouling-adferd, realistiske uplift-antakelser og stedsspesifikk økonomisk logikk.',
    contactBlocks: `<div class="pilot-grid">
<div class="pilot-card"><h3>Nødvendige sitedata</h3><ul class="mini-list"><li>Lokasjon og klima</li><li>Paneltype og installert kapasitet</li><li>Dominerende kontaminasjonsprofil</li><li>Dagens rengjøringsintervall og metode</li><li>Strømpris eller tariffantakelser</li></ul></div>
<div class="pilot-card"><h3>Bilder og driftskontekst</h3><ul class="mini-list"><li>Oversiktsbilder av representative panelrekker</li><li>Nærbilder av fouling og flekker</li><li>Historikk for pollen, alger, fugleskitt eller ørkenstøv</li><li>Eventuelle begrensninger på vannbruk eller vaskeadkomst</li></ul></div>
<div class="pilot-card"><h3>Nyttige nedlastinger for intern deling</h3><div class="hero-actions"><a class="button" href="${docs.quartzPdf}" target="_blank" rel="noopener">Quartz PDF</a><a class="button button-secondary" href="${docs.titanStudy}" target="_blank" rel="noopener">Titan-studie</a></div></div>
</div>`
  }
};

const pageContentMap = {
  '/': () => sectionBlock(L[t].homeTitle, L[t].homeCopy, L[t].homeBlocks),
  '/index.html': () => sectionBlock(L[t].homeTitle, L[t].homeCopy, L[t].homeBlocks),
  '/quartz.html': () => sectionBlock(L[t].quartzTitle, L[t].quartzCopy, L[t].quartzBlocks),
  '/titan.html': () => sectionBlock(L[t].titanTitle, L[t].titanCopy, L[t].titanBlocks),
  '/applications.html': () => sectionBlock(L[t].applicationsTitle, L[t].applicationsCopy, L[t].applicationsBlocks),
  '/proof-results.html': () => sectionBlock(L[t].proofTitle, L[t].proofCopy, L[t].proofBlocks),
  '/roi-analysis.html': () => sectionBlock(L[t].roiTitle, L[t].roiCopy, L[t].roiBlocks),
  '/technical-specifications.html': () => sectionBlock(L[t].specTitle, L[t].specCopy, L[t].specBlocks),
  '/application-process.html': () => sectionBlock(L[t].processTitle, L[t].processCopy, L[t].processBlocks),
  '/case-study-norway.html': () => sectionBlock(L[t].caseTitle, L[t].caseCopy, L[t].caseBlocks),
  '/contact.html': () => sectionBlock(L[t].contactTitle, L[t].contactCopy, L[t].contactBlocks)
};

const injectDeepContent = () => {
  const builder = pageContentMap[pageKey];
  if (!builder) return;
  const main = document.querySelector('main');
  if (!main || document.querySelector(`[data-deep-content="${pageKey}"]`)) return;
  const holder = document.createElement('div');
  holder.dataset.deepContent = pageKey;
  holder.innerHTML = builder();
  const section = holder.firstElementChild;
  const footer = document.querySelector('.site-footer');
  if (footer && section) {
    footer.before(section);
  } else if (section) {
    main.appendChild(section);
  }
};

injectEnhancementStyle();
ensureAmbientGrid();
ensureBrandLogo();
ensureIcons();
injectDeepContent();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: .14 });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

document.querySelectorAll('.faq-trigger').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const item = trigger.closest('.faq-item');
    const open = item.classList.toggle('open');
    trigger.setAttribute('aria-expanded', String(open));
  });
});

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
