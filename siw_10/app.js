const versionLabel = 'SIW v1.2'

const industries = [
  { value: 'wind', label: 'Wind Turbines' },
  { value: 'telecom', label: 'Telecom' },
  { value: 'offshore', label: 'Offshore / Marine' },
  { value: 'drone', label: 'Drone / ROV' },
  { value: 'solar', label: 'Solar' },
  { value: 'infrastructure', label: 'Infrastructure' },
]

const mechanisms = [
  { value: 'ice', label: 'Ice adhesion' },
  { value: 'corrosion', label: 'Corrosion / salt exposure' },
  { value: 'contamination', label: 'Contamination / fouling' },
  { value: 'uv', label: 'UV / weathering' },
  { value: 'chemical', label: 'Chemical exposure' },
  { value: 'microbial', label: 'Microbial load' },
]

const substrates = [
  { value: 'composite', label: 'Composite / polymer' },
  { value: 'metal', label: 'Metal' },
  { value: 'glass', label: 'Glass' },
  { value: 'coated', label: 'Painted / coated surface' },
]

const assetsByIndustry = {
  wind: [
    { value: 'blade-leading-edge', label: 'Blade leading edge' },
    { value: 'blade-surface', label: 'Blade surface' },
    { value: 'nacelle-panel', label: 'Nacelle panel' },
  ],
  telecom: [
    { value: 'radome', label: 'Radome' },
    { value: 'antenna-surface', label: 'Antenna surface' },
    { value: 'tower-component', label: 'Tower component' },
  ],
  offshore: [
    { value: 'topside-equipment', label: 'Topside equipment' },
    { value: 'sensor-window', label: 'Sensor window' },
    { value: 'external-cladding', label: 'External cladding' },
  ],
  drone: [
    { value: 'drone-shell', label: 'Drone shell' },
    { value: 'sensor-housing', label: 'Sensor housing' },
    { value: 'rotor-assembly', label: 'Rotor assembly' },
  ],
  solar: [
    { value: 'panel-glass', label: 'Panel glass' },
    { value: 'frame-housing', label: 'Frame / housing' },
    { value: 'mounting-hardware', label: 'Mounting hardware' },
  ],
  infrastructure: [
    { value: 'bridge-component', label: 'Bridge component' },
    { value: 'facade-panel', label: 'Facade panel' },
    { value: 'signage-housing', label: 'Signage / enclosure' },
  ],
}

const constraints = [
  { value: 'rf-transparency', label: 'Transparency critical' },
  { value: 'low-downtime', label: 'Downtime must stay low' },
  { value: 'field-application', label: 'Field application required' },
  { value: 'harsh-weather', label: 'Harsh weather exposure' },
  { value: 'easy-cleaning', label: 'Low cleaning burden' },
  { value: 'compliance-heavy', label: 'Compliance-heavy review' },
]

const solutions = [
  {
    id: 'hirec-ice-support',
    label: 'Anti-ice support path',
    representative: 'Representative family: Hirec',
    industries: ['wind', 'telecom', 'infrastructure', 'drone'],
    mechanisms: ['ice', 'contamination'],
    substrates: ['composite', 'glass', 'coated'],
    constraints: ['low-downtime', 'harsh-weather', 'field-application'],
    scoreBase: 70,
    standards: 'Directional field and standards-led proof; verify final asset geometry.',
    labField: 'Strong fit for lab-to-field explanation when icing and wetting are the dominant failure modes.',
    operationalImplication: 'Use where lower ice adhesion and faster shedding improve uptime and inspection intervals.',
    rationale: [
      'Prioritizes surface behavior that reduces persistent wetting and supports faster shedding under icing conditions.',
      'Suitable when uptime, weather resilience, and field deployment logic matter more than decorative performance claims.',
      'Should be paired with explicit limitation language so users understand support versus full de-icing replacement.',
    ],
    cautions: [
      'Do not present this path as a stand-alone de-icing system.',
      'Validate adhesion, application route, and final substrate behavior before rollout.',
    ],
    specRows: [
      ['Use case fit', 'Ice-prone exposed assets'],
      ['Best for', 'Wind, telecom, infrastructure'],
      ['Review mode', 'Engineering review recommended before scale-up'],
      ['Why it matters', 'Reduces operational burden from persistent wetting and adhesion'],
    ],
    proof: [
      { category: 'Verified field tests', title: 'Field relevance', text: 'Start with field-facing evidence that shows behavior under exposed weather and operational conditions.' },
      { category: 'ISO / ASTM meaning', title: 'Standards context', text: 'Translate each standard into what was tested, why it matters, and how the result changes operations.' },
      { category: 'Boundary conditions', title: 'Not a replacement system', text: 'Clarify that the path supports anti-icing but does not replace heating, de-icing, or full system design.' },
      { category: 'Case studies', title: 'Application examples', text: 'Show sector-specific cases for wind, telecom, and exposed infrastructure assets.' },
    ],
    actions: ['technical-consult', 'sample-request', 'rfq-request'],
  },
  {
    id: 'gentoo-easy-clean',
    label: 'Low-adhesion easy-clean path',
    representative: 'Representative family: Gentoo',
    industries: ['solar', 'offshore', 'industrial', 'telecom'],
    mechanisms: ['contamination', 'uv'],
    substrates: ['glass', 'metal', 'coated', 'composite'],
    constraints: ['easy-cleaning', 'low-downtime', 'compliance-heavy'],
    scoreBase: 66,
    standards: 'Strong candidate for structured standards mapping and evidence drawer behavior.',
    labField: 'Best when users need both contamination-release logic and procurement-friendly documentation.',
    operationalImplication: 'Use where maintenance burden, wash-down effort, and surface cleanliness drive lifecycle cost.',
    rationale: [
      'Built for contamination-driven scenarios where easy-clean performance and proof packaging matter.',
      'Supports self-serve evaluation because the performance story is easy to connect to maintenance operations.',
      'Fits proof-led product pages with preview-first documentation and downloadable evidence bundles.',
    ],
    cautions: [
      'Contamination control still requires substrate and environment validation.',
      'Do not overstate field durability without matching evidence depth.',
    ],
    specRows: [
      ['Use case fit', 'Easy-clean and fouling control'],
      ['Best for', 'Solar, offshore, industrial surfaces'],
      ['Review mode', 'Documentation-first shortlist'],
      ['Why it matters', 'Reduces cleaning burden and improves inspection efficiency'],
    ],
    proof: [
      { category: 'Verified field tests', title: 'Cleaning burden signals', text: 'Show maintenance interval or cleaning-effort improvements in real operating contexts.' },
      { category: 'ISO / ASTM meaning', title: 'Test-to-operation bridge', text: 'Explain what each contamination or durability test means for maintenance planning.' },
      { category: 'Case studies', title: 'Use-case packaging', text: 'Group proof by solar, offshore, and industrial use cases for easier committee review.' },
      { category: 'Download bundle', title: 'Procurement support', text: 'Package field data, standards summaries, and limitation notes for internal sharing.' },
    ],
    actions: ['documentation-pack', 'sample-request', 'technical-consult'],
  },
  {
    id: 'corrosion-barrier',
    label: 'Corrosion and exposure barrier path',
    representative: 'Representative family: Protective system path',
    industries: ['offshore', 'infrastructure', 'industrial'],
    mechanisms: ['corrosion', 'chemical', 'uv'],
    substrates: ['metal', 'coated'],
    constraints: ['harsh-weather', 'compliance-heavy'],
    scoreBase: 68,
    standards: 'Requires stronger standards and disclosure structure than a simple product card can provide.',
    labField: 'Best fit when procurement, compliance, and long exposure cycles dominate the review process.',
    operationalImplication: 'Use where environmental severity and system-level limitations matter as much as coating behavior.',
    rationale: [
      'Designed for environments where exposure severity and system boundaries must be explicit.',
      'Works best when paired with compliance disclosures, limitation notes, and procurement summaries.',
      'Needs guided proof rather than passive downloads because readers otherwise infer too much from test names alone.',
    ],
    cautions: [
      'Separate top-surface behavior from full corrosion-system claims.',
      'Treat disclosures and owner review as part of the product experience, not a legal afterthought.',
    ],
    specRows: [
      ['Use case fit', 'Corrosion / salt / chemical exposure'],
      ['Best for', 'Offshore and infrastructure assets'],
      ['Review mode', 'Compliance-driven'],
      ['Why it matters', 'Prevents over-claiming and improves procurement confidence'],
    ],
    proof: [
      { category: 'Standards mapping', title: 'Validated vs directional', text: 'Classify standards as validated, directional, or unavailable by scenario.' },
      { category: 'Compliance disclosure', title: 'Disclosure-first review', text: 'Surface supporting evidence, revision dates, and limitation notes directly in the interface.' },
      { category: 'Case studies', title: 'Operational proof', text: 'Use case studies only where environmental and system scope match the current asset.' },
      { category: 'Boundary conditions', title: 'Not-recommended use cases', text: 'Show exclusion and caution scenarios near the proof, not buried in downloads.' },
    ],
    actions: ['technical-consult', 'rfq-request', 'documentation-pack'],
  },
]

const state = {
  version: versionLabel,
  industry: 'wind',
  asset: 'blade-leading-edge',
  mechanism: 'ice',
  substrate: 'composite',
  constraints: ['harsh-weather', 'low-downtime'],
  savedSolutions: [],
  savedProof: [],
  shortlist: [],
  topSolution: null,
}

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
}

const searchIndex = [
  { label: 'Anti-ice support path', section: 'fit', match: ['hirec', 'anti-ice', 'icing'] },
  { label: 'Low-adhesion easy-clean path', section: 'fit', match: ['gentoo', 'easy-clean', 'contamination'] },
  { label: 'Corrosion and exposure barrier path', section: 'fit', match: ['corrosion', 'offshore', 'barrier'] },
  { label: 'Evidence rail', section: 'prove', match: ['evidence', 'proof', 'standards'] },
  { label: 'Action routing', section: 'act', match: ['rfq', 'sample', 'consult'] },
]

function restoreWorkspace() {
  try {
    const raw = localStorage.getItem('siw10_workspace_v12')
    if (!raw) return
    const saved = JSON.parse(raw)
    Object.assign(state, saved)
  } catch (error) {}
}

function persistWorkspace() {
  localStorage.setItem('siw10_workspace_v12', JSON.stringify({
    industry: state.industry,
    asset: state.asset,
    mechanism: state.mechanism,
    substrate: state.substrate,
    constraints: state.constraints,
    savedSolutions: state.savedSolutions,
    savedProof: state.savedProof,
  }))
}

function assetOptions() {
  return assetsByIndustry[state.industry] || []
}

function optionLabel(list, value) {
  const hit = list.find((item) => item.value === value)
  return hit ? hit.label : value
}

function scoreSolution(solution) {
  let score = solution.scoreBase
  if (solution.industries.includes(state.industry)) score += 10
  if (solution.mechanisms.includes(state.mechanism)) score += 10
  if (solution.substrates.includes(state.substrate)) score += 8
  state.constraints.forEach((constraint) => {
    if (solution.constraints.includes(constraint)) score += 4
  })
  if (state.mechanism === 'ice' && solution.id === 'corrosion-barrier') score -= 10
  if (state.mechanism === 'corrosion' && solution.id === 'hirec-ice-support') score -= 8
  return Math.max(Math.min(score, 96), 34)
}

function recalculate() {
  state.shortlist = solutions
    .map((solution) => ({ ...solution, score: scoreSolution(solution) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
  state.topSolution = state.shortlist[0] || null
  persistWorkspace()
}

function renderSelect(select, data, value) {
  select.innerHTML = data.map((item) => `<option value="${item.value}" ${item.value === value ? 'selected' : ''}>${item.label}</option>`).join('')
}

function renderConstraintGrid() {
  els.constraintGrid.innerHTML = constraints.map((item) => {
    const active = state.constraints.includes(item.value)
    return `<button type="button" class="chip ${active ? 'chip-active' : ''}" data-constraint="${item.value}">${item.label}</button>`
  }).join('')
  els.constraintGrid.querySelectorAll('[data-constraint]').forEach((button) => {
    button.addEventListener('click', () => {
      const value = button.dataset.constraint
      if (state.constraints.includes(value)) {
        state.constraints = state.constraints.filter((item) => item !== value)
      } else {
        state.constraints = [...state.constraints, value]
      }
      updateView()
    })
  })
}

function renderWorkspaceStrip() {
  const savedCount = state.savedSolutions.length + state.savedProof.length
  const score = state.topSolution ? `${state.topSolution.score}/100` : '--'
  els.workspaceStrip.innerHTML = [
    ['Asset', optionLabel(assetOptions(), state.asset)],
    ['Degradation', optionLabel(mechanisms, state.mechanism)],
    ['Fit', score],
    ['Saved', `${savedCount} bookmarked`],
  ].map(([label, value]) => `<div class="workspace-chip"><span>${label}:</span><strong>${value}</strong></div>`).join('')
}

function renderHero() {
  const industryLabel = optionLabel(industries, state.industry)
  const mechanismLabel = optionLabel(mechanisms, state.mechanism)
  els.heroTitle.textContent = `Decision support for ${industryLabel.toLowerCase()} assets`
  els.heroSubtitle.textContent = `Current focus: ${mechanismLabel.toLowerCase()} on ${optionLabel(assetOptions(), state.asset).toLowerCase()}. The workspace preserves context, proof, and next-step intent across the journey.`
  els.sentenceBuilder.innerHTML = `<strong>Protecting</strong> ${optionLabel(assetOptions(), state.asset)} <strong>from</strong> ${mechanismLabel.toLowerCase()} <strong>under</strong> ${state.constraints.map((item) => optionLabel(constraints, item)).join(', ') || 'standard operating conditions'}.`
}

function mechanismCopy() {
  if (state.mechanism === 'ice') {
    return {
      explain: 'Ice adhesion risk rises when water retention, freeze-thaw cycling, and surface energy combine to hold ice on the asset for longer than operations can tolerate.',
      intervention: 'Use surface behavior that lowers retention and supports earlier shedding, while keeping limitations explicit and field deployment realistic.',
      boundary: 'This path supports anti-icing performance but does not replace heating, full de-icing systems, or asset-specific engineering review.',
    }
  }
  if (state.mechanism === 'corrosion') {
    return {
      explain: 'Corrosion risk is governed by exposure severity, substrate condition, and whether the claimed protective scope actually matches the operating environment.',
      intervention: 'Prioritize structured proof, compliance disclosures, and boundary conditions so buyers understand what the system does and does not cover.',
      boundary: 'Do not conflate surface behavior with full corrosion-system performance without supporting scope-specific evidence.',
    }
  }
  return {
    explain: 'The selected degradation mode should be translated into operationally meaningful criteria before product comparison starts.',
    intervention: 'Use plain-language explanation first, then connect the mechanism to filters, proof, and next-step action.',
    boundary: 'Keep boundary conditions near the proof so the user does not need to infer limitations from raw test names alone.',
  }
}

function renderExplain() {
  const copy = mechanismCopy()
  els.explainSummary.textContent = copy.explain
  els.interventionSummary.textContent = copy.intervention
  els.boundarySummary.textContent = copy.boundary
}

function verdict(score) {
  if (score >= 86) return { label: 'Recommended', cls: 'verdict-good' }
  if (score >= 72) return { label: 'Needs engineering review', cls: 'verdict-mid' }
  return { label: 'Not recommended', cls: 'verdict-low' }
}

function renderFit() {
  const top = state.topSolution
  const v = top ? verdict(top.score) : { label: 'Needs review', cls: 'verdict-mid' }
  els.bestFitScore.textContent = top ? `${top.score}/100` : '--'
  els.fitVerdict.textContent = v.label
  els.fitVerdict.className = `verdict-pill ${v.cls}`
  els.fitShortlist.innerHTML = state.shortlist.map((solution, index) => `
    <article class="short-card ${index === 0 ? 'short-card-top' : ''}">
      <div class="short-head">
        <div>
          <p class="mini-label">Option ${index + 1}</p>
          <h3>${solution.label}</h3>
          <p class="micro-copy">${solution.representative}</p>
        </div>
        <span class="score-pill">${solution.score}/100</span>
      </div>
      <p class="body-copy">${solution.rationale[0]}</p>
    </article>
  `).join('')
}

function renderProofRail() {
  const top = state.topSolution
  els.proofRail.innerHTML = top ? top.proof.map((item, index) => `
    <button type="button" class="proof-card" data-proof-index="${index}">
      <p class="mini-label">${item.category}</p>
      <h3>${item.title}</h3>
      <p class="micro-copy">${item.text}</p>
    </button>
  `).join('') : ''
  els.proofRail.querySelectorAll('[data-proof-index]').forEach((button) => {
    button.addEventListener('click', () => openEvidenceDrawer(Number(button.dataset.proofIndex)))
  })
}

function renderCredibility() {
  const top = state.topSolution
  els.standardsSummary.textContent = top ? top.standards : 'No standards summary available.'
  els.labFieldSummary.textContent = top ? top.labField : 'No lab/field summary available.'
  els.operationalImplication.textContent = top ? top.operationalImplication : 'No operational implication available.'
  els.cautionFlags.innerHTML = top ? top.cautions.map((item) => `<span class="flag-pill">${item}</span>`).join('') : ''
}

function renderSpecExplorer() {
  const top = state.topSolution
  els.specExplorer.innerHTML = top ? `
    <div class="spec-head-row"><span>Criterion</span><span>Current best-fit path</span></div>
    ${top.specRows.map(([label, value]) => `<div class="spec-row"><span>${label}</span><strong>${value}</strong></div>`).join('')}
  ` : ''
}

function actionUrl(intent) {
  const params = new URLSearchParams({
    intent,
    version: versionLabel,
    industry: state.industry,
    asset: state.asset,
    mechanism: state.mechanism,
    substrate: state.substrate,
    solution: state.topSolution ? state.topSolution.label : '',
  })
  state.constraints.forEach((value) => params.append('constraint', value))
  return `../contact.html?${params.toString()}`
}

function renderActions() {
  const items = [
    { intent: 'sample-request', title: 'Request sample', body: 'Best for controlled evaluation, pilot sampling, and surface-level validation.' },
    { intent: 'technical-consult', title: 'Book technical consult', body: 'Best for low-confidence, high-risk, or boundary-condition-heavy scenarios.' },
    { intent: 'rfq-request', title: 'Request RFQ', body: 'Best when the use case is mature enough for commercial qualification and route ownership.' },
  ]
  els.actionGrid.innerHTML = items.map((item) => `
    <a class="action-card" href="${actionUrl(item.intent)}">
      <p class="mini-label">${item.intent.replace('-', ' ')}</p>
      <h3>${item.title}</h3>
      <p class="body-copy">${item.body}</p>
    </a>
  `).join('')
  els.responseSummary.textContent = 'Expected response: scenario-aware follow-up with a technical or commercial owner route, plus the proof context already assembled in the workspace.'
  const checklist = [
    state.topSolution ? `Selected path: ${state.topSolution.label}` : 'No selected path',
    `Current verdict: ${state.topSolution ? verdict(state.topSolution.score).label : 'Needs review'}`,
    `Saved solution count: ${state.savedSolutions.length}`,
    `Saved proof count: ${state.savedProof.length}`,
  ]
  els.decisionChecklist.innerHTML = checklist.map((item) => `<div class="check-item">${item}</div>`).join('')
}

function renderPayload() {
  els.payloadPreview.textContent = JSON.stringify({
    version: versionLabel,
    industry: state.industry,
    asset: state.asset,
    mechanism: state.mechanism,
    substrate: state.substrate,
    constraints: state.constraints,
    shortlist: state.shortlist.map((item) => ({ label: item.label, score: item.score })),
    savedSolutions: state.savedSolutions,
    savedProof: state.savedProof,
  }, null, 2)
}

function renderCapabilityMap() {
  const top = state.topSolution
  const labels = [
    ['Orient', optionLabel(industries, state.industry)],
    ['Explain', optionLabel(mechanisms, state.mechanism)],
    ['Fit', top ? top.label : 'No path'],
    ['Prove', top ? top.proof[0].title : 'No proof'],
    ['Act', top ? verdict(top.score).label : 'Needs review'],
  ]
  els.capabilityMap.innerHTML = labels.map(([stage, value]) => `<div class="map-node"><p class="mini-label">${stage}</p><strong>${value}</strong></div>`).join('<div class="map-link"></div>')
}

function openEvidenceDrawer(index = 0) {
  const top = state.topSolution
  if (!top) return
  const current = top.proof[index] || top.proof[0]
  els.drawerTitle.textContent = `${current.category} — ${current.title}`
  els.drawerContent.innerHTML = `
    <div class="drawer-card">
      <p class="mini-label">Why this matters</p>
      <p class="body-copy">${current.text}</p>
    </div>
    <div class="drawer-card">
      <p class="mini-label">Representative path</p>
      <p class="body-copy">${top.label} • ${top.representative}</p>
    </div>
    <div class="drawer-card">
      <p class="mini-label">Operational meaning</p>
      <p class="body-copy">${top.operationalImplication}</p>
    </div>
  `
  els.evidenceDrawer.classList.add('drawer-open')
  els.evidenceDrawer.setAttribute('aria-hidden', 'false')
}

function closeEvidenceDrawer() {
  els.evidenceDrawer.classList.remove('drawer-open')
  els.evidenceDrawer.setAttribute('aria-hidden', 'true')
}

function handleSearch() {
  const value = els.globalSearch.value.trim().toLowerCase()
  if (!value) {
    els.searchResults.innerHTML = ''
    return
  }
  const results = searchIndex.filter((item) => item.label.toLowerCase().includes(value) || item.match.some((term) => term.includes(value))).slice(0, 5)
  els.searchResults.innerHTML = results.map((item) => `<button type="button" class="search-hit" data-section="${item.section}">${item.label}</button>`).join('')
  els.searchResults.querySelectorAll('[data-section]').forEach((button) => {
    button.addEventListener('click', () => {
      const section = button.dataset.section
      if (section === 'fit') document.querySelector('.stage-grid').scrollIntoView({ behavior: 'smooth' })
      if (section === 'prove') document.querySelector('.proof-shell').scrollIntoView({ behavior: 'smooth' })
      if (section === 'act') document.querySelector('.details-grid').scrollIntoView({ behavior: 'smooth' })
      els.searchResults.innerHTML = ''
      els.globalSearch.value = button.textContent
    })
  })
}

function saveCurrentSolution() {
  if (!state.topSolution) return
  if (!state.savedSolutions.includes(state.topSolution.id)) {
    state.savedSolutions = [...state.savedSolutions, state.topSolution.id]
    updateView()
  }
}

function saveCurrentProof() {
  const top = state.topSolution
  if (!top) return
  const key = `${top.id}:${top.proof[0].title}`
  if (!state.savedProof.includes(key)) {
    state.savedProof = [...state.savedProof, key]
    updateView()
  }
}

function clearWorkspace() {
  state.industry = 'wind'
  state.asset = 'blade-leading-edge'
  state.mechanism = 'ice'
  state.substrate = 'composite'
  state.constraints = ['harsh-weather', 'low-downtime']
  state.savedSolutions = []
  state.savedProof = []
  updateView()
}

function updateView() {
  renderSelect(els.industrySelect, industries, state.industry)
  renderSelect(els.assetSelect, assetOptions(), state.asset)
  renderSelect(els.mechanismSelect, mechanisms, state.mechanism)
  renderSelect(els.substrateSelect, substrates, state.substrate)
  renderConstraintGrid()
  recalculate()
  renderWorkspaceStrip()
  renderHero()
  renderExplain()
  renderFit()
  renderProofRail()
  renderCredibility()
  renderSpecExplorer()
  renderActions()
  renderPayload()
  renderCapabilityMap()
}

restoreWorkspace()
recalculate()

els.industrySelect.addEventListener('change', (event) => {
  state.industry = event.target.value
  state.asset = assetOptions()[0].value
  updateView()
})
els.assetSelect.addEventListener('change', (event) => {
  state.asset = event.target.value
  updateView()
})
els.mechanismSelect.addEventListener('change', (event) => {
  state.mechanism = event.target.value
  updateView()
})
els.substrateSelect.addEventListener('change', (event) => {
  state.substrate = event.target.value
  updateView()
})
els.saveWorkspaceButton.addEventListener('click', persistWorkspace)
els.clearWorkspaceButton.addEventListener('click', clearWorkspace)
els.saveSolutionButton.addEventListener('click', saveCurrentSolution)
els.bookmarkProofButton.addEventListener('click', saveCurrentProof)
els.openEvidenceButton.addEventListener('click', () => openEvidenceDrawer(0))
els.compareToggleButton.addEventListener('click', () => document.querySelector('.details-grid').scrollIntoView({ behavior: 'smooth' }))
els.closeDrawerButton.addEventListener('click', closeEvidenceDrawer)
els.globalSearch.addEventListener('input', handleSearch)

updateView()
