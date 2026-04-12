(() => {
  if (
    typeof ROUTES === "undefined" ||
    typeof els === "undefined" ||
    typeof rankedRoutes !== "function" ||
    typeof render !== "function"
  ) {
    return;
  }

  const ACTION_COPY = {
    sample: "Copy packet + open route detail",
    review: "Jump to comparison workspace",
    expert: "Open route detail and evidence",
    default: "Open route detail",
  };

  const shortRouteNote = (route) => {
    if (!route) return "";
    switch (route.id) {
      case "hirec-route":
        return "Icing-led uptime and telecom reliability fit.";
      case "gentoo-route":
        return "Barrier route for corrosion-led scenarios.";
      case "solarex-sio2-route":
        return "Passive easy-clean fit for PV soiling control.";
      case "solarex-tio2-route":
        return "Active photocatalytic and hydrophilic fit.";
      default:
        return route.summary;
    }
  };

  const getActionType = (label = "") => {
    const normalized = String(label).toLowerCase();
    if (normalized.includes("sample")) return "sample";
    if (normalized.includes("review")) return "review";
    if (normalized.includes("expert") || normalized.includes("technical")) return "expert";
    return "default";
  };

  const buildActionButton = (label, route, index, compact = false) => {
    const type = getActionType(label);
    return `
      <button
        class="action-button action-button-${type}${compact ? " compact-action" : ""}"
        type="button"
        data-route-action="${type}"
        data-route-id="${route.id}"
        aria-label="${label} — ${route.label}"
      >
        <span class="action-icon">${index + 1}</span>
        <span class="action-copy">
          <strong>${label}</strong>
          <span>${ACTION_COPY[type] || ACTION_COPY.default}</span>
        </span>
        <span class="action-arrow" aria-hidden="true">›</span>
      </button>
    `;
  };

  const copyReviewPacket = (route) => {
    const routes = rankedRoutes();
    const payload = {
      version: "3.1",
      path: "/siw_30/",
      focusRoute: route?.id || null,
      scenario: state,
      rankedRoutes: routes.map((item) => ({
        id: item.id,
        label: item.label,
        score: item.score,
        applicationFit: item.plot.applicationFit,
        documentedPerformance: item.plot.documentedPerformance,
        proofMaturity: item.plot.proofMaturity,
        lifecycle: item.plot.lifecycle,
        deployment: item.plot.deployment,
        evidence: item.evidence,
        keyStats: item.keyStats,
      })),
    };

    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    }

    window.alert(`${route.label} review packet copied to clipboard.`);
  };

  const scrollToPanel = (panelId) => {
    const target = document.getElementById(panelId);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const getRouteById = (routeId) => ROUTES.find((route) => route.id === routeId);

  const scaleRelative = (value, min, max, start, end) => {
    if (max === min) return (start + end) / 2;
    return start + ((value - min) / (max - min)) * (end - start);
  };

  const spreadNodes = (nodes) => {
    const adjusted = nodes.map((node) => ({ ...node }));
    for (let i = 0; i < adjusted.length; i += 1) {
      for (let j = i + 1; j < adjusted.length; j += 1) {
        const a = adjusted[i];
        const b = adjusted[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const distance = Math.sqrt(dx * dx + dy * dy) || 1;
        const minDistance = a.r + b.r + 24;
        if (distance < minDistance) {
          const shift = (minDistance - distance) / 2;
          const directionX = dx / distance;
          const directionY = dy / distance;
          a.x -= directionX * shift;
          a.y -= directionY * shift;
          b.x += directionX * shift;
          b.y += directionY * shift;
        }
      }
    }

    return adjusted.map((node) => ({
      ...node,
      x: Math.min(352, Math.max(88, node.x)),
      y: Math.min(214, Math.max(66, node.y)),
    }));
  };

  renderActions = function (routes) {
    const lead = routes[0];
    const actions = lead
      ? lead.actions
      : [
          ["Request review", "#comparisonPanel"],
          ["Continue review", "#comparisonPanel"],
          ["Contact expert", "#validationPanel"],
        ];

    els.actionButtons.innerHTML = actions
      .map((action, index) => buildActionButton(action[0], lead || routes[0], index, false))
      .join("");
  };

  openDrawer = function (route) {
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
      .map((action, index) => buildActionButton(action[0], route, index, true))
      .join("");

    els.routeDrawer.classList.add("is-open");
    els.routeDrawer.setAttribute("aria-hidden", "false");
    els.drawerBackdrop.hidden = false;
    state.acknowledgedBoundary = true;
    persistState();
    if (typeof renderValidation === "function") renderValidation(rankedRoutes());
  };

  renderTradeoffChart = function (routes) {
    const kicker = document.querySelector("#tradeoffPanel .panel-kicker");
    if (kicker) kicker.textContent = "Relative fit view";

    const xValues = routes.map((route) => route.plot.applicationFit);
    const yValues = routes.map((route) => route.plot.documentedPerformance);
    const xMin = Math.min(...xValues);
    const xMax = Math.max(...xValues);
    const yMin = Math.min(...yValues);
    const yMax = Math.max(...yValues);

    const initialNodes = routes.map((route, index) => ({
      route,
      rank: index + 1,
      xValue: route.plot.applicationFit,
      yValue: route.plot.documentedPerformance,
      proofValue: route.plot.proofMaturity,
      x: scaleRelative(route.plot.applicationFit, xMin, xMax, 108, 334),
      y: scaleRelative(route.plot.documentedPerformance, yMin, yMax, 206, 74),
      r: 17 + Math.round(route.plot.proofMaturity / 20),
    }));

    const nodes = spreadNodes(initialNodes);

    els.tradeoffChart.innerHTML = `
      <div class="tradeoff-topline">
        <div class="tradeoff-legend">
          <span class="metric-pill">X = Application fit</span>
          <span class="metric-pill">Y = Documented performance</span>
          <span class="metric-pill">Bubble = Proof maturity</span>
        </div>
        <span class="tradeoff-mode">Relative positioning of active routes</span>
      </div>
      <div class="chart-frame chart-frame-clean">
        <svg class="chart-svg" viewBox="0 0 420 280" role="img" aria-label="Trade-off chart showing application fit versus documented performance for the active route set">
          <line x1="74" y1="44" x2="74" y2="226" class="chart-grid-line"></line>
          <line x1="74" y1="226" x2="368" y2="226" class="chart-grid-line"></line>
          <line x1="74" y1="165" x2="368" y2="165" class="chart-grid-line"></line>
          <line x1="74" y1="104" x2="368" y2="104" class="chart-grid-line"></line>
          <line x1="172" y1="44" x2="172" y2="226" class="chart-grid-line"></line>
          <line x1="270" y1="44" x2="270" y2="226" class="chart-grid-line"></line>
          <text x="74" y="34" class="chart-corner-label">Higher</text>
          <text x="42" y="230" class="chart-corner-label">Lower</text>
          <text x="240" y="258" class="chart-axis-caption">Application fit</text>
          <text x="24" y="182" class="chart-axis-caption" transform="rotate(-90 24 182)">Documented performance</text>
          <text x="222" y="28" class="chart-note-short">1 = strongest current fit</text>
          ${nodes
            .map(
              (node) => `
                <circle class="chart-bubble-shell" cx="${node.x}" cy="${node.y}" r="${node.r + 8}"></circle>
                <circle class="chart-bubble-core" cx="${node.x}" cy="${node.y}" r="${node.r}"></circle>
                <text x="${node.x}" y="${node.y + 4}" text-anchor="middle" class="chart-rank-label">${node.rank}</text>
              `
            )
            .join("")}
        </svg>
      </div>
      <div class="tradeoff-summary compact-summary">
        ${nodes
          .map(
            (node) => `
              <div class="tradeoff-summary-row">
                <span class="summary-rank">${node.rank}</span>
                <div class="tradeoff-summary-copy">
                  <strong>${node.route.label}</strong>
                  <span>${shortRouteNote(node.route)}</span>
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
  };

  document.addEventListener("click", (event) => {
    const actionButton = event.target.closest("[data-route-action]");
    if (!actionButton) return;

    event.preventDefault();

    const route = getRouteById(actionButton.dataset.routeId) || rankedRoutes()[0];
    const actionType = actionButton.dataset.routeAction;

    if (!route) return;

    if (actionType === "sample") {
      copyReviewPacket(route);
      openDrawer(route);
      return;
    }

    if (actionType === "review") {
      scrollToPanel("comparisonPanel");
      return;
    }

    if (actionType === "expert") {
      openDrawer(route);
      scrollToPanel("validationPanel");
      return;
    }

    openDrawer(route);
  });

  render();
})();
