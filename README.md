# PaniQ

**PaniQ** est une PWA React/Vite pour comparer une liste de courses entre plusieurs enseignes et repérer des économies possibles.

L'app affiche des **estimations indicatives**. Elle ne garantit pas des prix exacts, car les prix réels peuvent varier selon le magasin, le drive, la ville, la marque disponible et les promotions.

## Structure

```txt
paniq-project/
├── api/
│   └── analyze.js          ← route serveur Vercel pour sécuriser l'appel IA
├── public/
│   ├── favicon.svg
│   ├── icon-192.png
│   ├── icon-512.png
│   └── maskable-512.png
├── src/
│   ├── App.jsx             ← app complète PaniQ
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js          ← PWA configurée
├── vercel.json             ← routing SPA + API
├── .env.example            ← clé API à renseigner
├── .gitignore
└── README.md
```

## Installation locale

```bash
npm install
npm run dev
```

## Déploiement Vercel

1. Importer le projet sur GitHub.
2. Connecter le repo à Vercel.
3. Dans Vercel, ajouter la variable d'environnement :

```bash
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Optionnel :

```bash
ANTHROPIC_MODEL=claude-sonnet-4-6
```

4. Déployer.

## Sécurité

La clé API n'est pas dans `src/App.jsx`. L'app appelle :

```txt
/api/analyze
```

Puis la route serveur appelle Anthropic côté Vercel. Cela évite d'exposer la clé API dans le navigateur.

## Mode sans clé API

Si `ANTHROPIC_API_KEY` n'est pas renseignée, l'app utilise un mode d'estimation local côté serveur. Cela permet de tester l'interface sans bloquer l'expérience.

## Promesse utilisateur

PaniQ aide à :

- comparer un panier de courses ;
- repérer les produits qui pèsent lourd dans le budget ;
- proposer des substitutions raisonnables ;
- rappeler que les prix doivent être vérifiés en magasin ou en drive.

