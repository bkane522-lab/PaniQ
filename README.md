# PaniQ

PaniQ est une PWA de comparaison indicative de panier de courses.

## Promesse

- Comparer un panier entre Leclerc, Lidl, Carrefour et Intermarché.
- Proposer des substitutions simples pour réduire le total estimé.
- Rester transparent : les montants affichés sont des estimations indicatives, pas des prix exacts garantis.

## Structure

```txt
paniq-project/
├── api/
│   └── analyze.js
├── public/
│   ├── favicon.svg
│   ├── icon-192.png
│   ├── icon-512.png
│   ├── manifest.webmanifest
│   ├── maskable-512.png
│   └── sw.js
├── src/
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
├── .env.example
├── .gitignore
└── README.md
```

## Installation locale

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Déploiement Vercel

1. Importer le dossier sur GitHub.
2. Importer le dépôt dans Vercel.
3. Laisser Vercel détecter Vite.
4. Build command : `npm run build`.
5. Output directory : `dist`.

## IA / clé API

La clé Anthropic ne doit jamais être placée dans `src/App.jsx`.

Dans Vercel, ajouter seulement si tu veux activer l'analyse IA externe :

```txt
ANTHROPIC_API_KEY=ta_clé_api
ANTHROPIC_MODEL=claude-sonnet-4-6
```

Sans clé API, l'application fonctionne quand même avec le moteur local d'estimation inclus dans `api/analyze.js`.

## Correction V1.0.1

Cette version évite les dépendances `latest`, qui peuvent casser un build Vercel quand une nouvelle version majeure de Vite ou d'un plugin sort.

- Vite épinglé en version stable.
- React épinglé en version stable.
- PWA configurée manuellement avec `manifest.webmanifest` et `sw.js`.
- Suppression de `vite-plugin-pwa` pour éviter les conflits de version au build.
- Node forcé en 20.x via `package.json`.


## Vercel

Cette version force Node.js 24.x et corrige le build Vite.



## Correctif Vercel V1.0.3

Cette version corrige l’import de `src/main.jsx` depuis `index.html` en utilisant un chemin relatif : `./src/main.jsx`.

Important pour GitHub : le dossier `src/` doit être présent à la racine du dépôt, au même niveau que `index.html` et `package.json`.

Structure attendue dans GitHub :

```txt
PaniQ/
├── api/
├── public/
├── src/
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── vercel.json
```
