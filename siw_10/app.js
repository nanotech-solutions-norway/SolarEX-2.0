const versionLabel = 'SIW v1.4';
const STORAGE_KEY = 'siw10_workspace_v14';

const data = {
  industries: [
    { id: 'solar', label: 'Solar' },
    { id: 'commercial-rooftop', label: 'Commercial Rooftop' },
    { id: 'utility-scale', label: 'Utility-scale PV' },
  ],
  assets: [
    { id: 'panel-glass', label: 'Panel glass', industryIds: ['solar', 'commercial-rooftop', 'utility-scale'] },
    { id: 'framed-module', label: 'Framed module surface', industryIds: ['solar', 'commercial-rooftop', 'utility-scale'] },
    { id: 'rooftop-array', label: 'Rooftop array', industryIds: ['solar', 'commercial-rooftop'] },
  ],
  mechanisms: [
    { id: 'dust', label: 'Dust / sand soiling' },
    { id: 'organic', label: 'Organic fouling / biofilm' },
    { id: 'mixed', label: 'Mixed contamination' },
    { id: 'uv', label: 'UV / weathering' },
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
      scores: { technical: 62, proof: 56, route: 52 },
      chart: { shedding: 82, contamination: 71, proof: 56, durability: 74 },
      contactAngle: '112°',
      exposureWindow: '180 days',
      standards: 'Field normalisation basis plus application and cure framing.',
      labField: 'Monitored rooftop evidence from the InterCos PV plant in Hochdorf.',
      operational: 'Best where reduced contaminant adhesion and easier wash-down are the primary commercial levers.',
      proof: [
        { id: 'quartz-field', title: 'InterCos PV Plant Hochdorf', text: 'Monitored treated-versus-untreated rooftop evidence for Quartz, including reported uplift against untreated control arrays.', file: '../evidence/quartz-hochdorf.html', status: 'Field proven' },
        { id: 'quartz-tech', title: 'Application and cure window', text: 'Quartz is positioned with coating thickness, coverage, cure, and pH-stability framing on the live product page.', file: '../products/quartz.html', status: 'Technical framing' },
      ],
      validations: ['Surface wetting review', 'Dust-release screening', 'Outdoor exposure framing'],
      cautions: [
        'Field case is site-specific and should not be generalized without qualification.',
        'Quartz is a passive easy-clean path, not a photocatalytic path.',
      ],
      preferredRoute: 'sample-request',
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
      scores: { technical: 60, proof: 64, route: 56 },
      chart: { shedding: 71, contamination: 88, proof: 64, durability: 79 },
      contactAngle: '9°',
      exposureWindow: '360 days',
      standards: 'Study-window framing plus application and cure framing.',
      labField: 'Positioned with a 360-day expert-accompanied rooftop study and string-level uplift data.',
      operational: 'Best where active cleaning chemistry and uniform rinsing matter more than passive anti-stick alone.',
      proof: [
        { id: 'titan-study', title: 'PV³ Expert-Accompanying Study', text: '360-day rooftop study for Titan comparing coated and uncoated strings within the same monitored installation.', file: '../evidence/titan-pv3-study.html', status: 'Lab and field' },
        { id: 'titan-tech', title: 'Photocatalytic pathway', text: 'Titan is positioned around TiO₂-based photocatalysis, superhydrophilic rinsing, and active self-cleaning logic.', file: '../products/titan.html', status: 'Technical framing' },
      ],
      validations: ['Photocatalytic review', 'Organic-load study', 'Outdoor exposure framing'],
      cautions: [
        'Study-backed revenue implications should not be presented as an unconditional guarantee.',
        'Organic-load fit should still be validated against the actual site environment and wash regime.',
      ],
      preferredRoute: 'technical-consult',
    },
  ],
  routes: [
    { id: 'sample-request', title: 'Request sample', description: 'Best for controlled evaluation, pilot sampling, and early-stage surface validation.' },
    { id: 'technical-consult', title: 'Book technical consult', description: 'Best for mixed, proof-heavy, or boundary-condition-sensitive scenarios.' },
    { id: 'rfq-request', title: 'Request RFQ', description: 'Best when the use case is mature enough for commercial qualification.' },
  ],
  documents: [
    { title: 'Quartz field evidence', subtitle: 'Field case overview', href: '../evidence/quartz-hochdorf.html' },
    { title: 'Titan study summary', subtitle: 'PV³ evidence package', href: '../evidence/titan-pv3-study.html' },
    { title: 'Product specification pages', subtitle: 'Quartz and Titan detail', href: '../proof.html' },
  ],
};

const environmentProfiles = {
  dust: { temperature: '42°C', wind: '16 m/s', exposure: '180 days', index: 'Dust load: High' },
  organic: { temperature: '29°C', wind: '8 m/s', exposure: '360 days', index: 'Humidity: 84%' },
  mixed: { temperature: '34°C', wind: '12 m/s', exposure: '240 days', index: 'Mixed load: Elevated' },
  uv: { temperature: '51°C', wind: '6 m/s', exposure: '365 days', index: 'UV index: Severe' },
};

const mechanismCards = {
  dust: [
    { id: 'hydrophobic', title: 'Hydrophobic Action', subtitle: 'Passive low-adhesion shedding' },
    { id: 'surface-energy', title: 'Surface Energy Profile', subtitle: 'Reduced dust anchoring' },
    { id: 'durability', title: 'Microscopic Surface', subtitle: 'Retention vs wash-down balance' },
  ],
  organic: [
    { id: 'photocatalytic', title: 'Active Cleaning', subtitle: 'Photocatalytic breakdown pathway' },
    { id: 'rinsing', title: 'Hydrophilic Rinsing', subtitle: 'Water-sheeting cleanup effect' },
    { id: 'durability', title: 'Microscopic Surface', subtitle: 'Organic residue release logic' },
  ],
  mixed: [
    { id: 'hybrid', title: 'Hybrid Contamination', subtitle: 'Passive and active trade-off' },
    { id: 'selection', title: 'Route Selection', subtitle: 'Why proof depth matters' },
    { id: 'durability', title: 'Microscopic Surface', subtitle: 'Durability under mixed load' },
  ],
  uv: [
    { id: 'weathering', title: 'Weathering Profile', subtitle: 'Outdoor ageing emphasis' },
    { id: 'durability', title: 'Surface Stability', subtitle: 'Exposure window framing' },
    { id: 'selection', title: 'Mechanism Review', subtitle: 'Scope and evidence control' },
  ],
};

const state = {
  industry: 'solar',
  asset: 'panel-glass',
  mechanism: 'dust',
  productFocus: 'solarex-quartz',
};

const els = {
  industrySelect: document.getElementById('industrySelect'),
  assetSelect: document.getElementById('assetSelect'),
  mechanismSelect: document.getElementById('mechanismSelect'),
  productFocusSelect: document.getElementById('productFocusSelect'),
  chartSurface: document.getElementById('chartSurface'),
  chartLegend: document.getElementById('chartLegend'),
  environmentSurface: document.getElementById('environmentSurface'),
  validationList: document.getElementById('validationList'),
  proofList: document.getElementById('proofList'),
  mechanismGallery: document.getElementById('mechanismGallery'),
  insightList: document.getElementById('insightList'),
  documentList: document.getElementById('documentList'),
  routeList: document.getElementById('routeList'),
  metricFitValue: document.getElementById('metricFitValue'),
  metricFitNote: document.getElementById('metricFitNote'),
  metricProofValue: document.getElementById('metricProofValue'),
  metricProofNote: document.getElementById('metricProofNote'),
  metricAngleValue: document.getElementById('metricAngleValue'),
  metricAngleNote: document.getElementById('metricAngleNote'),
  metricExposureValue: document.getElementById('metricExposureValue'),
  metricExposureNote: document.getElementById('metricExposureNote'),
  saveWorkspaceButton: document.getElementById('saveWorkspaceButton'),
  clearWorkspaceButton: document.getElementById('clearWorkspaceButton'),
  detailModal: document.getElementById('detailModal'),
  detailTitle: document.getElementById('detailTitle'),
  detailSummary: document.getElementById('detailSummary'),
  detailMetrics: document.getElementById('detailMetrics'),
  detailAnalysis: document.getElementById('detailAnalysis'),
  detailActions: document.getElementById('detailActions'),
  closeDetailModal: document.getElementById('closeDetailModal'),
  chartTrigger: document.getElementById('chartTrigger'),
  openChartDetail: document.getElementById('openChartDetail'),
  environmentTrigger: document.getElementById('environmentTrigger'),
  validationTrigger: document.getElementById('validationTrigger'),
  proofTrigger: document.getElementById('proofTrigger'),
  metricFit: document.getElementById('metricFit'),
  metricProof: document.getElementById('metricProof'),
  metricAngle: document.getElementById('metricAngle'),
  metricExposure: document.getElementById('metricExposure'),
};

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function restore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    Object.assign(state, JSON.parse(raw));
  } catch (error) {}
}

function label(list, id) {
  const hit = list.find((item) => item.id === id);
  return hit ? hit.label : id;
}

function assetOptions() {
  return data.assets.filter((asset) => asset.industryIds.includes(state.industry));
}

function activeProducts() {
  return data.products
    .filter((product) => product.industryIds.includes(state.industry))
    .sort((a, b) => rankProduct(b) - rankProduct(a));
}

function currentPrimary() {
  return data.products.find((product) => product.id === state.productFocus) || activeProducts()[0] || data.products[0];
}

function currentSecondary(primary) {
  return activeProducts().find((product) => product.id !== primary.id) || primary;
}

function rankProduct(product) {
  let score = product.scores.technical + product.scores.proof + product.scores.route;
  if (product.mechanismIds.includes(state.mechanism)) score += 20;
  if (product.assetIds.includes(state.asset)) score += 14;
  if (product.id === state.productFocus) score += 4;
  return score;
}

function environmentProfile() {
  return environmentProfiles[state.mechanism] || environmentProfiles.dust;
}

function fitMetrics(primary) {
  let technical = primary.scores.technical;
  let proof = primary.scores.proof;
  let route = primary.scores.route;

  if (primary.mechanismIds.includes(state.mechanism)) technical += 16;
  if (primary.assetIds.includes(state.asset)) technical += 12;
  if (state.mechanism === 'mixed') proof += 8;
  if (state.mechanism === 'organic' && primary.id === 'solarex-titan') proof += 6;
  if (state.mechanism === 'dust' && primary.id === 'solarex-quartz') technical += 6;

  technical = Math.min(96, technical);
  proof = Math.min(94, proof);
  route = Math.min(90, route + (primary.preferredRoute === 'technical-consult' ? 4 : 2));
  const composite = Math.round((technical * 0.48) + (proof * 0.32) + (route * 0.20));

  return { technical, proof, route, composite };
}

function renderSelect(select, items, value) {
  select.innerHTML = items.map((item) => `<option value="${item.id}" ${item.id === value ? 'selected' : ''}>${item.label}</option>`).join('');
}

function renderProductFocus(primary, secondary) {
  const products = [primary, secondary].filter((item, index, arr) => arr.findIndex((entry) => entry.id === item.id) === index);
  els.productFocusSelect.innerHTML = products.map((item) => `<option value="${item.id}" ${item.id === state.productFocus ? 'selected' : ''}>${item.label}</option>`).join('');
}

function buildChartSvg(primary, secondary) {
  const width = 520;
  const height = 220;
  const padding = 32;
  const categories = [
    { key: 'shedding', label: 'Water Shedding' },
    { key: 'contamination', label: state.mechanism === 'organic' ? 'Organic Release' : 'Contamination Control' },
    { key: 'proof', label: 'Proof Strength' },
    { key: 'durability', label: 'Durability' },
  ];
  const xStep = (width - padding * 2) / (categories.length - 1);
  const yFor = (value) => height - padding - ((value / 100) * (height - padding * 2));
  const polyline = (product) => categories.map((cat, index) => `${padding + index * xStep},${yFor(product.chart[cat.key])}`).join(' ');

  return `
    <svg viewBox="0 0 ${width} ${height}" width="100%" height="220" aria-hidden="true">
      <defs>
        <linearGradient id="lineA" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#6ac7ff" />
          <stop offset="100%" stop-color="#9de8ff" />
        </linearGradient>
        <linearGradient id="lineB" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#5d8cff" />
          <stop offset="100%" stop-color="#79a6ff" />
        </linearGradient>
      </defs>
      ${[20, 40, 60, 80].map((tick) => `<line x1="${padding}" y1="${yFor(tick)}" x2="${width - padding}" y2="${yFor(tick)}" stroke="rgba(255,255,255,0.09)" />`).join('')}
      ${categories.map((cat, index) => `<line x1="${padding + index * xStep}" y1="${padding - 4}" x2="${padding + index * xStep}" y2="${height - padding}" stroke="rgba(255,255,255,0.08)" />`).join('')}
      <polyline fill="none" stroke="url(#lineA)" stroke-width="4" points="${polyline(primary)}" />
      <polyline fill="none" stroke="url(#lineB)" stroke-width="3" stroke-dasharray="6 4" points="${polyline(secondary)}" />
      ${categories.map((cat, index) => `
        <g>
          <circle cx="${padding + index * xStep}" cy="${yFor(primary.chart[cat.key])}" r="5.2" fill="#a9f0ff" />
          <circle cx="${padding + index * xStep}" cy="${yFor(secondary.chart[cat.key])}" r="4.6" fill="#8fb7ff" />
          <text x="${padding + index * xStep}" y="${height - 8}" text-anchor="middle" fill="rgba(232,242,255,0.72)" font-size="11">${cat.label}</text>
        </g>`).join('')}
    </svg>
  `;
}

function renderChart(primary, secondary) {
  els.chartSurface.innerHTML = buildChartSvg(primary, secondary);
  const legend = [
    { label: primary.label, color: '#9de8ff' },
    { label: secondary.label, color: '#79a6ff' },
  ];
  els.chartLegend.innerHTML = legend.map((item) => `<span class="chart-legend-item"><span class="chart-dot" style="background:${item.color}"></span>${item.label}</span>`).join('');
}

function renderMechanisms() {
  const cards = mechanismCards[state.mechanism] || mechanismCards.dust;
  els.mechanismGallery.innerHTML = cards.map((card) => `
    <button class="mechanism-card" type="button" data-detail-key="mechanism:${card.id}">
      <div class="mechanism-thumb"></div>
      <div class="mechanism-caption">
        <strong>${card.title}</strong>
        <span>${card.subtitle}</span>
      </div>
    </button>
  `).join('');
}

function renderEnvironment() {
  const env = environmentProfile();
  els.environmentSurface.innerHTML = [
    ['Temp', env.temperature],
    ['Wind Speed', env.wind],
    ['Exposure Time', env.exposure],
    ['Profile', env.index],
  ].map(([labelText, value]) => `<span class="environment-metric"><span>${labelText}</span><strong>${value}</strong></span>`).join('');
}

function renderValidation(primary) {
  const rows = [
    { title: primary.validations[0], note: 'Verified' },
    { title: primary.validations[1], note: 'Verified' },
    { title: primary.validations[2], note: 'Verified' },
  ];
  els.validationList.innerHTML = rows.map((row, index) => `
    <button class="validation-row" type="button" data-detail-key="validation:${index}">
      <span class="validation-badge">✓</span>
      <span class="row-copy"><strong>${row.title}</strong><span>Scenario-specific validation checkpoint</span></span>
      <span class="row-meta">${row.note}</span>
    </button>
  `).join('');
}

function renderProof(primary) {
  els.proofList.innerHTML = primary.proof.map((item, index) => `
    <button class="proof-row" type="button" data-detail-key="proof:${index}">
      <span class="proof-badge">✓</span>
      <span class="row-copy"><strong>${item.title}</strong><span>${item.text}</span></span>
      <span class="row-meta">${item.status}</span>
    </button>
  `).join('');
}

function renderInsights(primary, metrics) {
  const entries = [
    { key: 'observations', title: 'Test Observations', subtitle: `${primary.label} currently leads the scenario on composite fit.` },
    { key: 'reports', title: 'Technical Reports', subtitle: `Proof strength is ${metrics.proof}/100 for the active path.` },
    { key: 'risk', title: 'Risk Factors', subtitle: primary.cautions[0] },
    { key: 'steps', title: 'Next Steps', subtitle: `Primary routing: ${data.routes.find((route) => route.id === primary.preferredRoute).title}.` },
  ];
  els.insightList.innerHTML = entries.map((item) => `
    <button class="side-action" type="button" data-detail-key="insight:${item.key}">
      <span class="side-icon">•</span>
      <span class="row-copy"><strong>${item.title}</strong><span>${item.subtitle}</span></span>
      <span class="row-meta">›</span>
    </button>
  `).join('');
}

function renderDocuments() {
  els.documentList.innerHTML = data.documents.map((doc) => `
    <a class="document-link" href="${doc.href}">
      <span class="document-icon">▣</span>
      <span class="row-copy"><strong>${doc.title}</strong><span>${doc.subtitle}</span></span>
      <span class="row-meta">›</span>
    </a>
  `).join('');
}

function handoffUrl(intent, primary, metrics) {
  const params = new URLSearchParams({
    intent,
    version: versionLabel,
    industry: state.industry,
    asset: state.asset,
    mechanism: state.mechanism,
    solution: primary.label,
    fitScore: String(metrics.composite),
  });
  return `./handoff.html?${params.toString()}`;
}

function renderRoutes(primary, metrics) {
  els.routeList.innerHTML = data.routes.map((route) => `
    <a class="route-link" href="${handoffUrl(route.id, primary, metrics)}">
      <span class="route-icon">→</span>
      <span class="row-copy"><strong>${route.title}</strong><span>${route.description}</span></span>
      <span class="row-meta">›</span>
    </a>
  `).join('');
}

function renderMetrics(primary, secondary, metrics) {
  els.metricFitValue.textContent = `${metrics.composite}/100`;
  els.metricFitNote.textContent = `${primary.label} vs ${secondary.label}`;
  els.metricProofValue.textContent = `${metrics.proof}/100`;
  els.metricProofNote.textContent = primary.proof[0].title;
  els.metricAngleValue.textContent = primary.contactAngle;
  els.metricAngleNote.textContent = primary.positioning;
  els.metricExposureValue.textContent = primary.exposureWindow;
  els.metricExposureNote.textContent = environmentProfile().index;
}

function detailPayload(key, primary, secondary, metrics) {
  const env = environmentProfile();
  if (key === 'chart') {
    return {
      title: 'Coating comparison chart',
      summary: `The comparison chart visualizes how ${primary.label} and ${secondary.label} perform against four decision criteria: water shedding, contamination control, proof strength, and durability framing. Across desktop, tablet, and mobile, this chart is intentionally clickable or tappable so users can inspect the analysis without relying on compressed inline reading.`,
      metrics: [`${primary.label}: ${metrics.composite}/100 composite fit`, `${secondary.label}: ${rankProduct(secondary) - 100}/comparison rank proxy`, `Mechanism focus: ${label(data.mechanisms, state.mechanism)}`],
      sections: [
        ['Why the primary path leads', `${primary.label} is currently prioritized because its mechanism match and asset fit align more closely with the selected scenario. The chart is not a guarantee model; it is a structured decision view that separates performance logic from proof depth.`],
        ['How to interpret the lines', `Solid line = selected primary path. Dashed line = comparison path. Higher relative position indicates stronger scenario alignment in that category, not an absolute universal rating.`],
      ],
      actions: [{ label: 'Open proof center', href: '../proof.html' }],
    };
  }
  if (key === 'environment') {
    return {
      title: 'Environmental testing profile',
      summary: `The environment panel frames the scenario conditions used to interpret fit and proof. It turns the dashboard from a generic recommendation layer into a contextual review surface. Across desktop, tablet, and mobile, this panel opens into the same detailed analysis layer so exposure assumptions remain readable and reviewable.`,
      metrics: [`Temperature: ${env.temperature}`, `Wind speed: ${env.wind}`, `Exposure: ${env.exposure}`],
      sections: [
        ['Interpretation', `The current mechanism selection (${label(data.mechanisms, state.mechanism)}) maps to an exposure profile intended to frame the recommendation. This is a scenario scaffold, not a site-certified weather history.`],
        ['Operational implication', `Use this exposure profile to decide whether the current path should move directly to sample request, technical consult, or a broader proof review before commercial discussion.`],
      ],
      actions: [{ label: 'Book technical consult', href: handoffUrl('technical-consult', primary, metrics) }],
    };
  }
  if (key.startsWith('validation:')) {
    const index = Number(key.split(':')[1]) || 0;
    return {
      title: 'Validation checkpoint',
      summary: `${primary.validations[index]} is one of the scenario checkpoints surfaced in the control-room view. The purpose is to show users where the current path has direct support and where interpretation still needs human review.`,
      metrics: [`Primary path: ${primary.label}`, `Proof strength: ${metrics.proof}/100`],
      sections: [
        ['Checkpoint meaning', `This validation entry is presented as a structured confirmation surface rather than raw test nomenclature. It helps technical buyers understand what was checked and why it matters operationally.`],
        ['Boundary condition', primary.cautions[0]],
      ],
      actions: [{ label: 'Review related proof', href: primary.proof[0].file }],
    };
  }
  if (key.startsWith('proof:')) {
    const item = primary.proof[Number(key.split(':')[1]) || 0];
    return {
      title: item.title,
      summary: item.text,
      metrics: [`Status: ${item.status}`, `Path: ${primary.label}`],
      sections: [
        ['Why it matters', `This proof item is elevated in the dashboard because it materially influences trust in the selected path. It should be read together with the current mechanism and exposure profile.`],
        ['Caution', primary.cautions.join(' ')],
      ],
      actions: [{ label: 'Open evidence asset', href: item.file }],
    };
  }
  if (key.startsWith('mechanism:')) {
    const mech = key.split(':')[1];
    return {
      title: 'Mechanism analysis tile',
      summary: `This mechanism card represents a simplified visual cue for ${mech.replace('-', ' ')}. Across desktop, tablet, and mobile, each tile opens into the same larger explanatory layer so the user can review the detailed meaning without depending on small inline cards.`,
      metrics: [`Primary path: ${primary.label}`, `Mechanism: ${label(data.mechanisms, state.mechanism)}`],
      sections: [
        ['Interpretation', `${primary.label} is being explained through a bounded micro-story: mechanism first, evidence second, route decision third. This preserves transparency and keeps the recommendation trust-safe.`],
        ['Decision value', `Mechanism tiles are not decorative. They explain why the surface strategy is passive, active, hybrid, or durability-led under the current scenario.`],
      ],
      actions: [{ label: 'Open product detail', href: primary.id === 'solarex-quartz' ? '../products/quartz.html' : '../products/titan.html' }],
    };
  }
  if (key.startsWith('insight:')) {
    const insightKey = key.split(':')[1];
    const map = {
      observations: 'Test observations summarize what the current dashboard state is indicating at a decision level.',
      reports: 'Technical reports aggregate evidence and explanation into a committee-friendly view.',
      risk: primary.cautions.join(' '),
      steps: `Current preferred route is ${data.routes.find((route) => route.id === primary.preferredRoute).title}.`,
    };
    return {
      title: 'Insight detail',
      summary: map[insightKey] || 'Insight detail is not available.',
      metrics: [`Scenario path: ${primary.label}`],
      sections: [
        ['Why this module exists', `The right rail condenses the main guidance into clickable operational notes. It is intentionally compact in the dashboard and intentionally expandable through the same popup pattern on desktop, tablet, and mobile.`],
      ],
      actions: [{ label: 'Return to workspace', href: '#top' }],
    };
  }
  if (key === 'metric-fit') {
    return {
      title: 'Composite fit metric',
      summary: `Composite fit combines technical fit, proof strength, and route readiness into a single dashboard score for fast triage. It is designed for navigation, not for black-box authority.`,
      metrics: [`Composite fit: ${metrics.composite}/100`, `Technical: ${metrics.technical}/100`, `Route: ${metrics.route}/100`],
      sections: [
        ['Interpretation', `Use the composite fit score to decide whether the current path is mature enough for sampling or whether the case should escalate to technical review.`],
      ],
      actions: [{ label: 'Open routing options', href: handoffUrl(primary.preferredRoute, primary, metrics) }],
    };
  }
  if (key === 'metric-proof') {
    return {
      title: 'Proof strength metric',
      summary: `Proof strength indicates how much evidence depth is currently surfaced for the chosen path. It is distinct from technical fit so the user can see whether a strong scenario match also has strong proof support.`,
      metrics: [`Proof strength: ${metrics.proof}/100`, `Lead evidence: ${primary.proof[0].title}`],
      sections: [
        ['Interpretation', `High proof strength means the current dashboard can support a more confident buyer conversation. Lower proof strength means the path may still be valid, but the explanation and disclosure burden is higher.`],
      ],
      actions: [{ label: 'Review proof asset', href: primary.proof[0].file }],
    };
  }
  if (key === 'metric-angle') {
    return {
      title: 'Contact angle proxy',
      summary: `The contact angle metric is used here as a visual shorthand for surface wetting behavior. It is not displayed as a stand-alone certification claim; it is a dashboard proxy to help the user understand surface behaviour differences between passive and active-cleaning paths.`,
      metrics: [`Displayed value: ${primary.contactAngle}`, `Path: ${primary.positioning}`],
      sections: [
        ['Interpretation', `Higher values generally frame more water repellency, while lower values can align with water-sheeting and active rinsing logic. The number must be interpreted in context, not in isolation.`],
      ],
      actions: [{ label: 'Open technical product page', href: primary.id === 'solarex-quartz' ? '../products/quartz.html' : '../products/titan.html' }],
    };
  }
  if (key === 'metric-exposure') {
    return {
      title: 'Exposure window metric',
      summary: `The exposure window card gives the user a fast reminder of how long the current proof framing or field window extends. Across desktop, tablet, and mobile it opens into the same larger description because short inline labels can hide too much nuance.`,
      metrics: [`Exposure: ${primary.exposureWindow}`, `Environment: ${environmentProfile().index}`],
      sections: [
        ['Interpretation', `Exposure window framing helps users distinguish between short validation cycles and longer field-backed narratives. It should always be read alongside the current caution notes.`],
      ],
      actions: [{ label: 'Open proof overview', href: '../proof.html' }],
    };
  }
  return {
    title: 'Workspace detail',
    summary: 'Detailed analysis is not available for this item yet.',
    metrics: [],
    sections: [],
    actions: [],
  };
}

function openModal(payload) {
  els.detailTitle.textContent = payload.title;
  els.detailSummary.textContent = payload.summary;
  els.detailMetrics.innerHTML = (payload.metrics || []).map((item) => `<span class="detail-pill">${item}</span>`).join('');
  els.detailAnalysis.innerHTML = (payload.sections || []).map(([title, body]) => `
    <section class="detail-analysis-block">
      <h3>${title}</h3>
      <p>${body}</p>
    </section>
  `).join('');
  els.detailActions.innerHTML = (payload.actions || []).map((action) => {
    if (action.href) return `<a href="${action.href}">${action.label}</a>`;
    return `<button type="button">${action.label}</button>`;
  }).join('');
  els.detailModal.classList.add('is-open');
  els.detailModal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  els.detailModal.classList.remove('is-open');
  els.detailModal.setAttribute('aria-hidden', 'true');
}

function updateView() {
  renderSelect(els.industrySelect, data.industries, state.industry);
  renderSelect(els.assetSelect, assetOptions(), state.asset);
  renderSelect(els.mechanismSelect, data.mechanisms, state.mechanism);

  const primary = currentPrimary();
  const secondary = currentSecondary(primary);
  renderProductFocus(primary, secondary);

  const metrics = fitMetrics(primary);
  renderChart(primary, secondary);
  renderMechanisms();
  renderEnvironment();
  renderValidation(primary);
  renderProof(primary);
  renderInsights(primary, metrics);
  renderDocuments();
  renderRoutes(primary, metrics);
  renderMetrics(primary, secondary, metrics);
  persist();
}

function bindEvents() {
  els.industrySelect.addEventListener('change', (event) => {
    state.industry = event.target.value;
    state.asset = assetOptions()[0]?.id || state.asset;
    updateView();
  });
  els.assetSelect.addEventListener('change', (event) => {
    state.asset = event.target.value;
    updateView();
  });
  els.mechanismSelect.addEventListener('change', (event) => {
    state.mechanism = event.target.value;
    updateView();
  });
  els.productFocusSelect.addEventListener('change', (event) => {
    state.productFocus = event.target.value;
    updateView();
  });

  const openDetail = (key) => {
    const primary = currentPrimary();
    const secondary = currentSecondary(primary);
    const metrics = fitMetrics(primary);
    openModal(detailPayload(key, primary, secondary, metrics));
  };

  els.chartTrigger.addEventListener('click', () => openDetail('chart'));
  els.openChartDetail.addEventListener('click', () => openDetail('chart'));
  els.environmentTrigger.addEventListener('click', () => openDetail('environment'));
  els.environmentSurface.addEventListener('click', () => openDetail('environment'));
  els.validationTrigger.addEventListener('click', () => openDetail('validation:0'));
  els.proofTrigger.addEventListener('click', () => openDetail('proof:0'));
  els.metricFit.addEventListener('click', () => openDetail('metric-fit'));
  els.metricProof.addEventListener('click', () => openDetail('metric-proof'));
  els.metricAngle.addEventListener('click', () => openDetail('metric-angle'));
  els.metricExposure.addEventListener('click', () => openDetail('metric-exposure'));

  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-detail-key]');
    if (trigger) {
      openDetail(trigger.dataset.detailKey);
    }
    if (event.target.matches('[data-close-modal="true"]')) {
      closeModal();
    }
  });

  els.closeDetailModal.addEventListener('click', closeModal);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeModal();
  });

  els.saveWorkspaceButton.addEventListener('click', persist);
  els.clearWorkspaceButton.addEventListener('click', () => {
    state.industry = 'solar';
    state.asset = 'panel-glass';
    state.mechanism = 'dust';
    state.productFocus = 'solarex-quartz';
    updateView();
  });
}

restore();
bindEvents();
updateView();
