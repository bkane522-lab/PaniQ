# PaniQ

PaniQ compare une liste de courses et repère les économies possibles avec des estimations indicatives.

## Nouveautés V1.0.7

- API serveur `/api/analyze` connectée à **Groq**.
- Variable Vercel : `GROQ_API_KEY`.
- Modèle par défaut : `llama-3.3-70b-versatile`.
- Aldi conservé dans la comparaison.
- Comparaison sur 5 enseignes : Leclerc, Lidl, Aldi, Carrefour, Intermarché.
- Moteur local de secours si la clé API n'est pas configurée ou si l'API répond avec une erreur.
- Version mobile-safe : `App.jsx` et `main.jsx` sont à la racine, pour éviter les erreurs d'upload GitHub mobile.

## Structure

```txt
PaniQ/
├── api/
│   └── analyze.js
├── public/
│   ├── favicon.svg
│   ├── manifest.webmanifest
│   └── sw.js
├── App.jsx
├── main.jsx
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
├── .env.example
├── .gitignore
├── .nvmrc
├── .node-version
└── README.md
```

## Déploiement Vercel

1. Mets tous les fichiers du ZIP à la racine du dépôt GitHub.
2. Vérifie que tu vois bien `App.jsx`, `main.jsx`, `api/`, `public/` à la racine.
3. Déploie sur Vercel avec le preset Vite.
4. Pour activer l'IA Groq, ajoute une variable d'environnement dans Vercel :

```txt
GROQ_API_KEY=ta_clé_groq
```

Optionnel :

```txt
GROQ_MODEL=llama-3.3-70b-versatile
```

Après l'ajout de la clé, relance un **Redeploy** dans Vercel.

## Important

Ne mets jamais ta clé API dans GitHub. Elle doit rester uniquement dans Vercel > Settings > Environment Variables.

PaniQ ne donne pas des prix exacts garantis. Les résultats sont des estimations indicatives et peuvent varier selon le magasin, le drive, la ville, les formats, les stocks et les promotions.
