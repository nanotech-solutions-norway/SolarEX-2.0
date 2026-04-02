const versionLabel = 'SIW v1.3';
const STORAGE_KEY = 'siw13_workspace_v13';
const ANALYTICS_KEY = 'siw13_analytics_v13';

const data = {
  industries: [
    { id: 'solar', label: 'Solar' },
    { id: 'commercial-rooftop', label: 'Commercial Rooftop' },
    { id: 'utility-scale', label: 'Utility-scale PV' }
  ],
  assets: [
    { id: 'panel-glass', label: 'Panel glass', industryIds: ['solar', 'commercial-rooftop', 'utility-scale'] },
    { id: 'framed-module', label: 'Framed module surface', industryIds: ['solar', 'commercial-rooftop', 'utility-scale'] },
    { id: 'rooftop-array', label: 'Rooftop array', industryIds: ['solar', 'commercial-rooftop'] }
  ],
  mechanisms: [
    { id: 'dust', label: 'Dust / sand soiling' },
    { id: 'organic', label: 'Organic fouling / biofilm' },
    { id: 'mixed', label: 'Mixed contamination' },
    { id: 'uv', label: 'UV / weathering' }
  ],
  substrates: [
    { id: 'glass', label: 'Glass' },
    { id: 'coated', label: 'Painted / coated surface' },
    { id: 'metal', label: 'Metal frame / housing' }
  ],
  constraints: [
    { id: 'easy-cleaning', label: 'Low cleaning burden' },
    { id: 'low-downtime', label: 'Downtime must stay low' },
    { id: 'proof-heavy', label: 'Proof-heavy review' },
    { id: 'organic-load', label: 'High organic loading' },
    { id: 'arid-site', label: 'High dust / arid site' },
    { id: 'roi-sensitive', label: 'ROI-sensitive evaluation' }
  ],
  products: [
    {
      id: 'solarex-quartz',
      label: 'SolarEX Quartz',
      positioning: 'SiO₂ passive easy-clean pathway',
      summary: 'Hydrophobic and oleophobic easy-clean path for dust-led and passive anti-stick solar use cases.',
      industryIds: ['solar', 'commercial-rooftop', 'utility-scale'],
      assetIds: ['panel-glass', 'framed-module', 'rooftop-array'],
      mechanismIds: ['dust', 'mixed', 'uv'],
      substrateIds: ['glass', 'coated'],
      constraintIds: ['easy-cleaning', 'low-downtime', 'arid-site', 'roi-sensitive'],
      scores: { technical: 62, proof: 56, route: 52 },
      useCaseFit: 'Best for dust-led, hydrophobic easy-clean, and passive low-adhesion evaluation paths.',
      standards: 'Field normalisation basis plus application and cure framing.',
      labField: 'Positioned with monitored rooftop evidence from the InterCos PV plant in Hochdorf.',
      operational: 'Use where reduced contaminant adhesion and easier wash-down are the main commercial levers.',
      proof: [
        { id: 'quartz-field', category: 'validated field', title: 'InterCos PV Plant Hochdorf', text: 'Monitored treated-versus-untreated rooftop evidence for Quartz, including reported uplift against untreated control arrays.', file: '../evidence/quartz-hochdorf.html' },
        { id: 'quartz-tech', category: 'technical framing', title: 'Application and cure window', text: 'Quartz is positioned with coating thickness, coverage, cure, and pH-stability framing on the live product page.', file: '../products/quartz.html' }
      ],
      cautions: [
        'Field case is site-specific and should not be generalized without qualification.',
        'Quartz is a passive easy-clean path, not a photocatalytic path.'
      ],
      preferredRoute: 'sample-request'
    },
    {
      id: 'solarex-titan',
      label: 'SolarEX Titan',
      positioning: 'TiO₂ active-cleaning pathway',
      summary: 'Photocatalytic and superhydrophilic self-cleaning path for organic and mixed fouling scenarios.',
      industryIds: ['solar', 'commercial-rooftop', 'utility-scale'],
      assetIds: ['panel-glass', 'framed-module', 'rooftop-array'],
      mechanismIds: ['organic', 'mixed', 'uv'],
      substrateIds: ['glass'],
      constraintIds: ['proof-heavy', 'organic-load', 'roi-sensitive', 'low-downtime'],
      scores: { technical: 60, proof: 64, route: 56 },
      useCaseFit: 'Best for organic fouling, pollen, algae, biofilm, bird fouling, and active-cleaning evaluation paths.',
      standards: 'Study-window framing plus application and cure framing.',
      labField: 'Positioned with a 360-day expert-accompanied rooftop study and string-level uplift data.',
      operational: 'Use where active cleaning chemistry and uniform rinsing are more relevant than passive anti-stick alone.',
      proof: [
        { id: 'titan-study', category: 'validated study', title: 'PV³ Expert-Accompanying Study', text: '360-day rooftop study for Titan comparing coated and uncoated strings within the same monitored installation.', file: '../evidence/titan-pv3-study.html' },
        { id: 'titan-tech', category: 'technical framing', title: 'Photocatalytic pathway', text: 'Titan is positioned around TiO₂-based photocatalysis, superhydrophilic rinsing, and active self-cleaning logic.', file: '../products/titan.html' }
      ],
      cautions: [
        'Study-backed revenue implications should not be presented as an unconditional guarantee.',
        'Organic-load fit should still be validated against the actual site environment and wash regime.'
      ],
      preferredRoute: 'technical-consult'
    }
  ],
  narratives: {
    dust: {
      explain: 'Dust-led losses rise when persistent soiling increases adhesion and reduces the ease with which rain or washing removes accumulated contamination.',
      intervention: 'Prioritise passive low-adhesion and easy-clean surface behaviour when the main objective is to reduce persistent dust burden and cleaning intensity.',
      boundary: 'Do not treat dust-control evidence as a universal performance guarantee outside the actual site conditions and wash regime.'
    },
    organic: {
      explain: 'Organic fouling behaves differently from simple mineral dust because residue can cling, smear, or biologically persist unless the surface actively supports breakdown and rinsing.',
      intervention: 'Prioritise active-cleaning chemistry and superhydrophilic rinsing logic when pollen, algae, biofilm, or bird fouling are the dominant contaminants.',
      boundary: 'Organic-load scenarios still need site validation; active-cleaning positioning should not be overstated beyond the actual study-backed scope.'
    },
    mixed: {
      explain: 'Mixed contamination requires separating what is mineral, what is organic, and what portion of the value case comes from easier cleaning versus more active surface chemistry.',
      intervention: 'Use side-by-side comparison and proof review before selecting the path because both Quartz and Titan can appear plausible in mixed environments.',
      boundary: 'When contamination is genuinely mixed, technical review should dominate over brochure-level product separation.'
    },
    uv: {
      explain: 'UV and weathering matter because long-duration outdoor exposure changes surface behaviour over time and influences how the contamination-control story should be qualified.',
      intervention: 'Use the product whose operating narrative, study basis, and application window best match the outdoor durability expectations of the site.',
      boundary: 'UV framing should remain tied to the actual proof basis and not be expanded into unsupported lifetime claims.'
    },
    default: {
      explain: 'The selected degradation mode should be translated into operationally meaningful criteria before product comparison starts.',
      intervention: 'Use plain-language explanation first, then connect the mechanism to fit, proof, compare, and next-step routing.',
      boundary: 'Keep limitations near the proof so the buyer does not need to infer scope from raw study or case titles alone.'
    }
  },
  routes: [
    { id: 'sample-request', title: 'Request sample', body: 'Best for controlled evaluation, pilot sampling, and early-stage surface validation.', workflow: 'evaluation-route' },
    { id: 'technical-consult', title: 'Book technical consult', body: 'Best for mixed, proof-heavy, or boundary-condition-sensitive scenarios.', workflow: 'engineering-review' },
    { id: 'rfq-request', title: 'Request RFQ', body: 'Best when the use case is mature enough for commercial qualification.', workflow: 'commercial-qualification' }
  ]
};

const state = {
  industry: 'solar',
  asset: 'panel-glass',
  mechanism: 'dust',
  substrate: 'glass',
  constraints: ['easy-cleaning', 'low-downtime'],
  savedSolutions: [],
  savedProof: [],
  compareIds: []
};

const els = {
  industrySelect: document.getElementById('industrySelect'),
  assetSelect: document.getElementById('assetSelect'),
  mechanismSelect: document.getElementById('mechanismSelect'),
  substrateSelect: document.getElementById('substrateSelect'),
  constraintGrid: document.getElementById('constraintGrid'),
  workspaceStrip: document.getElementById('workspaceStrip'),
  saveWorkspaceButton: document.getElementById('saveWorkspaceButton'),
  clearWorkspaceButton: document.getElementById('clearWorkspaceButton'),
  heroTitle: document.getElementById('heroTitle'),
  heroSubtitle: document.getElementById('heroSubtitle'),
  sentenceBuilder: document.getElementById('sentenceBuilder'),
  explainSummary: document.getElementById('explainSummary'),
  interventionSummary: document.getElementById('interventionSummary'),
  boundarySummary: document.getElementById('boundarySummary'),
  bestFitScore: document.getElementById('bestFitScore'),
  fitVerdict: document.getElementById('fitVerdict'),
  fitShortlist: document.getElementById('fitShortlist'),
  proofRail: document.getElementById('proofRail'),
  standardsSummary: document.getElementById('standardsSummary'),
  labFieldSummary: document.getElementById('labFieldSummary'),
  operationalImplication: document.getElementById('operationalImplication'),
  cautionFlags: document.getElementById('cautionFlags'),
  specExplorer: document.getElementById('specExplorer'),
  actionGrid: document.getElementById('actionGrid'),
  responseSummary: document.getElementById('responseSummary'),
  decisionChecklist: document.getElementById('decisionChecklist'),
  payloadPreview: document.getElementById('payloadPreview'),
  capabilityMap: document.getElementById('capabilityMap'),
  evidenceDrawer: document.getElementById('evidenceDrawer'),
  drawerTitle: document.getElementById('drawerTitle'),
  drawerContent: document.getElementById('drawerContent'),
  closeDrawerButton: document.getElementById('closeDrawerButton'),
  globalSearch: document.getElementById('globalSearch'),
  searchResults: document.getElementById('searchResults'),
  saveSolutionButton: document.getElementById('saveSolutionButton'),
  bookmarkProofButton: document.getElementById('bookmarkProofButton'),
  openEvidenceButton: document.getElementById('openEvidenceButton'),
  compareToggleButton: document.getElementById('compareToggleButton'),
  compareShell: document.getElementById('compareShell'),
  compareGrid: document.getElementById('compareGrid')
};

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
function restore() {
  try {
    Object.assign(state, JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'));
  } catch (e) {}
}
function track(name, detail = {}) {
  try {
    const items = JSON.parse(localStorage.getItem(ANALYTICS_KEY) || '[]');
    items.push({ ts: new Date().toISOString(), name, detail });
    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(items.slice(-100)));
  } catch (e) {}
}
function label(list, id) {
  const hit = list.find((item) => item.id === id);
  return hit ? hit.label : id;
}
function assetOptions() {
  return data.assets.filter((asset) => asset.industryIds.includes(state.industry));
}
function narrative() {
  return data.narratives[state.mechanism] || data.narratives.default;
}
function score(product) {
  let technical = product.scores.technical;
  if (product.industryIds.includes(state.industry)) technical += 10;
  if (product.assetIds.includes(state.asset)) technical += 14;
  if (product.mechanismIds.includes(state.mechanism)) technical += 16;
  if (product.substrateIds.includes(state.substrate)) technical += 8;
  state.constraints.forEach((item) => { if (product.constraintIds.includes(item)) technical += 4; });
  let proof = product.scores.proof;
  if (state.mechanism === 'mixed') proof += 6;
  if (state.constraints.includes('proof-heavy')) proof += product.id === 'solarex-titan' ? 8 : 2;
  let route = product.scores.route;
  if (state.constraints.includes('low-downtime')) route += 4;
  if (state.constraints.includes('roi-sensitive')) route += 4;
  technical = Math.min(96, Math.max(34, technical));
  proof = Math.min(96, Math.max(32, proof));
  route = Math.min(96, Math.max(32, route));
  const composite = Math.round((technical * 0.5) + (proof * 0.3) + (route * 0.2));
  return { ...product, metrics: { technical, proof, route, composite } };
}
function ranked() {
  return data.products.map(score).sort((a, b) => b.metrics.composite - a.metrics.composite);
}
function verdict(item) {
  if (item.metrics.composite >= 82 && item.metrics.proof >= 70) return { label: 'Recommended', cls: 'verdict-good' };
  if (item.metrics.composite >= 68) return { label: 'Needs engineering review', cls: 'verdict-mid' };
  return { label: 'Not recommended', cls: 'verdict-low' };
}
function renderSelect(el, list, value) {
  el.innerHTML = list.map((item) => `<option value="${item.id}" ${item.id === value ? 'selected' : ''}>${item.label}</option>`).join('');
}
function renderConstraints() {
  els.constraintGrid.innerHTML = data.constraints.map((item) => `<button type="button" class="chip ${state.constraints.includes(item.id) ? 'chip-active' : ''}" data-constraint="${item.id}">${item.label}</button>`).join('');
  els.constraintGrid.querySelectorAll('[data-constraint]').forEach((button) => {
    button.addEventListener('click', () => {
      const id = button.dataset.constraint;
      state.constraints = state.constraints.includes(id) ? state.constraints.filter((x) => x !== id) : [...state.constraints, id];
      track('constraint_change', { id });
      update();
    });
  });
}
function currentTop() { return ranked()[0]; }
function renderWorkspace(top) {
  const savedCount = state.savedSolutions.length + state.savedProof.length;
  els.workspaceStrip.innerHTML = [
    ['Asset', label(assetOptions(), state.asset)],
    ['Mechanism', label(data.mechanisms, state.mechanism)],
    ['Fit', `${top.metrics.composite}/100`],
    ['Proof', `${top.metrics.proof}/100`],
    ['Saved', `${savedCount} bookmarked`]
  ].map(([a,b]) => `<div class="workspace-chip"><span>${a}:</span><strong>${b}</strong></div>`).join('');
}
function renderHero(top) {
  els.heroTitle.textContent = `Decision support for ${label(data.industries, state.industry).toLowerCase()} assets`;
  els.heroSubtitle.textContent = `Current focus: ${label(data.mechanisms, state.mechanism).toLowerCase()} on ${label(assetOptions(), state.asset).toLowerCase()}. Best-fit mapped path: ${top.label}.`;
  els.sentenceBuilder.innerHTML = `<strong>Protecting</strong> ${label(assetOptions(), state.asset)} <strong>from</strong> ${label(data.mechanisms, state.mechanism).toLowerCase()} <strong>under</strong> ${state.constraints.map((id) => label(data.constraints, id)).join(', ') || 'standard operating conditions'}.`;
}
function renderExplain() {
  const n = narrative();
  els.explainSummary.textContent = n.explain;
  els.interventionSummary.textContent = n.intervention;
  els.boundarySummary.textContent = n.boundary;
}
function renderFit(list, top) {
  const v = verdict(top);
  els.bestFitScore.textContent = `${top.metrics.composite}/100`;
  els.fitVerdict.textContent = v.label;
  els.fitVerdict.className = `verdict-pill ${v.cls}`;
  els.fitShortlist.innerHTML = list.slice(0, 2).map((item, index) => `
    <article class="short-card ${index === 0 ? 'short-card-top' : ''}">
      <div class="short-head">
        <div>
          <p class="mini-label">Option ${index + 1}</p>
          <h3>${item.label}</h3>
          <p class="micro-copy">${item.positioning}</p>
        </div>
        <span class="score-pill">${item.metrics.composite}/100</span>
      </div>
      <p class="body-copy">${item.summary}</p>
      <div class="metric-row"><span class="metric-pill">Technical ${item.metrics.technical}</span><span class="metric-pill">Proof ${item.metrics.proof}</span><span class="metric-pill">Route ${item.metrics.route}</span></div>
    </article>`).join('');
}
function renderProof(top) {
  els.proofRail.innerHTML = top.proof.map((item) => `<button type="button" class="proof-card" data-proof="${item.id}"><p class="mini-label">${item.category}</p><h3>${item.title}</h3><p class="micro-copy">${item.text}</p></button>`).join('');
  els.proofRail.querySelectorAll('[data-proof]').forEach((button) => button.addEventListener('click', () => openProof(top, button.dataset.proof)));
}
function renderCredibility(top) {
  els.standardsSummary.textContent = top.standards;
  els.labFieldSummary.textContent = top.labField;
  els.operationalImplication.textContent = top.operational;
  els.cautionFlags.innerHTML = top.cautions.map((item) => `<span class="flag-pill">${item}</span>`).join('');
}
function renderSpec(top) {
  const rows = [
    ['Use case fit', top.useCaseFit],
    ['Primary mechanism', label(data.mechanisms, top.mechanismIds[0])],
    ['Preferred route', data.routes.find((item) => item.id === top.preferredRoute).title],
    ['Technical fit', `${top.metrics.technical}/100`],
    ['Proof strength', `${top.metrics.proof}/100`],
    ['Route readiness', `${top.metrics.route}/100`]
  ];
  els.specExplorer.innerHTML = `<div class="spec-head-row"><span>Criterion</span><span>Current best-fit path</span></div>${rows.map(([a,b]) => `<div class="spec-row"><span>${a}</span><strong>${b}</strong></div>`).join('')}`;
}
function routeUrl(intent, top) {
  const params = new URLSearchParams({ intent, version: versionLabel, industry: state.industry, asset: state.asset, mechanism: state.mechanism, substrate: state.substrate, solution: top.label, fitScore: String(top.metrics.composite) });
  state.constraints.forEach((item) => params.append('constraint', item));
  return `./handoff.html?${params.toString()}`;
}
function renderActions(top) {
  els.actionGrid.innerHTML = data.routes.map((route) => `<a class="action-card" data-intent="${route.id}" href="${routeUrl(route.id, top)}"><p class="mini-label">${route.workflow}</p><h3>${route.title}</h3><p class="body-copy">${route.body}</p></a>`).join('');
  els.responseSummary.textContent = `Expected response: ${data.routes.find((item) => item.id === top.preferredRoute).title} is currently the primary routed next step.`;
  els.decisionChecklist.innerHTML = [
    `Selected path: ${top.label}`,
    `Current verdict: ${verdict(top).label}`,
    `Technical / proof / route: ${top.metrics.technical} / ${top.metrics.proof} / ${top.metrics.route}`,
    `Saved solution count: ${state.savedSolutions.length}`,
    `Saved proof count: ${state.savedProof.length}`
  ].map((item) => `<div class="check-item">${item}</div>`).join('');
  els.actionGrid.querySelectorAll('[data-intent]').forEach((link) => link.addEventListener('click', () => track('cta_click', { intent: link.dataset.intent, solution: top.id })));
}
function renderPayload(list) {
  els.payloadPreview.textContent = JSON.stringify({ version: versionLabel, industry: state.industry, asset: state.asset, mechanism: state.mechanism, substrate: state.substrate, constraints: state.constraints, shortlist: list.slice(0,2).map((item) => ({ label: item.label, technical: item.metrics.technical, proof: item.metrics.proof, route: item.metrics.route, composite: item.metrics.composite })), savedSolutions: state.savedSolutions, savedProof: state.savedProof }, null, 2);
}
function renderMap(top) {
  const nodes = [ ['Orient', label(data.industries, state.industry)], ['Explain', label(data.mechanisms, state.mechanism)], ['Fit', top.label], ['Prove', top.proof[0].title], ['Act', data.routes.find((item) => item.id === top.preferredRoute).title] ];
  els.capabilityMap.innerHTML = nodes.map(([a,b]) => `<div class="map-node"><p class="mini-label">${a}</p><strong>${b}</strong></div>`).join('<div class="map-link"></div>');
}
function renderCompare(list) {
  els.compareShell.hidden = false;
  els.compareGrid.innerHTML = list.slice(0,2).map((item) => `<article class="compare-card"><p class="mini-label">${item.positioning}</p><h3>${item.label}</h3><div class="metric-row"><span class="metric-pill">Composite ${item.metrics.composite}</span><span class="metric-pill">Technical ${item.metrics.technical}</span><span class="metric-pill">Proof ${item.metrics.proof}</span></div><div class="compare-block"><strong>Best use</strong><p class="body-copy">${item.useCaseFit}</p></div><div class="compare-block"><strong>Key proof</strong><p class="body-copy">${item.proof[0].title}</p></div><div class="compare-block"><strong>Primary caution</strong><p class="body-copy">${item.cautions[0]}</p></div><div class="compare-block"><strong>Preferred route</strong><p class="body-copy">${data.routes.find((r) => r.id === item.preferredRoute).title}</p></div></article>`).join('');
}
function openProof(top, proofId) {
  const proof = top.proof.find((item) => item.id === proofId) || top.proof[0];
  els.drawerTitle.textContent = proof.title;
  els.drawerContent.innerHTML = `<div class="drawer-card"><p class="mini-label">Classification</p><p class="body-copy">${proof.category}</p></div><div class="drawer-card"><p class="mini-label">Why this matters</p><p class="body-copy">${proof.text}</p></div><div class="drawer-card"><p class="mini-label">Open evidence asset</p><p class="body-copy"><a href="${proof.file}">${proof.file}</a></p></div><div class="drawer-card"><p class="mini-label">Representative cautions</p><p class="body-copy">${top.cautions.join(' ')}</p></div>`;
  els.evidenceDrawer.classList.add('drawer-open');
  els.evidenceDrawer.setAttribute('aria-hidden', 'false');
  if (!state.savedProof.includes(proof.id)) state.savedProof = state.savedProof;
  track('proof_open', { proofId });
}
function closeDrawer() {
  els.evidenceDrawer.classList.remove('drawer-open');
  els.evidenceDrawer.setAttribute('aria-hidden', 'true');
}
function handleSearch() {
  const value = els.globalSearch.value.trim().toLowerCase();
  if (!value) { els.searchResults.innerHTML = ''; return; }
  const hits = [];
  data.products.forEach((item) => { if (`${item.label} ${item.positioning} ${item.summary}`.toLowerCase().includes(value)) hits.push({ label: item.label, section: 'fit' }); });
  data.products.forEach((item) => item.proof.forEach((proof) => { if (`${proof.title} ${proof.text}`.toLowerCase().includes(value)) hits.push({ label: proof.title, section: 'prove' }); }));
  data.routes.forEach((item) => { if (`${item.title} ${item.body}`.toLowerCase().includes(value)) hits.push({ label: item.title, section: 'act' }); });
  els.searchResults.innerHTML = hits.slice(0,5).map((item) => `<button type="button" class="search-hit" data-section="${item.section}">${item.label}</button>`).join('');
  els.searchResults.querySelectorAll('[data-section]').forEach((button) => button.addEventListener('click', () => {
    const section = button.dataset.section;
    if (section === 'fit') document.querySelector('.stage-grid').scrollIntoView({ behavior: 'smooth' });
    if (section === 'prove') document.querySelector('.proof-shell').scrollIntoView({ behavior: 'smooth' });
    if (section === 'act') document.querySelector('.details-grid').scrollIntoView({ behavior: 'smooth' });
    els.searchResults.innerHTML = '';
    els.globalSearch.value = button.textContent;
  }));
}
function update() {
  renderSelect(els.industrySelect, data.industries, state.industry);
  renderSelect(els.assetSelect, assetOptions(), state.asset);
  renderSelect(els.mechanismSelect, data.mechanisms, state.mechanism);
  renderSelect(els.substrateSelect, data.substrates, state.substrate);
  renderConstraints();
  const list = ranked();
  const top = list[0];
  renderWorkspace(top); renderHero(top); renderExplain(); renderFit(list, top); renderProof(top); renderCredibility(top); renderSpec(top); renderActions(top); renderPayload(list); renderMap(top); renderCompare(list); persist();
}
function bind() {
  els.industrySelect.addEventListener('change', (e) => { state.industry = e.target.value; state.asset = assetOptions()[0].id; track('selector_change', { field: 'industry', value: state.industry }); update(); });
  els.assetSelect.addEventListener('change', (e) => { state.asset = e.target.value; track('selector_change', { field: 'asset', value: state.asset }); update(); });
  els.mechanismSelect.addEventListener('change', (e) => { state.mechanism = e.target.value; track('selector_change', { field: 'mechanism', value: state.mechanism }); update(); });
  els.substrateSelect.addEventListener('change', (e) => { state.substrate = e.target.value; track('selector_change', { field: 'substrate', value: state.substrate }); update(); });
  els.saveWorkspaceButton.addEventListener('click', () => { persist(); track('workspace_saved'); });
  els.clearWorkspaceButton.addEventListener('click', () => { state.industry = 'solar'; state.asset = 'panel-glass'; state.mechanism = 'dust'; state.substrate = 'glass'; state.constraints = ['easy-cleaning', 'low-downtime']; state.savedSolutions = []; state.savedProof = []; track('workspace_cleared'); update(); });
  els.saveSolutionButton.addEventListener('click', () => { const top = currentTop(); if (!state.savedSolutions.includes(top.id)) state.savedSolutions.push(top.id); track('solution_saved', { solution: top.id }); update(); });
  els.bookmarkProofButton.addEventListener('click', () => { const top = currentTop(); const proofId = top.proof[0].id; if (!state.savedProof.includes(proofId)) state.savedProof.push(proofId); track('proof_saved', { proofId }); update(); });
  els.openEvidenceButton.addEventListener('click', () => openProof(currentTop(), currentTop().proof[0].id));
  els.compareToggleButton.addEventListener('click', () => { document.querySelector('.compare-shell').scrollIntoView({ behavior: 'smooth' }); track('compare_open'); });
  els.closeDrawerButton.addEventListener('click', closeDrawer);
  els.globalSearch.addEventListener('input', handleSearch);
}
restore(); bind(); update();