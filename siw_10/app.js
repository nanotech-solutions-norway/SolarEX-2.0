const STORAGE_KEY = "siw_workspace_v20";
const DEFAULT_STATE = {
  industry: "",
  application: "",
  asset: "",
  substrate: "",
  challenge: "",
  conditions: [],
  compare: [],
  reviewedEvidence: [],
  boundaryReviewed: false,
};

const EXPLAINERS = {
  icing: {
    what:
      "Ice formation increases adhesion, mass loading, safety risk, and operational interruption on exposed assets. The route should reduce retention and support rapid shedding rather than merely add generic water repellency.",
    why:
      "For telecom and wind assets, icing is fundamentally an availability problem. The correct path is the one that lowers operational disruption and maintenance burden under real cold-weather exposure.",
  },
  rainfade: {
    what:
      "Water-film formation on exposed RF surfaces can increase attenuation and extend fade duration. The correct route is driven by how quickly water leaves the surface, not by generic outdoor durability claims.",
    why:
      "Microwave and radome performance penalties come from retained water films during severe weather windows. Buyers need a route that protects uptime, not only a low-friction coating label.",
  },
  moisture: {
    what:
      "Moisture ingress changes surface behavior, increases contamination retention, and can accelerate corrosion or electrical risk. The right route depends on whether the problem is exposure control, corrosion control, or electronics weatherproofing.",
    why:
      "Without a clear distinction between barrier need and water-repellency need, users can over-specify the wrong product family and still fail the operating environment.",
  },
  corrosion: {
    what:
      "Corrosion is a cumulative exposure problem driven by salt, chemistry, moisture cycles, and time. The workspace should separate transparent inspection-friendly barriers from heavy-duty long-life barrier systems.",
    why:
      "Buyers often need both durability and governance-ready proof. The recommendation must show why one barrier route is preferable for inspection visibility, maintenance strategy, or service-life priorities.",
  },
  dust: {
    what:
      "Dust-led fouling is primarily an anti-soiling and cleanability problem. The correct route depends on whether the environment is abrasive and dry or organic and self-cleaning responsive.",
    why:
      "Hydrophobic and photocatalytic pathways solve different contamination profiles. SIW should keep that distinction explicit so the fit logic remains trustworthy.",
  },
  organic: {
    what:
      "Organic loading, pollen, and biological residues often benefit from self-cleaning pathways rather than purely hydrophobic surfaces. The right fit is driven by contamination chemistry and cleaning strategy.",
    why:
      "Users should understand why a daylight-activated route can outperform a passive anti-soiling route when organics dominate the contamination burden.",
  },
  selfclean: {
    what:
      "Self-cleaning use cases depend on surface energy behavior and contaminant profile. The goal is not novelty but a measurable reduction in cleaning frequency and retained contamination.",
    why:
      "B2B users need a route that is easy to justify internally, so the explanation must connect the mechanism to maintenance reduction and operational appearance.",
  },
  microbial: {
    what:
      "Microbial-load scenarios require both efficacy proof and boundary transparency. Users need to see what has been tested, under which conditions, and where the evidence should not be overstated.",
    why:
      "Trust in antimicrobial claims depends on direct standards evidence, clear limits, and visible durability framing. SIW should make that evidence accessible without forcing users to leave the workflow.",
  },
  cleaning: {
    what:
      "Cleaning-burden scenarios are driven by maintenance frequency, stain retention, and route durability. The correct path should reduce manual effort while staying honest about abrasion limits.",
    why:
      "A lower-cleaning narrative only builds trust when the route also explains what it can and cannot sustain in the field.",
  },
  wear: {
    what:
      "Wear is a severity problem. The route needs to match traffic, abrasion mode, and maintenance regime rather than relying on generalized durability language.",
    why:
      "Floor and service-zone use cases require a defensible balance between surface preservation, cleaning behavior, and operational practicality.",
  },
  uv: {
    what:
      "UV exposure can degrade appearance and coating function over time. The fit decision should link UV resistance to the broader environment rather than treat it in isolation.",
    why:
      "UV rarely acts alone. SIW should position it alongside corrosion, weathering, or maintenance burden so the final selection stays realistic.",
  },
  chemical: {
    what:
      "Chemical-exposure cases require barrier integrity, not cosmetic protection. The fit logic should surface the correct route based on barrier type and expected operating severity.",
    why:
      "Users evaluating harsh environments need a route that is backed by deployment logic and boundary conditions, not only performance adjectives.",
  },
};

const DATA = {
  industries: [
    ["telecom", "Telecom"],
    ["wind", "Wind Energy"],
    ["solar", "Solar Energy"],
    ["offshore", "Offshore & Marine"],
    ["buildings", "Buildings & Infrastructure"],
    ["healthcare", "Healthcare"],
    ["industrial-floor", "Industrial Flooring"],
  ],
  applications: [
    {
      id: "antenna-icing",
      industry: "telecom",
      label: "Antenna / radome anti-icing",
      assets: [
        ["radome", "Radome"],
        ["dish", "Microwave dish"],
        ["antenna", "Antenna panel"],
      ],
      substrates: [
        ["polymer", "Polymer / composite"],
        ["fiberglass", "Fiberglass"],
        ["painted-metal", "Painted metal"],
      ],
      challenges: [
        ["icing", "Ice buildup"],
        ["rainfade", "Rain fade"],
        ["moisture", "Moisture ingress"],
      ],
      conditions: ["Cold climate", "Wind-driven rain", "High uptime requirement"],
    },
    {
      id: "telecom-weatherproofing",
      industry: "telecom",
      label: "Outdoor electronics weatherproofing",
      assets: [
        ["cabinet", "Outdoor cabinet"],
        ["connector", "Connector"],
        ["board", "Exposed electronics"],
      ],
      substrates: [
        ["metal", "Metal"],
        ["polymer", "Polymer"],
        ["electronics", "Electronic assembly"],
      ],
      challenges: [
        ["moisture", "Moisture ingress"],
        ["corrosion", "Salt corrosion"],
        ["dust", "Dust / dirt"],
      ],
      conditions: ["Outdoor exposure", "Salt air", "Fast maintenance access"],
    },
    {
      id: "blade-antiicing",
      industry: "wind",
      label: "Wind turbine anti-icing",
      assets: [
        ["blade", "Blade"],
        ["nacelle", "Nacelle intake"],
        ["sensor", "Weather sensor"],
      ],
      substrates: [
        ["composite", "Composite"],
        ["coated-composite", "Coated composite"],
        ["polymer", "Polymer"],
      ],
      challenges: [
        ["icing", "Ice buildup"],
        ["snow", "Snow adhesion"],
        ["uptime", "Winter downtime"],
      ],
      conditions: ["Sub-zero operation", "High wind speed", "Safety shutdown risk"],
    },
    {
      id: "wind-corrosion",
      industry: "wind",
      label: "Wind structure corrosion control",
      assets: [
        ["tower", "Tower"],
        ["platform", "Platform"],
        ["housing", "Equipment housing"],
      ],
      substrates: [
        ["steel", "Steel"],
        ["aluminum", "Aluminum"],
        ["galvanized", "Galvanized steel"],
      ],
      challenges: [
        ["corrosion", "Corrosion"],
        ["salt", "Salt spray"],
        ["uv", "UV exposure"],
      ],
      conditions: ["Marine atmosphere", "Long service life", "Low maintenance"],
    },
    {
      id: "solar-selfclean",
      industry: "solar",
      label: "Solar glass self-cleaning",
      assets: [
        ["pv-glass", "PV glass"],
        ["module", "Solar module"],
        ["array", "Solar array"],
      ],
      substrates: [
        ["glass", "Glass"],
        ["coated-glass", "Coated glass"],
      ],
      challenges: [
        ["soiling", "Dust / pollen soiling"],
        ["organic", "Organic contamination"],
        ["yield", "Energy yield loss"],
      ],
      conditions: ["Utility scale", "Low cleaning budget", "Pollen or organic load"],
    },
    {
      id: "solar-hydrophobic",
      industry: "solar",
      label: "Solar anti-soiling hydrophobic route",
      assets: [
        ["pv-glass", "PV glass"],
        ["module", "Solar module"],
      ],
      substrates: [["glass", "Glass"]],
      challenges: [
        ["dust", "Dust"],
        ["water", "Water spotting"],
        ["yield", "Energy yield loss"],
      ],
      conditions: ["Abrasive dust", "Desert or rooftop", "Reduced wash cycles"],
    },
    {
      id: "offshore-corrosion",
      industry: "offshore",
      label: "Offshore corrosion protection",
      assets: [
        ["pipe", "Pipe"],
        ["deck", "Deck steel"],
        ["valve", "Valve / fitting"],
      ],
      substrates: [
        ["steel", "Steel"],
        ["aluminum", "Aluminum"],
        ["galvanized", "Galvanized steel"],
      ],
      challenges: [
        ["corrosion", "Corrosion"],
        ["chemical", "Chemical exposure"],
        ["salt", "Salt spray"],
      ],
      conditions: ["Splash zone", "Inspection visibility", "Long design life"],
    },
    {
      id: "building-protection",
      industry: "buildings",
      label: "Building surface protection",
      assets: [
        ["facade", "Facade"],
        ["railing", "Railing"],
        ["concrete", "Concrete element"],
        ["touchpoint", "Touchpoint"],
      ],
      substrates: [
        ["glass", "Glass"],
        ["steel", "Steel"],
        ["concrete", "Concrete"],
        ["painted-metal", "Painted metal"],
        ["polymer", "Polymer"],
      ],
      challenges: [
        ["selfclean", "Self-cleaning"],
        ["corrosion", "Corrosion"],
        ["graffiti", "Graffiti / easy-clean"],
        ["microbial", "Microbial load"],
      ],
      conditions: ["Urban pollution", "Visible finish", "Lower cleaning frequency"],
    },
    {
      id: "hygiene-surfaces",
      industry: "healthcare",
      label: "Antimicrobial contact surfaces",
      assets: [
        ["touchpoint", "Touchpoint"],
        ["hvac", "HVAC surface"],
        ["room", "Clinical room surface"],
        ["screen", "Screen / kiosk"],
      ],
      substrates: [
        ["metal", "Metal"],
        ["polymer", "Polymer"],
        ["painted", "Painted surface"],
        ["glass", "Glass"],
      ],
      challenges: [
        ["microbial", "Microbial load"],
        ["cleaning", "Cleaning burden"],
      ],
      conditions: ["Continuous hygiene", "High-touch area", "Indoor use"],
    },
    {
      id: "floor-protection",
      industry: "industrial-floor",
      label: "Floor wear and hygiene protection",
      assets: [
        ["floor", "Floor"],
        ["walkway", "Walkway"],
        ["service-zone", "Service zone"],
      ],
      substrates: [
        ["concrete", "Concrete"],
        ["epoxy", "Epoxy floor"],
        ["tile", "Tile"],
        ["laminate", "Laminate / parquet"],
      ],
      challenges: [
        ["wear", "Wear"],
        ["cleaning", "Cleaning burden"],
        ["microbial", "Microbial load"],
      ],
      conditions: ["High traffic", "Wet cleaning", "Slip control"],
    },
  ],
  products: [
    {
      id: "hirec",
      label: "HIREC®",
      family: "Anti-icing nanocoating",
      apps: ["antenna-icing", "blade-antiicing"],
      substrates: ["polymer", "fiberglass", "painted-metal", "composite", "coated-composite"],
      challenges: ["icing", "rainfade", "snow", "uptime"],
      conditions: ["Cold climate", "Sub-zero operation", "High wind speed", "Safety shutdown risk"],
      fit: 84,
      evidence: 79,
      benefit: 88,
      summary:
        "Passive anti-icing route for telecom radomes, antennas, turbine blades, and exposed cold-weather surfaces.",
      notes: [
        "Best fit when icing, water-shedding, and uptime protection are the main buying drivers.",
        "Use on supported polymer, composite, or coated external surfaces. Validate substrate preparation before deployment.",
      ],
      boundary:
        "Not a universal barrier answer for every weathering problem. Use when icing and wet-surface operational loss are primary rather than deep corrosion control.",
      attributes: ["Superhydrophobic / water shedding", "Ice and snow mitigation", "Outdoor asset focus"],
      docs: [
        ["Telecom anti-icing overview", "./proof.html"],
        ["Request technical consult", "./handoff.html?intent=technical-consult&solution=HIREC"],
      ],
      action: ["Request technical consult", "./handoff.html?intent=technical-consult&solution=HIREC"],
      evidenceItems: [
        {
          title: "Operational anti-icing fit",
          summary: "Use where reduced ice adhesion, faster shedding, and uptime continuity matter most.",
          metrics: ["Telecom / wind", "Water-shedding route", "Outdoor asset focus"],
          sections: [
            ["Why it fits", "This route is positioned for exposed outdoor assets where ice adhesion and retained water films drive operational disruption."],
            ["What to validate", "Confirm substrate compatibility, application method, and winter operating severity before rollout."],
          ],
        },
      ],
    },
    {
      id: "ultra-ever-dry",
      label: "Ultra-Ever Dry®",
      family: "Water-repellency system",
      apps: ["telecom-weatherproofing"],
      substrates: ["metal", "polymer", "electronics"],
      challenges: ["moisture", "dust"],
      conditions: ["Outdoor exposure", "Fast maintenance access"],
      fit: 76,
      evidence: 61,
      benefit: 73,
      summary:
        "Water-repellent route for exposed telecom electronics, cabinets, and connectors where moisture ingress is the main problem.",
      notes: [
        "Best fit for weatherproofing-led scenarios rather than corrosion-first capital-protection scenarios.",
        "Validate cabinet geometry, maintenance access, and shielding requirements before specification.",
      ],
      boundary:
        "Do not substitute this route for long-life corrosion control when the actual problem is marine durability or structural barrier performance.",
      attributes: ["Fast deployment", "Water repellency", "Electronics-adjacent weatherproofing"],
      docs: [["Weatherproofing overview", "./proof.html"]],
      action: ["Request product review", "./handoff.html?intent=sample-request&solution=Ultra-Ever-Dry"],
      evidenceItems: [
        {
          title: "Weatherproofing route note",
          summary: "Use where fast operational mitigation on smaller or more complex surfaces is needed.",
          metrics: ["Fast deployment", "Moisture mitigation"],
          sections: [
            ["Boundary condition", "Use higher-durability barrier routes where long-life corrosion mitigation is the main requirement."],
          ],
        },
      ],
    },
    {
      id: "gentoo",
      label: "Gentoo™",
      family: "Transparent corrosion barrier coating",
      apps: ["telecom-weatherproofing", "wind-corrosion", "offshore-corrosion", "building-protection"],
      substrates: ["steel", "aluminum", "galvanized", "painted-metal", "metal"],
      challenges: ["corrosion", "salt", "chemical", "graffiti"],
      conditions: ["Salt air", "Marine atmosphere", "Long service life", "Inspection visibility"],
      fit: 81,
      evidence: 74,
      benefit: 84,
      summary:
        "Transparent or low-build corrosion-control route for exposed metal assets needing durability and easier cleaning.",
      notes: [
        "Strong fit for coastal telecom, offshore, and infrastructure metal where inspection visibility still matters.",
        "Best where transparency or easier inspection matters more than maximum-film barrier mass.",
      ],
      boundary:
        "Not the preferred route when the brief demands the heaviest-duty thermoplastic barrier system rather than a transparent inspection-friendly barrier.",
      attributes: ["Sol-gel transparent barrier", "Chemical resistance", "Marine / infrastructure fit"],
      docs: [
        ["Anti-corrosion overview", "./proof.html"],
        ["Request RFQ", "./handoff.html?intent=rfq-request&solution=Gentoo"],
      ],
      action: ["Request RFQ", "./handoff.html?intent=rfq-request&solution=Gentoo"],
      evidenceItems: [
        {
          title: "Barrier coating positioning",
          summary: "Positioned for corrosion mitigation and improved water repellency in marine, offshore, and infrastructure contexts.",
          metrics: ["Thin-film protection", "Marine / infrastructure"],
          sections: [
            ["Why it fits", "Use where visual appearance, easier cleaning, and inspection visibility matter alongside corrosion reduction."],
          ],
        },
      ],
    },
    {
      id: "sapoe",
      label: "SAPOE®",
      family: "Thermoplastic polyester powder coating",
      apps: ["wind-corrosion", "offshore-corrosion", "building-protection"],
      substrates: ["steel", "galvanized", "concrete"],
      challenges: ["corrosion", "chemical", "salt", "uv"],
      conditions: ["Long design life", "Marine atmosphere", "Splash zone"],
      fit: 78,
      evidence: 70,
      benefit: 82,
      summary:
        "Heavy-duty long-life barrier route for steel, galvanized infrastructure, and harsh outdoor exposure.",
      notes: [
        "Use where maximum design-life protection matters more than transparency or low-build appearance.",
        "Strong route for infrastructure and offshore steel with harsh exposure severity.",
      ],
      boundary:
        "Not the preferred route when transparency, low-build appearance, or inspection-first use cases dominate the specification logic.",
      attributes: ["Thermoplastic barrier", "UV and chemical resistance", "Long service-life positioning"],
      docs: [["Barrier coating overview", "./proof.html"]],
      action: ["Request corrosion review", "./handoff.html?intent=technical-consult&solution=SAPOE"],
      evidenceItems: [
        {
          title: "Long-life barrier route",
          summary: "Positioned as a long-life anti-corrosion barrier with strong UV and chemical resistance.",
          metrics: ["Long service life", "Steel / galvanized focus"],
          sections: [["Why it fits", "Use where lifecycle maintenance reduction is the main business case."]],
        },
      ],
    },
    {
      id: "solarex-tio2",
      label: "SolarEX™ TiO₂",
      family: "Self-cleaning solar coating",
      apps: ["solar-selfclean"],
      substrates: ["glass", "coated-glass"],
      challenges: ["soiling", "organic", "yield"],
      conditions: ["Utility scale", "Low cleaning budget", "Pollen or organic load"],
      fit: 86,
      evidence: 83,
      benefit: 87,
      summary:
        "Photocatalytic self-cleaning route for solar glass where organic contamination, pollen, and maintenance burden drive losses.",
      notes: [
        "Best fit when self-cleaning and restored yield are the main objectives.",
        "Use where organic loading or pollen drives repeated cleaning rather than abrasive dry dust alone.",
      ],
      boundary:
        "Do not position this route as the default answer for abrasive dust-led environments where a hydrophobic path may fit better.",
      attributes: ["Photocatalytic", "Self-cleaning", "PV yield support"],
      docs: [["Solar performance route", "./proof.html"]],
      action: ["Request solar consult", "./handoff.html?intent=technical-consult&solution=SolarEX-TiO2"],
      evidenceItems: [
        {
          title: "PV self-cleaning route",
          summary: "Use when organic contamination and maintenance burden dominate the case.",
          metrics: ["Photocatalytic pathway", "Solar glass"],
          sections: [["Boundary condition", "Not the preferred route for abrasive dust-led scenarios."]],
        },
      ],
    },
    {
      id: "solarex-sio2",
      label: "SolarEX™ SiO₂",
      family: "Hydrophobic solar route",
      apps: ["solar-hydrophobic"],
      substrates: ["glass"],
      challenges: ["dust", "water", "yield"],
      conditions: ["Abrasive dust", "Desert or rooftop", "Reduced wash cycles"],
      fit: 82,
      evidence: 71,
      benefit: 79,
      summary:
        "Hydrophobic anti-soiling route for solar glass where dust shedding and easier rinse-off are the main priorities.",
      notes: [
        "Best fit for dust-led rather than photocatalytic self-cleaning use cases.",
        "Use where abrasive dust and lower wash frequency dominate the business case.",
      ],
      boundary:
        "Not the preferred route for organic-load-driven self-cleaning cases where a photocatalytic mechanism is the actual fit.",
      attributes: ["Hydrophobic", "Non-stick anti-soiling", "PV cleaning interval support"],
      docs: [["Hydrophobic solar route", "./proof.html"]],
      action: ["Request solar sample", "./handoff.html?intent=sample-request&solution=SolarEX-SiO2"],
      evidenceItems: [
        {
          title: "PV hydrophobic route",
          summary: "Use where hydrophobic anti-soiling and easier rinse-off are more relevant than photocatalytic cleaning.",
          metrics: ["Hydrophobic pathway", "Dust-led scenario"],
          sections: [["Boundary condition", "Not the preferred route for organic-load-driven self-cleaning cases."]],
        },
      ],
    },
    {
      id: "pcs-antimicrobial",
      label: "PCS — Antimicrobial Surface System",
      family: "PCS modular antimicrobial route",
      apps: ["hygiene-surfaces", "building-protection"],
      substrates: ["metal", "polymer", "painted", "glass"],
      challenges: ["microbial", "cleaning"],
      conditions: ["Continuous hygiene", "High-touch area", "Indoor use"],
      fit: 92,
      evidence: 94,
      benefit: 86,
      summary:
        "Requirement-driven PCS route using the uploaded VitaCoat reports directly for high-touch, hygiene-sensitive indoor surfaces.",
      notes: [
        "PCS is modular and can be specified for antimicrobial, scratch, UV, anti-corrosion, hydrophobic, or conductivity requirements.",
        "The antimicrobial evidence shown in SIW is now extracted directly from the uploaded VitaCoat technical and test reports.",
      ],
      boundary:
        "Do not overstate the route as broadly virucidal across all virus classes or as heavy-abrasion floor proof. Non-enveloped-virus limits and non-floor durability scope remain material.",
      attributes: ["PCS modular platform", "Antimicrobial option", "Non-porous surface route", "Indoor hygiene focus"],
      docs: [
        ["Direct evidence summary", "./evidence-vitacoat.html"],
        ["Standards evidence", "./evidence-vitacoat.html#standards"],
        ["Respiratory-virus evidence", "./evidence-vitacoat.html#supplementary-virus"],
        ["Wear durability", "./evidence-vitacoat.html#wear"],
      ],
      action: ["Request hygiene consult", "./handoff.html?intent=technical-consult&solution=PCS-Antimicrobial"],
      evidenceItems: [
        {
          title: "Technical composition and persistence",
          summary:
            "Citrox bioflavonoids in a SiO₂ matrix on non-porous surfaces; technical report positions the route for up to six months under normal use.",
          metrics: ["Citrox + SiO₂", "Up to 6 months", "Glass / metal / plastic"],
          sections: [
            [
              "Direct extraction",
              "The uploaded technical report describes VitaCoat as a hybrid coating using citrus bioflavonoids embedded in a silica-based matrix, forming a thin transparent film on non-porous surfaces.",
            ],
            [
              "Use in SIW",
              "This supports the PCS antimicrobial route specifically for high-touch indoor surfaces rather than porous or heavy-abrasion use.",
            ],
          ],
        },
        {
          title: "EN 13727 bactericidal result",
          summary:
            "Neat, 5 min ± 10 s, 20°C ± 1°C, clean conditions. Report conclusion: bactericidal against Pseudomonas aeruginosa, Staphylococcus aureus, and Enterococcus hirae.",
          metrics: ["EN 13727", "5 min @ 20°C", "≥5 log requirement"],
          sections: [
            [
              "Direct extraction",
              "The uploaded EN 13727 report states VitaCoat possesses bactericidal activity against all referenced strains under the stated conditions.",
            ],
            ["Interpretation", "This is core medical-area bactericidal evidence for the antimicrobial route."],
          ],
        },
        {
          title: "EN 13624 yeasticidal result",
          summary:
            "Candida albicans, neat, 5 min ± 10 s, 20°C ± 1°C. Reported result table shows >4.22 log reduction and the report concludes yeasticidal activity.",
          metrics: ["EN 13624", "Candida albicans", ">4.22 log"],
          sections: [
            [
              "Direct extraction",
              "The uploaded EN 13624 report shows VitaCoat tested neat for 5 minutes at 20°C under clean conditions and reports >4.22 log reduction.",
            ],
            ["Interpretation", "This adds medically relevant yeast efficacy to the evidence base."],
          ],
        },
        {
          title: "EN 14476 virucidal result",
          summary:
            "Vaccinia MVA, clean conditions, 5 min + 10 s. Uploaded summary table shows VitaCoat neat >4 log reduction pass and VitaCoat 50% >4 log reduction pass.",
          metrics: ["EN 14476", "Vaccinia MVA", "Neat >4 log", "50% >4 log"],
          sections: [
            [
              "Direct extraction",
              "The uploaded EN 14476 report states the product achieved a 4-log reduction against vaccinia virus under the stipulated conditions.",
            ],
            ["Interpretation", "This supports a strong enveloped-virus position in medical-area settings."],
          ],
        },
        {
          title: "SARS-CoV-2 1-minute assay",
          summary:
            "Utah State report: full strength VitaCoat reduced SARS-CoV-2 below detection in 1 minute with LRV >2.3 and >99% reduction.",
          metrics: ["SARS-CoV-2", "1 minute", "LRV >2.3", ">99%"],
          sections: [
            ["Direct extraction", "The uploaded SARS-CoV-2 report states virus was reduced below the limit of detection after 1 minute."],
            ["Interpretation", "This is fast supplementary coronavirus evidence, separate from the EN standard route."],
          ],
        },
        {
          title: "Respiratory-virus panel",
          summary:
            "Visible panel values include hCoV-229E >1.3, hCoV-OC43 >1.6, PIV-3 >1.8, HRV-14 = 0.3, and HRV-16 = 0.4 after 1 minute.",
          metrics: ["229E >1.3", "OC43 >1.6", "PIV-3 >1.8", "HRV-14 0.3"],
          sections: [
            [
              "Direct extraction",
              "The uploaded Utah panel reports strong 1-minute activity against multiple enveloped respiratory viruses and low activity against the non-enveloped HRV strains.",
            ],
            [
              "Boundary condition",
              "Do not overstate non-enveloped virus performance; the same report also indicates adenovirus was not inactivated.",
            ],
          ],
        },
        {
          title: "Ramsden wear durability",
          summary:
            "Water contact angles: uncoated 28°, 0 touches 81°, 500 touches 81°, 1000 touches 82°, 2000 touches 76°, and 5000 touches 78°.",
          metrics: ["0 touches 81°", "5000 touches 78°", "Uncoated 28°"],
          sections: [
            [
              "Direct extraction",
              "The uploaded wear report states the coating maintained hydrophobic integrity even after 5000 simulated finger touches.",
            ],
            ["Interpretation", "This is direct persistence evidence for high-touch non-floor surfaces."],
          ],
        },
      ],
    },
    {
      id: "nanofloor",
      label: "NanoFloor",
      family: "Floor durability and hygiene route",
      apps: ["floor-protection"],
      substrates: ["concrete", "epoxy", "tile", "laminate"],
      challenges: ["wear", "cleaning", "microbial"],
      conditions: ["High traffic", "Wet cleaning", "Slip control"],
      fit: 83,
      evidence: 68,
      benefit: 80,
      summary:
        "Wear, cleaning, and hygiene route for service floors, walkways, and comparable indoor flooring substrates.",
      notes: [
        "Use where maintenance burden and floor durability dominate the brief.",
        "Floor wear conditions are generally more severe than high-touch non-floor surfaces, so evaluate traffic and cleaning regime carefully.",
      ],
      boundary:
        "Do not transfer non-floor touch-durability evidence into floor-grade wear claims. Evaluate traffic severity and cleaning frequency directly.",
      attributes: ["Floor durability", "Appearance preservation", "Reduced staining / easier cleaning"],
      docs: [["Floor system overview", "./proof.html"]],
      action: ["Request floor review", "./handoff.html?intent=rfq-request&solution=NanoFloor"],
      evidenceItems: [
        {
          title: "Floor-route positioning",
          summary:
            "Positioned for floor durability, reduced staining, easier cleaning, and comparable floor substrates such as parquet, laminate, tile, epoxy, and concrete.",
          metrics: ["Parquet / laminate / tile", "Cleaning support"],
          sections: [["Attribute fit", "Use for floor preservation and cleaning support rather than high-touch antimicrobial claims alone."]],
        },
      ],
    },
  ],
};

const els = {
  industrySelect: document.getElementById("industrySelect"),
  applicationSelect: document.getElementById("applicationSelect"),
  assetSelect: document.getElementById("assetSelect"),
  substrateSelect: document.getElementById("substrateSelect"),
  challengeSelect: document.getElementById("challengeSelect"),
  conditionChips: document.getElementById("conditionChips"),
  scenarioStatement: document.getElementById("scenarioStatement"),
  capabilityMap: document.getElementById("capabilityMap"),
  breadcrumbTrail: document.getElementById("breadcrumbTrail"),
  stepper: document.getElementById("stepper"),
  explainWhat: document.getElementById("explainWhat"),
  explainWhy: document.getElementById("explainWhy"),
  explainBecause: document.getElementById("explainBecause"),
  proofStrip: document.getElementById("proofStrip"),
  recommendationList: document.getElementById("recommendationList"),
  evidenceCards: document.getElementById("evidenceCards"),
  boundaryPanel: document.getElementById("boundaryPanel"),
  standardsPanel: document.getElementById("standardsPanel"),
  documentList: document.getElementById("documentList"),
  actionList: document.getElementById("actionList"),
  contextSummary: document.getElementById("contextSummary"),
  nextStepTitle: document.getElementById("nextStepTitle"),
  nextStepBody: document.getElementById("nextStepBody"),
  primaryActionLink: document.getElementById("primaryActionLink"),
  confidenceChecklist: document.getElementById("confidenceChecklist"),
  compareTray: document.getElementById("compareTray"),
  compareTable: document.getElementById("compareTable"),
  metricFitValue: document.getElementById("metricFitValue"),
  metricFitNote: document.getElementById("metricFitNote"),
  metricProofValue: document.getElementById("metricProofValue"),
  metricProofNote: document.getElementById("metricProofNote"),
  metricSurfaceValue: document.getElementById("metricSurfaceValue"),
  metricSurfaceNote: document.getElementById("metricSurfaceNote"),
  metricTrendValue: document.getElementById("metricTrendValue"),
  metricTrendNote: document.getElementById("metricTrendNote"),
  globalSearchInput: document.getElementById("globalSearchInput"),
  searchSuggestions: document.getElementById("searchSuggestions"),
  saveWorkspaceButton: document.getElementById("saveWorkspaceButton"),
  clearWorkspaceButton: document.getElementById("clearWorkspaceButton"),
  copySummaryButton: document.getElementById("copySummaryButton"),
  openTopEvidenceButton: document.getElementById("openTopEvidenceButton"),
  evidenceDrawer: document.getElementById("evidenceDrawer"),
  drawerBackdrop: document.getElementById("drawerBackdrop"),
  drawerTitle: document.getElementById("drawerTitle"),
  drawerSummary: document.getElementById("drawerSummary"),
  drawerMetrics: document.getElementById("drawerMetrics"),
  drawerBody: document.getElementById("drawerBody"),
  drawerActions: document.getElementById("drawerActions"),
  closeEvidenceDrawer: document.getElementById("closeEvidenceDrawer"),
  metricFit: document.getElementById("metricFit"),
  metricProof: document.getElementById("metricProof"),
  metricSurface: document.getElementById("metricSurface"),
  metricTrend: document.getElementById("metricTrend"),
};

let state = loadState();

function q(sel) {
  return document.querySelector(sel);
}

function currentApplications() {
  return DATA.applications.filter((app) => !state.industry || app.industry === state.industry);
}

function currentApplication() {
  return DATA.applications.find((app) => app.id === state.application) || null;
}

function labelFor(list, id) {
  const match = (list || []).find((item) => item[0] === id || item.id === id);
  return match ? (Array.isArray(match) ? match[1] : match.label) : "";
}

function completeScenario() {
  return Boolean(state.industry && state.application && state.asset && state.substrate && state.challenge);
}

function getRecommendations() {
  if (!completeScenario()) {
    return [];
  }

  return DATA.products
    .filter((product) => product.apps.includes(state.application) && product.substrates.includes(state.substrate))
    .map((product) => {
      let score = product.fit;
      if (product.challenges.includes(state.challenge)) score += 10;
      state.conditions.forEach((condition) => {
        if (product.conditions.includes(condition)) score += 4;
      });
      if (product.id === "pcs-antimicrobial" && state.industry === "healthcare") score += 6;
      return { ...product, score: Math.min(99, score) };
    })
    .sort((a, b) => b.score - a.score);
}

function getTopProduct() {
  return getRecommendations()[0] || null;
}

function getSearchIndex() {
  const items = [];

  DATA.industries.forEach(([id, label]) => {
    items.push({ type: "Industry", id, label, key: label.toLowerCase(), handler: () => setIndustry(id) });
  });

  DATA.applications.forEach((app) => {
    items.push({
      type: "Application",
      id: app.id,
      label: app.label,
      key: app.label.toLowerCase(),
      handler: () => {
        state.industry = app.industry;
        state.application = app.id;
        state.asset = "";
        state.substrate = "";
        state.challenge = "";
        state.conditions = [];
        renderAll();
        scrollToId("orient");
      },
    });
  });

  DATA.products.forEach((product) => {
    items.push({
      type: "Product",
      id: product.id,
      label: product.label,
      key: `${product.label} ${product.family} ${product.summary}`.toLowerCase(),
      handler: () => {
        openDrawer(buildProductPayload(product));
        scrollToId("fit");
      },
    });

    (product.evidenceItems || []).forEach((item, index) => {
      items.push({
        type: "Evidence",
        id: `${product.id}:${index}`,
        label: item.title,
        key: `${item.title} ${item.summary}`.toLowerCase(),
        handler: () => {
          openDrawer(buildEvidencePayload(product, index));
          scrollToId("prove");
        },
      });
    });
  });

  return items;
}

function setIndustry(industryId) {
  state.industry = industryId;
  state.application = "";
  state.asset = "";
  state.substrate = "";
  state.challenge = "";
  state.conditions = [];
  state.boundaryReviewed = false;
  renderAll();
}

function serializeState() {
  const params = new URLSearchParams();
  if (state.industry) params.set("industry", state.industry);
  if (state.application) params.set("application", state.application);
  if (state.asset) params.set("asset", state.asset);
  if (state.substrate) params.set("substrate", state.substrate);
  if (state.challenge) params.set("challenge", state.challenge);
  if (state.conditions.length) params.set("conditions", state.conditions.join(","));
  const url = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ""}${window.location.hash}`;
  window.history.replaceState({}, "", url);
}

function loadState() {
  const merged = { ...DEFAULT_STATE };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      Object.assign(merged, JSON.parse(raw));
    }
  } catch (error) {}

  const params = new URLSearchParams(window.location.search);
  const urlState = {
    industry: params.get("industry") || merged.industry,
    application: params.get("application") || merged.application,
    asset: params.get("asset") || merged.asset,
    substrate: params.get("substrate") || merged.substrate,
    challenge: params.get("challenge") || merged.challenge,
    conditions: params.get("conditions") ? params.get("conditions").split(",").filter(Boolean) : merged.conditions,
  };

  return { ...merged, ...urlState };
}

function persistState() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {}
  serializeState();
}

function optionMarkup(list, selected, placeholder) {
  return [`<option value="">${placeholder}</option>`]
    .concat(
      list.map((item) => {
        const id = Array.isArray(item) ? item[0] : item.id;
        const label = Array.isArray(item) ? item[1] : item.label;
        return `<option value="${id}" ${id === selected ? "selected" : ""}>${label}</option>`;
      })
    )
    .join("");
}

function renderForm() {
  const applications = currentApplications();
  if (!applications.find((app) => app.id === state.application)) state.application = "";
  const app = currentApplication();
  const assets = app ? app.assets : [];
  const substrates = app ? app.substrates : [];
  const challenges = app ? app.challenges : [];
  const conditions = app ? app.conditions : [];

  if (!assets.find((item) => item[0] === state.asset)) state.asset = "";
  if (!substrates.find((item) => item[0] === state.substrate)) state.substrate = "";
  if (!challenges.find((item) => item[0] === state.challenge)) state.challenge = "";
  state.conditions = state.conditions.filter((condition) => conditions.includes(condition));

  els.industrySelect.innerHTML = optionMarkup(DATA.industries, state.industry, "Select industry");
  els.applicationSelect.innerHTML = optionMarkup(applications, state.application, "Select application");
  els.assetSelect.innerHTML = optionMarkup(assets, state.asset, "Select asset");
  els.substrateSelect.innerHTML = optionMarkup(substrates, state.substrate, "Select substrate");
  els.challengeSelect.innerHTML = optionMarkup(challenges, state.challenge, "Select primary challenge");

  els.applicationSelect.disabled = !state.industry;
  els.assetSelect.disabled = !app;
  els.substrateSelect.disabled = !app;
  els.challengeSelect.disabled = !app;

  els.conditionChips.innerHTML = conditions.length
    ? conditions
        .map(
          (condition) =>
            `<button class="chip-button ${state.conditions.includes(condition) ? "is-active" : ""}" type="button" data-condition="${condition}">${condition}</button>`
        )
        .join("")
    : `<div class="empty-panel-copy">Operating conditions will appear after application selection.</div>`;
}

function renderCapabilityMap() {
  els.capabilityMap.innerHTML = DATA.industries
    .map(([industryId, industryLabel]) => {
      const apps = DATA.applications.filter((app) => app.industry === industryId);
      return `
        <button class="capability-card" type="button" data-set-industry="${industryId}">
          <strong>${industryLabel}</strong>
          <p class="card-copy">Choose an entry path by industry, then refine to the exact application.</p>
          <div class="capability-links">
            ${apps
              .slice(0, 3)
              .map(
                (app) =>
                  `<span class="capability-button" data-set-application="${app.id}" data-parent-industry="${industryId}">${app.label}</span>`
              )
              .join("")}
          </div>
        </button>
      `;
    })
    .join("");
}

function renderBreadcrumbs() {
  const app = currentApplication();
  const crumbs = [
    ["Workspace", "#orient"],
    [state.industry ? labelFor(DATA.industries, state.industry) : "Select industry", "#orient"],
    [app ? app.label : "Select application", "#orient"],
    [state.asset ? labelFor(app?.assets || [], state.asset) : "Select asset", "#orient"],
  ];

  els.breadcrumbTrail.innerHTML = crumbs
    .map(([label, href]) => `<a class="breadcrumb-chip" href="${href}">${label}</a>`)
    .join("");
}

function stageStatus(recommendations) {
  const evidenceReady = state.reviewedEvidence.length > 0;
  const fitReady = recommendations.length > 0;
  const orientDone = completeScenario();
  return [
    { id: "orient", label: "Orient", done: orientDone, current: !orientDone },
    { id: "explain", label: "Explain", done: orientDone, current: orientDone && !fitReady },
    { id: "fit", label: "Fit", done: fitReady, current: orientDone && fitReady && !evidenceReady },
    { id: "prove", label: "Prove", done: evidenceReady, current: fitReady && !evidenceReady },
    { id: "act", label: "Act", done: false, current: fitReady && evidenceReady },
  ];
}

function renderStepper(recommendations) {
  els.stepper.innerHTML = stageStatus(recommendations)
    .map((step) => {
      const classes = ["step-chip"];
      if (step.done) classes.push("is-complete");
      if (step.current) classes.push("is-current");
      return `<a class="${classes.join(" ")}" href="#${step.id}">${step.done ? "✓" : "•"} ${step.label}</a>`;
    })
    .join("");
}

function renderScenarioStatement(recommendations) {
  if (!completeScenario()) {
    els.scenarioStatement.className = "statement-box statement-empty";
    els.scenarioStatement.textContent =
      "Select industry, application, asset, substrate, and challenge to generate the workspace state.";
    return;
  }

  const app = currentApplication();
  const top = recommendations[0];
  els.scenarioStatement.className = "statement-box";
  els.scenarioStatement.textContent = top
    ? `${labelFor(DATA.industries, state.industry)} → ${app.label} → ${labelFor(app.assets, state.asset)} on ${labelFor(
        app.substrates,
        state.substrate
      )}. Best current fit: ${top.label}.`
    : `${labelFor(DATA.industries, state.industry)} → ${app.label} selected, but no direct compatibility result is currently available for ${labelFor(
        app.substrates,
        state.substrate
      )}.`;
}

function renderExplain(recommendations) {
  const app = currentApplication();
  const explainer = EXPLAINERS[state.challenge] || {
    what: "Select a scenario to activate the explanation layer.",
    why: "The workspace explanation layer ties the active problem to the right evaluation path.",
  };
  const top = recommendations[0];
  const because = !completeScenario()
    ? "Once the minimum scenario is defined, SIW will explain why a specific route is being recommended and where its limits sit."
    : top
    ? `${top.label} is currently leading because it aligns with the selected application, substrate, challenge, and condition pattern. ${top.notes[0]}`
    : "The current combination does not produce a supported route. Adjust the scenario to restore a defensible fit result.";

  els.explainWhat.textContent = explainer.what;
  els.explainWhy.textContent = explainer.why;
  els.explainBecause.textContent = because;

  const proofItems = top ? top.evidenceItems.slice(0, 3) : [];
  els.proofStrip.innerHTML = proofItems.length
    ? proofItems
        .map(
          (item, index) => `
          <button class="proof-card" type="button" data-open-evidence="${top.id}:${index}">
            <strong>${item.title}</strong>
            <small>${item.summary}</small>
          </button>
        `
        )
        .join("")
    : `<div class="empty-panel-copy">Proof items will appear once a compatible route is identified.</div>`;
}

function renderRecommendations(recommendations) {
  if (!completeScenario()) {
    els.recommendationList.className = "recommendation-list recommendation-list-empty";
    els.recommendationList.innerHTML = `<div class="empty-panel-copy">No product guidance until a full scenario is selected.</div>`;
    return;
  }

  if (!recommendations.length) {
    els.recommendationList.className = "recommendation-list recommendation-list-empty";
    els.recommendationList.innerHTML = `<div class="empty-panel-copy">No direct compatibility result is available for this exact application/substrate combination. Adjust the scenario or escalate for review.</div>`;
    return;
  }

  els.recommendationList.className = "recommendation-list";

  els.recommendationList.innerHTML = recommendations
    .map((product) => {
      const isCompared = state.compare.includes(product.id);
      return `
        <article class="recommendation-card">
          <div class="recommendation-copy">
            <h3>${product.label}</h3>
            <p class="card-copy">${product.summary}</p>

            <div class="recommendation-meta">
              <span class="metric-pill">${product.family}</span>
              <span class="metric-pill">Evidence ${product.evidence}/100</span>
              <span class="metric-pill">Value ${product.benefit}/100</span>
              ${(product.attributes || [])
                .slice(0, 2)
                .map((attr) => `<span class="metric-pill">${attr}</span>`)
                .join("")}
            </div>

            <div class="recommendation-rationale">
              <strong>Recommended because</strong>
              <p class="card-copy">${product.notes[0]}</p>
            </div>

            <div class="recommendation-actions">
              <button class="recommendation-link ghost-button" type="button" data-open-product="${product.id}">Review route</button>
              <button class="compare-toggle ${isCompared ? "is-active" : ""}" type="button" data-compare-product="${product.id}">
                ${isCompared ? "Remove from compare" : "Add to compare"}
              </button>
              <a class="ghost-button" href="${product.action[1]}">${product.action[0]}</a>
            </div>
          </div>

          <div class="recommendation-score counter">${product.score}</div>
        </article>
      `;
    })
    .join("");
}

function renderEvidence(recommendations) {
  const top = recommendations[0];
  if (!top) {
    els.evidenceCards.innerHTML = `<div class="empty-panel-copy">Evidence appears when a compatible route is identified.</div>`;
    els.boundaryPanel.innerHTML = `<div class="empty-panel-copy">Boundary conditions are shown once a leading route exists.</div>`;
    els.standardsPanel.innerHTML = `<div class="empty-panel-copy">Standards summary will appear here.</div>`;
    els.documentList.innerHTML = `<div class="empty-panel-copy">Relevant document routes appear after scenario matching.</div>`;
    return;
  }

  els.evidenceCards.innerHTML = top.evidenceItems
    .map(
      (item, index) => `
        <button class="evidence-card" type="button" data-open-evidence="${top.id}:${index}">
          <span class="card-icon success">✓</span>
          <span class="card-copy">
            <strong>${item.title}</strong>
            <span>${item.summary}</span>
          </span>
          <span class="card-arrow">Open</span>
        </button>
      `
    )
    .join("");

  els.boundaryPanel.innerHTML = `
    <button class="boundary-card evidence-card" type="button" data-open-boundary="${top.id}">
      <span class="card-icon warning">!</span>
      <span class="card-copy">
        <strong>Boundary conditions</strong>
        <span>${top.boundary}</span>
      </span>
      <span class="card-arrow">Review</span>
    </button>
  `;

  const standardMetrics = top.evidenceItems
    .flatMap((item) => item.metrics || [])
    .filter((metric) => /(EN|SARS|touches|months|log|229E|OC43|PIV|HRV|Vaccinia)/i.test(metric))
    .slice(0, 6);

  els.standardsPanel.innerHTML = standardMetrics.length
    ? standardMetrics.map((metric) => `<span class="standard-pill">${metric}</span>`).join("")
    : `<span class="standard-pill is-warning">No standards-linked summary available</span>`;

  els.documentList.innerHTML = top.docs
    .map(
      (doc) => `
        <a class="document-card" href="${doc[1]}">
          <span class="card-icon">▣</span>
          <span class="card-copy">
            <strong>${doc[0]}</strong>
            <span>${top.label}</span>
          </span>
          <span class="card-arrow">Open</span>
        </a>
      `
    )
    .join("");
}

function renderActions(recommendations) {
  const top = recommendations[0];
  if (!top) {
    els.actionList.innerHTML = `<div class="empty-panel-copy">The Act layer will route to the correct next move once a defensible fit exists.</div>`;
    return;
  }

  els.actionList.innerHTML = `
    <a class="action-card" href="${top.action[1]}">
      <span class="card-icon">→</span>
      <span class="card-copy">
        <strong>${top.action[0]}</strong>
        <span>${top.label} • ${top.family}</span>
      </span>
      <span class="card-arrow">Route</span>
    </a>

    <button class="action-card" type="button" data-open-evidence-center="${top.id}">
      <span class="card-icon success">✓</span>
      <span class="card-copy">
        <strong>Review evidence bundle</strong>
        <span>Open the leading proof route without leaving the active workspace.</span>
      </span>
      <span class="card-arrow">Open</span>
    </button>

    <button class="action-card" type="button" data-copy-summary="true">
      <span class="card-icon">✦</span>
      <span class="card-copy">
        <strong>Copy internal review summary</strong>
        <span>Prepare a committee-ready snapshot of fit, proof, and next actions.</span>
      </span>
      <span class="card-arrow">Copy</span>
    </button>
  `;
}

function renderContextShell(recommendations) {
  const app = currentApplication();
  const top = recommendations[0];
  const chips = [
    state.industry ? `<span class="context-chip"><strong>Industry</strong> ${labelFor(DATA.industries, state.industry)}</span>` : "",
    app ? `<span class="context-chip"><strong>Application</strong> ${app.label}</span>` : "",
    state.asset ? `<span class="context-chip"><strong>Asset</strong> ${labelFor(app?.assets || [], state.asset)}</span>` : "",
    state.substrate ? `<span class="context-chip"><strong>Surface</strong> ${labelFor(app?.substrates || [], state.substrate)}</span>` : "",
    state.challenge ? `<span class="context-chip"><strong>Challenge</strong> ${labelFor(app?.challenges || [], state.challenge)}</span>` : "",
  ].filter(Boolean);

  els.contextSummary.innerHTML = chips.length ? chips.join("") : `<div class="empty-panel-copy">No context captured yet.</div>`;

  if (!completeScenario()) {
    els.nextStepTitle.textContent = "Complete the scenario";
    els.nextStepBody.textContent =
      "The workspace shell will hold context, proof, and action routing after the minimum scenario is defined.";
    els.primaryActionLink.href = "#orient";
    els.primaryActionLink.textContent = "Complete scenario";
    return;
  }

  if (!top) {
    els.nextStepTitle.textContent = "Refine the fit conditions";
    els.nextStepBody.textContent =
      "No supported route is currently returned for the exact combination. Adjust substrate, challenge, or conditions, or escalate for review.";
    els.primaryActionLink.href = "#orient";
    els.primaryActionLink.textContent = "Adjust scenario";
    return;
  }

  els.nextStepTitle.textContent = `Validate ${top.label}`;
  els.nextStepBody.textContent = state.reviewedEvidence.length
    ? "You have a leading fit and reviewed proof. The next move is to route into the most suitable commercial or technical handoff."
    : "Open the evidence center next so the recommendation is supported by proof before escalation or commercial routing.";
  els.primaryActionLink.href = state.reviewedEvidence.length ? top.action[1] : "#prove";
  els.primaryActionLink.textContent = state.reviewedEvidence.length ? top.action[0] : "Review evidence";
}

function checklistItems(recommendations) {
  const top = recommendations[0];
  return [
    { label: "Scenario captured", done: completeScenario() },
    { label: "Best-fit route identified", done: recommendations.length > 0 },
    { label: "Evidence reviewed", done: state.reviewedEvidence.length > 0 },
    { label: "Boundary conditions acknowledged", done: !top ? false : state.boundaryReviewed },
    { label: "Next action ready", done: Boolean(top) },
  ];
}

function renderChecklist(recommendations) {
  els.confidenceChecklist.innerHTML = checklistItems(recommendations)
    .map(
      (item) => `
        <li class="confidence-item ${item.done ? "is-complete" : ""}">
          <span class="card-icon ${item.done ? "success" : "warning"}">${item.done ? "✓" : "!"}</span>
          <span>
            <strong>${item.label}</strong>
            <p class="card-copy">${item.done ? "Complete" : "Pending"}</p>
          </span>
        </li>
      `
    )
    .join("");
}

function renderCompareTray() {
  if (!state.compare.length) {
    els.compareTray.innerHTML = `<div class="compare-empty">Pin candidate routes to compare them side by side.</div>`;
    els.compareTable.innerHTML = "";
    return;
  }

  const comparedProducts = state.compare
    .map((id) => DATA.products.find((product) => product.id === id))
    .filter(Boolean);

  els.compareTray.innerHTML = comparedProducts
    .map(
      (product) => `
        <span class="compare-pill">
          ${product.label}
          <button type="button" data-remove-compare="${product.id}" aria-label="Remove ${product.label}">×</button>
        </span>
      `
    )
    .join("");

  els.compareTable.innerHTML = comparedProducts
    .map(
      (product) => `
        <div class="compare-table-row">
          <strong>${product.label}</strong>
          <span class="metric-pill">Fit ${product.fit}/100</span>
          <span class="metric-pill">Proof ${product.evidence}/100</span>
          <span class="metric-pill">Value ${product.benefit}/100</span>
          <span class="metric-pill">${product.family}</span>
        </div>
      `
    )
    .join("");
}

function animateValue(el, target, noteEl, noteText, suffix = "") {
  const start = Number(el.dataset.value || 0);
  el.dataset.value = target;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    el.textContent = `${target || "--"}${suffix}`;
    noteEl.textContent = noteText;
    return;
  }

  const startTime = performance.now();
  const duration = 700;

  function tick(now) {
    const progress = Math.min(1, (now - startTime) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(start + (target - start) * eased);
    el.textContent = `${target ? value : "--"}${suffix}`;
    if (progress < 1) window.requestAnimationFrame(tick);
  }

  window.requestAnimationFrame(tick);
  noteEl.textContent = noteText;
}

function sparkline(values, color) {
  const points = values.map((value, index) => `${index * 36},${40 - value * 0.32}`).join(" ");
  return `<svg class="sparkline sparkline-animate" viewBox="0 0 120 40" aria-hidden="true"><polyline points="${points}" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></polyline></svg>`;
}

function renderMetrics(recommendations) {
  document.querySelectorAll(".sparkline").forEach((node) => node.remove());
  const top = recommendations[0];

  if (!top) {
    animateValue(els.metricFitValue, 0, els.metricFitNote, "Awaiting scenario");
    animateValue(els.metricProofValue, 0, els.metricProofNote, "Awaiting scenario");
    animateValue(els.metricSurfaceValue, 0, els.metricSurfaceNote, "Awaiting scenario");
    animateValue(els.metricTrendValue, 0, els.metricTrendNote, "Awaiting scenario");
    return;
  }

  const app = currentApplication();
  const surfaceScore = top.substrates.includes(state.substrate) ? 100 : 0;
  animateValue(els.metricFitValue, top.score, els.metricFitNote, top.label, "%");
  animateValue(els.metricProofValue, top.evidence, els.metricProofNote, top.evidenceItems[0]?.title || "Proof route", "%");
  animateValue(els.metricSurfaceValue, surfaceScore, els.metricSurfaceNote, labelFor(app.substrates, state.substrate), "%");
  animateValue(els.metricTrendValue, top.benefit, els.metricTrendNote, top.family, "%");

  els.metricFit.insertAdjacentHTML("beforeend", sparkline([24, 44, 68, top.score], "#8fe7ff"));
  els.metricProof.insertAdjacentHTML("beforeend", sparkline([18, 38, 56, top.evidence], "#7ab5ff"));
  els.metricSurface.insertAdjacentHTML("beforeend", sparkline([8, 24, 52, surfaceScore], "#7ee4a8"));
  els.metricTrend.insertAdjacentHTML("beforeend", sparkline([14, 30, 48, top.benefit], "#ffd17a"));
}

function buildProductPayload(product) {
  return {
    title: product.label,
    summary: product.summary,
    metrics: [
      product.family,
      `Fit ${product.score || product.fit}/100`,
      `Proof ${product.evidence}/100`,
      `Value ${product.benefit}/100`,
    ],
    sections: [
      ["Best-fit use", product.notes[0]],
      ["Boundary condition", product.boundary || product.notes[1] || "Validate the route against the exact operating context."],
      ["Linked attributes", (product.attributes || []).join(" • ") || "No linked attributes listed."],
    ],
    actions: [{ label: product.action[0], href: product.action[1] }].concat(
      (product.docs || []).slice(0, 2).map((doc) => ({ label: doc[0], href: doc[1] }))
    ),
  };
}

function buildEvidencePayload(product, index) {
  const item = (product.evidenceItems || [])[index];
  if (!item) return null;
  return {
    title: item.title,
    summary: item.summary,
    metrics: item.metrics || [product.label, product.family],
    sections: item.sections || [["Evidence note", item.summary]],
    actions: (product.docs || []).slice(0, 2).map((doc) => ({ label: doc[0], href: doc[1] })),
  };
}

function buildBoundaryPayload(product) {
  return {
    title: `${product.label} — Boundary conditions`,
    summary: product.boundary || product.notes[1] || "Review the route limits before escalation.",
    metrics: ["Boundary review", product.family],
    sections: [
      ["Why it matters", product.boundary || product.notes[1] || "Validate the route against the exact operating context."],
      ["Operational implication", "Boundary visibility improves trust, reduces misuse, and supports cleaner downstream lead quality."],
    ],
    actions: [{ label: product.action[0], href: product.action[1] }],
  };
}

function openDrawer(payload) {
  if (!payload) return;
  els.drawerTitle.textContent = payload.title;
  els.drawerSummary.textContent = payload.summary;
  els.drawerMetrics.innerHTML = (payload.metrics || []).map((metric) => `<span class="metric-pill">${metric}</span>`).join("");
  els.drawerBody.innerHTML = (payload.sections || [])
    .map(
      ([title, body]) => `
        <section class="detail-analysis-block">
          <h3>${title}</h3>
          <p>${body}</p>
        </section>
      `
    )
    .join("");
  els.drawerActions.innerHTML = (payload.actions || [])
    .map((action) => `<a href="${action.href}">${action.label}</a>`)
    .join("");

  els.drawerBackdrop.hidden = false;
  els.evidenceDrawer.classList.add("is-open");
  els.evidenceDrawer.setAttribute("aria-hidden", "false");
}

function closeDrawer() {
  els.evidenceDrawer.classList.remove("is-open");
  els.evidenceDrawer.setAttribute("aria-hidden", "true");
  els.drawerBackdrop.hidden = true;
}

function recordEvidenceReview(key) {
  if (!state.reviewedEvidence.includes(key)) {
    state.reviewedEvidence.push(key);
  }
}

function copyWorkspaceSummary() {
  const top = getTopProduct();
  const app = currentApplication();
  const summary = [
    "SIW v2.0 workspace summary",
    `Industry: ${labelFor(DATA.industries, state.industry) || "-"}`,
    `Application: ${app?.label || "-"}`,
    `Asset: ${labelFor(app?.assets || [], state.asset) || "-"}`,
    `Surface: ${labelFor(app?.substrates || [], state.substrate) || "-"}`,
    `Challenge: ${labelFor(app?.challenges || [], state.challenge) || "-"}`,
    `Conditions: ${state.conditions.join(", ") || "-"}`,
    `Best-fit route: ${top?.label || "No supported route returned"}`,
    `Proof position: ${top?.evidenceItems?.[0]?.title || "-"}`,
    `Next action: ${top?.action?.[0] || "Adjust scenario or escalate for review"}`,
  ].join("\n");

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(summary);
  }

  window.alert("SIW summary copied to clipboard.");
}

function renderSearchSuggestions() {
  const query = (els.globalSearchInput.value || "").trim().toLowerCase();
  if (!query) {
    els.searchSuggestions.classList.remove("is-open");
    els.searchSuggestions.innerHTML = "";
    return;
  }

  const results = getSearchIndex()
    .filter((item) => item.key.includes(query))
    .slice(0, 7);

  if (!results.length) {
    els.searchSuggestions.classList.remove("is-open");
    els.searchSuggestions.innerHTML = "";
    return;
  }

  els.searchSuggestions.classList.add("is-open");
  els.searchSuggestions.innerHTML = results
    .map(
      (item) => `
        <button class="search-suggestion" type="button" data-search-result="${item.type}:${item.id}">
          <strong>${item.label}</strong>
          <small>${item.type}</small>
        </button>
      `
    )
    .join("");
}

function handleSearchResult(token) {
  const [type, id] = token.split(":");
  const item = getSearchIndex().find((entry) => entry.type === type && String(entry.id) === id);
  if (!item) return;
  item.handler();
  els.globalSearchInput.value = "";
  renderSearchSuggestions();
}

function scrollToId(id) {
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function bindEvents() {
  els.industrySelect.addEventListener("change", (event) => {
    state.industry = event.target.value;
    state.application = "";
    state.asset = "";
    state.substrate = "";
    state.challenge = "";
    state.conditions = [];
    state.boundaryReviewed = false;
    renderAll();
  });

  els.applicationSelect.addEventListener("change", (event) => {
    state.application = event.target.value;
    state.asset = "";
    state.substrate = "";
    state.challenge = "";
    state.conditions = [];
    state.boundaryReviewed = false;
    renderAll();
  });

  els.assetSelect.addEventListener("change", (event) => {
    state.asset = event.target.value;
    renderAll();
  });

  els.substrateSelect.addEventListener("change", (event) => {
    state.substrate = event.target.value;
    renderAll();
  });

  els.challengeSelect.addEventListener("change", (event) => {
    state.challenge = event.target.value;
    state.boundaryReviewed = false;
    renderAll();
  });

  els.globalSearchInput.addEventListener("input", renderSearchSuggestions);
  els.globalSearchInput.addEventListener("focus", renderSearchSuggestions);

  document.addEventListener("click", (event) => {
    const conditionBtn = event.target.closest("[data-condition]");
    if (conditionBtn) {
      const condition = conditionBtn.dataset.condition;
      state.conditions = state.conditions.includes(condition)
        ? state.conditions.filter((item) => item !== condition)
        : state.conditions.concat(condition);
      renderAll();
      return;
    }

    const industryCard = event.target.closest("[data-set-industry]");
    if (industryCard) {
      setIndustry(industryCard.dataset.setIndustry);
      return;
    }

    const applicationChip = event.target.closest("[data-set-application]");
    if (applicationChip) {
      state.industry = applicationChip.dataset.parentIndustry;
      state.application = applicationChip.dataset.setApplication;
      state.asset = "";
      state.substrate = "";
      state.challenge = "";
      state.conditions = [];
      state.boundaryReviewed = false;
      renderAll();
      scrollToId("orient");
      return;
    }

    const openProduct = event.target.closest("[data-open-product]");
    if (openProduct) {
      const product = DATA.products.find((item) => item.id === openProduct.dataset.openProduct);
      openDrawer(buildProductPayload(product));
      return;
    }

    const openEvidence = event.target.closest("[data-open-evidence]");
    if (openEvidence) {
      const [productId, index] = openEvidence.dataset.openEvidence.split(":");
      const product = DATA.products.find((item) => item.id === productId);
      recordEvidenceReview(`${productId}:${index}`);
      openDrawer(buildEvidencePayload(product, Number(index)));
      persistState();
      renderChecklist(getRecommendations());
      renderContextShell(getRecommendations());
      return;
    }

    const openBoundary = event.target.closest("[data-open-boundary]");
    if (openBoundary) {
      const product = DATA.products.find((item) => item.id === openBoundary.dataset.openBoundary);
      state.boundaryReviewed = true;
      openDrawer(buildBoundaryPayload(product));
      persistState();
      renderChecklist(getRecommendations());
      return;
    }

    const compareBtn = event.target.closest("[data-compare-product]");
    if (compareBtn) {
      const productId = compareBtn.dataset.compareProduct;
      state.compare = state.compare.includes(productId)
        ? state.compare.filter((id) => id !== productId)
        : state.compare.concat(productId).slice(0, 3);
      renderCompareTray();
      persistState();
      renderRecommendations(getRecommendations());
      return;
    }

    const removeCompare = event.target.closest("[data-remove-compare]");
    if (removeCompare) {
      state.compare = state.compare.filter((id) => id !== removeCompare.dataset.removeCompare);
      renderCompareTray();
      persistState();
      renderRecommendations(getRecommendations());
      return;
    }

    const evidenceCenterBtn = event.target.closest("[data-open-evidence-center]");
    if (evidenceCenterBtn) {
      const product = DATA.products.find((item) => item.id === evidenceCenterBtn.dataset.openEvidenceCenter);
      if (product && product.evidenceItems?.length) {
        recordEvidenceReview(`${product.id}:0`);
        openDrawer(buildEvidencePayload(product, 0));
        persistState();
        renderChecklist(getRecommendations());
        renderContextShell(getRecommendations());
      }
      return;
    }

    const copyBtn = event.target.closest("[data-copy-summary]");
    if (copyBtn) {
      copyWorkspaceSummary();
      return;
    }

    const searchResult = event.target.closest("[data-search-result]");
    if (searchResult) {
      handleSearchResult(searchResult.dataset.searchResult);
      return;
    }

    if (
      !event.target.closest(".hero-search") &&
      !event.target.closest(".search-suggestions") &&
      els.searchSuggestions.classList.contains("is-open")
    ) {
      els.searchSuggestions.classList.remove("is-open");
    }
  });

  els.saveWorkspaceButton.addEventListener("click", () => {
    persistState();
    window.alert("SIW workspace saved.");
  });

  els.clearWorkspaceButton.addEventListener("click", () => {
    state = { ...DEFAULT_STATE };
    renderAll();
  });

  els.copySummaryButton.addEventListener("click", copyWorkspaceSummary);
  els.openTopEvidenceButton.addEventListener("click", () => {
    const top = getTopProduct();
    if (top && top.evidenceItems?.length) {
      recordEvidenceReview(`${top.id}:0`);
      openDrawer(buildEvidencePayload(top, 0));
      persistState();
      renderChecklist(getRecommendations());
      renderContextShell(getRecommendations());
    } else {
      scrollToId("prove");
    }
  });

  els.closeEvidenceDrawer.addEventListener("click", closeDrawer);
  els.drawerBackdrop.addEventListener("click", closeDrawer);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeDrawer();
  });

  els.metricFit.addEventListener("click", () => {
    const top = getTopProduct();
    if (top) openDrawer(buildProductPayload(top));
  });
  els.metricProof.addEventListener("click", () => {
    const top = getTopProduct();
    if (top && top.evidenceItems?.length) {
      recordEvidenceReview(`${top.id}:0`);
      openDrawer(buildEvidencePayload(top, 0));
      persistState();
      renderChecklist(getRecommendations());
      renderContextShell(getRecommendations());
    }
  });
  els.metricSurface.addEventListener("click", () => scrollToId("orient"));
  els.metricTrend.addEventListener("click", () => scrollToId("act"));
}

function renderAll() {
  renderForm();
  renderCapabilityMap();
  const recommendations = getRecommendations();
  renderBreadcrumbs();
  renderStepper(recommendations);
  renderScenarioStatement(recommendations);
  renderExplain(recommendations);
  renderRecommendations(recommendations);
  renderEvidence(recommendations);
  renderActions(recommendations);
  renderContextShell(recommendations);
  renderChecklist(recommendations);
  renderCompareTray();
  renderMetrics(recommendations);
  renderSearchSuggestions();
  persistState();
}

bindEvents();
renderAll();
