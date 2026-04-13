# SolarEX 2.0 Repository Review (2026-04-13)

## Scope and method
- Reviewed all tracked source/content files in the repository (HTML, CSS, JS, CI, SEO files, and documentation).
- Ran a structural HTML scan to check metadata, heading presence, and relative-link validity.
- Focused recommendations on maintainability, SEO/accessibility, delivery safety, and content operations.

## High-priority recommendations

### 1) Reduce runtime DOM/CSS mutation in `assets/js/site.js`
**What I found**
- `site.js` currently injects a large global `<style>` block at runtime and also rewrites header/footer structure dynamically.
- This increases maintenance risk and makes visual regressions harder to reason about because page rendering depends on script execution order.

**Why this matters**
- Harder to debug styling issues compared with static CSS.
- Higher risk of locale/accessibility regressions when UI labels are hardcoded in JS.
- Can hurt first paint and contributes to layout shift risk.

**Recommendation**
- Move runtime-injected CSS into versioned static stylesheets.
- Keep JS focused on behavior, not structural rewriting.
- Introduce `data-*` hooks on templates and progressively migrate DOM rewrites into authored HTML.

---

### 2) Fix language/accessibility label localization in nav controls
**What I found**
- The nav toggle label is set to English (`"Open navigation"`) in JS regardless of page language.

**Why this matters**
- Screen-reader text should match page language for accessibility and consistency.

**Recommendation**
- Set `aria-label` conditionally by `currentLang` or pull from localized dictionaries.
- Add an automated check for locale-sensitive aria attributes.

---

### 3) Improve SEO internationalization signals
**What I found**
- Canonical tags exist, but there are no `hreflang` alternates across EN/NO page pairs.

**Why this matters**
- Search engines have weaker language-variant mapping without `hreflang`.

**Recommendation**
- Add reciprocal `link rel="alternate" hreflang="en"` / `hreflang="no"` links for localized equivalents.
- Include `x-default` for the primary entry page.

---

### 4) Address content parity gaps in versioned paths
**What I found**
- `v21/no/` only includes `index.html` while root `no/` contains a full localized page set.

**Why this matters**
- Inconsistent user experience and potential broken user journeys in prefixed deployments.

**Recommendation**
- Either:
  - publish full `v21/no/*` parity, or
  - route all `v21/no/*` requests explicitly to canonical localized pages.
- Document the intended behavior in `README.md`.

---

### 5) Add basic CI quality gates before Pages deploy
**What I found**
- Current workflow deploys by copying the full repository into `_site` with no validation/lint/test step.

**Why this matters**
- Avoidable SEO/a11y regressions can ship silently.

**Recommendation**
- Add a lightweight CI stage before deploy:
  - HTML metadata and heading checks,
  - internal-link check,
  - optional Lighthouse CI on primary routes.
- Consider excluding experimental folders (`siw_*`) from production artifact if they are not intended for public hosting.

## Medium-priority recommendations

### 6) Strengthen repository documentation and architecture notes
**What I found**
- `README.md` is minimal and does not explain routing/versioning strategy, localization structure, or build/deploy expectations.

**Recommendation**
- Expand `README.md` with:
  - directory architecture (root, `no/`, `v21/`, `siw_*`),
  - release/versioning rules,
  - content update workflow,
  - how to run local verification checks.

### 7) Add metadata consistency checks for side projects
**What I found**
- HTML scan found missing metadata/structure in legacy/experimental routes:
  - `siw_20/index.html` missing meta description and `h1`.
  - `siw_30/index.html` missing `h1`.

**Recommendation**
- If public-facing, align these pages with baseline SEO/a11y standards.
- If internal-only, set clear noindex strategy and remove them from public navigation/sitemap.

### 8) Improve maintainability with template/shared-partials workflow
**What I found**
- The site has many route variants (root, `no/`, `v21/`) with near-duplicate structures.

**Recommendation**
- Introduce a static-site templating step (e.g., Eleventy/Astro/Nunjucks build stage) for shared header/footer and metadata blocks.
- This will reduce copy-edit drift across language/version variants.

## Low-priority recommendations

### 9) Front-end performance cleanup
- Move font loading from runtime `@import` to static `<link rel="preconnect">` + `<link rel="stylesheet">` in `<head>`.
- Audit large inline SVG blocks on high-traffic pages for payload reduction opportunities.

### 10) Observability and change safety
- Add a short changelog/release note file for content updates.
- Add a simple visual regression snapshot check for top routes (`/`, `/no/`, `/titan.html`, `/proof-results.html`).

## Suggested implementation sequence
1. Add CI checks (metadata/link/a11y smoke checks).
2. Localize aria labels and add hreflang pairs.
3. Refactor injected CSS into static files.
4. Resolve versioned-language parity strategy.
5. Introduce templating/partials to reduce duplication.

## Quick structural findings from automated scan
- Total HTML files scanned: 38.
- Noted issues:
  - `siw_20/index.html`: missing meta description.
  - `siw_20/index.html`: missing `h1`.
  - `siw_30/index.html`: missing `h1`.
  - `siw_20/index.html`: directory-style link (`/v21/`) flagged by strict file-based checker (valid in hosted environments serving directory index).
