# 📦 Prérequis Front-End - Mini-Projet 1

## 🌐 Environnement requis

- **Node.js** (v14.x ou v16.x recommandé)
- **npm** (v6+ recommandé)
- Un terminal compatible bash/sh (Mac, Linux ou Git Bash sous Windows)
- Un éditeur de code (ex: VS Code)

## 📁 Installation du projet Front

```bash
cd front
npm install
```

Les dépendances suivantes seront installées :

- `vue` (v2.6.14)
- `vuex` (v3.6.2)
- `vue-router` (v3.5.1)
- `axios` (v1.9.0)
- `core-js` (v3.8.3)

## 🏗️ Lancer le serveur de développement

```bash
npm run serve
```

Le projet est ensuite accessible par défaut à l’adresse :
```
http://localhost:8080/
```

## 🧪 Scripts disponibles

- `npm run serve` : démarre le serveur de développement
- `npm run build` : génère la version de production dans `/dist`
- `npm run lint` : analyse le code avec ESLint

## 📦 Structure du dossier `front`

```
front/
│
├── public/           → Fichiers publics (favicon, index.html)
├── src/              → Code source de l'application Vue
│   ├── assets/       → Images et ressources statiques
│   ├── components/   → Composants UI (Navbar, Footer, etc.)
│   ├── router/       → Configuration de Vue Router
│   ├── services/     → Services Axios et Auth
│   ├── store/        → Vuex Store
│   └── views/        → Pages principales (Login, Register, etc.)
│
├── .browserslistrc   → Cibles des navigateurs
├── .eslintrc.js      → Configuration ESLint
├── babel.config.js   → Configuration Babel
├── vue.config.js     → Config Vue CLI
└── package.json      → Dépendances et scripts npm
```

## 🛠️ Dépendances de développement

Inclut notamment :

- `@vue/cli-service` (v5.x)
- `eslint`, `eslint-plugin-vue`
- `babel`, `vue-template-compiler`

---

## ✅ Préconisations

- Utiliser **Vue DevTools** pour le debug.
- S'assurer que le backend (Express + Sessions) est démarré pour tester la connexion et les sessions.
- Veiller à synchroniser les ports/API dans `axios.service.js` si l'API backend est déployée sur un port différent.

---

*Document généré automatiquement à partir de la configuration du projet.*
