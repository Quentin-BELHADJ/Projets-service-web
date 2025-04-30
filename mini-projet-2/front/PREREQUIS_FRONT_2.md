# 🎨 Prérequis Front-End - Mini-Projet 2

## 🌐 Environnement requis

- **Node.js** (v14+ ou v16+ recommandé)
- **npm** (v6+ recommandé)
- Un éditeur de code comme VS Code

## 📁 Installation des dépendances

```bash
cd front
npm install
```

### Dépendances principales installées

- `vue` (v2.6.14)
- `vuex` (v3.6.2)
- `vue-router` (v3.5.1)
- `axios` (v1.9.0)
- `core-js` (v3.8.3)

## 🚀 Lancement de l'application

```bash
npm run serve
```

Le projet est disponible sur `http://localhost:8080/`.

## 🧪 Scripts disponibles

- `npm run serve` : démarre le serveur de développement
- `npm run build` : génère la version de production
- `npm run lint` : vérifie la qualité du code

## 📚 Structure des dossiers

```
front/
├── public/              → Fichiers publics (index.html, favicon, etc.)
├── src/                 → Code source Vue.js
│   ├── assets/          → Images et ressources
│   ├── components/      → Composants UI (Navbar, Dialogs, etc.)
│   ├── router/          → Configuration Vue Router
│   ├── services/        → Appels Axios
│   ├── store/           → Vuex Store
│   └── views/           → Pages de l'application
├── vue.config.js        → Configuration CLI
└── package.json         → Dépendances et scripts
```

---

*Document généré automatiquement à partir des fichiers du projet.*
