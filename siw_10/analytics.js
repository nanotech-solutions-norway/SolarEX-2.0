(() => {
  const OPTION_DATA = {
    siteTypes: [
      ["coastal", "Coastal / marine-adjacent"],
      ["onshore", "Onshore outdoor"],
      ["utility", "Utility / industrial site"],
      ["clinical", "Clinical / controlled indoor"],
      ["urban", "Urban / commercial building"],
      ["desert", "Dry / abrasive dust"],
    ],
    temperatureBands: [
      ["subzero", "Sub-zero / freeze risk"],
      ["cold", "Cold / seasonal exposure"],
      ["temperate", "Temperate / mixed conditions"],
      ["hot", "High-temperature / solar load"],
    ],
    severity: [
      ["low", "Low"],
      ["moderate", "Moderate"],
      ["high", "High"],
      ["critical", "Critical"],
    ],
    contaminants: [
      ["salt", "Salt / marine aerosol"],
      ["dust", "Dust / particulate"],
      ["organic", "Organic / pollen / biofilm"],
      ["moisture", "Moisture / water film"],
      ["chemical", "Chemical exposure"],
    ],
    geometry: [
      ["flat", "Flat / low-complexity"],
      ["curved", "Curved / exposed"],
      ["complex", "Complex geometry"],
      ["hightouch", "High-touch / repeated contact"],
    ],
    priorities: [
      ["uptime", "Operational uptime"],
      ["evidence", "Evidence strength"],
      ["maintenance", "Lower maintenance burden"],
      ["rfq", "Commercial qualification"],
    ],
  };

  Object.assign(els, {
    environmentSelect: document.getElementById("environmentSelect"),
    temperatureRangeSelect: document.getElementById("temperatureRangeSelect"),
    severitySelect: document.getElementById("severitySelect"),
    contaminantTypeSelect: document.getElementById("contaminantTypeSelect"),
    surfaceGeometrySelect: document.getElementById("surfaceGeometrySelect"),
    deploymentPrioritySelect: document.getElementById("deploymentPrioritySelect"),
    scenarioConfidenceBadge: document.getElementById("scenarioConfidenceBadge"),
    fitComparisonHeader: document.getElementById("fitComparisonHeader"),
    fitComparisonLegend: document.getElementById("fitComparisonLegend"),
    fitComparisonMatrix: document.getElementById("fitComparisonMatrix"),
    fitDecisionSummary: document.getElementById("fitDecisionSummary"),
    mechanismDiagramCanvas: document.getElementById("mechanismDiagramCanvas"),
    tradeoffChartCanvas: document.getElementById("tradeoffChartCanvas"),
    fitRationaleList: document.getElementById("fitRationaleList"),
    routeBoundaryVisualizer: document.getElementById("routeBoundaryVisualizer"),
    reviewedEvidenceCounter: document.getElementById("reviewedEvidenceCounter"),
    boundaryAcknowledgementBadge: document.getElementById("boundaryAcknowledgementBadge"),
    handoffIntentSelector: document.getElementById("handoffIntentSelector"),
    exportReviewPacketButton: document.getElementById("exportReviewPacketButton"),
    drawerEvidenceType: document.getElementById("drawerEvidenceType"),
    drawerSourceRef: document.getElementById("drawerSourceRef"),
    drawerReviewedToggle: document.getElementById("drawerReviewedToggle"),
    drawerPrevButton: document.getElementById("drawerPrevButton"),
    drawerNextButton: document.getElementById("drawerNextButton"),
  });

  function ensureAnalyticsState() {
    state.environment = Object.assign(
      {
        siteType: "",
        temperatureBand: "",
        severity: "",
        contaminantType: "",
        surfaceGeometry: "",
      },
      state.environment || {}
    );

    state.priority = Object.assign(
      {
        objective: "",
        handoffIntent: "",
      },
      state.priority || {}
    );

    state.analytics = Object.assign(
      {
        activeDrawerMeta: null,
      },
      state.analytics || {}
    );
  }

  function fillSelect(select, options, placeholder, selected) {
    if (!select) return;
    select.innerHTML = [`<option value="">${placeholder}</option>`]
      .concat(options.map(([value, label]) => `<option value="${value}" ${selected === value ? "selected" : ""}>${label}</option>`))
      .join("");
  }

  function labelForOption(options, value) {
    const match = options.find(([id]) => id === value);
    return match ? match[1] : "";
  }

  function renderEnvironmentControls() {
    fillSelect(els.environmentSelect, OPTION_DATA.siteTypes, "Select site type", state.environment.siteType);
    fillSelect(els.temperatureRangeSelect, OPTION_DATA.temperatureBands, "Select temperature range", state.environment.temperatureBand);
    fillSelect(els.severitySelect, OPTION_DATA.severity, "Select severity", state.environment.severity);
    fillSelect(els.contaminantTypeSelect, OPTION_DATA.contaminants, "Select contaminant type", state.environment.contaminantType);
    fillSelect(els.surfaceGeometrySelect, OPTION_DATA.geometry, "Select surface geometry", state.environment.surfaceGeometry);
    fillSelect(els.deploymentPrioritySelect, OPTION_DATA.priorities, "Select deployment priority", state.priority.objective);

    if (els.handoffIntentSelector) {
      els.handoffIntentSelector.value = state.priority.handoffIntent || "";
    }
  }

  function analyticsBonus(product) {
    let bonus = 0;
    const env = state.environment || {};
    const priority = state.priority?.objective || "";

    if (env.siteType === "coastal" && (/marine|salt/i.test((product.conditions || []).join(" ")) || product.challenges.includes("corrosion"))) bonus += 6;
    if (env.siteType === "desert" && (product.id === "solarex-sio2" || product.challenges.includes("dust"))) bonus += 5;
    if (env.temperatureBand === "subzero" && product.challenges.includes("icing")) bonus += 6;
    if (env.contaminantType === "organic" && (product.challenges.includes("organic") || product.id === "solarex-tio2")) bonus += 5;
    if (env.contaminantType === "dust" && (product.challenges.includes("dust") || product.id === "solarex-sio2")) bonus += 4;
    if (env.contaminantType === "salt" && product.challenges.includes("corrosion")) bonus += 4;
    if (env.surfaceGeometry === "hightouch" && product.challenges.includes("microbial")) bonus += 5;
    if (env.severity === "critical" && product.evidence >= 80) bonus += 3;
    if (priority === "evidence" && product.evidence >= 80) bonus += 4;
    if (priority === "maintenance" && product.benefit >= 80) bonus += 3;
    if (priority === "uptime" && (product.challenges.includes("icing") || product.challenges.includes("rainfade"))) bonus += 4;

    return bonus;
  }

  const originalGetRecommendations = getRecommendations;
  getRecommendations = function () {
    const base = originalGetRecommendations().map((item) => ({ ...item }));
    return base
      .map((product) => ({ ...product, score: Math.min(99, product.score + analyticsBonus(product)) }))
      .sort((a, b) => b.score - a.score);
  };

  function environmentCompleteness() {
    return [
      state.environment.siteType,
      state.environment.temperatureBand,
      state.environment.severity,
      state.environment.contaminantType,
      state.environment.surfaceGeometry,
      state.priority.objective,
    ].filter(Boolean).length;
  }

  function renderScenarioConfidence() {
    if (!els.scenarioConfidenceBadge) return;

    const baseCount = [state.industry, state.application, state.asset, state.substrate, state.challenge].filter(Boolean).length;
    const envCount = environmentCompleteness();
    const total = 11;
    const done = baseCount + envCount;
    const pct = Math.round((done / total) * 100);

    els.scenarioConfidenceBadge.className = "statement-box section-gap";
    if (pct >= 80) els.scenarioConfidenceBadge.classList.add("is-ready");
    else if (pct >= 45) els.scenarioConfidenceBadge.classList.add("is-warning");
    else els.scenarioConfidenceBadge.classList.add("is-risk");

    els.scenarioConfidenceBadge.textContent = completeScenario()
      ? `Scenario confidence ${pct}% — base scenario complete, environment context ${envCount}/6 filled.`
      : `Scenario confidence ${pct}% — complete the core scenario before fit comparison becomes actionable.`;
  }

  function getTopCompared(recommendations) {
    return recommendations.slice(0, 3);
  }

  function environmentMatchScore(product) {
    return Math.min(100, 55 + analyticsBonus(product) * 5);
  }

  function renderFitComparison(recommendations) {
    if (!els.fitComparisonMatrix || !els.fitDecisionSummary) return;

    if (!completeScenario()) {
      els.fitComparisonHeader.innerHTML = "";
      els.fitComparisonLegend.innerHTML = "";
      els.fitComparisonMatrix.innerHTML = `<div class="empty-panel-copy">Comparison output will populate after a scenario is complete.</div>`;
      els.fitDecisionSummary.className = "statement-box statement-empty section-gap";
      els.fitDecisionSummary.textContent = "Complete the scenario to generate a comparison summary.";
      return;
    }

    const compared = getTopCompared(recommendations);
    if (!compared.length) {
      els.fitComparisonHeader.innerHTML = `<span class="context-chip"><strong>Status</strong> No supported route returned</span>`;
      els.fitComparisonLegend.innerHTML = "";
      els.fitComparisonMatrix.innerHTML = `<div class="empty-panel-copy">No direct compatibility result is currently available for this exact scenario.</div>`;
      els.fitDecisionSummary.className = "statement-box is-warning section-gap";
      els.fitDecisionSummary.textContent = "Adjust substrate, challenge, or environment severity to restore a defensible fit result.";
      return;
    }

    els.fitComparisonHeader.innerHTML = [
      state.priority.objective ? `<span class="context-chip"><strong>Priority</strong> ${labelForOption(OPTION_DATA.priorities, state.priority.objective)}</span>` : "",
      state.environment.siteType ? `<span class="context-chip"><strong>Site</strong> ${labelForOption(OPTION_DATA.siteTypes, state.environment.siteType)}</span>` : "",
      state.environment.contaminantType ? `<span class="context-chip"><strong>Contaminant</strong> ${labelForOption(OPTION_DATA.contaminants, state.environment.contaminantType)}</span>` : "",
    ].filter(Boolean).join("");

    els.fitComparisonLegend.innerHTML = ["Fit", "Proof", "Value", "Environment match"].map((label) => `<span class="metric-pill">${label}</span>`).join("");

    const rows = [
      ["Fit score", (p) => `${p.score}%`],
      ["Proof score", (p) => `${p.evidence}%`],
      ["Value score", (p) => `${p.benefit}%`],
      ["Environment match", (p) => `${environmentMatchScore(p)}%`],
      ["Evidence items", (p) => `${(p.evidenceItems || []).length}`],
    ];

    els.fitComparisonMatrix.innerHTML = rows
      .map(([label, getter]) => {
        const max = Math.max(...compared.map((p) => parseInt(getter(p), 10) || 0));
        return `
          <div class="compare-table-row">
            <strong>${label}</strong>
            ${compared
              .map((product) => {
                const value = getter(product);
                const numeric = parseInt(value, 10) || 0;
                const best = numeric === max ? " is-best" : "";
                return `<span class="metric-pill${best}">${product.label}: ${value}</span>`;
              })
              .join("")}
          </div>
        `;
      })
      .join("");

    const top = compared[0];
    const second = compared[1];
    const delta = second ? top.score - second.score : top.score;
    els.fitDecisionSummary.className = "statement-box is-ready section-gap";
    els.fitDecisionSummary.textContent = `${top.label} leads by ${delta} points under the current scenario and environment profile.`;
  }

  function renderBarSeries(scoreMap) {
    return Object.entries(scoreMap)
      .map(([label, value]) => `
        <div class="compare-table-row">
          <strong>${label}</strong>
          <span class="metric-pill">${value}%</span>
        </div>
      `)
      .join("");
  }

  function renderExplainVisuals(recommendations) {
    if (!els.mechanismDiagramCanvas) return;
    const top = recommendations[0];

    if (!top) {
      els.mechanismDiagramCanvas.innerHTML = `<div class="empty-panel-copy">Mechanism visual will populate after route selection.</div>`;
      els.tradeoffChartCanvas.innerHTML = `<div class="empty-panel-copy">Trade-off chart will populate after route selection.</div>`;
      els.fitRationaleList.innerHTML = `<div class="empty-panel-copy">Rationale statements will appear with the leading route.</div>`;
      els.routeBoundaryVisualizer.innerHTML = `<div class="empty-panel-copy">Boundary visualization will populate after route selection.</div>`;
      return;
    }

    els.mechanismDiagramCanvas.innerHTML = `
      <div class="stacked-action-list">
        <div class="compare-table-row"><strong>Challenge</strong><span class="metric-pill">${labelFor(currentApplication()?.challenges || [], state.challenge) || "Selected challenge"}</span></div>
        <div class="compare-table-row"><strong>Mechanism</strong><span class="metric-pill">${top.family}</span></div>
        <div class="compare-table-row"><strong>Effect</strong><span class="metric-pill">Operational burden reduced through matched surface-route behavior</span></div>
      </div>
    `;

    els.tradeoffChartCanvas.innerHTML = renderBarSeries({
      Fit: top.score,
      Proof: top.evidence,
      Value: top.benefit,
      Environment: environmentMatchScore(top),
    });

    els.fitRationaleList.innerHTML = (top.notes || [])
      .map((note) => `<div class="action-card"><span class="card-icon">→</span><span class="card-copy"><strong>Rationale</strong><span>${note}</span></span></div>`)
      .join("");

    els.routeBoundaryVisualizer.innerHTML = `
      <div class="compare-table-row"><strong>Boundary</strong><span class="metric-pill">${top.boundary}</span></div>
      <div class="compare-table-row"><strong>Environment weighting</strong><span class="metric-pill">${environmentMatchScore(top)}%</span></div>
    `;
  }

  function reviewedCountForTop(top) {
    if (!top) return 0;
    return state.reviewedEvidence.filter((id) => id.startsWith(`${top.id}:`)).length;
  }

  function renderValidationSummary(recommendations) {
    if (!els.reviewedEvidenceCounter) return;
    const top = recommendations[0];
    const reviewed = reviewedCountForTop(top);
    const total = top ? (top.evidenceItems || []).length : 0;
    const standards = top ? (top.docs || []).length : 0;

    els.reviewedEvidenceCounter.innerHTML = `
      <p class="small-label">Evidence reviewed</p>
      <h3>${reviewed} / ${total}</h3>
      <p class="card-copy">Standards-linked items: ${standards}</p>
    `;

    els.boundaryAcknowledgementBadge.className = `statement-box section-gap ${state.boundaryReviewed ? "is-ready" : "is-warning"}`;
    els.boundaryAcknowledgementBadge.textContent = state.boundaryReviewed
      ? "Boundary conditions acknowledged."
      : "Boundary conditions not yet acknowledged.";

    if (els.handoffIntentSelector && state.priority.handoffIntent) {
      els.handoffIntentSelector.value = state.priority.handoffIntent;
    }
  }

  function currentDrawerKey() {
    const meta = state.analytics.activeDrawerMeta;
    return meta && meta.type === "evidence" ? `${meta.productId}:${meta.index}` : null;
  }

  function syncDrawerMetadata() {
    if (!els.drawerEvidenceType || !els.drawerSourceRef || !els.drawerReviewedToggle) return;
    const meta = state.analytics.activeDrawerMeta;

    if (!meta) {
      els.drawerEvidenceType.innerHTML = "";
      els.drawerSourceRef.textContent = "No source context available.";
      els.drawerReviewedToggle.checked = false;
      els.drawerReviewedToggle.disabled = true;
      els.drawerPrevButton.disabled = true;
      els.drawerNextButton.disabled = true;
      return;
    }

    const product = DATA.products.find((item) => item.id === meta.productId);
    const pills = [`<span class="metric-pill">${meta.type}</span>`];
    if (product) pills.push(`<span class="metric-pill">${product.label}</span>`);
    els.drawerEvidenceType.innerHTML = pills.join("");

    if (meta.type === "evidence" && product) {
      const doc = (product.docs || [])[0];
      els.drawerSourceRef.textContent = doc ? `Source route: ${doc[0]}` : `Source route: ${product.label}`;
      const key = currentDrawerKey();
      els.drawerReviewedToggle.disabled = false;
      els.drawerReviewedToggle.checked = Boolean(key && state.reviewedEvidence.includes(key));
      const hasMultiple = (product.evidenceItems || []).length > 1;
      els.drawerPrevButton.disabled = !hasMultiple;
      els.drawerNextButton.disabled = !hasMultiple;
    } else {
      els.drawerSourceRef.textContent = product ? `Source route: ${product.label}` : "No source context available.";
      els.drawerReviewedToggle.disabled = true;
      els.drawerReviewedToggle.checked = false;
      els.drawerPrevButton.disabled = true;
      els.drawerNextButton.disabled = true;
    }
  }

  document.addEventListener(
    "click",
    (event) => {
      const evidenceTarget = event.target.closest("[data-open-evidence]");
      if (evidenceTarget) {
        const [productId, index] = evidenceTarget.dataset.openEvidence.split(":");
        state.analytics.activeDrawerMeta = { type: "evidence", productId, index: Number(index) };
        return;
      }

      const productTarget = event.target.closest("[data-open-product]");
      if (productTarget) {
        state.analytics.activeDrawerMeta = { type: "product", productId: productTarget.dataset.openProduct };
        return;
      }

      const boundaryTarget = event.target.closest("[data-open-boundary]");
      if (boundaryTarget) {
        state.analytics.activeDrawerMeta = { type: "boundary", productId: boundaryTarget.dataset.openBoundary };
      }
    },
    true
  );

  const originalOpenDrawer = openDrawer;
  openDrawer = function (payload) {
    originalOpenDrawer(payload);
    syncDrawerMetadata();
  };

  function rerenderAnalyticsShell() {
    const recommendations = getRecommendations();
    renderEnvironmentControls();
    renderScenarioConfidence();
    renderFitComparison(recommendations);
    renderExplainVisuals(recommendations);
    renderValidationSummary(recommendations);
    syncDrawerMetadata();
  }

  const originalRenderAll = renderAll;
  renderAll = function () {
    ensureAnalyticsState();
    originalRenderAll();
    rerenderAnalyticsShell();
  };

  function updateEnvironmentState() {
    state.environment.siteType = els.environmentSelect?.value || "";
    state.environment.temperatureBand = els.temperatureRangeSelect?.value || "";
    state.environment.severity = els.severitySelect?.value || "";
    state.environment.contaminantType = els.contaminantTypeSelect?.value || "";
    state.environment.surfaceGeometry = els.surfaceGeometrySelect?.value || "";
    state.priority.objective = els.deploymentPrioritySelect?.value || "";
    renderAll();
  }

  [
    els.environmentSelect,
    els.temperatureRangeSelect,
    els.severitySelect,
    els.contaminantTypeSelect,
    els.surfaceGeometrySelect,
    els.deploymentPrioritySelect,
  ].forEach((select) => select && select.addEventListener("change", updateEnvironmentState));

  if (els.handoffIntentSelector) {
    els.handoffIntentSelector.addEventListener("change", () => {
      state.priority.handoffIntent = els.handoffIntentSelector.value || "";
      persistState();
    });
  }

  if (els.exportReviewPacketButton) {
    els.exportReviewPacketButton.addEventListener("click", () => {
      const top = getRecommendations()[0] || null;
      const payload = {
        scenario: {
          industry: state.industry,
          application: state.application,
          asset: state.asset,
          substrate: state.substrate,
          challenge: state.challenge,
          conditions: state.conditions,
        },
        environment: state.environment,
        priority: state.priority,
        topRecommendation: top ? { id: top.id, label: top.label, score: top.score, evidence: top.evidence, benefit: top.benefit } : null,
        reviewedEvidence: state.reviewedEvidence,
        boundaryReviewed: state.boundaryReviewed,
      };

      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
      }
      window.alert("SIW review packet copied to clipboard.");
    });
  }

  if (els.drawerReviewedToggle) {
    els.drawerReviewedToggle.addEventListener("change", () => {
      const key = currentDrawerKey();
      if (!key) return;
      const set = new Set(state.reviewedEvidence);
      if (els.drawerReviewedToggle.checked) set.add(key);
      else set.delete(key);
      state.reviewedEvidence = Array.from(set);
      persistState();
      rerenderAnalyticsShell();
      renderChecklist(getRecommendations());
      renderContextShell(getRecommendations());
    });
  }

  function stepDrawer(delta) {
    const meta = state.analytics.activeDrawerMeta;
    if (!meta || meta.type !== "evidence") return;
    const product = DATA.products.find((item) => item.id === meta.productId);
    const items = product?.evidenceItems || [];
    if (!items.length) return;
    const nextIndex = (meta.index + delta + items.length) % items.length;
    state.analytics.activeDrawerMeta = { type: "evidence", productId: meta.productId, index: nextIndex };
    recordEvidenceReview(`${meta.productId}:${nextIndex}`);
    originalOpenDrawer(buildEvidencePayload(product, nextIndex));
    persistState();
    rerenderAnalyticsShell();
    renderChecklist(getRecommendations());
    renderContextShell(getRecommendations());
  }

  els.drawerPrevButton?.addEventListener("click", () => stepDrawer(-1));
  els.drawerNextButton?.addEventListener("click", () => stepDrawer(1));

  ensureAnalyticsState();
  renderAll();
})();
