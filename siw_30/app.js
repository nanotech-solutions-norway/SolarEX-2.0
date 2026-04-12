const STORAGE_KEY = "siw_workspace_v31";

const OPTIONS = {
  coatingTypes: [
    ["anti-icing", "Anti-icing route"],
    ["barrier", "Barrier / anti-corrosion"],
    ["pv_easy_clean", "PV easy-clean route"],
    ["photocatalytic", "Photocatalytic / hydrophilic route"],
  ],
  environments: [
    ["coastal", "Coastal / marine-adjacent"],
    ["outdoor", "Outdoor exposed"],
    ["industrial", "Industrial / utility"],
    ["desert", "Dry / abrasive dust"],
    ["controlled", "Controlled / glazing-heavy"],
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
    ["solar", "Solar module / PV glass"],
    ["glazing", "Exterior glazing / plastic glazing"],
  ],
  challenges: [
    ["icing", "Ice buildup"],
    ["corrosion", "Corrosion"],
    ["soiling", "Dust / organic soiling"],
    ["condensation", "Condensation / optical clarity"],
  ],
  conditions: [
    "High uptime requirement",
    "Inspection visibility",
    "Low cleaning budget",
    "Severe weather",
    "UV exposure",
    "Condensation control",
  ],
};

const ROUTES = [
  {
    id: "hirec-route",
    family: "HIREC",
    label: "HIREC® Anti-Icing Route",
    coatingType: "anti-icing",
    environments: ["coastal", "outdoor", "industrial"],
    temperatures: ["subzero", "cold", "temperate"],
    assets: ["radome", "blade"],
    challenges: ["icing"],
    summary:
      "Superhydrophobic anti-icing route for telecom radomes, antennas, and exposed wind assets where uptime continuity and snow/ice shedding are the primary decision drivers.",
    rationale: [
      "Best fit when the operational problem is icing-driven attenuation, shedding delay, or access-intensive maintenance.",
      "Drive research confirms strong anti-icing positioning, contact angle above 150°, and RF suitability for high-frequency telecom applications.",
    ],
    validation: [
      "Indicative contact angle above 150°.",
      "Near-complete attenuation mitigation demonstrated in 9.8 GHz rain tests.",
      "RF attenuation remains below 0.1 dB at 30–70 GHz for the coating stack described in the tech sheets.",
    ],
    notes: [
      "Use for ice and snow mitigation, not as the lead route for corrosion-first decision logic.",
      "The NTT / MIC field framing strengthens the telecom narrative and supports minimum contact-angle threshold discussion.",
      "Confirm substrate preparation and deployment temperature window before field rollout.",
    ],
    boundary:
      "Not the preferred route when the primary commercial objective is long-life corrosion barrier performance rather than anti-icing or snow-shedding reliability.",
    evidence: [
      "Contact angle >150° from HIREC telecom tech sheets.",
      "RF attenuation <0.1 dB at 30–70 GHz in coating-performance slides.",
      "Field framing references ~1,110 NTT relay towers and a 135° preferred minimum identified in the MIC deployment material.",
    ],
    actions: [
      ["Request sample", "./handoff.html?intent=sample-request&solution=HIREC-v3"],
      ["Continue review", "./proof.html"],
      ["Contact expert", "./handoff.html?intent=technical-consult&solution=HIREC-v3"],
    ],
    plot: {
      applicationFit: 93,
      documentedPerformance: 92,
      proofMaturity: 90,
      lifecycle: 84,
      deployment: 72,
    },
    keyStats: [
      { label: "Indicative contact angle", value: ">150°", sub: "Superhydrophobic anti-icing profile" },
      { label: "RF attenuation", value: "<0.1 dB", sub: "30–70 GHz performance framing" },
      { label: "Field deployment anchor", value: "~1,110 towers", sub: "NTT / MIC deployment context" },
    ],
    mechanismTitle: "Anti-icing performance profile",
    mechanismTags: ["Contact angle >150°", "9.8 GHz rain-mitigation evidence"],
  },
  {
    id: "gentoo-route",
    family: "Gentoo",
    label: "Gentoo™ Barrier Route",
    coatingType: "barrier",
    environments: ["coastal", "industrial", "outdoor"],
    temperatures: ["cold", "temperate", "hot"],
    assets: ["steel", "radome"],
    challenges: ["corrosion"],
    summary:
      "Clear hydrophobic sol-gel barrier route for corrosion reduction, water shedding, and inspection-friendly protection on metallic infrastructure and corrosion-sensitive assemblies.",
    rationale: [
      "Best fit when corrosion protection, water shedding, and thin transparent barrier performance need to coexist.",
      "Drive research provides explicit contact-angle, watershed-angle, coating-thickness, and corrosion-resistance data rather than only narrative marketing claims.",
    ],
    validation: [
      "Contact angle 110°–115° with 5°–10° watershed angle in the current TDS.",
      "Dry film thickness 4–8 microns.",
      "Corrosion data reports substantial galvanic protection benefit and 65–75% lower weight loss in fastener assemblies.",
    ],
    notes: [
      "Use for corrosion-led selection logic, not as a substitute for anti-icing-first performance.",
      "The ultra-thin transparent barrier is useful where visual inspection and low added thickness matter.",
      "Continuous-use service temperature is documented to 160°C, with higher short-term exposure tolerance in source material.",
    ],
    boundary:
      "Not the preferred route when the primary problem is snow shedding, organic-soiling reduction, or condensation management on glazing surfaces.",
    evidence: [
      "Contact angle 110°–115° and watershed angle 5°–10° from Gentoo TDS.",
      "4–8 micron dry thickness and -50°C to 160°C service range from Gentoo TDS.",
      "Corrosion report states approximately 65–75% reduction in galvanic fastener weight loss versus controls.",
    ],
    actions: [
      ["Request corrosion review", "./handoff.html?intent=technical-consult&solution=Gentoo-v3"],
      ["Continue review", "./proof.html"],
      ["Contact expert", "./handoff.html?intent=rfq-request&solution=Gentoo-v3"],
    ],
    plot: {
      applicationFit: 87,
      documentedPerformance: 88,
      proofMaturity: 84,
      lifecycle: 92,
      deployment: 76,
    },
    keyStats: [
      { label: "Contact angle", value: "110–115°", sub: "Hydrophobic barrier route" },
      { label: "Watershedding angle", value: "5–10°", sub: "Low roll-off / water-shedding" },
      { label: "Dry thickness", value: "4–8 μm", sub: "Ultra-thin transparent barrier" },
    ],
    mechanismTitle: "Barrier and watershedding profile",
    mechanismTags: ["Contact angle 110–115°", "Corrosion reduction evidence"],
  },
  {
    id: "solarex-sio2-route",
    family: "SolarEX SiO₂",
    label: "SolarEX™ SiO₂ PV Easy-Clean Route",
    coatingType: "pv_easy_clean",
    environments: ["desert", "outdoor", "industrial"],
    temperatures: ["temperate", "hot"],
    assets: ["solar"],
    challenges: ["soiling"],
    summary:
      "Passive PV easy-clean route focused on hydrophobic and oleophobic anti-stick behavior for solar modules where wash burden, dust retention, and maintenance-cycle reduction drive value.",
    rationale: [
      "Best fit when the business case is centered on easy-clean behavior and reduced maintenance frequency on PV glass.",
      "Drive research supports the route with explicit application guidance, coating-thickness data, and commercial ROI scenario framing for European conditions.",
    ],
    validation: [
      "Layer thickness documented at 100–150 nm.",
      "Typical application rate documented at 5–10 ml/m² manually and 5–15 ml/m² industrially.",
      "Commercial scenario deck frames 147-day ROI and 21 kWh/m² annual gain as modeled screening assumptions.",
    ],
    notes: [
      "Use when passive anti-stick and easy-clean logic is the primary mechanism discussion.",
      "Treat ROI deck values as scenario-model inputs rather than monitored field proof.",
      "Keep the distinction between modeled uplift and documented monitored uplift explicit in customer-facing discussion.",
    ],
    boundary:
      "Not the strongest route when the lead requirement is anti-icing reliability or when the sales case requires monitored multi-month proof rather than modeled scenario output.",
    evidence: [
      "Layer thickness 100–150 nm from SolarEX Europe deck.",
      "Application consumption 5–10 ml/m² manual and 5–15 ml/m² industrial from SolarEX application material.",
      "ROI scenario deck states 147-day payback and 21 kWh/m² annual gain under modeled European assumptions.",
    ],
    actions: [
      ["Request sample", "./handoff.html?intent=sample-request&solution=SolarEX-SiO2-v3"],
      ["Continue review", "./proof.html"],
      ["Contact expert", "./handoff.html?intent=technical-consult&solution=SolarEX-SiO2-v3"],
    ],
    plot: {
      applicationFit: 84,
      documentedPerformance: 74,
      proofMaturity: 68,
      lifecycle: 86,
      deployment: 82,
    },
    keyStats: [
      { label: "Layer thickness", value: "100–150 nm", sub: "Invisible easy-clean layer" },
      { label: "Application rate", value: "5–15 ml/m²", sub: "Manual / industrial process window" },
      { label: "ROI scenario", value: "147 days", sub: "Modeled European screening case" },
    ],
    mechanismTitle: "PV easy-clean performance profile",
    mechanismTags: ["Anti-stick easy-clean", "Modeled ROI deck"],
  },
  {
    id: "solarex-tio2-route",
    family: "SolarEX TiO₂ / PC-SR",
    label: "SolarEX™ TiO₂ / PC-SR Photocatalytic Route",
    coatingType: "photocatalytic",
    environments: ["outdoor", "industrial", "controlled"],
    temperatures: ["temperate", "hot"],
    assets: ["solar", "glazing"],
    challenges: ["soiling", "condensation"],
    summary:
      "Active photocatalytic and hydrophilic route for solar modules and exterior glazing where monitored yield uplift, anti-misting behavior, and UV-driven self-cleaning logic strengthen the decision case.",
    rationale: [
      "Best fit when the discussion needs monitored performance proof plus a credible photocatalytic or hydrophilic mechanism story.",
      "Drive research combines a 360-day monitored SolarEX TiO₂ module study with TiO₂ PC-SR field instructions for hydrophilic anti-misting deployment.",
    ],
    validation: [
      "Average monitored energy-yield uplift of +5.15% over 360 days in the rooftop module study.",
      "Hydrophilic film described as only a few nanometers thick in the TiO₂ PC-SR application instructions.",
      "Typical application amount documented at approximately 10–25 ml/m² for TiO₂ PC-SR.",
    ],
    notes: [
      "Use when the route must explain both self-cleaning mechanism and monitored proof, not only passive anti-stick behavior.",
      "For glazing-led conversations, anti-misting and optical-clarity language is often stronger than PV-output language.",
      "Keep the distinction clear between the SolarEX TiO₂ monitored module study and the broader TiO₂ PC-SR glazing instruction set.",
    ],
    boundary:
      "Not the preferred route when the buyer only needs a simple passive easy-clean layer or when a corrosion barrier system is the primary specification requirement.",
    evidence: [
      "360-day monitored module study reports +5.15% average energy-yield uplift.",
      "TiO₂ PC-SR instructions describe a few-nanometer hydrophilic film and 24–48 hour outdoor effect development.",
      "Application amount approximately 10–25 ml/m² from TiO₂ PC-SR field reference.",
    ],
    actions: [
      ["Request technical review", "./handoff.html?intent=technical-consult&solution=SolarEX-TiO2-v3"],
      ["Continue review", "./proof.html"],
      ["Contact expert", "./handoff.html?intent=rfq-request&solution=SolarEX-TiO2-v3"],
    ],
    plot: {
      applicationFit: 89,
      documentedPerformance: 91,
      proofMaturity: 87,
      lifecycle: 80,
      deployment: 80,
    },
    keyStats: [
      { label: "Monitored uplift", value: "+5.15%", sub: "360-day rooftop module study" },
      { label: "Film type", value: "Hydrophilic", sub: "Few-nanometer active surface state" },
      { label: "Application rate", value: "10–25 ml/m²", sub: "Exterior glazing / optical-control field use" },
    ],
    mechanismTitle: "Photocatalytic and hydrophilic profile",
    mechanismTags: ["Monitored uplift +5.15%", "Hydrophilic anti-misting route"],
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

let state = sanitizeState(loadState());

function clamp(value, min = 0, max = 99) {
  return Math.min(max, Math.max(min, value));
}

function validIds(options) {
  return new Set(options.map(([id]) => id));
}

function sanitizeState(candidate) {
  const clean = { ...DEFAULT_STATE, ...(candidate || {}) };
  const validCoatingTypes = validIds(OPTIONS.coatingTypes);
  const validEnvironments = validIds(OPTIONS.environments);
  const validTemperatures = validIds(OPTIONS.temperatureRanges);
  const validAssets = validIds(OPTIONS.assets);
  const validChallenges = validIds(OPTIONS.challenges);
  const validConditions = new Set(OPTIONS.conditions);

  if (!validCoatingTypes.has(clean.coatingType)) clean.coatingType = "";
  if (!validEnvironments.has(clean.environment)) clean.environment = "";
  if (!validTemperatures.has(clean.temperatureRange)) clean.temperatureRange = "";
  if (!validAssets.has(clean.asset)) clean.asset = "";
  if (!validChallenges.has(clean.challenge)) clean.challenge = "";
  clean.conditions = Array.isArray(clean.conditions)
    ? clean.conditions.filter((item) => validConditions.has(item))
    : [];
  clean.acknowledgedBoundary = Boolean(clean.acknowledgedBoundary);
  return clean;
}

function optionMarkup(options, selected, placeholder) {
  return [`<option value="">${placeholder}</option>`]
    .concat(
      options.map(
        ([value, label]) =>
          `<option value="${value}" ${selected === value ? "selected" : ""}>${label}</option>`
      )
    )
    .join("");
}

function labelFor(options, value) {
  const hit = options.find(([id]) => id === value);
  return hit ? hit[1] : "";
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (error) {}
  return { ...DEFAULT_STATE };
}

function persistState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {}
}

function completeScenario() {
  return Boolean(
    state.coatingType &&
      state.environment &&
      state.temperatureRange &&
      state.asset &&
      state.challenge
  );
}

function renderControls() {
  els.coatingTypeSelect.innerHTML = optionMarkup(
    OPTIONS.coatingTypes,
    state.coatingType,
    "Select coating type"
  );
  els.environmentSelect.innerHTML = optionMarkup(
    OPTIONS.environments,
    state.environment,
    "Select environment"
  );
  els.temperatureRangeSelect.innerHTML = optionMarkup(
    OPTIONS.temperatureRanges,
    state.temperatureRange,
    "Select temperature range"
  );
  els.assetSelect.innerHTML = optionMarkup(OPTIONS.assets, state.asset, "Select asset");
  els.challengeSelect.innerHTML = optionMarkup(
    OPTIONS.challenges,
    state.challenge,
    "Select challenge"
  );

  els.conditionChips.innerHTML = OPTIONS.conditions
    .map(
      (condition) =>
        `<button class="chip-button ${state.conditions.includes(condition) ? "is-active" : ""}" type="button" data-condition="${condition}">${condition}</button>`
    )
    .join("");
}

function routeScore(route) {
  let score = 34;
  if (route.coatingType === state.coatingType) score += 24;
  if (route.environments.includes(state.environment)) score += 14;
  if (route.temperatures.includes(state.temperatureRange)) score += 10;
  if (route.assets.includes(state.asset)) score += 16;
  if (route.challenges.includes(state.challenge)) score += 18;

  if (state.conditions.includes("High uptime requirement") && route.id === "hirec-route") score += 9;
  if (state.conditions.includes("Inspection visibility") && route.id === "gentoo-route") score += 8;
  if (state.conditions.includes("Low cleaning budget") && route.id === "solarex-sio2-route") score += 8;
  if (state.conditions.includes("Low cleaning budget") && route.id === "solarex-tio2-route") score += 5;
  if (state.conditions.includes("Severe weather") && route.id === "hirec-route") score += 7;
  if (state.conditions.includes("Severe weather") && route.id === "gentoo-route") score += 4;
  if (state.conditions.includes("UV exposure") && route.id === "solarex-tio2-route") score += 8;
  if (state.conditions.includes("UV exposure") && route.id === "solarex-sio2-route") score += 4;
  if (state.conditions.includes("Condensation control") && route.id === "solarex-tio2-route") score += 10;

  return clamp(score, 0, 99);
}

function rankedRoutes() {
  return ROUTES.map((route) => ({ ...route, score: routeScore(route) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

function criterionRows() {
  return [
    ["Application fit", (route) => route.plot.applicationFit],
    ["Documented performance", (route) => route.plot.documentedPerformance],
    ["Proof maturity", (route) => route.plot.proofMaturity],
    ["Lifecycle / durability", (route) => route.plot.lifecycle],
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
              <div class="metric-value">${value}% ${value === max ? '<span class="best-badge">Best</span>' : ""}</div>
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
    state.coatingType
      ? `<span class="route-tag is-active">${labelFor(OPTIONS.coatingTypes, state.coatingType)}</span>`
      : "",
    state.environment
      ? `<span class="route-tag">${labelFor(OPTIONS.environments, state.environment)}</span>`
      : "",
    state.temperatureRange
      ? `<span class="route-tag">${labelFor(
          OPTIONS.temperatureRanges,
          state.temperatureRange
        )}</span>`
      : "",
    state.asset ? `<span class="route-tag">${labelFor(OPTIONS.assets, state.asset)}</span>` : "",
    state.challenge
      ? `<span class="route-tag">${labelFor(OPTIONS.challenges, state.challenge)}</span>`
      : "",
  ].filter(Boolean);

  els.comparisonHeaderChips.innerHTML = chips.join("");
  els.routeTags.innerHTML = routes
    .map(
      (route, index) =>
        `<button class="route-tag ${index === 0 ? "is-active" : ""}" type="button" data-open-route="${route.id}">${route.label}</button>`
    )
    .join("");
}

function renderScenarioSummary(routes) {
  if (!completeScenario()) {
    els.scenarioSummary.textContent = "Complete the scenario to activate route comparison.";
    return;
  }
  const lead = routes[0];
  const anchor = lead.evidence[0] || lead.summary;
  els.scenarioSummary.textContent = `${labelFor(
    OPTIONS.coatingTypes,
    state.coatingType
  )} selected for ${labelFor(OPTIONS.assets, state.asset)} in ${labelFor(
    OPTIONS.environments,
    state.environment
  )} conditions. Current lead: ${lead.label}. Evidence anchor: ${anchor}`;
}

function mechanismVisualMarkup(route) {
  const bars = [
    ["Application fit", route.plot.applicationFit],
    ["Documented performance", route.plot.documentedPerformance],
    ["Proof maturity", route.plot.proofMaturity],
  ];

  return `
    <div class="mechanism-visual route-${route.id}">
      <div class="mechanism-route-badge">${route.family}</div>
      <h3>${route.mechanismTitle}</h3>
      <p class="mechanism-copy">${route.summary}</p>
      <div class="mechanism-mini-bars">
        ${bars
          .map(
            ([label, value]) => `
              <div class="mini-bar-row">
                <div class="mini-bar-head"><span>${label}</span><span>${value}%</span></div>
                <div class="mini-bar-track"><span style="width:${value}%"></span></div>
              </div>
            `
          )
          .join("")}
      </div>
    </div>
  `;
}

function renderMechanism(routes) {
  const lead = routes[0];
  const stage = document.querySelector(".ice-stage");
  if (!lead || !stage) return;

  els.mechanismTitle.textContent = lead.mechanismTitle;
  els.mechanismLabelA.textContent = lead.mechanismTags[0];
  els.mechanismLabelA.classList.add("is-accent");
  els.mechanismLabelB.textContent = lead.mechanismTags[1];

  stage.innerHTML = `
    <div class="mechanism-scene">
      ${mechanismVisualMarkup(lead)}
    </div>
    <div class="mechanism-meta">
      ${lead.keyStats
        .map(
          (item) => `
            <div class="mechanism-stat">
              <span class="stat-label">${item.label}</span>
              <span class="stat-value">${item.value}</span>
              <span class="stat-sub">${item.sub}</span>
            </div>
          `
        )
        .join("")}
    </div>
  `;
}

function routeShortLabel(route) {
  return route.family.replace("SolarEX ", "").replace(" / PC-SR", "");
}

function resolveNodeCollisions(nodes) {
  const adjusted = nodes.map((node) => ({ ...node }));
  for (let i = 0; i < adjusted.length; i += 1) {
    for (let j = i + 1; j < adjusted.length; j += 1) {
      const a = adjusted[i];
      const b = adjusted[j];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const distance = Math.sqrt(dx * dx + dy * dy) || 1;
      const minDistance = a.r + b.r + 14;
      if (distance < minDistance) {
        const shift = (minDistance - distance) / 2;
        const directionX = dx / distance;
        const directionY = dy / distance;
        b.x += directionX * shift + 6;
        b.y += directionY * shift - 6;
      }
    }
  }
  return adjusted.map((node) => ({
    ...node,
    x: clamp(node.x, 72, 372),
    y: clamp(node.y, 44, 240),
  }));
}

function renderTradeoffChart(routes) {
  const kicker = document.querySelector("#tradeoffPanel .panel-kicker");
  if (kicker) kicker.textContent = "Application fit vs documented performance";

  const initialNodes = routes.map((route, index) => ({
    route,
    xValue: route.plot.applicationFit,
    yValue: route.plot.documentedPerformance,
    proofValue: route.plot.proofMaturity,
    lifecycle: route.plot.lifecycle,
    rank: index + 1,
    x: 64 + route.plot.applicationFit * 3.02,
    y: 246 - route.plot.documentedPerformance * 1.84,
    r: 11 + Math.round(route.plot.proofMaturity / 12),
  }));

  const nodes = resolveNodeCollisions(initialNodes);
  const trail = nodes.map((node) => `${node.x},${node.y}`).join(" ");

  els.tradeoffChart.innerHTML = `
    <div class="tradeoff-legend">
      <span class="metric-pill">X = Application fit</span>
      <span class="metric-pill">Y = Documented performance</span>
      <span class="metric-pill">Bubble = Proof maturity</span>
    </div>
    <div class="chart-frame">
      <svg class="chart-svg" viewBox="0 0 420 280" role="img" aria-label="Trade-off chart showing application fit versus documented performance">
        <line x1="54" y1="24" x2="54" y2="248" class="chart-grid-line"></line>
        <line x1="54" y1="248" x2="388" y2="248" class="chart-grid-line"></line>
        <line x1="54" y1="173" x2="388" y2="173" class="chart-grid-line"></line>
        <line x1="54" y1="98" x2="388" y2="98" class="chart-grid-line"></line>
        <line x1="166" y1="24" x2="166" y2="248" class="chart-grid-line"></line>
        <line x1="278" y1="24" x2="278" y2="248" class="chart-grid-line"></line>
        <text x="14" y="30" class="chart-axis-title">High</text>
        <text x="16" y="248" class="chart-note">Low</text>
        <text x="256" y="272" class="chart-axis-title">Application fit</text>
        <text x="16" y="154" class="chart-axis-title" transform="rotate(-90 16 154)">Documented performance</text>
        <polyline class="chart-trail" points="${trail}"></polyline>
        ${nodes
          .map(
            (node) => `
              <circle class="chart-bubble" cx="${node.x}" cy="${node.y}" r="${node.r + 7}"></circle>
              <circle class="chart-point" cx="${node.x}" cy="${node.y}" r="${node.r}"></circle>
              <text x="${node.x}" y="${node.y + 4}" text-anchor="middle" class="chart-rank-label">${node.rank}</text>
            `
          )
          .join("")}
        <text x="192" y="40" class="chart-note">Upper-right = stronger proof-backed fit for the active decision case.</text>
      </svg>
    </div>
    <div class="tradeoff-summary">
      ${nodes
        .map(
          (node) => `
            <div class="tradeoff-summary-row">
              <span class="summary-rank">${node.rank}</span>
              <div class="tradeoff-summary-copy">
                <strong>${node.route.label}</strong>
                <span>${node.route.evidence[0]}</span>
              </div>
              <div class="tradeoff-summary-metrics">
                <span>Fit ${node.xValue}%</span>
                <span>Performance ${node.yValue}%</span>
                <span>Proof ${node.proofValue}%</span>
              </div>
            </div>
          `
        )
        .join("")}
    </div>
  `;
}

function renderValidation(routes) {
  const lead = routes[0];
  const items = [
    {
      label: "Scenario captured",
      body: completeScenario() ? "Minimum scenario completed." : "Pending scenario fields.",
      type: completeScenario() ? "success" : "warning",
    },
    {
      label: "Best-fit route identified",
      body: lead ? `${lead.label} is leading.` : "No active route.",
      type: lead ? "success" : "warning",
    },
    {
      label: "Evidence-backed route data loaded",
      body: lead ? lead.evidence[0] : "Awaiting route selection.",
      type: lead ? "success" : "warning",
    },
    {
      label: "Boundary acknowledged",
      body: state.acknowledgedBoundary
        ? "Boundary conditions acknowledged."
        : "Boundary review still recommended.",
      type: state.acknowledgedBoundary ? "success" : "warning",
    },
  ];

  els.validationSummaryList.innerHTML = items
    .map(
      (item) =>
        `<div class="status-item"><span class="status-icon ${item.type}">${
          item.type === "success" ? "✓" : "!"
        }</span><span class="status-copy"><strong>${item.label}</strong><span>${item.body}</span></span></div>`
    )
    .join("");
}

function renderNotes(routes) {
  const lead = routes[0];
  const notes = lead
    ? [
        `Decision indices are grounded in Drive-sourced product documentation for ${lead.label}.`,
        ...lead.notes,
      ]
    : ["Complete the scenario to generate route notes."];

  els.evaluationNotesList.innerHTML = notes
    .map(
      (note, index) =>
        `<div class="status-item"><span class="status-icon ${
          index === 0 ? "success" : "warning"
        }">${index === 0 ? "✓" : "•"}</span><span class="status-copy"><strong>${
          index === 0 ? "Lead note" : "Review note"
        }</strong><span>${note}</span></span></div>`
    )
    .join("");
}

function renderActions(routes) {
  const lead = routes[0];
  const actions = lead
    ? lead.actions
    : [
        ["Request review", "./handoff.html?intent=technical-consult&solution=SIW-v3"],
        ["Continue review", "./proof.html"],
        ["Contact expert", "./handoff.html?intent=technical-consult&solution=SIW-v3"],
      ];

  els.actionButtons.innerHTML = actions
    .map(
      (action, index) =>
        `<a class="action-button" href="${action[1]}"><span class="action-icon">${
          index + 1
        }</span><span class="action-copy"><strong>${action[0]}</strong><span>${
          lead ? lead.label : "SIW v3.1 route"
        }</span></span></a>`
    )
    .join("");
}

function openDrawer(route) {
  els.drawerTitle.textContent = route.label;
  els.drawerSummary.textContent = route.summary;
  els.drawerMetrics.innerHTML = [
    `<span class="metric-pill">Fit ${route.score}%</span>`,
    `<span class="metric-pill">Performance ${route.plot.documentedPerformance}%</span>`,
    `<span class="metric-pill">Proof ${route.plot.proofMaturity}%</span>`,
    `<span class="metric-pill">Lifecycle ${route.plot.lifecycle}%</span>`,
  ].join("");

  els.drawerSections.innerHTML = [
    `<div class="drawer-block"><div><h3>Why it leads</h3><p>${route.rationale[0]}</p></div></div>`,
    `<div class="drawer-block"><div><h3>Documented evidence</h3><p>${route.evidence.join(" ")}</p></div></div>`,
    `<div class="drawer-block"><div><h3>Boundary</h3><p>${route.boundary}</p></div></div>`,
  ].join("");

  els.drawerActions.innerHTML = route.actions
    .map(
      (action, index) =>
        `<a class="action-button" href="${action[1]}"><span class="action-icon">${
          index + 1
        }</span><span class="action-copy"><strong>${action[0]}</strong><span>${
          route.label
        }</span></span></a>`
    )
    .join("");

  els.routeDrawer.classList.add("is-open");
  els.routeDrawer.setAttribute("aria-hidden", "false");
  els.drawerBackdrop.hidden = false;
  state.acknowledgedBoundary = true;
  persistState();
  renderValidation(rankedRoutes());
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
      applicationFit: route.plot.applicationFit,
      documentedPerformance: route.plot.documentedPerformance,
      proofMaturity: route.plot.proofMaturity,
      lifecycle: route.plot.lifecycle,
      deployment: route.plot.deployment,
      evidence: route.evidence,
      keyStats: route.keyStats,
    })),
  };

  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
  }
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
  els.coatingTypeSelect.addEventListener("change", (event) => {
    state.coatingType = event.target.value;
    render();
  });
  els.environmentSelect.addEventListener("change", (event) => {
    state.environment = event.target.value;
    render();
  });
  els.temperatureRangeSelect.addEventListener("change", (event) => {
    state.temperatureRange = event.target.value;
    render();
  });
  els.assetSelect.addEventListener("change", (event) => {
    state.asset = event.target.value;
    render();
  });
  els.challengeSelect.addEventListener("change", (event) => {
    state.challenge = event.target.value;
    render();
  });

  document.addEventListener("click", (event) => {
    const conditionBtn = event.target.closest("[data-condition]");
    if (conditionBtn) {
      const value = conditionBtn.dataset.condition;
      state.conditions = state.conditions.includes(value)
        ? state.conditions.filter((item) => item !== value)
        : state.conditions.concat(value);
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

  els.saveWorkspaceButton.addEventListener("click", () => {
    persistState();
    window.alert("SIW v3.1 workspace saved.");
  });

  els.resetWorkspaceButton.addEventListener("click", () => {
    state = { ...DEFAULT_STATE };
    render();
  });

  els.exportPacketButton.addEventListener("click", () => exportPacket(rankedRoutes()));
  els.closeDrawerButton.addEventListener("click", closeDrawer);
  els.drawerBackdrop.addEventListener("click", closeDrawer);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeDrawer();
  });
}

bindEvents();
render();
