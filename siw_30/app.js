const STORAGE_KEY = "siw_workspace_v30";

const OPTIONS = {
  coatingTypes: [
    ["anti-icing", "Anti-icing route"],
    ["barrier", "Barrier / anti-corrosion"],
    ["self-cleaning", "Self-cleaning route"],
    ["antimicrobial", "Antimicrobial route"],
  ],
  environments: [
    ["coastal", "Coastal / marine-adjacent"],
    ["outdoor", "Outdoor exposed"],
    ["industrial", "Industrial / utility"],
    ["clinical", "Clinical / controlled indoor"],
    ["desert", "Dry / abrasive dust"],
  ],
  temperatureRanges: [
    ["subzero", "Sub-zero / freeze risk"],
    ["cold", "Cold / seasonal exposure"],
    ["temperate", "Temperate / mixed conditions"],
    ["hot", "High-temperature / solar load"],
  ],
  assets: [
    ["radome", "Radome / antenna"],
    ["blade", "Wind blade"],
    ["steel", "Steel structure"],
    ["glass", "Glass / solar module"],
    ["touchpoint", "High-touch interior surface"],
  ],
  challenges: [
    ["icing", "Ice buildup"],
    ["corrosion", "Corrosion"],
    ["soiling", "Dust / organic soiling"],
    ["microbial", "Microbial load"],
  ],
  conditions: [
    "High uptime requirement",
    "Inspection visibility",
    "Low cleaning budget",
    "High-touch use",
    "Severe weather",
    "Organic contamination",
  ],
};

const ROUTES = [
  {
    id: "hirec-route",
    label: "HIREC® Ice-Shedding Route",
    coatingType: "anti-icing",
    environments: ["coastal", "outdoor"],
    temperatures: ["subzero", "cold"],
    assets: ["radome", "blade"],
    challenges: ["icing"],
    summary: "Passive anti-icing route for exposed telecom and wind assets where rapid shedding and uptime continuity dominate.",
    rationale: [
      "Strongest fit when ice adhesion and wet-weather operational loss are the core business problem.",
      "Most aligned to exposed polymer/composite surfaces in cold-weather uptime-sensitive deployments.",
    ],
    validation: [
      "Operational fit verified for ice-shedding-led scenarios.",
      "Boundary review required for non-corrosion-first positioning.",
      "Commercial route suitable for sample or technical review.",
    ],
    notes: [
      "Use when the buyer wants a water-shedding / anti-icing logic rather than a heavy barrier system.",
      "Best where severe weather and operational continuity matter more than deep corrosion mitigation.",
      "Validate substrate preparation and local winter severity before rollout.",
    ],
    actions: [
      ["Request sample", "./handoff.html?intent=sample-request&solution=HIREC-v3"],
      ["Continue review", "./proof.html"],
      ["Contact expert", "./handoff.html?intent=technical-consult&solution=HIREC-v3"],
    ],
    scores: { primary: 92, durability: 78, cleanability: 71 },
    proof: 81,
    lifecycle: 76,
    efficiency: 88,
    curve: [62, 74, 88],
    boundary: "Not the preferred route when the buyer's primary need is long-life structural corrosion barrier performance.",
    mechanismTitle: "Ice shedding mechanism",
    mechanismTags: ["Low adhesion", "Rapid detachment"],
  },
  {
    id: "gentoo-route",
    label: "Gentoo™ Barrier Route",
    coatingType: "barrier",
    environments: ["coastal", "industrial", "outdoor"],
    temperatures: ["cold", "temperate", "hot"],
    assets: ["steel", "radome"],
    challenges: ["corrosion"],
    summary: "Transparent/low-build corrosion barrier route for inspection-friendly metal protection in coastal and industrial exposure.",
    rationale: [
      "Best when inspection visibility and corrosion reduction must coexist in the same route.",
      "More defensible than an anti-icing pathway when the true buying driver is long-term surface durability.",
    ],
    validation: [
      "Barrier suitability identified.",
      "Lifecycle value favorable for infrastructure exposure.",
      "Inspection-first logic preserved.",
    ],
    notes: [
      "Use for corrosion-led selection logic, not as a generic anti-icing substitute.",
      "Works best when transparency, easier inspection, and durability all matter.",
      "Validate environmental chemistry and lifecycle expectations before RFQ stage.",
    ],
    actions: [
      ["Request corrosion review", "./handoff.html?intent=technical-consult&solution=Gentoo-v3"],
      ["Continue review", "./proof.html"],
      ["Contact expert", "./handoff.html?intent=rfq-request&solution=Gentoo-v3"],
    ],
    scores: { primary: 86, durability: 92, cleanability: 66 },
    proof: 78,
    lifecycle: 90,
    efficiency: 72,
    curve: [78, 90, 72],
    boundary: "Not the preferred route when ice-shedding or self-cleaning mechanism is the actual business need.",
    mechanismTitle: "Barrier integrity mechanism",
    mechanismTags: ["Surface barrier", "Inspection visibility"],
  },
  {
    id: "solarex-route",
    label: "SolarEX™ Self-Cleaning Route",
    coatingType: "self-cleaning",
    environments: ["desert", "outdoor", "industrial"],
    temperatures: ["temperate", "hot"],
    assets: ["glass"],
    challenges: ["soiling"],
    summary: "Self-cleaning / anti-soiling route for glass and PV surfaces where contamination retention and maintenance burden drive losses.",
    rationale: [
      "Best fit where organic contamination or soiling reduction is tied to performance or appearance retention.",
      "More defensible than barrier routes when the core business problem is cleaning frequency and retained contamination.",
    ],
    validation: [
      "Cleaning-reduction logic identified.",
      "Surface compatibility favorable for glass-led assets.",
      "Proof route requires contamination-profile confirmation.",
    ],
    notes: [
      "Use when the buyer wants fewer cleaning cycles and cleaner optical surfaces rather than structural barrier protection.",
      "Differentiate hydrophobic and photocatalytic logic during review.",
      "Validate contamination chemistry and regional dust/organic load before selection finalization.",
    ],
    actions: [
      ["Request sample", "./handoff.html?intent=sample-request&solution=SolarEX-v3"],
      ["Continue review", "./proof.html"],
      ["Contact expert", "./handoff.html?intent=technical-consult&solution=SolarEX-v3"],
    ],
    scores: { primary: 83, durability: 74, cleanability: 93 },
    proof: 80,
    lifecycle: 79,
    efficiency: 91,
    curve: [80, 79, 91],
    boundary: "Not the preferred route when the true selection logic is corrosion-barrier lifetime or anti-icing uptime protection.",
    mechanismTitle: "Self-cleaning mechanism",
    mechanismTags: ["Contaminant release", "Reduced wash cycles"],
  },
  {
    id: "pcs-route",
    label: "PCS Antimicrobial Route",
    coatingType: "antimicrobial",
    environments: ["clinical", "industrial"],
    temperatures: ["temperate", "hot"],
    assets: ["touchpoint"],
    challenges: ["microbial"],
    summary: "Requirement-driven antimicrobial route for high-touch indoor surfaces where efficacy proof and governance-ready explanation matter.",
    rationale: [
      "Best fit when the buyer needs a standards-conscious antimicrobial route for indoor touch surfaces.",
      "More defensible than generic easy-clean coatings when microbial burden is the explicit review driver.",
    ],
    validation: [
      "Evidence-led route identified.",
      "Boundary transparency required for non-enveloped-virus limitations.",
      "Technical review should precede broad commercial scaling.",
    ],
    notes: [
      "Use where efficacy proof and boundary clarity are both required.",
      "Keep non-floor and virus-boundary positioning explicit.",
      "Validate cleaning regime and surface class before recommendation close-out.",
    ],
    actions: [
      ["Request technical review", "./handoff.html?intent=technical-consult&solution=PCS-v3"],
      ["Continue review", "./proof.html"],
      ["Contact expert", "./handoff.html?intent=rfq-request&solution=PCS-v3"],
    ],
    scores: { primary: 89, durability: 71, cleanability: 82 },
    proof: 94,
    lifecycle: 70,
    efficiency: 80,
    curve: [94, 70, 80],
    boundary: "Do not generalize this route into floor-grade durability or universal virucidal claims without direct evidence support.",
    mechanismTitle: "Antimicrobial persistence mechanism",
    mechanismTags: ["High-touch control", "Evidence-linked"],
  },
];

const DEFAULT_STATE = {
  coatingType: "",
  environment: "",
  temperatureRange: "",
  asset: "",
  challenge: "",
  conditions: [],
  acknowledgedBoundary: false,
};

const els = {
  coatingTypeSelect: document.getElementById("coatingTypeSelect"),
  environmentSelect: document.getElementById("environmentSelect"),
  temperatureRangeSelect: document.getElementById("temperatureRangeSelect"),
  assetSelect: document.getElementById("assetSelect"),
  challengeSelect: document.getElementById("challengeSelect"),
  conditionChips: document.getElementById("conditionChips"),
  scenarioSummary: document.getElementById("scenarioSummary"),
  comparisonHeaderChips: document.getElementById("comparisonHeaderChips"),
  routeTags: document.getElementById("routeTags"),
  matrixRouteAName: document.getElementById("matrixRouteAName"),
  matrixRouteBName: document.getElementById("matrixRouteBName"),
  matrixRouteCName: document.getElementById("matrixRouteCName"),
  performanceMatrix: document.getElementById("performanceMatrix"),
  mechanismTitle: document.getElementById("mechanismTitle"),
  mechanismLabelA: document.getElementById("mechanismLabelA"),
  mechanismLabelB: document.getElementById("mechanismLabelB"),
  tradeoffChart: document.getElementById("tradeoffChart"),
  validationSummaryList: document.getElementById("validationSummaryList"),
  evaluationNotesList: document.getElementById("evaluationNotesList"),
  actionButtons: document.getElementById("actionButtons"),
  saveWorkspaceButton: document.getElementById("saveWorkspaceButton"),
  resetWorkspaceButton: document.getElementById("resetWorkspaceButton"),
  exportPacketButton: document.getElementById("exportPacketButton"),
  routeDrawer: document.getElementById("routeDrawer"),
  drawerBackdrop: document.getElementById("drawerBackdrop"),
  drawerTitle: document.getElementById("drawerTitle"),
  drawerSummary: document.getElementById("drawerSummary"),
  drawerMetrics: document.getElementById("drawerMetrics"),
  drawerSections: document.getElementById("drawerSections"),
  drawerActions: document.getElementById("drawerActions"),
  closeDrawerButton: document.getElementById("closeDrawerButton"),
};

let state = loadState();

function optionMarkup(options, selected, placeholder) {
  return [`<option value="">${placeholder}</option>`]
    .concat(options.map(([value, label]) => `<option value="${value}" ${selected === value ? "selected" : ""}>${label}</option>`))
    .join("");
}

function labelFor(options, value) {
  const hit = options.find(([id]) => id === value);
  return hit ? hit[1] : "";
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch (error) {}
  return { ...DEFAULT_STATE };
}

function persistState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {}
}

function completeScenario() {
  return Boolean(state.coatingType && state.environment && state.temperatureRange && state.asset && state.challenge);
}

function renderControls() {
  els.coatingTypeSelect.innerHTML = optionMarkup(OPTIONS.coatingTypes, state.coatingType, "Select coating type");
  els.environmentSelect.innerHTML = optionMarkup(OPTIONS.environments, state.environment, "Select environment");
  els.temperatureRangeSelect.innerHTML = optionMarkup(OPTIONS.temperatureRanges, state.temperatureRange, "Select temperature range");
  els.assetSelect.innerHTML = optionMarkup(OPTIONS.assets, state.asset, "Select asset");
  els.challengeSelect.innerHTML = optionMarkup(OPTIONS.challenges, state.challenge, "Select challenge");

  els.conditionChips.innerHTML = OPTIONS.conditions
    .map(
      (condition) => `<button class="chip-button ${state.conditions.includes(condition) ? "is-active" : ""}" type="button" data-condition="${condition}">${condition}</button>`
    )
    .join("");
}

function routeScore(route) {
  let score = 40;
  if (route.coatingType === state.coatingType) score += 24;
  if (route.environments.includes(state.environment)) score += 16;
  if (route.temperatures.includes(state.temperatureRange)) score += 12;
  if (route.assets.includes(state.asset)) score += 14;
  if (route.challenges.includes(state.challenge)) score += 18;
  if (state.conditions.includes("High uptime requirement") && route.id === "hirec-route") score += 8;
  if (state.conditions.includes("Inspection visibility") && route.id === "gentoo-route") score += 7;
  if (state.conditions.includes("Low cleaning budget") && route.id === "solarex-route") score += 7;
  if (state.conditions.includes("High-touch use") && route.id === "pcs-route") score += 7;
  if (state.conditions.includes("Organic contamination") && route.id === "solarex-route") score += 6;
  if (state.conditions.includes("Severe weather") && (route.id === "hirec-route" || route.id === "gentoo-route")) score += 5;
  return Math.min(score, 99);
}

function rankedRoutes() {
  return ROUTES.map((route) => ({ ...route, score: routeScore(route) })).sort((a, b) => b.score - a.score).slice(0, 3);
}

function criterionRows(routes) {
  const mode = state.challenge;
  const criterionSet = {
    icing: [
      ["Ice shedding", (r) => r.scores.primary],
      ["Durability", (r) => r.scores.durability],
      ["Service continuity", (r) => r.score],
    ],
    corrosion: [
      ["Barrier integrity", (r) => r.scores.primary],
      ["Lifecycle durability", (r) => r.scores.durability],
      ["Inspection usability", (r) => r.lifecycle],
    ],
    soiling: [
      ["Cleanability", (r) => r.scores.cleanability],
      ["Proof strength", (r) => r.proof],
      ["Lifecycle efficiency", (r) => r.efficiency],
    ],
    microbial: [
      ["Evidence strength", (r) => r.proof],
      ["Operational fit", (r) => r.scores.primary],
      ["Lifecycle practicality", (r) => r.lifecycle],
    ],
  };
  return criterionSet[mode] || criterionSet.icing;
}

function renderMatrix(routes) {
  const rows = criterionRows(routes);
  const names = routes.map((route) => route?.label || "-");
  els.matrixRouteAName.textContent = names[0] || "Route A";
  els.matrixRouteBName.textContent = names[1] || "Route B";
  els.matrixRouteCName.textContent = names[2] || "Route C";

  els.performanceMatrix.innerHTML = rows
    .map(([label, getter]) => {
      const values = routes.map((route) => (route ? getter(route) : 0));
      const max = Math.max(...values);
      const cells = routes
        .map((route, index) => {
          if (!route) {
            return `<div class="metric-cell"><div class="metric-bar"><span style="width:0%"></span></div><div class="metric-value">-</div></div>`;
          }
          const value = values[index];
          return `
            <div class="metric-cell">
              <div class="metric-bar"><span style="width:${value}%"></span></div>
              <div class="metric-value">${value}% ${value === max ? '<span class="best-badge">Best</span>' : ''}</div>
            </div>
          `;
        })
        .join("");
      return `<div class="matrix-row row-grid"><span>${label}</span>${cells}</div>`;
    })
    .join("");
}

function renderHeader(routes) {
  const chips = [
    state.coatingType ? `<span class="route-tag is-active">${labelFor(OPTIONS.coatingTypes, state.coatingType)}</span>` : "",
    state.environment ? `<span class="route-tag">${labelFor(OPTIONS.environments, state.environment)}</span>` : "",
    state.temperatureRange ? `<span class="route-tag">${labelFor(OPTIONS.temperatureRanges, state.temperatureRange)}</span>` : "",
    state.asset ? `<span class="route-tag">${labelFor(OPTIONS.assets, state.asset)}</span>` : "",
    state.challenge ? `<span class="route-tag">${labelFor(OPTIONS.challenges, state.challenge)}</span>` : "",
  ].filter(Boolean);
  els.comparisonHeaderChips.innerHTML = chips.join("");
  els.routeTags.innerHTML = routes.map((route, index) => `<button class="route-tag ${index === 0 ? 'is-active' : ''}" type="button" data-open-route="${route.id}">${route.label}</button>`).join("");
}

function renderScenarioSummary(routes) {
  if (!completeScenario()) {
    els.scenarioSummary.textContent = "Complete the scenario to activate route comparison.";
    return;
  }
  const lead = routes[0];
  els.scenarioSummary.textContent = `${labelFor(OPTIONS.coatingTypes, state.coatingType)} selected for ${labelFor(OPTIONS.assets, state.asset)} in ${labelFor(OPTIONS.environments, state.environment)} conditions. Current lead: ${lead.label}.`;
}

function renderMechanism(routes) {
  const lead = routes[0];
  if (!lead) return;
  els.mechanismTitle.textContent = lead.mechanismTitle;
  els.mechanismLabelA.textContent = lead.mechanismTags[0];
  els.mechanismLabelB.textContent = lead.mechanismTags[1];
}

function renderTradeoffChart(routes) {
  const nodes = routes.map((route, index) => {
    const x = 70 + index * 120;
    const y = 230 - Math.round(((route.proof + route.efficiency) / 2) * 1.6);
    return { x, y, route };
  });
  const line = nodes.map((node) => `${node.x},${node.y}`).join(" ");
  els.tradeoffChart.innerHTML = `
    <svg class="chart-svg" viewBox="0 0 420 300" role="img" aria-label="Proof vs lifecycle efficiency chart">
      <line x1="54" y1="26" x2="54" y2="258" stroke="rgba(255,255,255,0.18)" stroke-width="1"></line>
      <line x1="54" y1="258" x2="388" y2="258" stroke="rgba(255,255,255,0.18)" stroke-width="1"></line>
      <text x="20" y="30" class="chart-label">High</text>
      <text x="12" y="258" class="chart-muted">Low</text>
      <text x="306" y="286" class="chart-label">Cost efficiency</text>
      <polyline class="chart-line" points="${line}"></polyline>
      ${nodes.map((node) => `<circle class="chart-point" cx="${node.x}" cy="${node.y}" r="9"></circle><text x="${node.x - 24}" y="${node.y - 14}" class="chart-label">${node.route.label.replace(' Route','')}</text>`).join("")}
    </svg>
  `;
}

function renderValidation(routes) {
  const lead = routes[0];
  const items = [
    { label: "Scenario captured", body: completeScenario() ? "Minimum scenario completed." : "Pending scenario fields.", type: completeScenario() ? "success" : "warning" },
    { label: "Best-fit route identified", body: lead ? `${lead.label} is leading.` : "No active route.", type: lead ? "success" : "warning" },
    { label: "Proof coverage reviewed", body: lead ? `Lead proof score ${lead.proof}%.` : "Awaiting route.", type: lead && lead.proof >= 80 ? "success" : "warning" },
    { label: "Boundary acknowledged", body: state.acknowledgedBoundary ? "Boundary conditions acknowledged." : "Boundary review still recommended.", type: state.acknowledgedBoundary ? "success" : "warning" },
  ];
  els.validationSummaryList.innerHTML = items.map((item) => `<div class="status-item"><span class="status-icon ${item.type}">${item.type === 'success' ? '✓' : '!'}</span><span class="status-copy"><strong>${item.label}</strong><span>${item.body}</span></span></div>`).join("");
}

function renderNotes(routes) {
  const lead = routes[0];
  const notes = lead ? lead.notes : ["Complete the scenario to generate route notes."];
  els.evaluationNotesList.innerHTML = notes.map((note, index) => `<div class="status-item"><span class="status-icon ${index === 0 ? 'success' : 'warning'}">${index === 0 ? '✓' : '•'}</span><span class="status-copy"><strong>${index === 0 ? 'Lead note' : 'Review note'}</strong><span>${note}</span></span></div>`).join("");
}

function renderActions(routes) {
  const lead = routes[0];
  const actions = lead ? lead.actions : [["Request review", "./handoff.html?intent=technical-consult&solution=SIW-v3"], ["Continue review", "./proof.html"], ["Contact expert", "./handoff.html?intent=technical-consult&solution=SIW-v3"]];
  els.actionButtons.innerHTML = actions.map((action, index) => `<a class="action-button" href="${action[1]}"><span class="action-icon">${index + 1}</span><span class="action-copy"><strong>${action[0]}</strong><span>${lead ? lead.label : 'SIW v3.0 route'}</span></span></a>`).join("");
}

function openDrawer(route) {
  els.drawerTitle.textContent = route.label;
  els.drawerSummary.textContent = route.summary;
  els.drawerMetrics.innerHTML = [
    `<span class="metric-pill">Fit ${route.score}%</span>`,
    `<span class="metric-pill">Proof ${route.proof}%</span>`,
    `<span class="metric-pill">Lifecycle ${route.lifecycle}%</span>`,
    `<span class="metric-pill">Efficiency ${route.efficiency}%</span>`,
  ].join("");
  els.drawerSections.innerHTML = [
    `<div class="drawer-block"><div><h3>Why it leads</h3><p>${route.rationale[0]}</p></div></div>`,
    `<div class="drawer-block"><div><h3>Boundary</h3><p>${route.boundary}</p></div></div>`,
    `<div class="drawer-block"><div><h3>Operational notes</h3><p>${route.notes.join(' ')}</p></div></div>`,
  ].join("");
  els.drawerActions.innerHTML = route.actions.map((action, index) => `<a class="action-button" href="${action[1]}"><span class="action-icon">${index + 1}</span><span class="action-copy"><strong>${action[0]}</strong><span>${route.label}</span></span></a>`).join("");
  els.routeDrawer.classList.add("is-open");
  els.routeDrawer.setAttribute("aria-hidden", "false");
  els.drawerBackdrop.hidden = false;
  state.acknowledgedBoundary = true;
  persistState();
}

function closeDrawer() {
  els.routeDrawer.classList.remove("is-open");
  els.routeDrawer.setAttribute("aria-hidden", "true");
  els.drawerBackdrop.hidden = true;
}

function exportPacket(routes) {
  const payload = {
    version: "3.0",
    path: "/siw_30/",
    scenario: state,
    rankedRoutes: routes.map((route) => ({ id: route.id, label: route.label, score: route.score, proof: route.proof, lifecycle: route.lifecycle, efficiency: route.efficiency })),
  };
  if (navigator.clipboard?.writeText) navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
  window.alert("SIW v3.0 review packet copied to clipboard.");
}

function render() {
  renderControls();
  const routes = rankedRoutes();
  renderHeader(routes);
  renderMatrix(routes);
  renderScenarioSummary(routes);
  renderMechanism(routes);
  renderTradeoffChart(routes);
  renderValidation(routes);
  renderNotes(routes);
  renderActions(routes);
  persistState();
}

function bindEvents() {
  els.coatingTypeSelect.addEventListener("change", (event) => { state.coatingType = event.target.value; render(); });
  els.environmentSelect.addEventListener("change", (event) => { state.environment = event.target.value; render(); });
  els.temperatureRangeSelect.addEventListener("change", (event) => { state.temperatureRange = event.target.value; render(); });
  els.assetSelect.addEventListener("change", (event) => { state.asset = event.target.value; render(); });
  els.challengeSelect.addEventListener("change", (event) => { state.challenge = event.target.value; render(); });

  document.addEventListener("click", (event) => {
    const conditionBtn = event.target.closest("[data-condition]");
    if (conditionBtn) {
      const value = conditionBtn.dataset.condition;
      state.conditions = state.conditions.includes(value) ? state.conditions.filter((item) => item !== value) : state.conditions.concat(value);
      render();
      return;
    }
    const routeBtn = event.target.closest("[data-open-route]");
    if (routeBtn) {
      const route = rankedRoutes().find((item) => item.id === routeBtn.dataset.openRoute);
      if (route) openDrawer(route);
      return;
    }
  });

  els.saveWorkspaceButton.addEventListener("click", () => { persistState(); window.alert("SIW v3.0 workspace saved."); });
  els.resetWorkspaceButton.addEventListener("click", () => { state = { ...DEFAULT_STATE }; render(); });
  els.exportPacketButton.addEventListener("click", () => exportPacket(rankedRoutes()));
  els.closeDrawerButton.addEventListener("click", closeDrawer);
  els.drawerBackdrop.addEventListener("click", closeDrawer);
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeDrawer(); });
}

bindEvents();
render();
