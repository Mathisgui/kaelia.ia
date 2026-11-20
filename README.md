This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Déploiement (Cloudflare Workers, depuis le 2026-11-20)

Le site tourne sur Cloudflare Workers via l'adaptateur OpenNext (`@opennextjs/cloudflare`).

- **Automatique** : chaque push sur `master` déclenche Workers Builds (compte Cloudflare Kaelia,
  Worker `kaelia-ai`) : `npm run content:lint && npx opennextjs-cloudflare build`, puis
  `npx opennextjs-cloudflare deploy`. Un contenu qui échoue au lint bloque la mise en ligne.
- **Manuel** (secours) : `npm run deploy` (demande `wrangler login` sur le compte Kaelia).
- **Test local au plus près de la prod** : `npm run preview`.
- Configuration : `wrangler.jsonc` (routes `kaelia-ai.com/*` et `www.kaelia-ai.com/*`),
  `open-next.config.ts`, en-têtes de sécurité et redirections dans `next.config.ts`.
