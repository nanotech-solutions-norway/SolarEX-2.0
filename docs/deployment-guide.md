# SolarEX Deployment Guide — 2026-03-24 10:33 UTC

## Recommended domain strategy

Configured canonical domain:
- `https://solarex.no`

Recommendation rationale:
- matches the GitHub Pages custom-domain setting already entered
- simplest path now that the apex domain is the verified target
- allows `www.solarex.no` to act as an alias / redirect to the apex domain when DNS is configured correctly

Recommended redirect behavior:
- `www.solarex.no` → redirect to `https://solarex.no`

## Production publish model

Recommended production source:
- GitHub Pages from `main`

Recommended preview / test method before production cutover:
- use `staging` branch for code review and pre-merge QA
- use GitHub Pages production deployment only from `main`
- if a live preview host is required, use a separate preview service or separate Pages site / repository

## Required repository files already prepared

- `CNAME` → `solarex.no`
- `robots.txt`
- `sitemap.xml`
- `.github/workflows/deploy-pages.yml`

## Recommended release sequence

### 1. Pre-production validation
Before production cutover:
- validate the `staging` branch in GitHub review
- verify layout, proof visuals, links, and mobile behavior
- confirm GitHub Pages settings and DNS are ready

### 2. Production launch
After signoff:
- merge approved PR into `main`
- ensure GitHub Pages deploys from `main`
- bind `solarex.no` as the custom domain in GitHub Pages
- enable HTTPS in GitHub Pages settings
- ensure `www.solarex.no` resolves correctly as alias / redirect to `solarex.no`

## DNS instructions

### Preferred production DNS
For apex `solarex.no`:
- configure the root domain to GitHub Pages using the GitHub Pages root-domain records at the DNS provider

For `www.solarex.no`:
- create a `CNAME` record
- host: `www`
- value: your GitHub Pages hostname for this repository or organization site

## GitHub Pages settings

In repository settings:
- Pages → Source: GitHub Actions
- Custom domain: `solarex.no`
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
- verify canonical host response on `solarex.no`
- verify `www.solarex.no` resolves / redirects correctly
- verify robots and sitemap availability
- verify analytics and conversion events once connected

## Important note

This repository is now substantially deployment-ready from a file-structure perspective, but GitHub Pages activation, DNS validation, HTTPS enforcement, and live domain cutover still must be completed in GitHub and your DNS provider.
