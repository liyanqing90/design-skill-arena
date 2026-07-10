# Contributing

Design Skill Arena compares real standalone pages. Keep contributions small, isolated, and easy to verify.

## Add a Model

Add one model at a time.

```text
src/components/model-showcases/{modelSlug}/
```

Each model should provide the canonical 18 showcase pages and routes:

```text
/model-showcase/{modelSlug}/{showcaseId}
```

Do not rewrite the homepage to add a model. Register model data and let the gallery read it.

## Add or Change a Skill Chain

The current comparison set is 18 canonical skill chains. Changing it affects every model, so do this only when the new chain is meant to become part of the shared matrix.

To add a chain:

1. Pick a stable kebab-case `showcaseId`.
2. Add the chain brief to `docs/showcase-project-briefs.md`.
3. Add the chain metadata to the showcase data.
4. Add the page for every supported model, or clearly keep the chain out of the public gallery until all models are ready.
5. Add any new single skill source to `src/data/skills.ts`.
6. Capture real screenshots from the running pages.
7. Run the checks.

Do not add a chain just for one model in the main gallery. That makes model comparison uneven.

## Screenshots

Screenshots should come from real rendered pages.

Default card screenshot path:

```text
model-screenshots/{modelSlug}/{showcaseId}/desktop.webp
```

For production, maintainers may upload the same paths to R2 and set:

```bash
NEXT_PUBLIC_USE_R2_ASSETS=1
NEXT_PUBLIC_ASSET_BASE_URL=https://arena-assets.xflux.cn
```

Do not include API keys, R2 credentials, or Cloudflare tokens in a PR.

## Likes

Do not add model-specific vote code. Votes are keyed by the existing showcase item ID and handled by the shared Cloudflare Pages Function.

For maintainers changing vote storage:

```bash
pnpm db:migrate:remote
```

Keep the API optional. A missing D1 binding must not break the static gallery.

## Checks

```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm build:static
```
