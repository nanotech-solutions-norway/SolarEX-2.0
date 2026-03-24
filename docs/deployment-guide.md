# SolarEX Deployment Guide — 2026-03-24 10:33 UTC

## Recommended domain strategy

Recommended canonical domain:
- `https://www.solarex.no`

Recommendation rationale:
- simpler GitHub Pages custom-domain handling
- cleaner DNS implementation for a static site
- easier apex-to-www redirect management at the registrar layer
- more robust if staging / preview subdomains are introduced later

Recommended redirect behavior:
- `solarex.no` → redirect to `https://www.solarex.no`

## Production publish model

Recommended production source:
- GitHub Pages from `main`

Recommended preview / test source before production cutover:
- GitHub Pages from `staging` or `develop`
- preview host: `preview.solarex.no`

## Required repository files already prepared

- `CNAME` → `www.solarex.no`
- `robots.txt`
- `sitemap.xml`
- `.github/workflows/deploy-pages.yml`

## Recommended release sequence

### 1. Preview environment first
Create a preview environment before production cutover:
- create or use `staging` branch
- publish that branch temporarily through GitHub Pages
- bind `preview.solarex.no` to the GitHub Pages site
- verify layout, proof visuals, links, and mobile behavior
- keep preview environment `noindex` until final launch

### 2. Production launch
After preview signoff:
- merge approved PR into `main`
- ensure GitHub Pages uses production branch / workflow
- bind `www.solarex.no` as the custom domain
- enable HTTPS in GitHub Pages settings
- configure redirect from `solarex.no` to `www.solarex.no`

## DNS instructions

### Preferred production DNS
For `www.solarex.no`:
- create a `CNAME` record
- host: `www`
- value: your GitHub Pages hostname for this repository

For apex `solarex.no`:
- use registrar or DNS-provider forwarding / redirect
- destination: `https://www.solarex.no`
- permanent redirect: `301`

### Preview DNS
For `preview.solarex.no`:
- create a `CNAME` record
- host: `preview`
- value: same GitHub Pages hostname while preview is active

## GitHub Pages settings

In repository settings:
- Pages → Source: GitHub Actions
- Custom domain: `www.solarex.no`
- Enforce HTTPS: enabled after certificate issuance

## Suggested staging policy

Before production release, validate at least:
- desktop breakpoint
- tablet breakpoint
- mobile breakpoint
- all navigation links
- product/evidence/ROI flow
- chart rendering and animation behavior
- no console-breaking JS errors

## Recommended post-launch checklist

- submit sitemap to search console
- verify canonical host response on `www.solarex.no`
- verify 301 redirect from `solarex.no`
- verify robots and sitemap availability
- verify analytics and conversion events once connected

## Important note

This repository is now deployment-ready from a file-structure perspective, but DNS changes, GitHub Pages activation, HTTPS enforcement, and live domain cutover must still be completed in GitHub and your DNS provider.
