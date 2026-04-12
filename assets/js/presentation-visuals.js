(() => {
  if (typeof currentLocalFile === 'undefined') return;
  if (typeof currentLang !== 'undefined' && currentLang !== 'en') return;

  const targetPages = new Set(['technical-specifications.html', 'titan.html', 'proof-results.html', 'applications.html']);
  if (!targetPages.has(currentLocalFile)) return;

  const doc = document;
  const main = doc.querySelector('main');
  if (!main) return;

  const ensureStyle = () => {
    if (doc.getElementById('presentation-visual-style')) return;
    const style = doc.createElement('style');
    style.id = 'presentation-visual-style';
    style.textContent = `
      .pv-grid{display:grid;gap:1rem}
      .pv-grid.two{grid-template-columns:repeat(2,minmax(0,1fr))}
      .pv-card{padding:1.15rem;border-radius:22px;background:linear-gradient(180deg,rgba(255,255,255,.03),rgba(255,255,255,.02));border:1px solid rgba(255,255,255,.08);box-shadow:0 24px 60px rgba(0,0,0,.22);min-width:0}
      .pv-card h2,.pv-card h3{margin-top:0}
      .pv-card svg{width:100%;height:auto;display:block;border-radius:16px;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.02)}
      .pv-card ul{margin:0;padding-left:1.1rem}
      .pv-card li{margin:.45rem 0;color:#dbe4da}
      .pv-pills{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:.85rem}
      .pv-pill{padding:1rem;border-radius:18px;background:rgba(20,212,71,.08);border:1px solid rgba(20,212,71,.22);min-width:0}
      .pv-pill strong{display:block;color:#fff;margin-bottom:.3rem}
      @media (max-width:980px){.pv-grid.two,.pv-pills{grid-template-columns:1fr!important}}
    `;
    doc.head.appendChild(style);
  };

  const addSection = (id, html) => {
    if (doc.getElementById(id)) return;
    const section = doc.createElement('section');
    section.className = 'section';
    section.id = id;
    section.innerHTML = `<div class="container">${html}</div>`;
    main.appendChild(section);
  };

  const uvSvg = `
    <svg viewBox="0 0 640 360" role="img" aria-label="UV protection dual mechanism diagram">
      <rect x="18" y="18" width="604" height="324" rx="24" fill="rgba(255,255,255,.03)"/>
      <text x="38" y="56" fill="#d0f8da" font-size="22">How TiO₂ provides UV protection</text>
      <text x="38" y="92" fill="#dbe4da" font-size="16">Absorption and scattering work together to reduce UV stress on the substrate.</text>
      <circle cx="170" cy="140" r="28" fill="#ffd23f"/><text x="142" y="146" fill="#222" font-size="14">UV</text>
      <line x1="170" y1="170" x2="170" y2="240" stroke="#ffd23f" stroke-width="6"/><line x1="170" y1="170" x2="135" y2="225" stroke="#62c3ff" stroke-width="5"/>
      <rect x="110" y="240" width="130" height="30" rx="10" fill="rgba(20,212,71,.18)" stroke="rgba(20,212,71,.32)"/>
      <text x="122" y="260" fill="#fff" font-size="15">TiO₂-coated surface</text>
      <text x="82" y="226" fill="#dbe4da" font-size="13">Scattering</text>
      <text x="182" y="228" fill="#dbe4da" font-size="13">Absorption</text>
      <circle cx="430" cy="140" r="28" fill="#ffd23f"/><text x="402" y="146" fill="#222" font-size="14">UV</text>
      <line x1="430" y1="170" x2="430" y2="240" stroke="#ffd23f" stroke-width="6"/>
      <line x1="430" y1="170" x2="465" y2="225" stroke="#62c3ff" stroke-width="5"/>
      <rect x="370" y="240" width="130" height="30" rx="10" fill="rgba(20,212,71,.18)" stroke="rgba(20,212,71,.32)"/>
      <text x="382" y="260" fill="#fff" font-size="15">Protected substrate</text>
      <text x="476" y="228" fill="#dbe4da" font-size="13">Reflection / scatter</text>
      <text x="38" y="314" fill="#dbe4da" font-size="15">Source framing: UV absorption, UV scattering, and transparent-coating durability support.</text>
    </svg>
  `;

  const mechanismSvg = `
    <svg viewBox="0 0 640 360" role="img" aria-label="Photocatalytic mechanism diagram">
      <rect x="18" y="18" width="604" height="324" rx="24" fill="rgba(255,255,255,.03)"/>
      <text x="38" y="56" fill="#d0f8da" font-size="22">Photocatalytic mechanism</text>
      <text x="38" y="92" fill="#dbe4da" font-size="16">UV exposure activates TiO₂ and drives contaminant breakdown.</text>
      <circle cx="320" cy="185" r="72" fill="rgba(20,212,71,.12)" stroke="rgba(20,212,71,.34)" stroke-width="3"/>
      <text x="292" y="190" fill="#fff" font-size="24">TiO₂</text>
      <circle cx="180" cy="110" r="24" fill="#ffd23f"/><text x="156" y="116" fill="#222" font-size="13">UV</text>
      <line x1="205" y1="120" x2="260" y2="150" stroke="#ffd23f" stroke-width="6"/>
      <circle cx="450" cy="118" r="18" fill="#ff7b7b"/><text x="437" y="123" fill="#222" font-size="12">ROS</text>
      <line x1="386" y1="145" x2="432" y2="126" stroke="#ff7b7b" stroke-width="5"/>
      <rect x="440" y="210" width="118" height="44" rx="12" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.16)"/>
      <text x="455" y="237" fill="#fff" font-size="14">Organic pollutants</text>
      <line x1="430" y1="178" x2="440" y2="210" stroke="#62c3ff" stroke-width="5"/>
      <text x="68" y="278" fill="#dbe4da" font-size="15">TiO₂ activation</text>
      <text x="242" y="278" fill="#dbe4da" font-size="15">Reactive oxygen species</text>
      <text x="440" y="278" fill="#dbe4da" font-size="15">Breakdown of pollutants</text>
      <text x="38" y="314" fill="#dbe4da" font-size="15">Source framing: TiO₂ activation, breakdown of pollutants, self-cleaning and air-purification logic.</text>
    </svg>
  `;

  const photonSvg = `
    <svg viewBox="0 0 640 360" role="img" aria-label="Photon efficiency chart recreation">
      <rect x="18" y="18" width="604" height="324" rx="24" fill="rgba(255,255,255,.03)"/>
      <text x="38" y="56" fill="#d0f8da" font-size="22">Photon efficiency</text>
      <text x="38" y="92" fill="#dbe4da" font-size="16">Adjusted absorbance declines faster for the coated sample than for the control.</text>
      <line x1="86" y1="280" x2="560" y2="280" stroke="rgba(255,255,255,.25)" stroke-width="2"/>
      <line x1="86" y1="100" x2="86" y2="280" stroke="rgba(255,255,255,.25)" stroke-width="2"/>
      <polyline points="100,122 180,140 260,162 340,184 420,206 500,228" fill="none" stroke="#ffffff" stroke-width="4"/>
      <polyline points="100,158 180,192 260,220 340,244 420,260 500,274" fill="none" stroke="#ff6b6b" stroke-width="4"/>
      <text x="510" y="124" fill="#fff" font-size="14">Blindprobe</text>
      <text x="510" y="276" fill="#ff6b6b" font-size="14">MS 18</text>
      <text x="96" y="310" fill="#dbe4da" font-size="13">0 h</text>
      <text x="492" y="310" fill="#dbe4da" font-size="13">3 h</text>
      <text x="26" y="120" fill="#dbe4da" font-size="13">A</text>
      <text x="558" y="298" fill="#dbe4da" font-size="13">t / h</text>
      <text x="38" y="334" fill="#dbe4da" font-size="14">Source framing: Photon efficiency (MS 18) ≈ 0.133% with faster absorbance decline than the control.</text>
    </svg>
  `;

  const nanostructureSvg = `
    <svg viewBox="0 0 640 360" role="img" aria-label="Nanostructure and weathering stability illustration">
      <rect x="18" y="18" width="604" height="324" rx="24" fill="rgba(255,255,255,.03)"/>
      <text x="38" y="56" fill="#d0f8da" font-size="22">Nanostructure and weathering stability</text>
      <text x="38" y="92" fill="#dbe4da" font-size="16">The attached presentation pairs SEM-style surface imagery with before/after weathering framing.</text>
      <rect x="56" y="122" width="150" height="126" rx="18" fill="url(#grainA)" stroke="rgba(255,255,255,.15)"/>
      <rect x="246" y="122" width="150" height="126" rx="18" fill="url(#grainB)" stroke="rgba(255,255,255,.15)"/>
      <rect x="436" y="122" width="150" height="126" rx="18" fill="rgba(20,212,71,.08)" stroke="rgba(20,212,71,.22)"/>
      <text x="70" y="270" fill="#dbe4da" font-size="13">Before weathering</text>
      <text x="260" y="270" fill="#dbe4da" font-size="13">After weathering</text>
      <text x="456" y="270" fill="#dbe4da" font-size="13">Lotus-effect reference</text>
      <defs>
        <pattern id="grainA" width="18" height="18" patternUnits="userSpaceOnUse"><circle cx="4" cy="4" r="3" fill="#8f9491"/><circle cx="12" cy="8" r="4" fill="#c1c6c3"/><circle cx="8" cy="14" r="3" fill="#6d726f"/></pattern>
        <pattern id="grainB" width="18" height="18" patternUnits="userSpaceOnUse"><circle cx="5" cy="5" r="4" fill="#959a97"/><circle cx="13" cy="7" r="3" fill="#d1d4d2"/><circle cx="8" cy="14" r="4" fill="#767b78"/></pattern>
      </defs>
    </svg>
  `;

  const appSvg = `
    <svg viewBox="0 0 640 320" role="img" aria-label="Applications sectors derived from source presentation">
      <rect x="18" y="18" width="604" height="284" rx="24" fill="rgba(255,255,255,.03)"/>
      <text x="38" y="56" fill="#d0f8da" font-size="22">Applications of photocatalytic coatings</text>
      <rect x="46" y="96" width="170" height="156" rx="18" fill="rgba(20,212,71,.08)" stroke="rgba(20,212,71,.22)"/><text x="94" y="128" fill="#fff" font-size="22">Glass</text><text x="62" y="164" fill="#dbe4da" font-size="15">Transparency</text><text x="62" y="192" fill="#dbe4da" font-size="15">Self-cleaning</text><text x="62" y="220" fill="#dbe4da" font-size="15">Reduced heat buildup</text>
      <rect x="235" y="96" width="170" height="156" rx="18" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.10)"/><text x="286" y="128" fill="#fff" font-size="22">Metal</text><text x="252" y="164" fill="#dbe4da" font-size="15">Contaminant degradation</text><text x="252" y="192" fill="#dbe4da" font-size="15">UV inhibition</text><text x="252" y="220" fill="#dbe4da" font-size="15">Cleaner exposed surfaces</text>
      <rect x="424" y="96" width="170" height="156" rx="18" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.10)"/><text x="468" y="128" fill="#fff" font-size="22">Plastic</text><text x="442" y="164" fill="#dbe4da" font-size="15">UV-blocking support</text><text x="442" y="192" fill="#dbe4da" font-size="15">Preserved appearance</text><text x="442" y="220" fill="#dbe4da" font-size="15">Lower organic buildup</text>
    </svg>
  `;

  const microbialSvg = `
    <svg viewBox="0 0 640 360" role="img" aria-label="Microbial contamination control illustration">
      <rect x="18" y="18" width="604" height="324" rx="24" fill="rgba(255,255,255,.03)"/>
      <text x="38" y="56" fill="#d0f8da" font-size="22">Microbial contamination control</text>
      <text x="38" y="92" fill="#dbe4da" font-size="16">The attached presentation extends Titan into biofilm prevention, marine fouling control, and maintenance reduction.</text>
      <circle cx="162" cy="180" r="54" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.18)"/>
      <text x="132" y="186" fill="#fff" font-size="16">Biofilm</text>
      <line x1="216" y1="180" x2="298" y2="180" stroke="#62c3ff" stroke-width="6"/>
      <circle cx="340" cy="180" r="46" fill="rgba(20,212,71,.12)" stroke="rgba(20,212,71,.32)"/>
      <text x="314" y="186" fill="#fff" font-size="16">TiO₂</text>
      <line x1="386" y1="180" x2="468" y2="180" stroke="#ff7b7b" stroke-width="6"/>
      <circle cx="514" cy="180" r="54" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.18)"/>
      <text x="474" y="176" fill="#fff" font-size="14">Cleaner surface</text>
      <text x="478" y="198" fill="#fff" font-size="14">Lower maintenance</text>
      <text x="90" y="286" fill="#dbe4da" font-size="15">Biofilm prevention</text>
      <text x="290" y="286" fill="#dbe4da" font-size="15">Visible-light / ROS route</text>
      <text x="466" y="286" fill="#dbe4da" font-size="15">Extended surface lifespan</text>
    </svg>
  `;

  ensureStyle();

  if (currentLocalFile === 'technical-specifications.html') {
    addSection('presentation-visuals-tech', `
      <div class="pv-grid two">
        <div class="pv-card">
          <p class="tag">From the attached Titan presentation</p>
          <h2>UV protection and active route explanation</h2>
          <p>The Titan technical route is clearer when the page shows why TiO₂ is framed as more than a transport or SDS comparison item. The attached presentation explains that TiO₂ both absorbs and scatters UV radiation and can support transparent protective surfaces while helping reduce contaminant stress on the substrate.</p>
          <div class="pv-pills">
            <div class="pv-pill"><strong>UV absorption</strong><span>High-energy UV is absorbed and converted into less harmful energy forms.</span></div>
            <div class="pv-pill"><strong>UV scattering</strong><span>Particles deflect and reduce UV penetration into the substrate.</span></div>
            <div class="pv-pill"><strong>Active route logic</strong><span>Technical fit is linked to mechanism, not only chemistry labels.</span></div>
          </div>
        </div>
        <div class="pv-card reveal">
          ${uvSvg}
          <h3>Dual-mechanism UV protection</h3>
          <p>This visual is placed here because the Technical Specifications page is where engineering reviewers compare route logic, handling, and deployment framing together.</p>
        </div>
      </div>
    `);
  }

  if (currentLocalFile === 'titan.html') {
    addSection('presentation-visuals-titan', `
      <div class="pv-grid two">
        <div class="pv-card reveal">
          ${mechanismSvg}
          <h3>Photocatalytic mechanism</h3>
          <p>The attached presentation explains Titan through TiO₂ activation, reactive oxygen species, and the breakdown of organic contaminants. That fits naturally on the Titan page because it clarifies why Titan is strongest under organic-fouling conditions.</p>
        </div>
        <div class="pv-card reveal">
          ${nanostructureSvg}
          <h3>Nanostructure and weathering stability</h3>
          <p>The source deck uses SEM-style imaging and weathering comparison to support the durability framing. This adapted figure places that logic directly on the Titan page.</p>
        </div>
      </div>
    `);
  }

  if (currentLocalFile === 'proof-results.html') {
    addSection('presentation-visuals-proof', `
      <div class="pv-card">
        <p class="tag">Presentation-derived testing visuals</p>
        <h2>Performance-testing evidence layer</h2>
        <p>The attached Titan files contain a chart and testing visuals that belong on the Proof page because they show how photocatalytic activity is evidenced rather than only described.</p>
      </div>
      <div class="pv-grid two" style="margin-top:1rem">
        <div class="pv-card reveal">
          ${photonSvg}
          <h3>Photon-efficiency chart</h3>
          <p>The presentation chart shows a steeper decline in adjusted absorbance for the coated sample than for the control, which supports the Titan proof narrative with a more explicit test-oriented visual.</p>
        </div>
        <div class="pv-card reveal">
          ${microbialSvg}
          <h3>Contaminant-control extension</h3>
          <p>The same source set also extends Titan into microbial and antifouling logic. That broadens the interpretation of proof from energy-only framing to maintenance and cleanliness relevance.</p>
        </div>
      </div>
    `);
  }

  if (currentLocalFile === 'applications.html') {
    addSection('presentation-visuals-apps', `
      <div class="pv-grid two">
        <div class="pv-card reveal">
          ${appSvg}
          <h3>Application sectors</h3>
          <p>The Titan presentation explicitly extends the photocatalytic route beyond PV modules to glass, metal, and plastic surfaces. That makes this visual appropriate on the Applications page where route fit is explained more broadly.</p>
        </div>
        <div class="pv-card reveal">
          ${microbialSvg}
          <h3>Microbial contamination control</h3>
          <p>The source presentation also positions Titan for biofilm prevention, marine self-cleaning, and lower contamination-related maintenance. That supports the application-fit logic where microbial or organic contamination is decision-relevant.</p>
        </div>
      </div>
      <div class="pv-card" style="margin-top:1rem">
        <h3>Text aligned to the source files</h3>
        <ul>
          <li>Glass surfaces: self-cleaning with transparency and UV-related durability support.</li>
          <li>Metal surfaces: contaminant degradation and cleaner exposed surfaces under sunlight.</li>
          <li>Plastic applications: lower organic buildup and protection against fading and degradation framing.</li>
          <li>Microbial environments: biofilm-prevention and maintenance-reduction positioning.</li>
        </ul>
      </div>
    `);
  }
})();