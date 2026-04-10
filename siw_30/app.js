const STORAGE_KEY = "siw_workspace_v31";

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
    contactAngle: 112,
    wettingProfile: "Hydrophobic / low ice adhesion",
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
    contactAngle: 94,
    wettingProfile: "Moderate water-shedding, barrier-led route",
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
    contactAngle: 118,
    wettingProfile: "Strong bead-and-release wetting profile",
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
    contactAngle: 82,
    wettingProfile: "Wetting control is secondary to efficacy proof",
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

function clamp(value, min = 0, max = 99) {
  return Math.min(max, Math.max(min, value));
}

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

function primaryAttributeLabel() {
  const mode = state.challenge;
  if (mode === "corrosion") return "Barrier integrity";
  if (mode === "soiling") return "Cleanability";
  if (mode === "microbial") return "Evidence strength";
  return "Ice shedding";
}

function primaryAttributeValue(route) {
  const mode = state.challenge;
  if (mode === "corrosion") return route.scores.durability;
  if (mode === "soiling") return route.scores.cleanability;
  if (mode === "microbial") return route.proof;
  return route.scores.primary;
}

function attributeFitScore(route) {
  const mode = state.challenge;
  if (mode === "corrosion") {
    return clamp(Math.round(route.scores.durability * 0.5 + route.lifecycle * 0.3 + route.proof * 0.2));
  }
  if (mode === "soiling") {
    return clamp(Math.round(route.scores.cleanability * 0.55 + route.efficiency * 0.25 + route.proof * 0.2));
  }
  if (mode === "microbial") {
    return clamp(Math.round(route.proof * 0.45 + route.scores.primary * 0.35 + route.lifecycle * 0.2));
  }
  return clamp(Math.round(route.scores.primary * 0.6 + route.proof * 0.2 + route.efficiency * 0.2));
}

function contactAngleNormalized(route) {
  return clamp(Math.round((route.contactAngle - 70) * 2.2));
}

function contactAngleEffect(route) {
  const normalized = contactAngleNormalized(route);
  const mode = state.challenge;
  if (mode === "corrosion") {
    return clamp(Math.round(route.scores.durability * 0.7 + normalized * 0.3));
  }
  if (mode === "soiling") {
    return clamp(Math.round(normalized * 0.55 + route.scores.cleanability * 0.45));
  }
  if (mode === "microbial") {
    return clamp(Math.round(route.proof * 0.75 + normalized * 0.25));
  }
  return clamp(Math.round(normalized * 0.65 + route.scores.primary * 0.35));
}

function routeShortLabel(route) {
  return route.label.replace(/®|™/g, "").replace(" Route", "").split(" ")[0];
}

function criterionRows() {
  return [
    ["Indicative contact angle", (route) => `${route.contactAngle}°`],
    [primaryAttributeLabel(), (route) => `${primaryAttributeValue(route)}%`],
    ["Attribute fit", (route) => `${attributeFitScore(route)}%`],
    ["Contact-angle effect", (route) => `${contactAngleEffect(route)}%`],
  ];
}

function renderMatrix(routes) {
  const rows = criterionRows();
  const names = routes.map((route) => route?.label || "-");
  els.matrixRouteAName.textContent = names[0] || "Route A";
  els.matrixRouteBName.textContent = names[1] || "Route B";
  els.matrixRouteCName.textContent = names[2] || "Route C";

  els.performanceMatrix.innerHTML = rows
    .map(([label, getter]) => {
      const values = routes.map((route) => (route ? parseInt(getter(route), 10) : 0));
      const max = Math.max(...values);
      const cells = routes
        .map((route, index) => {
          if (!route) {
            return `<div class="metric-cell"><div class="metric-bar"><span style="width:0%"></span></div><div class="metric-value">-</div></div>`;
          }
          const displayValue = getter(route);
          const value = values[index];
          return `
            <div class="metric-cell">
              <div class="metric-bar"><span style="width:${value}%"></span></div>
              <div class="metric-value">${displayValue} ${value === max ? '<span class="best-badge">Best</span>' : ''}</div>
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
  els.scenarioSummary.textContent = `${labelFor(OPTIONS.coatingTypes, state.coatingType)} selected for ${labelFor(OPTIONS.assets, state.asset)} in ${labelFor(OPTIONS.environments, state.environment)} conditions. Current lead: ${lead.label} with ${lead.contactAngle}° indicative contact angle and ${attributeFitScore(lead)}% attribute fit.`;
}

function mechanismArtwork(route, angle) {
  const dropletScale = clamp((angle - 80) / 45, 0, 1);
  const dropletWidth = 132 - dropletScale * 46;
  const dropletHeight = 58 + dropletScale * 40;
  const centerX = 464;
  const baseY = 198;
  const half = dropletWidth / 2;
  const leftX = centerX - half;
  const rightX = centerX + half;
  const topY = baseY - dropletHeight;
  const tangentAngle = ((180 - angle) * Math.PI) / 180;
  const tangentLength = 44;
  const tangentX = rightX - Math.cos(tangentAngle) * tangentLength;
  const tangentY = baseY - Math.sin(tangentAngle) * tangentLength;
  const angleArcEndX = rightX - 26;
  const angleArcEndY = baseY - 18;

  let sceneAccent = '<path d="M90 190 C130 118, 196 104, 246 186 L268 212 L118 212 Z" fill="url(#iceMass)" opacity="0.96"/>';
  if (route.id === "gentoo-route") {
    sceneAccent = '<rect x="110" y="154" width="174" height="44" rx="12" fill="url(#barrierGlow)" opacity="0.94"/><path d="M118 176 H278" stroke="rgba(255,255,255,0.68)" stroke-width="3" stroke-linecap="round"/>';
  } else if (route.id === "solarex-route") {
    sceneAccent = '<circle cx="136" cy="154" r="18" fill="url(#dropletBlue)"/><circle cx="182" cy="138" r="14" fill="url(#dropletBlue)"/><circle cx="222" cy="162" r="12" fill="url(#dropletBlue)"/><path d="M104 206 C154 182, 212 176, 286 190" stroke="rgba(185,226,255,0.55)" stroke-width="3" stroke-linecap="round"/>';
  } else if (route.id === "pcs-route") {
    sceneAccent = '<circle cx="156" cy="154" r="42" fill="rgba(89,199,255,0.08)" stroke="rgba(127,231,182,0.44)" stroke-width="2"/><path d="M156 120 L156 188 M122 154 L190 154" stroke="rgba(127,231,182,0.82)" stroke-width="3" stroke-linecap="round"/>';
  }

  return `
    <svg class="mechanism-svg" viewBox="0 0 640 260" role="img" aria-label="${route.mechanismTitle} with indicative contact angle ${angle} degrees">
      <defs>
        <linearGradient id="panelGlow" x1="0" x2="1">
          <stop offset="0%" stop-color="rgba(89,199,255,0.18)"/>
          <stop offset="100%" stop-color="rgba(106,143,255,0.02)"/>
        </linearGradient>
        <linearGradient id="surfaceTop" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="rgba(214,236,255,0.92)"/>
          <stop offset="100%" stop-color="rgba(83,154,255,0.68)"/>
        </linearGradient>
        <linearGradient id="surfaceFace" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="rgba(24,82,180,0.78)"/>
          <stop offset="100%" stop-color="rgba(4,16,36,0.94)"/>
        </linearGradient>
        <radialGradient id="dropletBlue" cx="32%" cy="24%">
          <stop offset="0%" stop-color="rgba(255,255,255,0.95)"/>
          <stop offset="40%" stop-color="rgba(188,230,255,0.96)"/>
          <stop offset="100%" stop-color="rgba(75,154,255,0.74)"/>
        </radialGradient>
        <linearGradient id="iceMass" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="rgba(255,255,255,0.94)"/>
          <stop offset="100%" stop-color="rgba(146,205,255,0.82)"/>
        </linearGradient>
        <linearGradient id="barrierGlow" x1="0" x2="1">
          <stop offset="0%" stop-color="rgba(89,199,255,0.16)"/>
          <stop offset="100%" stop-color="rgba(106,143,255,0.32)"/>
        </linearGradient>
        <filter id="softGlow">
          <feGaussianBlur stdDeviation="6" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <rect x="0" y="0" width="640" height="260" fill="url(#panelGlow)" opacity="0.9"/>
      <ellipse cx="320" cy="228" rx="214" ry="18" fill="rgba(0,0,0,0.34)"/>
      <polygon points="108,178 348,178 502,214 262,214" fill="url(#surfaceTop)"/>
      <polygon points="262,214 502,214 502,234 262,234" fill="url(#surfaceFace)"/>
      <polygon points="108,178 262,214 262,234 108,198" fill="rgba(9,31,78,0.72)"/>

      ${sceneAccent}

      <path d="M ${centerX} ${topY}
               C ${centerX + half * 0.76} ${topY + dropletHeight * 0.08}, ${rightX} ${baseY - dropletHeight * 0.26}, ${rightX} ${baseY}
               C ${rightX - half * 0.26} ${baseY - dropletHeight * 0.14}, ${centerX + half * 0.28} ${baseY - 4}, ${centerX} ${baseY - 3}
               C ${centerX - half * 0.28} ${baseY - 4}, ${leftX + half * 0.26} ${baseY - dropletHeight * 0.14}, ${leftX} ${baseY}
               C ${leftX} ${baseY - dropletHeight * 0.26}, ${centerX - half * 0.76} ${topY + dropletHeight * 0.08}, ${centerX} ${topY} Z"
            fill="url(#dropletBlue)" filter="url(#softGlow)"/>
      <circle cx="${centerX - half * 0.18}" cy="${topY + dropletHeight * 0.28}" r="9" fill="rgba(255,255,255,0.7)"/>

      <line x1="${rightX}" y1="${baseY}" x2="${rightX + 34}" y2="${baseY}" stroke="rgba(255,255,255,0.7)" stroke-width="2" stroke-linecap="round"/>
      <line x1="${rightX}" y1="${baseY}" x2="${tangentX}" y2="${tangentY}" stroke="rgba(255,255,255,0.7)" stroke-width="2" stroke-linecap="round"/>
      <path d="M ${rightX - 24} ${baseY} A 24 24 0 0 0 ${angleArcEndX} ${angleArcEndY}" fill="none" stroke="rgba(89,199,255,0.9)" stroke-width="3"/>
      <text x="${rightX - 6}" y="${baseY - 30}" class="chart-label">${angle}°</text>
      <text x="122" y="236" class="chart-note">Contact-angle visual scales footprint and detachment profile for the selected route.</text>
    </svg>
  `;
}

function renderMechanism(routes) {
  const lead = routes[0];
  const stage = document.querySelector(".ice-stage");
  if (!lead || !stage) return;

  const fit = attributeFitScore(lead);
  const effect = contactAngleEffect(lead);

  els.mechanismTitle.textContent = lead.mechanismTitle;
  els.mechanismLabelA.textContent = `Contact angle ${lead.contactAngle}°`;
  els.mechanismLabelA.classList.add("is-accent");
  els.mechanismLabelB.textContent = `Attribute fit ${fit}%`;

  stage.innerHTML = `
    <div class="mechanism-scene">
      ${mechanismArtwork(lead, lead.contactAngle)}
    </div>
    <div class="mechanism-meta">
      <div class="mechanism-stat">
        <span class="stat-label">Indicative contact angle</span>
        <span class="stat-value">${lead.contactAngle}°</span>
        <span class="stat-sub">${lead.wettingProfile}</span>
      </div>
      <div class="mechanism-stat">
        <span class="stat-label">Contact-angle effect</span>
        <span class="stat-value">${effect}%</span>
        <span class="stat-sub">Challenge-adjusted contribution for ${labelFor(OPTIONS.challenges, state.challenge) || 'selected route'}.</span>
      </div>
      <div class="mechanism-stat">
        <span class="stat-label">Attribute fit</span>
        <span class="stat-value">${fit}%</span>
        <span class="stat-sub">Aligned to ${primaryAttributeLabel().toLowerCase()} and product attribute ratings.</span>
      </div>
    </div>
  `;
}

function renderTradeoffChart(routes) {
  const kicker = document.querySelector("#tradeoffPanel .panel-kicker");
  if (kicker) kicker.textContent = "Contact angle vs attribute fit";

  const nodes = routes.map((route) => {
    const xValue = attributeFitScore(route);
    const yValue = contactAngleEffect(route);
    return {
      route,
      xValue,
      yValue,
      x: 70 + xValue * 2.9,
      y: 244 - yValue * 1.72,
      r: 8 + Math.round(route.proof / 18),
    };
  });

  const trail = nodes.map((node) => `${node.x},${node.y}`).join(" ");
  els.tradeoffChart.innerHTML = `
    <div class="tradeoff-legend">
      <span class="metric-pill">X = Attribute fit</span>
      <span class="metric-pill">Y = Contact-angle effect</span>
      <span class="metric-pill">Bubble = Proof</span>
    </div>
    <svg class="chart-svg" viewBox="0 0 420 300" role="img" aria-label="Contact-angle effect versus attribute-fit trade-off chart">
      <line x1="54" y1="26" x2="54" y2="258" class="chart-grid-line"></line>
      <line x1="54" y1="258" x2="388" y2="258" class="chart-grid-line"></line>
      <line x1="54" y1="178" x2="388" y2="178" class="chart-grid-line"></line>
      <line x1="54" y1="98" x2="388" y2="98" class="chart-grid-line"></line>
      <line x1="166" y1="26" x2="166" y2="258" class="chart-grid-line"></line>
      <line x1="278" y1="26" x2="278" y2="258" class="chart-grid-line"></line>
      <text x="12" y="32" class="chart-axis-title">High</text>
      <text x="16" y="258" class="chart-note">Low</text>
      <text x="272" y="288" class="chart-axis-title">Attribute fit</text>
      <text x="12" y="146" class="chart-axis-title" transform="rotate(-90 12 146)">Contact-angle effect</text>
      <polyline class="chart-trail" points="${trail}"></polyline>
      ${nodes.map((node) => `
        <circle class="chart-bubble" cx="${node.x}" cy="${node.y}" r="${node.r + 8}"></circle>
        <circle class="chart-point" cx="${node.x}" cy="${node.y}" r="${node.r}"></circle>
        <text x="${node.x - 22}" y="${node.y - node.r - 10}" class="chart-bubble-label">${routeShortLabel(node.route)}</text>
        <text x="${node.x - 16}" y="${node.y + node.r + 18}" class="chart-note">${node.route.contactAngle}° / ${node.xValue}%</text>
      `).join("")}
      <text x="238" y="40" class="chart-note">Upper-right = stronger angle-linked fit for the active challenge.</text>
    </svg>
  `;
}

function renderValidation(routes) {
  const lead = routes[0];
  const items = [
    { label: "Scenario captured", body: completeScenario() ? "Minimum scenario completed." : "Pending scenario fields.", type: completeScenario() ? "success" : "warning" },
    { label: "Best-fit route identified", body: lead ? `${lead.label} is leading.` : "No active route.", type: lead ? "success" : "warning" },
    { label: "Contact-angle logic aligned", body: lead ? `${lead.contactAngle}° profile mapped to ${contactAngleEffect(lead)}% effect.` : "Awaiting route.", type: lead ? "success" : "warning" },
    { label: "Boundary acknowledged", body: state.acknowledgedBoundary ? "Boundary conditions acknowledged." : "Boundary review still recommended.", type: state.acknowledgedBoundary ? "success" : "warning" },
  ];
  els.validationSummaryList.innerHTML = items.map((item) => `<div class="status-item"><span class="status-icon ${item.type}">${item.type === 'success' ? '✓' : '!'}</span><span class="status-copy"><strong>${item.label}</strong><span>${item.body}</span></span></div>`).join("");
}

function renderNotes(routes) {
  const lead = routes[0];
  const notes = lead
    ? [`Indicative contact angle ${lead.contactAngle}° contributes ${contactAngleEffect(lead)}% to the active challenge fit.`].concat(lead.notes)
    : ["Complete the scenario to generate route notes."];
  els.evaluationNotesList.innerHTML = notes.map((note, index) => `<div class="status-item"><span class="status-icon ${index === 0 ? 'success' : 'warning'}">${index === 0 ? '✓' : '•'}</span><span class="status-copy"><strong>${index === 0 ? 'Lead note' : 'Review note'}</strong><span>${note}</span></span></div>`).join("");
}

function renderActions(routes) {
  const lead = routes[0];
  const actions = lead ? lead.actions : [["Request review", "./handoff.html?intent=technical-consult&solution=SIW-v3"], ["Continue review", "./proof.html"], ["Contact expert", "./handoff.html?intent=technical-consult&solution=SIW-v3"]];
  els.actionButtons.innerHTML = actions.map((action, index) => `<a class="action-button" href="${action[1]}"><span class="action-icon">${index + 1}</span><span class="action-copy"><strong>${action[0]}</strong><span>${lead ? lead.label : 'SIW v3.1 route'}</span></span></a>`).join("");
}

function openDrawer(route) {
  els.drawerTitle.textContent = route.label;
  els.drawerSummary.textContent = route.summary;
  els.drawerMetrics.innerHTML = [
    `<span class="metric-pill">Fit ${route.score}%</span>`,
    `<span class="metric-pill">Proof ${route.proof}%</span>`,
    `<span class="metric-pill">Contact angle ${route.contactAngle}°</span>`,
    `<span class="metric-pill">Attribute fit ${attributeFitScore(route)}%</span>`,
  ].join("");
  els.drawerSections.innerHTML = [
    `<div class="drawer-block"><div><h3>Why it leads</h3><p>${route.rationale[0]}</p></div></div>`,
    `<div class="drawer-block"><div><h3>Contact-angle interpretation</h3><p>${route.wettingProfile}. Challenge-adjusted effect score: ${contactAngleEffect(route)}%.</p></div></div>`,
    `<div class="drawer-block"><div><h3>Boundary</h3><p>${route.boundary}</p></div></div>`,
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
    version: "3.1",
    path: "/siw_30/",
    scenario: state,
    rankedRoutes: routes.map((route) => ({
      id: route.id,
      label: route.label,
      score: route.score,
      proof: route.proof,
      lifecycle: route.lifecycle,
      efficiency: route.efficiency,
      contactAngle: route.contactAngle,
      attributeFit: attributeFitScore(route),
      contactAngleEffect: contactAngleEffect(route),
    })),
  };
  if (navigator.clipboard?.writeText) navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
  window.alert("SIW v3.1 review packet copied to clipboard.");
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

  els.saveWorkspaceButton.addEventListener("click", () => { persistState(); window.alert("SIW v3.1 workspace saved."); });
  els.resetWorkspaceButton.addEventListener("click", () => { state = { ...DEFAULT_STATE }; render(); });
  els.exportPacketButton.addEventListener("click", () => exportPacket(rankedRoutes()));
  els.closeDrawerButton.addEventListener("click", closeDrawer);
  els.drawerBackdrop.addEventListener("click", closeDrawer);
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeDrawer(); });
}

bindEvents();
render();
