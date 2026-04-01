const industryOptions = [
  { value: 'telecom', label: 'Telecom' },
  { value: 'wind', label: 'Wind' },
  { value: 'marine', label: 'Marine / Offshore' },
  { value: 'industrial', label: 'Industrial' },
]

const mechanismOptions = [
  { value: 'water-icing', label: 'Water film / icing' },
  { value: 'contamination', label: 'Contamination / fouling' },
  { value: 'uv-weathering', label: 'UV / weathering' },
  { value: 'abrasion', label: 'Abrasion / particle impact' },
]

const substrateOptions = [
  { value: 'polymer-composite', label: 'Polymer / composite' },
  { value: 'metal', label: 'Metal' },
  { value: 'glass', label: 'Glass' },
  { value: 'painted-surface', label: 'Painted surface' },
]

const environmentOptions = [
  { value: 'cold-wet', label: 'Cold / wet exposure' },
  { value: 'marine-salt', label: 'Marine / salt exposure' },
  { value: 'desert-dust', label: 'Desert / dust exposure' },
  { value: 'general-outdoor', label: 'General outdoor exposure' },
]

const assetOptionsByIndustry = {
  telecom: [
    { value: 'radome', label: 'Radome' },
    { value: 'antenna-surface', label: 'Antenna surface' },
    { value: 'tower-component', label: 'Tower component' },
  ],
  wind: [
    { value: 'blade-leading-edge', label: 'Blade leading edge' },
    { value: 'blade-surface', label: 'Blade surface' },
    { value: 'nacelle-panel', label: 'Nacelle panel' },
  ],
  marine: [
    { value: 'topside-equipment', label: 'Topside equipment' },
    { value: 'sensor-window', label: 'Sensor / instrument window' },
    { value: 'external-cladding', label: 'External cladding' },
  ],
  industrial: [
    { value: 'filter-housing', label: 'Filter housing' },
    { value: 'duct-surface', label: 'Duct surface' },
    { value: 'process-window', label: 'Process window / cover' },
  ],
}

const constraintOptions = [
  { value: 'rf-transparency', label: 'RF transparency critical' },
  { value: 'low-downtime', label: 'Downtime must be minimized' },
  { value: 'harsh-weather', label: 'High weather severity' },
  { value: 'easy-cleaning', label: 'Low cleaning burden required' },
  { value: 'field-application', label: 'Field application required' },
]

const solutionCatalog = [
  {
    id: 'hydrophobic-rf',
    label: 'Hydrophobic transparency-preserving coating path',
    industries: ['telecom'],
    mechanisms: ['water-icing', 'contamination'],
    environments: ['cold-wet', 'general-outdoor'],
    substrates: ['polymer-composite', 'glass'],
    constraints: ['rf-transparency', 'low-downtime'],
    scoreBase: 72,
    rationale: [
      'Supports rapid shedding of water films that degrade exposed telecom assets.',
      'Maintains preference for transparency-critical surfaces where signal integrity matters.',
      'Best suited when uptime and weather resilience matter more than aggressive photocatalytic action.',
    ],
    cautions: ['Validate RF transparency on the final substrate and geometry.', 'Surface preparation and adhesion validation remain mandatory.'],
    evidence: [
      { type: 'Field', title: 'Weather exposure performance', text: 'Prioritize field evidence showing faster water release and lower persistent wetting on exposed assets.' },
      { type: 'Implementation', title: 'Transparency validation', text: 'Confirm transparency-critical behavior at the final operating frequency and radome configuration.' },
      { type: 'Scope', title: 'Harsh climate relevance', text: 'Use cold-wet and icing-relevant evidence first when prioritizing telecom availability.' },
    ],
    actions: ['technical-discussion', 'documentation-pack', 'sample-request'],
  },
  {
    id: 'easy-clean',
    label: 'Low-adhesion easy-clean contamination-control path',
    industries: ['industrial', 'marine', 'telecom'],
    mechanisms: ['contamination', 'uv-weathering'],
    environments: ['general-outdoor', 'marine-salt', 'desert-dust'],
    substrates: ['metal', 'glass', 'painted-surface', 'polymer-composite'],
    constraints: ['easy-cleaning', 'low-downtime'],
    scoreBase: 66,
    rationale: [
      'Optimized for reducing cleaning burden and contaminant retention.',
      'Useful where operational teams need faster maintenance cycles and clearer surface behavior.',
      'Well suited for general outdoor and industrial contamination scenarios.',
    ],
    cautions: ['Do not treat easy-clean performance as a substitute for substrate compatibility testing.'],
    evidence: [
      { type: 'Lab', title: 'Contamination-release tests', text: 'Show soiling reduction, wash-down behavior, and cleaning effort reduction.' },
      { type: 'Field', title: 'Maintenance interval evidence', text: 'Use operational evidence that links lower fouling to lower maintenance burden.' },
    ],
    actions: ['documentation-pack', 'sample-request', 'implementation-discussion'],
  },
  {
    id: 'abrasion-resistant',
    label: 'Abrasion-resistant protection path',
    industries: ['wind', 'industrial'],
    mechanisms: ['abrasion', 'uv-weathering'],
    environments: ['desert-dust', 'general-outdoor'],
    substrates: ['polymer-composite', 'metal', 'painted-surface'],
    constraints: ['harsh-weather', 'low-downtime'],
    scoreBase: 69,
    rationale: [
      'Prioritizes durability where particle impact and repeated exposure are primary failure drivers.',
      'Fits leading-edge and exposed surface scenarios where mechanical wear dominates.',
      'Supports longer maintenance intervals when the substrate and application route are validated.',
    ],
    cautions: ['Abrasion resistance claims should be read together with application method and repairability.'],
    evidence: [
      { type: 'Durability', title: 'Abrasion and exposure evidence', text: 'Prioritize controlled durability tests and field-aging signals relevant to abrasive environments.' },
      { type: 'Implementation', title: 'Application-route dependency', text: 'Performance is highly dependent on substrate preparation and application control.' },
    ],
    actions: ['technical-discussion', 'implementation-discussion', 'documentation-pack'],
  },
  {
    id: 'marine-durability',
    label: 'Marine durability and contamination-control path',
    industries: ['marine', 'industrial'],
    mechanisms: ['contamination', 'uv-weathering'],
    environments: ['marine-salt'],
    substrates: ['metal', 'glass', 'painted-surface'],
    constraints: ['harsh-weather', 'easy-cleaning'],
    scoreBase: 68,
    rationale: [
      'Designed for high-exposure salt and contamination environments.',
      'Useful when maintenance burden and persistent contamination both influence asset performance.',
      'Pairs contamination control with exposure-awareness rather than a single performance claim.',
    ],
    cautions: ['Corrosion and system-stack requirements must be reviewed separately from top-surface behavior.'],
    evidence: [
      { type: 'Field', title: 'Salt exposure relevance', text: 'Evidence should reflect marine contamination, weathering, and maintenance realities.' },
      { type: 'Scope', title: 'System boundary', text: 'Use top-coat evidence only within its actual protective scope and avoid over-claiming corrosion performance.' },
    ],
    actions: ['implementation-discussion', 'documentation-pack', 'sample-request'],
  },
]

const state = {
  industry: 'telecom',
  asset: 'radome',
  mechanism: 'water-icing',
  substrate: 'polymer-composite',
  environment: 'cold-wet',
  constraints: ['rf-transparency', 'low-downtime'],
  candidatePath: '',
  proofStatus: '',
  nextAction: '',
  bestFitScore: 0,
  shortlistedSolutions: [],
  cautionFlags: [],
}

const industrySelect = document.getElementById('industrySelect')
const assetSelect = document.getElementById('assetSelect')
const mechanismSelect = document.getElementById('mechanismSelect')
const substrateSelect = document.getElementById('substrateSelect')
const environmentSelect = document.getElementById('environmentSelect')
const constraintGrid = document.getElementById('constraintGrid')
const workspaceSummary = document.getElementById('workspaceSummary')
const explainSummary = document.getElementById('explainSummary')
const interventionSummary = document.getElementById('interventionSummary')
const primaryCaution = document.getElementById('primaryCaution')
const candidatePath = document.getElementById('candidatePath')
const proofStatus = document.getElementById('proofStatus')
const primaryActionLink = document.getElementById('primaryActionLink')
const sampleActionLink = document.getElementById('sampleActionLink')
const payloadPreview = document.getElementById('payloadPreview')
const bestFitScore = document.getElementById('bestFitScore')
const decisionConfidence = document.getElementById('decisionConfidence')
const fitShortlist = document.getElementById('fitShortlist')
const fitRationale = document.getElementById('fitRationale')
const cautionFlags = document.getElementById('cautionFlags')
const evidenceCards = document.getElementById('evidenceCards')
const proofEmphasis = document.getElementById('proofEmphasis')
const implementationNote = document.getElementById('implementationNote')
const limitationList = document.getElementById('limitationList')
const actionGrid = document.getElementById('actionGrid')

function deriveCandidatePath(currentState) {
  const top = currentState.shortlistedSolutions[0]
  return top ? top.label : 'General outdoor protective coating evaluation path'
}

function deriveProofStatus(currentState) {
  if (currentState.constraints.includes('rf-transparency')) {
    return 'Prioritize RF transparency proof, weather exposure evidence, and implementation limits'
  }

  if (currentState.mechanism === 'abrasion') {
    return 'Prioritize durability, abrasion, and maintenance-interval evidence'
  }

  return 'Prioritize mechanism-specific lab, field, and limitation evidence'
}

function deriveNextAction(currentState) {
  const top = currentState.shortlistedSolutions[0]
  if (!top) return 'Request documentation pack'

  if (top.actions.includes('technical-discussion')) return 'Request technical discussion'
  if (top.actions.includes('implementation-discussion')) return 'Request implementation discussion'
  if (top.actions.includes('sample-request')) return 'Request sample'
  return 'Request documentation pack'
}

function deriveExplainSummary(currentState) {
  if (currentState.mechanism === 'water-icing') {
    return 'Surface water retention and freezing can degrade performance, increase maintenance burden, and compromise availability in exposed assets.'
  }

  if (currentState.mechanism === 'abrasion') {
    return 'Particle impact and repeated exposure can remove performance-critical surface function and shorten maintenance intervals.'
  }

  if (currentState.mechanism === 'contamination') {
    return 'Contamination changes surface behavior over time and increases cleaning burden, inspection frequency, and performance risk.'
  }

  return 'Long-term outdoor exposure can degrade surface function, appearance, and protection unless the intervention path is matched correctly.'
}

function deriveInterventionSummary(currentState) {
  if (currentState.mechanism === 'water-icing') {
    return 'Favour low-retention surface behavior that reduces persistent wetting and encourages faster shedding.'
  }

  if (currentState.mechanism === 'abrasion') {
    return 'Favour durability-led surface protection with exposure-aware application and maintenance planning.'
  }

  if (currentState.mechanism === 'contamination') {
    return 'Favour low-adhesion and easy-clean behavior supported by contamination-release evidence.'
  }

  return 'Favour the coating path whose mechanism, substrate fit, and exposure profile align with the actual asset condition.'
}

function scoreSolution(solution, currentState) {
  let score = solution.scoreBase
  if (solution.industries.includes(currentState.industry)) score += 10
  if (solution.mechanisms.includes(currentState.mechanism)) score += 10
  if (solution.environments.includes(currentState.environment)) score += 8
  if (solution.substrates.includes(currentState.substrate)) score += 6

  currentState.constraints.forEach((constraint) => {
    if (solution.constraints.includes(constraint)) score += 4
  })

  if (currentState.constraints.includes('rf-transparency') && !solution.constraints.includes('rf-transparency')) {
    score -= 12
  }

  if (currentState.environment === 'marine-salt' && solution.id === 'hydrophobic-rf') {
    score -= 6
  }

  return Math.max(score, 0)
}

function computeShortlist(currentState) {
  return solutionCatalog
    .map((solution) => ({ ...solution, score: scoreSolution(solution, currentState) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
}

function deriveCautionFlags(currentState) {
  const flags = []

  if (currentState.constraints.includes('rf-transparency')) {
    flags.push('Validate transparency-critical performance on final geometry.')
  }

  if (currentState.constraints.includes('field-application')) {
    flags.push('Field application increases dependency on preparation and process control.')
  }

  if (currentState.environment === 'marine-salt') {
    flags.push('Keep corrosion/system-stack scope separate from surface-behavior claims.')
  }

  if (currentState.mechanism === 'abrasion') {
    flags.push('Use abrasion evidence and repairability guidance together.')
  }

  return flags
}

function getPayload(currentState) {
  return {
    industry: currentState.industry,
    asset: currentState.asset,
    mechanism: currentState.mechanism,
    substrate: currentState.substrate,
    environment: currentState.environment,
    constraints: currentState.constraints,
    candidatePath: currentState.candidatePath,
    nextAction: currentState.nextAction,
    bestFitScore: currentState.bestFitScore,
  }
}

function buildActionUrl(actionType, currentState) {
  const payload = new URLSearchParams({
    intent: actionType,
    industry: currentState.industry,
    asset: currentState.asset,
    mechanism: currentState.mechanism,
    substrate: currentState.substrate,
    environment: currentState.environment,
    candidatePath: currentState.candidatePath,
    score: String(currentState.bestFitScore),
  })

  currentState.constraints.forEach((constraint) => payload.append('constraint', constraint))

  if (actionType === 'documentation-pack') {
    return `../proof.html?${payload.toString()}`
  }

  return `../contact.html?${payload.toString()}`
}

function renderSelect(selectElement, options, selectedValue) {
  selectElement.innerHTML = options
    .map((option) => `<option value="${option.value}" ${option.value === selectedValue ? 'selected' : ''}>${option.label}</option>`)
    .join('')
}

function renderConstraints() {
  constraintGrid.innerHTML = constraintOptions
    .map((option) => {
      const checked = state.constraints.includes(option.value) ? 'checked' : ''
      return `
        <label class="checkbox-card">
          <input type="checkbox" value="${option.value}" ${checked} />
          <span>${option.label}</span>
        </label>
      `
    })
    .join('')

  constraintGrid.querySelectorAll('input[type="checkbox"]').forEach((input) => {
    input.addEventListener('change', (event) => {
      const value = event.target.value
      if (event.target.checked) {
        if (!state.constraints.includes(value)) state.constraints.push(value)
      } else {
        state.constraints = state.constraints.filter((item) => item !== value)
      }
      syncDerivedFields()
      render()
    })
  })
}

function renderWorkspace() {
  workspaceSummary.innerHTML = [
    ['Industry', state.industry],
    ['Asset', state.asset],
    ['Mechanism', state.mechanism],
    ['Substrate', state.substrate],
    ['Environment', state.environment],
    ['Candidate path', state.candidatePath],
    ['Best-fit score', `${state.bestFitScore}/100`],
    ['Next action', state.nextAction],
  ]
    .map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`)
    .join('')
}

function renderFitShortlist() {
  fitShortlist.innerHTML = state.shortlistedSolutions
    .map((solution, index) => `
      <article class="stack-card">
        <div class="stack-head">
          <div>
            <p class="mini-label">Option ${index + 1}</p>
            <h3>${solution.label}</h3>
          </div>
          <span class="score-chip">${solution.score}/100</span>
        </div>
        <p class="note-text">${solution.rationale[0]}</p>
      </article>
    `)
    .join('')

  const top = state.shortlistedSolutions[0]
  fitRationale.innerHTML = top
    ? top.rationale.map((item) => `<div class="stack-card compact-card"><p class="note-text">${item}</p></div>`).join('')
    : '<div class="stack-card compact-card"><p class="note-text">No shortlist available.</p></div>'

  cautionFlags.innerHTML = state.cautionFlags.map((flag) => `<span class="info-tag caution-tag">${flag}</span>`).join('')
}

function renderProof() {
  const top = state.shortlistedSolutions[0]
  if (!top) {
    evidenceCards.innerHTML = '<div class="stack-card compact-card"><p class="note-text">No evidence stack available.</p></div>'
    limitationList.innerHTML = ''
    return
  }

  evidenceCards.innerHTML = top.evidence
    .map((item) => `
      <article class="stack-card">
        <div class="stack-head">
          <p class="mini-label">${item.type}</p>
        </div>
        <h3>${item.title}</h3>
        <p class="note-text">${item.text}</p>
      </article>
    `)
    .join('')

  proofEmphasis.textContent = state.proofStatus
  implementationNote.textContent = top.cautions[0] || 'Validate substrate compatibility and implementation route before commitment.'
  limitationList.innerHTML = top.cautions
    .map((item) => `<div class="stack-card compact-card"><p class="note-text">${item}</p></div>`)
    .join('')
}

function renderActions() {
  const top = state.shortlistedSolutions[0]
  const actions = [
    {
      type: 'technical-discussion',
      title: 'Technical discussion',
      body: 'Use this path when validation, constraints, or performance assumptions need technical review.',
    },
    {
      type: 'sample-request',
      title: 'Sample request',
      body: 'Use this path when the next step is surface-level evaluation or controlled pilot sampling.',
    },
    {
      type: 'documentation-pack',
      title: 'Documentation pack',
      body: 'Use this path when stakeholders need proof, standards, and decision-support material.',
    },
    {
      type: 'implementation-discussion',
      title: 'Implementation discussion',
      body: 'Use this path when application method, rollout model, or field process needs planning.',
    },
  ]

  actionGrid.innerHTML = actions
    .map((action) => {
      const enabled = top && top.actions.includes(action.type)
      const href = enabled ? buildActionUrl(action.type, state) : '#'
      return `
        <article class="action-card ${enabled ? '' : 'action-card-muted'}">
          <div class="panel-head">
            <h3>${action.title}</h3>
            <span class="panel-tag">${enabled ? 'Recommended' : 'Secondary'}</span>
          </div>
          <p class="note-text">${action.body}</p>
          <a class="button-link ${enabled ? '' : 'button-disabled'}" ${enabled ? `href="${href}"` : 'href="#" aria-disabled="true"'}>${enabled ? 'Open route' : 'Not primary'}</a>
        </article>
      `
    })
    .join('')

  primaryActionLink.textContent = state.nextAction
  primaryActionLink.href = buildActionUrl((top && top.actions[0]) || 'documentation-pack', state)
  sampleActionLink.href = buildActionUrl('sample-request', state)
}

function syncDerivedFields() {
  state.shortlistedSolutions = computeShortlist(state)
  state.bestFitScore = state.shortlistedSolutions[0] ? state.shortlistedSolutions[0].score : 0
  state.cautionFlags = deriveCautionFlags(state)
  state.candidatePath = deriveCandidatePath(state)
  state.proofStatus = deriveProofStatus(state)
  state.nextAction = deriveNextAction(state)
}

function render() {
  renderSelect(industrySelect, industryOptions, state.industry)
  renderSelect(assetSelect, assetOptionsByIndustry[state.industry], state.asset)
  renderSelect(mechanismSelect, mechanismOptions, state.mechanism)
  renderSelect(substrateSelect, substrateOptions, state.substrate)
  renderSelect(environmentSelect, environmentOptions, state.environment)
  renderConstraints()
  renderWorkspace()
  renderFitShortlist()
  renderProof()
  renderActions()

  explainSummary.textContent = deriveExplainSummary(state)
  interventionSummary.textContent = deriveInterventionSummary(state)
  primaryCaution.textContent = state.cautionFlags[0] || 'No elevated caution flags for the current scenario.'
  candidatePath.textContent = state.candidatePath
  proofStatus.textContent = state.proofStatus
  payloadPreview.textContent = JSON.stringify(getPayload(state), null, 2)
  bestFitScore.textContent = `${state.bestFitScore}/100`
  decisionConfidence.textContent = state.bestFitScore >= 85 ? 'High' : state.bestFitScore >= 72 ? 'Moderate' : 'Needs review'
}

industrySelect.addEventListener('change', (event) => {
  state.industry = event.target.value
  state.asset = assetOptionsByIndustry[state.industry][0].value
  syncDerivedFields()
  render()
})

assetSelect.addEventListener('change', (event) => {
  state.asset = event.target.value
  syncDerivedFields()
  render()
})

mechanismSelect.addEventListener('change', (event) => {
  state.mechanism = event.target.value
  syncDerivedFields()
  render()
})

substrateSelect.addEventListener('change', (event) => {
  state.substrate = event.target.value
  syncDerivedFields()
  render()
})

environmentSelect.addEventListener('change', (event) => {
  state.environment = event.target.value
  syncDerivedFields()
  render()
})

syncDerivedFields()
render()
