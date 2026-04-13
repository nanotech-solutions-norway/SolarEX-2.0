(() => {
  if (
    typeof ROUTES === "undefined" ||
    typeof els === "undefined" ||
    typeof openDrawer !== "function" ||
    typeof rankedRoutes !== "function"
  ) {
    return;
  }

  const PRODUCT_INTELLIGENCE_CSS = `.product-intelligence-block {
  gap: 18px;
}

.product-intelligence-head {
  display: grid;
  gap: 10px;
}

.product-intelligence-head p,
.product-support-copy,
.product-methodology-note,
.product-solgel-note,
.product-chart-note {
  margin: 0;
  color: #aebdd6;
  font-size: 0.84rem;
  line-height: 1.55;
}

.product-intelligence-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.product-chip-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(168px, 1fr));
  gap: 10px;
}

.product-chip {
  border: 1px solid rgba(174, 202, 255, 0.16);
  border-radius: 16px;
  padding: 11px 12px;
  background: linear-gradient(180deg, rgba(7, 16, 30, 0.88), rgba(5, 12, 24, 0.84));
  color: #eef5ff;
  text-align: left;
  display: grid;
  gap: 4px;
  cursor: pointer;
  transition: border-color 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease;
}

.product-chip strong {
  font-size: 0.9rem;
}

.product-chip span {
  font-size: 0.75rem;
  color: #9bb1cf;
}

.product-chip:hover,
.product-chip:focus-visible,
.product-chip.is-active {
  border-color: rgba(109, 208, 255, 0.68);
  box-shadow: 0 0 0 1px rgba(109, 208, 255, 0.18), inset 0 0 0 1px rgba(255,255,255,0.03);
  transform: translateY(-1px);
}

.product-detail-card,
.product-glossary-card,
.product-chart-card {
  border: 1px solid rgba(174, 202, 255, 0.12);
  border-radius: 20px;
  background: linear-gradient(180deg, rgba(7, 16, 30, 0.84), rgba(4, 10, 21, 0.82));
}

.product-detail-card {
  display: grid;
  gap: 18px;
  padding: 16px;
}

.product-detail-head {
  display: grid;
  gap: 14px;
  grid-template-columns: minmax(0, 1.3fr) minmax(220px, 0.9fr);
  align-items: start;
}

.product-detail-head h4 {
  margin: 4px 0 10px;
  font-size: 1.18rem;
}

.product-detail-head p {
  margin: 0;
}

.product-id-label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(17, 44, 84, 0.86);
  border: 1px solid rgba(109, 208, 255, 0.22);
  color: #9fdcff;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.product-badge-grid,
.product-element-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.product-badge,
.product-element-pill {
  display: inline-flex;
  align-items: center;
  min-height: 32px;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(10, 24, 44, 0.88);
  border: 1px solid rgba(174, 202, 255, 0.14);
  color: #e9f2ff;
  font-size: 0.76rem;
}

.product-badge.muted,
.product-element-pill.muted {
  color: #9bb1cf;
}

.product-element-strip {
  display: grid;
  gap: 10px;
}

.product-strip-label {
  color: #9fdcff;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.product-detail-grid {
  display: grid;
  gap: 14px;
  grid-template-columns: 1fr 1.15fr;
}

.product-chart-card,
.product-glossary-card {
  padding: 14px;
  display: grid;
  gap: 12px;
}

.product-section-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 10px;
  flex-wrap: wrap;
}

.product-section-head strong {
  font-size: 0.95rem;
}

.product-section-head span {
  color: #9bb1cf;
  font-size: 0.74rem;
}

.product-chart-shell {
  border: 1px solid rgba(174, 202, 255, 0.12);
  border-radius: 18px;
  padding: 12px;
  background: rgba(4, 11, 24, 0.78);
}

.product-radar-svg {
  width: 100%;
  height: auto;
  overflow: visible;
}

.radar-grid-level {
  fill: rgba(43, 192, 255, 0.03);
  stroke: rgba(174, 202, 255, 0.1);
  stroke-width: 1;
}

.radar-axis {
  stroke: rgba(174, 202, 255, 0.12);
  stroke-width: 1;
}

.radar-label {
  fill: #dfe9f8;
  font-size: 10px;
}

.radar-center-ring {
  fill: #cfe5ff;
}

.radar-shape-fill {
  fill: rgba(43, 192, 255, 0.2);
  stroke: none;
}

.radar-shape-line {
  fill: none;
  stroke: rgba(95, 208, 255, 0.95);
  stroke-width: 2;
}

.radar-node {
  fill: #ffffff;
  stroke: rgba(43, 192, 255, 0.95);
  stroke-width: 1.5;
}

.product-attribute-rating-chart {
  display: grid;
  gap: 9px;
}

.attribute-bar-row {
  display: grid;
  gap: 5px;
}

.attribute-bar-head {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  color: #eef5ff;
  font-size: 0.77rem;
}

.attribute-bar-track {
  position: relative;
  height: 9px;
  border-radius: 999px;
  background: rgba(255,255,255,0.06);
  overflow: hidden;
}

.attribute-bar-track span {
  position: absolute;
  inset: 0 auto 0 0;
  border-radius: inherit;
  background: linear-gradient(90deg, rgba(61, 145, 255, 0.78), rgba(52, 205, 255, 0.96));
}

.attribute-glossary-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px 14px;
}

.attribute-glossary-row {
  display: grid;
  gap: 4px;
  padding: 10px 12px;
  border-radius: 14px;
  background: rgba(8, 17, 32, 0.72);
  border: 1px solid rgba(174, 202, 255, 0.08);
}

.attribute-glossary-row strong {
  font-size: 0.78rem;
  color: #eef5ff;
}

.attribute-glossary-row span {
  font-size: 0.73rem;
  color: #9bb1cf;
  line-height: 1.5;
}

@media (max-width: 1180px) {
  .product-detail-head,
  .product-detail-grid,
  .attribute-glossary-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 760px) {
  .product-chip-grid {
    grid-template-columns: 1fr;
  }

  .product-detail-card,
  .product-chart-card,
  .product-glossary-card {
    padding: 12px;
  }

  .product-chart-shell {
    padding: 10px;
  }

  .radar-label {
    font-size: 9px;
  }
}
`;

  if (!document.getElementById("productIntelligenceStyles")) {
    const style = document.createElement("style");
    style.id = "productIntelligenceStyles";
    style.textContent = PRODUCT_INTELLIGENCE_CSS;
    document.head.appendChild(style);
  }

  const RADAR_ATTRIBUTES = [
    "Anti-Ice",
    "Anti-Corrosion",
    "Anti-Microbial",
    "Chemical Resistance",
    "Easy-to-Clean",
    "Eco Friendly",
    "Food Grade",
    "Hydrophobic",
    "Superhydrophobic",
    "Self-Cleaning",
    "Transparency",
    "UV Protection",
    "Wear Resistance",
  ];

  const EXTRA_ATTRIBUTES = ["Anti-Bacterial", "Superhydrophilic"];
  const FULL_ATTRIBUTES = [...RADAR_ATTRIBUTES, ...EXTRA_ATTRIBUTES];

  const ATTRIBUTE_META = {
    "Anti-Ice": {
      short: "Resistance to ice nucleation and ice adhesion on exposed surfaces.",
      measure: "Normalized 0–100 portfolio score using supplied rating data and backfill rules.",
    },
    "Anti-Corrosion": {
      short: "Barrier performance against oxidation, salts, and electrochemical attack.",
      measure: "Normalized 0–100 protective-performance score.",
    },
    "Anti-Microbial": {
      short: "Inhibition of microbial growth including bacteria, viruses, and fungi.",
      measure: "Normalized 0–100 hygiene-performance score.",
    },
    "Anti-Bacterial": {
      short: "Specific suppression of bacterial colonization and proliferation on treated surfaces.",
      measure: "Normalized 0–100 bacterial-control score.",
    },
    "Chemical Resistance": {
      short: "Durability against solvents, acids, alkalis, fuels, and process chemicals.",
      measure: "Normalized 0–100 chemical-exposure score.",
    },
    "Easy-to-Clean": {
      short: "Low surface adhesion to dirt, oils, and operational contaminants.",
      measure: "Normalized 0–100 cleanability score.",
    },
    "Eco Friendly": {
      short: "Environmental and operational suitability based on the supplied portfolio framing.",
      measure: "Normalized 0–100 sustainability-positioning score.",
    },
    "Food Grade": {
      short: "Suitability for food-contact or hygiene-sensitive deployment environments.",
      measure: "Normalized 0–100 food-contact suitability score.",
    },
    Hydrophobic: {
      short: "Water repellency driven by lowered surface energy and beading behavior.",
      measure: "Normalized 0–100 water-repellency score.",
    },
    Superhydrophobic: {
      short: "Extreme water repellency typically associated with very high apparent contact angle behavior.",
      measure: "Normalized 0–100 extreme-wetting-control score.",
    },
    "Self-Cleaning": {
      short: "Autonomous contaminant release or decomposition through surface chemistry and wetting behavior.",
      measure: "Normalized 0–100 self-cleaning score.",
    },
    Transparency: {
      short: "Retention of optical clarity after coating deposition.",
      measure: "Normalized 0–100 optical-clarity score.",
    },
    "UV Protection": {
      short: "Protection against ultraviolet-driven degradation, fading, and surface aging.",
      measure: "Normalized 0–100 UV-stability score.",
    },
    "Wear Resistance": {
      short: "Resistance to abrasion, friction, and repeated contact loading.",
      measure: "Normalized 0–100 mechanical-durability score.",
    },
    Superhydrophilic: {
      short: "High water-spreading behavior supporting anti-fog, anti-misting, and photocatalytic wetting response.",
      measure: "Normalized 0–100 hydrophilic-response score.",
    },
  };

  const SOL_GEL_DESCRIPTION =
    "Sol-gel refers to a low-temperature wet-chemical deposition route that forms ultra-thin glass-like or ceramic layers with tunable transparency, hardness, and functional surface chemistry.";

  const ELEMENTS = [
    {
      id: "Element1",
      name: "Anti-Ice",
      description:
        "Prevents the formation and adhesion of ice on surfaces, enhancing safety and performance in cold climates. Ideal for wind turbines, UAVs, infrastructure, and transport applications.",
      products: ["H-R10", "H-PFW9", "H300", "GEN2", "UED", "SEXQ"],
    },
    {
      id: "Element2",
      name: "Anti-Corrosion",
      description:
        "Forms a protective layer that inhibits oxidation and electrochemical reactions, extending the lifespan of metals in harsh environments such as marine, industrial, and offshore sectors.",
      products: ["H-R10", "H-PFW9", "H300", "GEN2", "UED", "SGX", "SEXQ", "SEXT", "SAPOE", "VCOAT"],
    },
    {
      id: "Element3",
      name: "Anti-Microbial",
      description:
        "Destroys or inhibits the growth of bacteria, viruses, and fungi on treated surfaces. Essential for hygiene-critical sectors like healthcare, food processing, and public facilities.",
      products: ["SGX", "SGT", "SEXT", "VCOAT", "NFC"],
    },
    {
      id: "Element4",
      name: "Chemical Resistance",
      description:
        "Provides resistance against water, acids, solvents, and corrosive chemicals. Protects substrates from degradation, staining, and permeation, suitable for industrial and laboratory settings.",
      products: ["H-R10", "H-PFW9", "H300", "GEN2", "UED", "SGX", "SEXQ", "SAPOE", "VCOAT", "NFC"],
    },
    {
      id: "Element5",
      name: "Eco Friendly",
      description:
        "Engineered using non-toxic, biodegradable, or recyclable materials. Reduces environmental impact without compromising performance, safety, or durability across industrial and commercial applications.",
      products: ["H300", "GEN2", "UED", "SGX", "SGT", "SEXQ", "SEXT", "SAPOE", "VCOAT", "NFC"],
    },
    {
      id: "Element6",
      name: "Hydrophobic",
      description:
        "Repels water and moisture by lowering surface energy. Prevents staining, corrosion, and microbial growth while reducing maintenance needs across a wide range of substrates.",
      products: ["H-R10", "H-PFW9", "H300", "GEN2", "UED", "SGX", "SEXQ", "VCOAT", "NFC"],
    },
    {
      id: "Element7",
      name: "Super Hydrophobic",
      description:
        "Creates an extreme water-repelling surface using nanoscale topography. Achieves contact angles above 150°, enabling self-cleaning, anti-icing, and anti-fouling performance in challenging environments.",
      products: ["H-R10", "H-PFW9", "H300", "UED"],
    },
    {
      id: "Element8",
      name: "UVProtection",
      description:
        "Shields surfaces from ultraviolet radiation, preventing fading, chalking, embrittlement, and loss of structural integrity in polymers, coatings, and exterior materials.",
      products: ["H-R10", "H-PFW9", "H300", "GEN2", "SGX", "SGT", "SEXQ", "SEXT", "SAPOE", "VCOAT", "NFC"],
    },
    {
      id: "Element9",
      name: "Easy-to-Clean",
      description:
        "Reduces surface adhesion of dirt, oils, and contaminants, allowing quick removal with minimal effort. Ideal for glass, metal, plastics, and painted surfaces.",
      products: ["H-R10", "H-PFW9", "H300", "GEN2", "SGX", "SGT", "SEXQ", "SEXT", "VCOAT", "NFC"],
    },
    {
      id: "Element10",
      name: "Food Grade",
      description:
        "Complies with food safety standards for direct or indirect contact. Non-toxic, odorless, and resistant to microbial contamination, used in processing, packaging, and storage applications.",
      products: ["SGX", "SGT", "VCOAT"],
    },
    {
      id: "Element11",
      name: "Self-Cleaning",
      description:
        "Utilizes photocatalytic or superhydrophobic properties to break down or repel contaminants. Keeps surfaces visibly clean while minimizing manual cleaning frequency and resource consumption.",
      products: ["H-R10", "H-PFW9", "H300", "GEN2", "UED", "SGX", "SGT", "SEXQ", "SEXT", "VCOAT", "NFC"],
    },
    {
      id: "Element12",
      name: "Sol-Gel",
      description:
        "A wet-chemical process that forms glass-like or ceramic coatings at low temperatures. Enables ultra-thin films with tunable properties like hardness, transparency, or resistance performance.",
      products: ["H-R10", "H-PFW9", "H300", "GEN2", "UED", "SGX", "SGT", "SEXQ", "SEXT", "VCOAT", "NFC"],
    },
    {
      id: "Element15",
      name: "Transparency",
      description:
        "Maintains full or partial optical clarity without compromising functional properties. Suitable for use on glass, plastics, and transparent displays in architectural and electronic sectors.",
      products: ["H-PFW9", "GEN2", "SGX", "SGT", "SEXQ", "SEXT", "VCOAT", "NFC"],
    },
    {
      id: "Element16",
      name: "Wear Resistance",
      description:
        "Improves surface durability against mechanical abrasion, friction, and repeated contact. Extends service life of components in high-use or high-stress industrial environments.",
      products: ["H-PFW9", "GEN2", "SGX", "SGT", "SEXQ", "SAPOE", "VCOAT", "NFC"],
    },
  ];

  const PRODUCTS = [
    {
      id: "H-R10",
      name: "Hirec®-R",
      family: "HIREC",
      routeIds: ["hirec-route"],
      description:
        "Advanced superhydrophobic anti-icing polymer route for uptime-critical assets exposed to freeze-thaw cycling, water loading, and weather-driven maintenance pressure.",
      summary:
        "Best suited for assets where rapid water shedding, snow-release behavior, and reduced service intervention are commercially more important than optical clarity.",
      attributes: {
        "Anti-Ice": 92,
        "Anti-Corrosion": 74,
        "Chemical Resistance": 63,
        Hydrophobic: 100,
        Superhydrophobic: 84,
        "Self-Cleaning": 100,
        "UVProtection": 62,
        Transparency: 4,
        "Wear Resistance": 47,
        "Eco Friendly": 52,
      },
      hasSolGel: true,
    },
    {
      id: "H-PFW9",
      name: "Hirecp® PFW9",
      family: "HIREC",
      routeIds: ["hirec-route"],
      description:
        "Semi-translucent anti-icing coating for severe weather exposure where long-duration water and ice repellency must coexist with industrial durability and useful optical transmission.",
      summary:
        "Strong candidate for wind, telecom, and exposed equipment programs that need a more transmissive HIREC platform than fully opaque anti-icing chemistries.",
      attributes: {
        "Anti-Ice": 93,
        "Anti-Corrosion": 72,
        "Chemical Resistance": 71,
        Hydrophobic: 100,
        Superhydrophobic: 85,
        "Self-Cleaning": 89,
        "UV Protection": 69,
        Transparency: 87,
        "Wear Resistance": 66,
        "Eco Friendly": 52,
      },
      hasSolGel: true,
    },
    {
      id: "H-PFS9",
      name: "Hirec® PFS9",
      family: "HIREC",
      routeIds: ["hirec-route"],
      description:
        "Semi-translucent HIREC anti-icing platform positioned for harsh operating envelopes where ice-release reliability and durable water repellency are the primary value drivers.",
      summary:
        "Commercially framed as a deployment-ready anti-icing option for infrastructure and energy assets that need similar functionality to PFW9 in a separate product code.",
      attributes: {
        "Anti-Ice": 93,
        "Anti-Corrosion": 72,
        "Chemical Resistance": 71,
        Hydrophobic: 100,
        Superhydrophobic: 85,
        "Self-Cleaning": 89,
        "UV Protection": 69,
        Transparency: 87,
        "Wear Resistance": 66,
        "Eco Friendly": 52,
      },
      hasSolGel: true,
    },
    {
      id: "GEN2",
      name: "Gentoo™",
      family: "Gentoo",
      routeIds: ["gentoo-route"],
      description:
        "Transparent barrier coating combining hydrophobic, oleophobic, and abrasion-resistant performance for corrosion-sensitive and inspection-visible substrates.",
      summary:
        "Well aligned to industrial, aerospace, and defense use cases where barrier function, clarity, and durability must be balanced in one thin-film system.",
      attributes: {
        "Anti-Ice": 67,
        "Anti-Corrosion": 94,
        "Chemical Resistance": 96,
        Hydrophobic: 73,
        "Wear Resistance": 89,
        "Eco Friendly": 71,
        "Self-Cleaning": 75,
        "UV Protection": 51,
        Transparency: 98,
        Superhydrophobic: 0,
      },
      hasSolGel: true,
    },
    {
      id: "UED",
      name: "Ultra-Ever Dry™",
      family: "Ultra-Ever Dry",
      routeIds: ["hirec-route"],
      description:
        "Industrial-grade superhydrophobic and oleophobic coating that prioritizes aggressive liquid repellency, anti-wetting behavior, and visible self-cleaning texture over optical transparency.",
      summary:
        "Most relevant where extreme repellency matters more than appearance and where a textured translucent-white finish is acceptable.",
      attributes: {
        "Anti-Ice": 77,
        "Anti-Corrosion": 82,
        "Chemical Resistance": 74,
        Hydrophobic: 100,
        Superhydrophobic: 94,
        "Eco Friendly": 75,
        "Self-Cleaning": 81,
        Transparency: 42,
        "Wear Resistance": 16,
        "UV Protection": 38,
      },
      hasSolGel: true,
    },
    {
      id: "SGX",
      name: "SurfaceGuard-X",
      family: "SurfaceGuard",
      routeIds: ["gentoo-route", "solarex-sio2-route"],
      description:
        "SiO₂-based ceramic nanocoating delivering transparent barrier protection, hydrophobic release, and broad industrial durability with strong sustainability and hygiene positioning.",
      summary:
        "Suitable when the buyer needs a glass-clear, multi-function barrier layer that can support corrosion control, food-grade narratives, and easy maintenance in one offer.",
      attributes: {
        "Anti-Corrosion": 75,
        "Chemical Resistance": 81,
        Hydrophobic: 77,
        Transparency: 99,
        "Anti-Microbial": 71,
        "Anti-Bacterial": 75,
        "Food Grade": 91,
        "Wear Resistance": 79,
        "UV Protection": 69,
        "Eco Friendly": 92,
        "Self-Cleaning": 61,
        "Anti-Ice": 53,
        Superhydrophobic: 0,
      },
      hasSolGel: true,
    },
    {
      id: "SGT",
      name: "SurfaceGuard-T",
      family: "SurfaceGuard",
      routeIds: ["solarex-tio2-route"],
      description:
        "TiO₂–based transparent photocatalytic coating optimized for antimicrobial, self-cleaning, and UV-stable surface performance in hygiene-sensitive and moisture-prone settings.",
      summary:
        "Strong fit for environments where hydrophilic self-cleaning and antimicrobial value creation are more important than hydrophobic beading behavior.",
      attributes: {
        "Easy-to-Clean": undefined,
        Transparency: 99,
        "Anti-Microbial": 86,
        "Anti-Bacterial": 83,
        "Food Grade": 83,
        "Wear Resistance": 44,
        "UV Protection": 89,
        "Eco Friendly": 93,
        "Self-Cleaning": 98,
        "Anti-Ice": 10,
        Superhydrophobic: 0,
        "Anti-Corrosion": 31,
        "Chemical Resistance": 28,
        Hydrophobic: 0,
        Superhydrophilic: 100,
      },
      hasSolGel: true,
    },
    {
      id: "SEXQ",
      name: "SolarEX - Quartz",
      family: "SolarEX SiO₂",
      routeIds: ["solarex-sio2-route"],
      description:
        "Ultra-thin SiO₂- solar coating focused on anti-stick, easy-clean, and transparent self-cleaning protection for PV surfaces where soiling and wash frequency drive lifetime economics.",
      summary:
        "Commercially strongest when the buyer wants a passive solar easy-clean layer that preserves clarity and supports maintenance-reduction economics.",
      attributes: {
        "Anti-Ice": 70,
        "Anti-Corrosion": 77,
        "Chemical Resistance": 81,
        Hydrophobic: 77,
        "Eco Friendly": 83,
        "Self-Cleaning": 82,
        Transparency: 95,
        "Wear Resistance": 81,
        "UV Protection": 82,
        "Food Grade": 3,
        Superhydrophobic: 0,
        "Anti-Microbial": 42,
        "Anti-Bacterial": 38,
      },
      hasSolGel: true,
    },
    {
      id: "SEXT",
      name: "SolarEX - Titan",
      family: "SolarEX TiO₂",
      routeIds: ["solarex-tio2-route"],
      description:
        "TiO₀-based SolarEX route for transparent photocatalytic and hydrophilic self-cleaning performance on solar cells and modules exposed to wet, humid, or contamination-prone operating conditions.",
      summary:
        "Stronger than passive easy-clean systems when the decision case values active photocatalysis, hydrophilic wetting, and moisture-management narratives.",
      attributes: {
        "Anti-Ice": 70,
        "Anti-Corrosion": 77,
        "Chemical Resistance": 81,
        Hydrophobic: 77,
        "Eco Friendly": 83,
        "Self-Cleaning": 82,
        Transparency: 95,
        "Wear Resistance": 81,
        "UV Protection": 82,
        "Food Grade": 3,
        Superhydrophobic: 0,
        "Anti-Microbial": 42,
        "Anti-Bacterial": 38,
        Superhydrophilic: 100,
      },
      hasSolGel: true,
    },
    {
      id: "SAPOE",
      name: "SAPOE™",
      family: "SAPOE",
      routeIds: ["gentoo-route"],
      description:
        "Thermoplastic polyester nanopowder barrier coating engineered for thick, primer-free corrosion protection on steel with strong outdoor durability and structural resilience.",
      summary:
        "Best aligned to asset-life extension programs where heavy-duty corrosion protection outweighs transparency, hydrophobicity, or self-cleaning optics.",
      attributes: {
        "Anti-Corrosion": 100,
        "Chemical Resistance": 85,
        "Eco Friendly": 81,
        "Wear Resistance": 82,
        "UVProtection": 93,
        "Anti-Ice": 3,
        Hydrophobic: 0,
        Superhydrophobic: 0,
        "Self-Cleaning": 14,
        Transparency: 0,
      },
      hasSolGel: true,
    },
    {
      id: "VCOAT",
      name: "VitaCoat",
      family: "VitaCoat",
      routeIds: ["gentoo-route", "solarex-tio2-route"],
      description:
        "Transparent water-repellent nanocoating that combines antimicrobial and antibacterial activity with easy-clean behavior, food-grade relevance, and durable optical preservation.",
      summary:
        "Highly relevant for hygiene-led selling where the surface must remain clear, easy to sanitize, and visibly premium after treatment.",
      attributes: {
        "Anti-Corrosion": 74,
        "Chemical Resistance": 82,
        Transparency: 96,
        "Anti-Microbial": 99,
        "Anti-Bacterial": 99,
        "Food Grade": 88,
        Hydrophobic: 81,
        "Eco Friendly": 92,
        "Self-Cleaning": 84,
        "Wear Resistance": 80,
        "UV Protection": 81,
        "Anti-Ice": 37,
        Superhydrophobic: 0,
      },
      hasSolGel: true,
    },
    {
      id: "NFC",
      name: "NanoFloor",
      family: "NanoFloor",
      routeIds: ["gentoo-route", "solarex-tio2-route"],
      description:
        "Transparent floor-seal technology for parquet and laminate that combines antibacterial performance, easy cleaning, UV stability, and abrasion resistance in a visually discreet layer.",
      summary:
        "Commercially strongest for interior or semi-controlled assets where durability, hygiene, and retained finish quality are the lead specification criteria.",
      attributes: {
        "Chemical Resistance": 74,
        Transparency: 97,
        "Anti-Microbial": 84,
        "Anti-Bacterial": 89,
        Hydrophobic: 82,
        "Eco Friendly": 90,
        "Self-Cleaning": 78,
        "Wear Resistance": 84,
        "UVProtection": 81,
        "Anti-Ice": 37,
        Superhydrophobic: 0,
        "Food Grade": 12,
        "Anti-Corrosion": 62,
      },
      hasSolGel: true,
    },
  ];

  const PRODUCT_MAP = new Map(PRODUCTS.map((product) => [product.id, product]));
  const ELEMENTS_BY_PRODUCT = PRODUCTS.reduce((acc, product) => {
    acc[product.id] = ELEMENTS.filter((element) => element.products.includes(product.id)).map((element) => ({
      name: element.name === "Super Hydrophobic" ? "Superhydrophobic" : element.name,
      description: element.description,
    }));
    return acc;
  }, {});

  const ROUTE_PRODUCT_PRIORITY = {
    "hirec-route": ["H-R10", "H-PFW9", "H-PFS9", "UED", "GEN2", "SGX", "SAPOE", "VCOAT", "NFC", "SGT", "SEXQ", "SEXT"],
    "gentoo-route": ["GEN2", "SAPOE", "SGX", "VCOAT", "NFC", "H-R10", "H-PFW9", "H-PFS9", "UED", "SGT", "SEXQ", "SEXT"],
    "solarex-sio2-route": ["SEXQ", "SGX", "GEN2", "VCOAT", "NFC", "H-R10", "H-PFW9", "H-PFS9", "UED", "SAPOE", "SGT", "SEXT"],
    "solarex-tio2-route": ["SEXT", "SGT", "VCOAT", "NFC", "SGX", "GEN2", "SAPOE", "H-R10", "H-PFW9", "H-PFS9", "UED", "SEXQ"],
  };

  const selectedProductByRoute = Object.create(null);

  const escapeHtml = (value = "") =>
    String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  const stableBandValue = (productId, attribute, min = 35, max = 42) => {
    const seed = `${productId}:${attribute}`;
    let hash = 0;
    for (let i = 0; i < seed.length; i += 1) {
      hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
    }
    return min + (hash % (max - min + 1));
  };

  const explicitAttribute = (product, attribute) => {
    if (!Object.prototype.hasOwnProperty.call(product.attributes, attribute)) return undefined;
    return product.attributes[attribute];
  };

  const resolvedAttributeValue = (product, attribute) => {
    const explicit = explicitAttribute(product, attribute);
    if (typeof explicit === "number") return explicit;
    if (attribute === "Anti-Bacterial") {
      const antimicrobialValue = resolvedAttributeValue(product, "Anti-Microbial");
      if (!Object.prototype.hasOwnProperty.call(product.attributes, "Anti-Bacterial") && antimicrobialValue > 75) {
        return stableBandValue(product.id, attribute, 73, 88);
      }
    }
    return stableBandValue(product.id, attribute);
  };

  const displayedAttributeEntries = (product) =>
    FULL_ATTRIBUTES.map((attribute) => ({
      attribute,
      value: resolvedAttributeValue(product, attribute),
      explicit: typeof explicitAttribute(product, attribute) === "number",
    }));

  const radarAttributeEntries = (product) =>
    RADAR_ATTRIBUTES.map((attribute) => ({
      attribute,
      value: resolvedAttributeValue(product, attribute),
      explicit: typeof explicitAttribute(product, attribute) === "number",
    }));

  const isSolarEXProduct = (product) => ["SEXQ", "SEXT"].includes(product.id);

  const visibleProducts = () =>
    PRODUCTS.filter((product) => (isSolarEXProduct(product) ? state.asset === "solar" : true));

  const orderedProductsForRoute = (route) => {
    const visible = visibleProducts();
    const priority = ROUTE_PRODUCT_PRIORITY[route.id] || PRODUCTS.map((product) => product.id);
    const prioritySet = new Set(priority);
    const ordered = priority
      .map((id) => PRODUCT_MAP.get(id))
      .filter((product) => product && visible.some((visibleProduct) => visibleProduct.id === product.id));
    const tail = visible.filter((product) => !prioritySet.has(product.id));
    return ordered.concat(tail);
  };

  const resolveActiveProduct = (route) => {
    const products = orderedProductsForRoute(route);
    const preferredId = selectedProductByRoute[route.id];
    const preferred = products.find((product) => product.id === preferredId);
    if (preferred) return preferred;
    selectedProductByRoute[route.id] = products[0]?.id || null;
    return products[0] || null;
  };

  const glossaryMarkup = (entries) =>
    entries
      .map(({ attribute, explicit }) => {
        const meta = ATTRIBUTE_META[attribute];
        if (!meta) return "";
        return `
          <div class="attribute-glossary-row">
            <strong>${escapeHtml(attribute)}</strong>
            <span>${escapeHtml(meta.short)} ${escapeHtml(meta.measure)} ${explicit ? "" : "Backfilled to the 35–42 band when the uploaded overview did not provide a product-specific value."}</span>
          </div>
        `;
      })
      .join("");

  const elementPillsMarkup = (product) => {
    const linked = ELEMENTS_BY_PRODUCT[