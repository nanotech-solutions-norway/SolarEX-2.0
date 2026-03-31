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
}

const industrySelect = document.getElementById('industrySelect')
const assetSelect = document.getElementById('assetSelect')
const mechanismSelect = document.getElementById('mechanismSelect')
const substrateSelect = document.getElementById('substrateSelect')
const environmentSelect = document.getElementById('environmentSelect')
const constraintGrid = document.getElementById('constraintGrid')
const workspaceSummary = document.getElementById('workspaceSummary')
const explainSummary = document.getElementById('explainSummary')
const candidatePath = document.getElementById('candidatePath')
const proofStatus = document.getElementById('proofStatus')
const primaryActionButton = document.getElementById('primaryActionButton')
const payloadPreview = document.getElementById('payloadPreview')

function deriveCandidatePath(currentState) {
  if (currentState.industry === 'telecom' && currentState.mechanism === 'water-icing') {
    return 'Hydrophobic transparency-preserving protective coating path'
  }

  if (currentState.industry === 'wind' && currentState.mechanism === 'abrasion') {
    return 'Abrasion-resistant leading-edge protection path'
  }

  if (currentState.environment === 'marine-salt') {
    return 'Marine durability and contamination-control coating path'
  }

  if (currentState.mechanism === 'contamination') {
    return 'Low-adhesion, easy-clean contamination-control coating path'
  }

  return 'General outdoor protective coating evaluation path'
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
  if (currentState.constraints.includes('field-application')) {
    return 'Request implementation discussion'
  }

  if (currentState.constraints.includes('rf-transparency')) {
    return 'Request technical discussion'
  }

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
  }
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
    ['Proof state', state.proofStatus],
    ['Next action', state.nextAction],
  ]
    .map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`)
    .join('')
}

function syncDerivedFields() {
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

  explainSummary.textContent = deriveExplainSummary(state)
  candidatePath.textContent = state.candidatePath
  proofStatus.textContent = state.proofStatus
  primaryActionButton.textContent = state.nextAction
  payloadPreview.textContent = JSON.stringify(getPayload(state), null, 2)
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
