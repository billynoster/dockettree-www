# Docket Tree — marketing site (`dockettree-www`)

Apex / www marketing site for **dockettree.com**. Product CTAs point to **[https://app.dockettree.com](https://app.dockettree.com)**.

This is **not** the product app. The durable app remote is [`billynoster/dockettree`](https://github.com/billynoster/dockettree).

## Stack

- **Next.js** (App Router) + TypeScript + Tailwind
- **shadcn/ui** primitives (`Button`)
- **Framer Motion** for brand mark / copy / scroll beat
- **React Three Fiber** for the hero network only (scattered → connected)

## V1

- Full-bleed network atmosphere hero
- Brand-first foreground (mark + name + headline + tagline)
- One scroll beat that advances the network from scattered → connected
- Start Free Trial / Log in CTAs → app
- `prefers-reduced-motion`: static fully-connected network, no ambient spin

## Run locally

```bash
npm install
npm run dev
```

Dev server: **http://127.0.0.1:43127**

```bash
npm run build
npm start
```

## CTA targets

| CTA | URL |
| --- | --- |
| Start Free Trial | `https://app.dockettree.com` |
| Log in | `https://app.dockettree.com/login` |
| See plans in the app | `https://app.dockettree.com/pricing` |

## Deploy (dockettree.com / www)

Static-friendly Next output or Node host:

1. **Cloudflare Pages** / Vercel: connect this repo, framework Next.js, production branch `main`.
2. Point **dockettree.com** + **www** at the marketing deploy.
3. Keep **app.dockettree.com** on the Cloud Run app (`dockettree` repo).

Brand PNGs live in `public/brand/` (synced from the app kit). Do not load chrome images from Firebase Storage.

## License

See [LICENSE](./LICENSE).
