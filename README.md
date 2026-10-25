# Docket Tree — marketing site (`dockettree-www`)

Apex / www marketing site for **[dockettree.com](https://dockettree.com)**. Product CTAs point to **[https://app.dockettree.com](https://app.dockettree.com)**.

This is **not** the product app. The durable app remote is [`billynoster/dockettree`](https://github.com/billynoster/dockettree).

## Stack

- **Next.js** (App Router) + TypeScript + Tailwind — `output: 'export'` for Cloudflare Pages
- **shadcn/ui** primitives (`Button`)
- **Framer Motion** for section entrances / workflow / header menu
- **React Three Fiber** for the hero readiness network only (scattered → connected)

## V2 → V2.3

Full marketing narrative: hero (brand + network + product overlay) → product proof → problem → capabilities → workflow → readiness philosophy → team → pricing preview → final CTA → footer.

- Sticky marketing header with in-page anchors
- Intentional hub/branch network topology
- Authentic product screenshots in browser frames
- `prefers-reduced-motion`: static connected network, no ambient spin / large transforms
- Claims verified against product pricing docs (monthly plans, unlimited internal seats, 30-day trial). **“No credit card required” omitted** — Stripe Checkout collects a payment method for trials.
- **V2.3 UX:** clearer trial path (“Start in the app”), active-vendor + vendors-don’t-pay pricing notes, pricing-band CTA de-dupe, workflow stage helper — no manipulative funnel tactics.

## Run locally

```bash
npm install
npm run dev
```

Dev server: **http://127.0.0.1:43127**

```bash
npm run build   # writes static site to out/
npx serve out -l 43127
```

### Hero Try Live variations

Default is the approved **static** hero. Compare motion experiments with a query param (no in-page toggles):

| URL | Variation |
| --- | --- |
| `/` or `/?hero=static` | Approved static baseline |
| `/?hero=layered` | Concept B translucent layered reveal |
| `/?hero=intelligent` | Intelligent dashboard piece-by-piece reveal |

## CTA targets

| CTA | URL |
| --- | --- |
| Start Free Trial | `https://app.dockettree.com/signup` |
| Log in | `https://app.dockettree.com/login` |
| Compare / Explore Pricing | `https://app.dockettree.com/pricing` |
| Contact Sales | `mailto:bno@billyno.com` |

## Deploy (dockettree.com / www)

**Host:** Cloudflare Pages with Next.js **static HTML export** (`output: 'export'` → `out/`).

| Setting | Value |
| --- | --- |
| Framework preset | **Next.js (Static HTML Export)** |
| Production branch | `main` |
| Build command | `npx next build` (or `npm run build`) |
| Build output directory | `out` |
| Environment variable | `NODE_VERSION` = `22` (or `20`) |

Keep **app.dockettree.com** on Cloud Run. Brand PNGs live in `public/brand/`.

## License

See [LICENSE](./LICENSE).
