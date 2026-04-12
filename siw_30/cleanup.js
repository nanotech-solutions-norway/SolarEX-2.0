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

  let activeTradeoffRouteId = null;

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

  const isSolarEXRoute = (route) => route.id === "solarex-sio2-route" || route.id === "solarex-tio2-route";

  const includeRouteForScenario = (route) => {
    if (!isSolarEXRoute(route)) return true;
    return state.asset === "solar";
  };

  rankedRoutes = function () {
    return ROUTES.filter(includeRouteForScenario)
      .map((route) => ({ ...route, score: routeScore(route) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
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

  const getActiveRoute = (routes) => {
    const active = routes.find((route) => route.id === activeTradeoffRouteId);
    if (active) return active;
    activeTradeoffRouteId = routes[0]?.id || null;
    return routes[0] || null;
  };

  const scaleRelative = (value, min, max, start, end) => {
    if (max === min) return (start + end) / 2;
    return start + ((value - min) / (max - min)) * (end - start);
  };

  const getBubbleConfig = () => {
    if (window.matchMedia("(min-width: 1180px)").matches) {
      return {
        baseRadius: 9,
        proofDivisor: 52,
        radiusScale: 0.24,
        shellOffset: 1.35,
        spreadPadding: 7,
        labelDy: 1.8,
        rankFontSize: 6.5,
        rankFontWeight: 700,
        xSlots: [124, 220, 316],
      };
    }

    if (window.matchMedia("(min-width: 760px)").matches) {
      return {
        baseRadius: 13,
        proofDivisor: 30,
        radiusScale: 1,
        shellOffset: 6,
        spreadPadding: 18,
        labelDy: 3.8,
        rankFontSize: 11,
        rankFontWeight: 800,
        xSlots: [116, 220, 324],
      };
    }

    return {
      baseRadius: 15,
      proofDivisor: 24,
      radiusScale: 1,
      shellOffset: 8,
      spreadPadding: 22,
      labelDy: 4,
      rankFontSize: 12,
      rankFontWeight: 800,
      xSlots: [110, 220, 330],
    };
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
        const minDistance = a.r + b.r + Math.max(a.spreadPadding, b.spreadPadding);
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

  const mechanismVisualMarkup = (route) => {
    const bars = [
      ["Application fit", route.plot.applicationFit],
      ["Documented performance", route.plot.documentedPerformance],
      ["Proof maturity", route.plot.proofMaturity],
    ];

    return `
      <div class="mechanism-scene">
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
      </div>
      <div class="mechanism-meta">
        ${route.keyStats
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
  };

  renderMechanism = function (routes) {
    const activeRoute = getActiveRoute(routes);
    const stage = document.querySelector(".ice-stage");
    if (!activeRoute || !stage) return;

    els.mechanismTitle.textContent = activeRoute.mechanismTitle;
    els.mechanismLabelA.textContent = activeRoute.mechanismTags?.[0] || activeRoute.family;
    els.mechanismLabelA.classList.add("is-accent");
    els.mechanismLabelB.textContent = activeRoute.mechanismTags?.[1] || "Evidence-backed route";
    stage.innerHTML = mechanismVisualMarkup(activeRoute);
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
    activeTradeoffRouteId = route.id;
    persistState();
    if (typeof renderValidation === "function") renderValidation(rankedRoutes());
  };

  renderTradeoffChart = function (routes) {
    const kicker = document.querySelector("#tradeoffPanel .panel-kicker");
    if (kicker) kicker.textContent = "Relative fit view";

    const yValues = routes.map((route) => route.plot.documentedPerformance);
    const yMin = Math.min(...yValues);
    const yMax = Math.max(...yValues);
    const bubbleConfig = getBubbleConfig();
    const activeRoute = getActiveRoute(routes);
    const xSlots = routes.length === 1 ? [220] : routes.length === 2 ? [142, 298] : bubbleConfig.xSlots;

    const initialNodes = routes.map((route, index) => {
      const baseRadius = bubbleConfig.baseRadius + Math.round(route.plot.proofMaturity / bubbleConfig.proofDivisor);
      return {
        route,
        rank: index + 1,
        xValue: route.plot.applicationFit,
        yValue: route.plot.documentedPerformance,
        proofValue: route.plot.proofMaturity,
        x: xSlots[index] || xSlots[xSlots.length - 1],
        y: scaleRelative(route.plot.documentedPerformance, yMin, yMax, 206, 74),
        r: Math.max(3.2, baseRadius * bubbleConfig.radiusScale),
        shellOffset: bubbleConfig.shellOffset,
        spreadPadding: bubbleConfig.spreadPadding,
        labelDy: bubbleConfig.labelDy,
        rankFontSize: bubbleConfig.rankFontSize,
        rankFontWeight: bubbleConfig.rankFontWeight,
        isSelected: activeRoute?.id === route.id,
      };
    });

    const nodes = spreadNodes(initialNodes);

    els.tradeoffChart.innerHTML = `
      <div class="tradeoff-topline">
        <div class="tradeoff-legend">
          <span class="metric-pill">X = Rank order</span>
          <span class="metric-pill">Y = Documented performance</span>
          <span class="metric-pill">Bubble = Proof maturity</span>
        </div>
        <span class="tradeoff-mode">1 on left · 3 on right · tap bubble for specifications</span>
      </div>
      <div class="chart-frame chart-frame-clean">
        <svg class="chart-svg" viewBox="0 0 420 280" role="img" aria-label="Trade-off chart showing ranked route order and documented performance for the active route set">
          <line x1="74" y1="44" x2="74" y2="226" class="chart-grid-line"></line>
          <line x1="74" y1="226" x2="368" y2="226" class="chart-grid-line"></line>
          <line x1="74" y1="165" x2="368" y2="165" class="chart-grid-line"></line>
          <line x1="74" y1="104" x2="368" y2="104" class="chart-grid-line"></line>
          <line x1="172" y1="44" x2="172" y2="226" class="chart-grid-line"></line>
          <line x1="270" y1="44" x2="270" y2="226" class="chart-grid-line"></line>
          <text x="74" y="34" class="chart-corner-label">Higher</text>
          <text x="42" y="230" class="chart-corner-label">Lower</text>
          <text x="245" y="258" class="chart-axis-caption">Rank order</text>
          <text x="24" y="182" class="chart-axis-caption" transform="rotate(-90 24 182)">Documented performance</text>
          <text x="108" y="245" class="chart-corner-label">1</text>
          <text x="216" y="245" class="chart-corner-label">2</text>
          <text x="324" y="245" class="chart-corner-label">3</text>
          ${nodes
            .map(
              (node) => `
                <g class="chart-bubble-group${node.isSelected ? " is-selected" : ""}" data-chart-route-id="${node.route.id}" tabindex="0" role="button" aria-label="Show ${node.route.label} specifications in the mechanism panel">
                  <circle class="chart-bubble-hit" cx="${node.x}" cy="${node.y}" r="${node.r + node.shellOffset + 10}" fill="transparent" stroke="transparent"></circle>
                  <circle class="chart-bubble-shell" cx="${node.x}" cy="${node.y}" r="${node.r + node.shellOffset}"></circle>
                  <circle class="chart-bubble-core" cx="${node.x}" cy="${node.y}" r="${node.r}"></circle>
                  <text x="${node.x}" y="${node.y + node.labelDy}" text-anchor="middle" class="chart-rank-label" style="fill:#ffffff;font-size:${node.rankFontSize}px;font-weight:${node.rankFontWeight};">${node.rank}</text>
                </g>
              `
            )
            .join("")}
        </svg>
      </div>
      <div class="tradeoff-summary compact-summary">
        ${nodes
          .map(
            (node) => `
              <div class="tradeoff-summary-row${node.isSelected ? " is-selected" : ""}">
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

  let viewportBucket = window.innerWidth >= 1180 ? "desktop" : window.innerWidth >= 760 ? "tablet" : "mobile";
  window.addEventListener("resize", () => {
    const nextBucket = window.innerWidth >= 1180 ? "desktop" : window.innerWidth >= 760 ? "tablet" : "mobile";
    if (nextBucket !== viewportBucket) {
      viewportBucket = nextBucket;
      render();
    }
  });

  document.addEventListener("click", (event) => {
    const actionButton = event.target.closest("[data-route-action]");
    if (actionButton) {
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
      return;
    }

    const bubble = event.target.closest("[data-chart-route-id]");
    if (bubble) {
      const route = getRouteById(bubble.dataset.chartRouteId);
      if (!route) return;
      activeTradeoffRouteId = route.id;
      render();
    }
  });

  document.addEventListener("keydown", (event) => {
    const bubble = event.target.closest?.("[data-chart-route-id]");
    if (!bubble) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      const route = getRouteById(bubble.dataset.chartRouteId);
      if (!route) return;
      activeTradeoffRouteId = route.id;
      render();
    }
  });

  render();
})();
