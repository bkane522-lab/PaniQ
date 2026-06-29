# PaniQ

PaniQ est une app Vite + React pour estimer un panier de courses, comparer plusieurs enseignes et repérer des économies possibles.

## Important

Les prix affichés sont des estimations indicatives. Ils peuvent varier selon le magasin, le drive, la ville et les promotions.

## Version V1.0.4 Mobile Safe

Cette version est pensée pour éviter l'erreur Vercel :

```txt
Could not resolve "./src/main.jsx" from "index.html"
```

Le fichier d'entrée est maintenant à la racine :

```txt
main.jsx
App.jsx
```

Donc même si GitHub n'importe pas les dossiers `src/`, le build Vercel peut fonctionner.

## Structure

```txt
paniq/
├── App.jsx
├── main.jsx
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
├── api/
│   └── analyze.js
├── public/
│   ├── favicon.svg
│   ├── manifest.webmanifest
│   └── sw.js
├── .env.example
├── .gitignore
├── .node-version
└── .nvmrc
```

## Déploiement Vercel

- Framework Preset : Vite
- Build Command : `npm run build`
- Output Directory : `dist`
- Node : 24.x

## IA

L'app fonctionne sans clé IA grâce au moteur local.

Pour activer Claude côté serveur :

1. Aller dans Vercel > Project Settings > Environment Variables
2. Ajouter : `ANTHROPIC_API_KEY`
3. Redéployer
