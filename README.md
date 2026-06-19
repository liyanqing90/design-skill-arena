# Design Skill Arena

Design Skill Arena is a static gallery for comparing how different AI models implement the same Muse AI Campaign Studio brief with different frontend design skill chains.

It is a showcase, not a benchmark. The site avoids scores and rankings; each card opens a real standalone page generated for one model and one skill chain.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/base UI primitives
- Static export for Cloudflare Pages
- Optional Cloudflare R2 asset hosting

## Local Development

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Static Build

```bash
pnpm build:static
pnpm preview:static
```

The static output is written to `out/`. This command keeps screenshots on local
`public/` paths unless `NEXT_PUBLIC_ASSET_BASE_URL` is set.

## Cloudflare Pages

The project is configured for Cloudflare Pages direct upload with `wrangler.jsonc`.

```bash
pnpm deploy:cloudflare
```

This command intentionally runs `pnpm build:cloudflare` first. Do not replace it
with `pnpm build:static` for production, otherwise screenshots will fall back to
project-local paths instead of R2. The deploy command also pins `--branch main`
so direct uploads update the production Pages deployment instead of a preview
deployment from the current local branch.

Recommended production domains:

- Site: `https://arena.xflux.cn`
- Assets: `https://arena-assets.xflux.cn`

Cloudflare Pages build settings:

```text
Build command: pnpm build:cloudflare
Output directory: out
Environment variable: NEXT_PUBLIC_ASSET_BASE_URL=https://arena-assets.xflux.cn
```

## Likes

Likes are an optional Cloudflare Pages Functions enhancement. The gallery does not call the API on initial page load; counts load only when a card is focused, hovered, opened, or liked.

Production uses D1:

```bash
pnpm db:migrate:remote
pnpm dlx wrangler@latest pages secret put VOTE_HASH_SALT --project-name design-skill-arena
```

The vote table stores only `target_id`, an anonymous salted visitor hash, and a timestamp. If the API or D1 binding is unavailable, the static gallery still works.

## Asset Hosting

By default, screenshots load from local `public/` paths. For R2, set:

```bash
NEXT_PUBLIC_ASSET_BASE_URL=https://arena-assets.xflux.cn
```

The frontend prefixes existing public asset paths. If assets are moved to R2, keep the same card screenshot path shape:

```text
model-screenshots/{modelSlug}/{showcaseId}/desktop.webp
```

For an open-source fork, R2 is optional:

1. Keep assets in `public/` and run `pnpm build:static`.
2. Or create an R2 bucket, upload the same path structure, attach a public custom
   domain, and set `NEXT_PUBLIC_ASSET_BASE_URL=https://your-assets.example.com`.
3. On Cloudflare Pages, use `pnpm build:cloudflare` and set the same environment
   variable in project settings.

Contributors should not commit generated screenshots for new models unless requested. The maintainer should capture real pages, compress the images to WebP, and upload them to R2.

## Adding a Model

See [CONTRIBUTING.md](./CONTRIBUTING.md) before opening a PR.

Add a model as an isolated implementation:

```text
src/components/model-showcases/{modelSlug}/
```

Each model should provide the same 18 showcase IDs:

```text
standard-builder
visual-frontend
design-logic
impeccable-full-flow
artifact-builder
ux-pro-reference
component-system
motion-bits
standard-taste
standard-impeccable
visual-taste
visual-impeccable
design-ux-pro
design-impeccable
balanced-chain
visual-premium-chain
product-polish-chain
max-quality-chain
```

Each page must be independently openable under:

```text
/model-showcase/{modelSlug}/{showcaseId}
```

## Checks

```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm build:static
```
