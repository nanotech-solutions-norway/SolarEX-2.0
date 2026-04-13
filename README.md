# SolarEX 2.0

Static website repository for the SolarEX marketing and commercial site.

## Structure
- Root pages: primary English routes (`index.html`, product pages, proof/ROI/process pages).
- `no/`: Norwegian localized routes.
- `v21/`: versioned deployment snapshot.
- `siw_10`, `siw_20`, `siw_30`: Surface Intelligence Workspace artifacts/prototypes.
- Shared assets: `assets/css`, `assets/js`, `assets/media`.

## Deployment
- GitHub Pages deploy is defined in `.github/workflows/deploy-pages.yml`.
- Build step creates `_site` and copies repository contents (excluding workflow/git internals).
- HTML quality gate runs before deployment:
  - `python3 scripts/html_audit.py`

## Local verification
- Run HTML structural checks:
  - `python3 scripts/html_audit.py`

## Current scope
This repository contains the production-grade marketing and commercial website starter for SolarEX, including:
- product pages for SolarEX Quartz (SiO₂) and SolarEX Titan (TiO₂)
- ROI and proof content architecture
- governance, branching, and contribution standards
- starter code for a modern, SEO-oriented website
