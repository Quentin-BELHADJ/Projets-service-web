# ⚙️ Prérequis Back-End - Mini-Projet 2

## 🌐 Environnement requis

- **Node.js** (v14+ ou v16+ recommandé)
- **npm** (v6+ recommandé)
- Un terminal compatible bash/sh

## 📁 Installation des dépendances

```bash
cd back
npm install
```

### Dépendances principales installées

- `express` : Framework web pour Node.js
- `bcrypt` : Hachage sécurisé des mots de passe
- `cors` : Configuration des CORS entre back et front
- `dotenv` : Chargement des variables d'environnement depuis un `.env`
- `jsonwebtoken` : Gestion des JWT
- `sequelize`, `pg` : ORM et pilote PostgreSQL

## 🔐 Configuration des variables d'environnement

Copier `.env.example` en `.env` et compléter les valeurs nécessaires :

```bash
cp .env.example .env
```

## 🚀 Lancement du serveur

```bash
npm start
```

Le serveur écoute sur le port défini dans `.env`, typiquement `http://localhost:3000/`.

## 📚 Structure des dossiers

```
back/
│
├── app.js               → Point d'entrée principal
├── .env / .env.example  → Variables d'environnement
├── config/              → Configuration Sequelize
├── controller/          → Logique métier (user)
├── middlewares/         → Auth, CORS
├── models/              → Modèles Sequelize
├── routes/              → Définition des routes API
├── Commandes.txt        → Commandes utiles
└── package.json         → Dépendances
```

---

*Document généré automatiquement à partir des fichiers du projet.*
