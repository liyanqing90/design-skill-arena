---
name: design-skill-arena
description: Maintain the Design Skill Arena Next.js project. Use when working in this repository on the homepage gallery, model showcase onboarding, skill-chain metadata, screenshots/R2 assets, Cloudflare Pages/D1 likes, i18n, performance, README/CONTRIBUTING workflows, or production deployment through GitHub auto deploy.
---

# Design Skill Arena

## Start Here

Use this skill only inside the Design Skill Arena repository.

Read the smallest relevant set first:

- Project workflow: `README.md`, `CONTRIBUTING.md`
- App data: `src/data/showcases.ts`, `src/data/showcase-assets.ts`, `src/data/skills.ts`
- Homepage: `src/components/arena/home-page.tsx`, `src/components/arena/showcase-card.tsx`
- Model pages: `src/components/model-showcases/{modelSlug}/`, `src/app/model-showcase/**`
- Cloudflare: `wrangler.jsonc`, `public/_headers`, `public/_routes.json`, `functions/api/votes.js`

Preserve generated model pages unless the user explicitly asks to fix that model page. Most homepage, metadata, asset, and deployment work should not rewrite model showcase implementations.

## Core Decisions

- Treat the site as a showcase, not a benchmark. Do not add scoring, ranking, conclusions, or winner language.
- Keep showcase pages standalone. Homepage preview may show a modal, but full pages open through `/model-showcase/{modelSlug}/{showcaseId}`.
- Use R2 for production screenshots. Keep paths shaped as `model-screenshots/{modelSlug}/{showcaseId}/desktop.webp`.
- Keep R2 optional for forks. Local/open-source builds may use `public/` assets.
- Prefer GitHub `main` auto deploy for production. Avoid manual `wrangler pages deploy` unless the user explicitly asks for direct upload.
- Keep Cloudflare Pages Functions scoped to `/api/*`; static assets must not invoke Functions.
- Use Chrome or the in-app browser for visual checks when browser validation is needed.

## Add A Model

1. Add isolated model components under `src/components/model-showcases/{modelSlug}/`.
2. Keep the canonical 18 showcase IDs from `CONTRIBUTING.md`.
3. Add or update routes under `src/app/model-showcase/{modelSlug}/[showcaseId]/` only when the existing route cannot resolve the model.
4. Register model/showcase metadata in the local data files.
5. Add real rendered screenshots at `public/model-screenshots/{modelSlug}/{showcaseId}/desktop.webp` only if the task is about local assets. For production, prefer uploading the same paths to R2.
6. Do not modify homepage filtering, pagination, i18n, or global display logic unless the user asks for integration work.

## Homepage And Gallery

- Keep UI Chinese by default with i18n support.
- Keep model and skill-chain filters.
- Load likes in small batches for visible page items; do not make initial site load depend on the votes API.
- Keep preview modal lighter than standalone pages and include an open-page action.
- Keep cards simple: real cover, model name, showcase name, skill chain.
- Avoid adding heavy client dependencies to the homepage. Prefer native HTML/CSS for simple controls.

## Assets And R2

Use `assetUrl()` from `src/lib/assets.ts` for public asset paths.

Production Cloudflare builds must keep:

```bash
pnpm build:cloudflare
```

This script sets `NEXT_PUBLIC_USE_R2_ASSETS=1` and `NEXT_PUBLIC_ASSET_BASE_URL` with a default of `https://arena-assets.xflux.cn`. Do not replace it with `pnpm build:static` for production.

For forks:

- `pnpm build:static` uses local `public/` paths.
- `NEXT_PUBLIC_USE_R2_ASSETS=1 NEXT_PUBLIC_ASSET_BASE_URL=https://your-assets.example.com pnpm build:static` points assets at another CDN/R2 domain.

## Likes And D1

The shared likes API lives in `functions/api/votes.js`.

- Keep votes optional. Missing D1 binding must not break the static gallery.
- Store anonymous salted hashes only; do not store raw IPs.
- Run remote migrations only when changing persisted schema:

```bash
pnpm db:migrate:remote
```

`VOTE_HASH_SALT` is a Cloudflare Pages secret, not a committed value.

## Cloudflare Deployment

Production is expected to deploy from GitHub `main`.

Required Cloudflare Pages settings:

```text
Build command: pnpm build:cloudflare
Output directory: out
NEXT_PUBLIC_USE_R2_ASSETS=1
NEXT_PUBLIC_ASSET_BASE_URL=https://arena-assets.xflux.cn
```

Use `pnpm deploy:cloudflare` only for an explicitly requested direct upload. It pins `--branch main` to avoid accidental preview-only deployments.

After deployment, verify:

```bash
pnpm dlx wrangler@latest pages deployment list --project-name design-skill-arena
curl -sS 'https://arena.xflux.cn/api/votes?ids=gpt-55-standard-builder'
curl -L --compressed -sS https://arena.xflux.cn/ | rg 'arena-assets.xflux.cn|_next/static/chunks'
```

## Performance Checks

When users report slow resources:

1. Ignore browser-extension scripts such as `content_main.js`; they are not site assets.
2. Check response headers first:

```bash
curl -sSI https://arena.xflux.cn/_next/static/chunks/{chunk}.js
```

3. Inspect homepage chunk count from `out/index.html` after `pnpm build:cloudflare`.
4. Prefer deleting or deferring homepage dependencies over adding new tooling.
5. Keep `public/_routes.json` limited to `/api/*` so static assets bypass Pages Functions.

## Verification

Use the smallest relevant set:

```bash
pnpm test
pnpm typecheck
pnpm lint
pnpm build:cloudflare
```

`pnpm lint` may show existing warnings in generated model pages. Do not clean generated model files unless the task is explicitly about those files.
