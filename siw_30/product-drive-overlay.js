(() => {
  if (typeof ROUTES === "undefined" || typeof els === "undefined" || typeof openDrawer !== "function") {
    return;
  }

  const STYLE_ID = "productDriveOverlayStyles";
  if (!document.getElementById(STYLE_ID)) {
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      .drive-overlay-block { display:grid; gap:14px; margin-top:16px; }
      .drive-overlay-card {
        border:1px solid rgba(174,202,255,.12);
        border-radius:20px;
        background:linear-gradient(180deg, rgba(7,16,30,.84), rgba(4,10,21,.82));
        padding:14px;
        display:grid;
        gap:12px;
      }
      .drive-overlay-head { display:grid; gap:6px; }
      .drive-overlay-head strong { font-size:.96rem; }
      .drive-overlay-head p, .drive-overlay-note { margin:0; color:#aebdd6; font-size:.82rem; line-height:1.55; }
      .drive-product-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(168px,1fr)); gap:10px; }
      .drive-product-chip {
        border:1px solid rgba(174,202,255,.16); border-radius:16px; padding:10px 12px;
        background:linear-gradient(180deg, rgba(7,16,30,.88), rgba(5,12,24,.84)); color:#eef5ff;
        text-align:left; display:grid; gap:4px; cursor:pointer;
      }
      .drive-product-chip strong { font-size:.9rem; }
      .drive-product-chip span { font-size:.74rem; color:#9bb1cf; }
      .drive-product-chip:hover, .drive-product-chip:focus-visible, .drive-product-chip.is-active {
        border-color:rgba(109,208,255,.68); box-shadow:0 0 0 1px rgba(109,208,255,.18);
      }
      .drive-meta { display:flex; flex-wrap:wrap; gap:8px; }
      .drive-pill, .drive-status-pill {
        display:inline-flex; align-items:center; min-height:30px; padding:6px 10px; border-radius:999px;
        background:rgba(10,24,44,.88); border:1px solid rgba(174,202,255,.14); color:#e9f2ff; font-size:.75rem;
      }
      .drive-status-pill.verified { border-color:rgba(95,219,140,.28); color:#d9ffea; background:rgba(16,56,36,.72); }
      .drive-status-pill.partial { border-color:rgba(255,193,92,.28); color:#fff2d8; background:rgba(64,45,12,.72); }
      .drive-facts { display:grid; gap:8px; }
      .drive-fact {
        padding:10px 12px; border-radius:14px; background:rgba(8,17,32,.72);
        border:1px solid rgba(174,202,255,.08); color:#cbd8ec; font-size:.79rem; line-height:1.5;
      }
      @media (max-width:760px) { .drive-product-grid { grid-template-columns:1fr; } }
    `;
    document.head.appendChild(style);
  }

  const PRODUCT_DETAILS = {
    "H-R10": {
      name: "Hirec®-R",
      family: "HIREC",
      status: "PARTIALLY VERIFIED",
      driveBasis: "Folder-level HIREC evidence reviewed; direct product-specific text for the H-R10 code itself was not isolated in this pass.",
      facts: [
        "Portfolio overview links the product to anti-ice, anti-corrosion, hydrophobic, superhydrophobic, and self-cleaning functions.",
        "Drive review confirms the HIREC family is centered on high-repellency, ice-mitigation use cases, but this exact product code remains only partially verified in the current document pass.",
        "Recommended to retain as a selectable SIW product with a partial-verification flag until a direct H-R10 TDS or product sheet is pulled."
      ]
    },
    "H-PFW9": {
      name: "Hirec® PFW9",
      family: "HIREC",
      status: "VERIFIED",
      driveBasis: "HIREC-PFW9 TDS reviewed from the target Drive tree.",
      facts: [
        "Contact angle around 154°, with water droplets exceeding 150° on properly applied surfaces.",
        "Documented service temperature range −40 °C to +150 °C.",
        "Typical total dry film thickness 9 µm and application quantity 115–150 g/m².",
        "Drive TDS states reduced downtime from ice by up to 85% and typical durability of 8–10 years under broad environmental exposure."
      ]
    },
    "H-PFS9": {
      name: "Hirec® PFS9",
      family: "HIREC",
      status: "PARTIALLY VERIFIED",
      driveBasis: "No direct PFS9 text was isolated; positioned using the uploaded overview and nearby HIREC family evidence.",
      facts: [
        "Uploaded portfolio overview gives the same rating pattern as PFW9.",
        "Direct PFS9 specification text was not isolated in the current Drive pass.",
        "Best kept visible with a partial-verification label until a product-specific TDS is retrieved."
      ]
    },
    "GEN2": {
      name: "Gentoo™",
      family: "Gentoo",
      status: "VERIFIED",
      driveBasis: "Gentoo TDS reviewed from the target Drive tree.",
      facts: [
        "Contact angle 110°–115° and watershedding angle 5°–10°.",
        "Dry thickness 4–8 µm.",
        "Service temperature range −50 °C to 160 °C, short term below 200 °C.",
        "Clear glossy finish and hydrophobic sol-gel chemistry with application by roller, brush, dip, flow-coat, or spray."
      ]
    },
    "UED": {
      name: "Ultra-Ever Dry™",
      family: "Ultra-Ever Dry",
      status: "VERIFIED",
      driveBasis: "UED SE SpecSheet reviewed from the target Drive tree.",
      facts: [
        "Contact angle greater than 150°.",
        "Translucent white matte-like finish with slight haze; appears whiter if applied heavily.",
        "Recommended dry thickness 13–25 µm and coverage about 23 m² per gallon at 13 µm.",
        "Working temperature −34 °C to 149 °C and weatherability up to 12 months depending on UV intensity."
      ]
    },
    "SGX": {
      name: "SurfaceGuard-X",
      family: "SurfaceGuard",
      status: "VERIFIED",
      driveBasis: "SurfaceGuard combined technical datasheet and SG-X technical folder reviewed.",
      facts: [
        "Nanostructured SiO₂ coating with typical thickness below 150 nm.",
        "Designed for covalent bonding with glass, plastic, and treated metal surfaces.",
        "QUV-A weather durability cited above 500 hours.",
        "Application areas include architectural glass, solar panels, signage, automotive glazing, marine windshields, and industrial glazing."
      ]
    },
    "SGT": {
      name: "SurfaceGuard-T",
      family: "SurfaceGuard",
      status: "VERIFIED",
      driveBasis: "SurfaceGuard-T technical datasheet reviewed from the target Drive tree.",
      facts: [
        "Nano-engineered TiO₂ particles below 100 nm.",
        "Photocatalytic activity under UV generates reactive oxygen species for contaminant breakdown.",
        "Long-term stability cited above 500 hours QUV-A.",
        "Target applications include public infrastructure, hospitals and schools, solar modules and mirror fields, stainless steel pipelines, and marine exteriors."
      ]
    },
    "SEXQ": {
      name: "SolarEX - Quartz",
      family: "SolarEX SiO₂",
      status: "VERIFIED",
      driveBasis: "SolarEX SiO₂ SDS and dedicated SolarEX product folder reviewed.",
      facts: [
        "SDS identifies the product as a surface modifier with hydrophobic and oleophobic agent functionality.",
        "Colorless liquid with pH 6–8 and density 0.78–0.82 g/cm³.",
        "Drive folder contains dedicated application instructions and Europe / regional solar cell coating materials.",
        "Kept scoped only to solar installations in SIW per current user rule."
      ]
    },
    "SEXT": {
      name: "SolarEX - Titan",
      family: "SolarEX TiO₂",
      status: "VERIFIED",
      driveBasis: "SolarEX TiO₂ product folder, SDS, edition deck, and module-study files reviewed at folder level; chemistry and use case are directly supported by the Drive corpus.",
      facts: [
        "Drive folder includes TiO₂ edition SDS, edition presentation, and solar module study files.",
        "Positioned for solar modules and mirror fields where active photocatalytic cleaning and moisture management are valuable.",
        "Kept solar-only in SIW according to the current deployment rule.",
        "Hydrophilic / photocatalytic framing is directly consistent with the TiO₂ product corpus in the Drive tree."
      ]
    },
    "SAPOE": {
      name: "SAPOE™",
      family: "SAPOE",
      status: "PARTIALLY VERIFIED",
      driveBasis: "Dedicated SAPOE folder and English deck files located; detailed technical text was not fully extracted in this pass.",
      facts: [
        "Dedicated SAPOE folder with English presentation material was confirmed in the target Drive tree.",
        "Portfolio overview positions SAPOE as the highest anti-corrosion product in the uploaded rating set.",
        "Retained in SIW with a partial-verification marker pending direct text extraction from the SAPOE source documents."
      ]
    },
    "VCOAT": {
      name: "VitaCoat",
      family: "VitaCoat",
      status: "VERIFIED",
      driveBasis: "Detailed VitaCoat technical reports and presentations reviewed from the target Drive tree.",
      facts: [
        "Single application protects surfaces for up to six months under normal use.",
        "Drive report states >99% SARS-CoV-2 reduction in one minute and >4–5 log reductions in standard antimicrobial tests.",
        "Independent wear simulation cited 5,000 friction cycles with hydrophobic barrier retention.",
        "Hybrid sol-gel formulation combines Citrox bioflavonoids with a silica-based SiO₂ matrix."
      ]
    },
    "NFC": {
      name: "NanoFloor",
      family: "NanoFloor",
      status: "PARTIALLY VERIFIED",
      driveBasis: "NanoFloor folder and multiple NanoFloor certification / wear / antiviral report files were located, but a primary technical datasheet was not fully extracted in this pass.",
      facts: [
        "NanoFloor folder was confirmed with TDS, certifications, and report subfolders.",
        "Multiple NanoFloor test and report files were found, including EN 13624, EN 13727, EN 14476, wear testing, and general presentation files.",
        "Product remains in SIW with a partial-verification tag until the main TDS text is extracted into the dataset."
      ]
    }
  };

  const ROUTE_PRODUCT_PRIORITY = {
    "hirec-route": ["H-R10", "H-PFW9", "H-PFS9", "UED", "GEN2", "SGX", "SAPOE", "VCOAT", "NFC", "SGT", "SEXQ", "SEXT"],
    "gentoo-route": ["GEN2", "SAPOE", "SGX", "VCOAT", "NFC", "H-R10", "H-PFW9", "H-PFS9", "UED", "SGT", "SEXQ", "SEXT"],
    "solarex-sio2-route": ["SEXQ", "SGX", "GEN2", "VCOAT", "NFC", "H-R10", "H-PFW9", "H-PFS9", "UED", "SAPOE", "SGT", "SEXT"],
    "solarex-tio2-route": ["SEXT", "SGT", "VCOAT", "NFC", "SGX", "GEN2", "SAPOE", "H-R10", "H-PFW9", "H-PFS9", "UED", "SEXQ"]
  };

  const selectedByRoute = Object.create(null);
  const isSolarEX = (id) => ["SEXQ", "SEXT"].includes(id);
  const statusClass = (status) => status === "VERIFIED" ? "verified" : status === "PARTIALLY VERIFIED" ? "partial" : "unverified";
  const escapeHtml = (value = "") => String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");

  const orderedProductsForRoute = (route) => {
    const visibleIds = Object.keys(PRODUCT_DETAILS).filter((id) => (isSolarEX(id) ? state.asset === "solar" : true));
    const priority = ROUTE_PRODUCT_PRIORITY[route.id] || visibleIds;
    const seen = new Set();
    const ordered = priority.filter((id) => PRODUCT_DETAILS[id] && visibleIds.includes(id) && !seen.has(id) && seen.add(id));
    return ordered.concat(visibleIds.filter((id) => !seen.has(id)));
  };

  const renderOverlay = (route) => {
    const productIds = orderedProductsForRoute(route);
    if (!productIds.length) {
      return `<div class="drive-overlay-block"><div class="drive-overlay-card"><p class="drive-overlay-note">No Drive-backed product records are available for this route under the active SIW scenario.</p></div></div>`;
    }
    const selectedId = selectedByRoute[route.id] && productIds.includes(selectedByRoute[route.id]) ? selectedByRoute[route.id] : productIds[0];
    selectedByRoute[route.id] = selectedId;
    const product = PRODUCT_DETAILS[selectedId];
    const chips = productIds.map((id) => {
      const item = PRODUCT_DETAILS[id];
      return `<button class="drive-product-chip ${id === selectedId ? "is-active" : ""}" type="button" data-drive-product="${id}" data-drive-route="${route.id}"><strong>${escapeHtml(item.name)}</strong><span>${escapeHtml(item.status)}</span></button>`;
    }).join("");
    const facts = product.facts.map((fact) => `<div class="drive-fact">${escapeHtml(fact)}</div>`).join("");
    return `
      <div class="drive-overlay-block">
        <div class="drive-overlay-card">
          <div class="drive-overlay-head">
            <strong>Drive-backed product dossier</strong>
            <p>Products were extracted from the uploaded overview, then reconciled against the specified Drive folder tree. Use this block as the evidence layer for what is verified, only partially verified, or still document-thin.</p>
          </div>
          <div class="drive-product-grid">${chips}</div>
        </div>
        <div class="drive-overlay-card">
          <div class="drive-overlay-head">
            <div class="drive-meta">
              <span class="drive-status-pill ${statusClass(product.status)}">${escapeHtml(product.status)}</span>
              <span class="drive-pill">${escapeHtml(product.family)}</span>
              <span class="drive-pill">${escapeHtml(selectedId)}</span>
            </div>
            <p><strong>${escapeHtml(product.name)}</strong></p>
            <p class="drive-overlay-note"><strong>Drive basis:</strong> ${escapeHtml(product.driveBasis)}</p>
          </div>
          <div class="drive-facts">${facts}</div>
        </div>
      </div>
    `;
  };

  const previousOpenDrawer = openDrawer;
  openDrawer = function(route) {
    previousOpenDrawer(route);
    if (!els.drawerSections) return;
    const existing = els.drawerSections.querySelector(".drive-overlay-block");
    if (existing) existing.remove();
    els.drawerSections.insertAdjacentHTML("beforeend", renderOverlay(route));
  };

  document.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-drive-product]");
    if (!btn) return;
    const route = ROUTES.find((item) => item.id === btn.dataset.driveRoute);
    if (!route) return;
    selectedByRoute[route.id] = btn.dataset.driveProduct;
    openDrawer(route);
  });
})();
