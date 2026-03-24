# Branch Strategy

## Branch roles
- `main`: production-ready code only
- `develop`: integration branch for approved work
- `feature/<scope>`: isolated workstreams
- `hotfix/<scope>`: production correction branches

## Recommended workflow
1. Create `feature/*` branch from `develop`
2. Complete scoped work
3. Open PR into `develop`
4. Review for structure, copy, and claim discipline
5. Merge into `develop`
6. Promote to `main` through release PR

## Guardrails
- no direct changes to `main`
- no unreviewed product claim changes
- architecture docs updated when navigation or page purpose changes
- evidence-linked claims tracked in documentation before release

## Suggested branch naming
- `feature/homepage-refinement`
- `feature/quartz-content-pass`
- `feature/titan-proof-library`
- `feature/roi-calculator`
- `hotfix/contact-form-copy`
