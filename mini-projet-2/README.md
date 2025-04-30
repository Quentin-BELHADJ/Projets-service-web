# Mini-Projet 2 : Authentification avec JWT

## 👥 Membres du Groupe
- **Quentin BELHADJ**  
- **Audrick SOLTNER**  

---

## 🚀 Description du Projet

Ce mini-projet est une application web permettant :

- Une **authentification basée sur JSON Web Tokens (JWT)**.
- Une séparation claire des responsabilités entre frontend (Vue.js) et backend (Node.js/Express).
- Une **base de données relationnelle** pour stocker les utilisateurs.
- Une **gestion des tokens côté client** via LocalStorage ou SessionStorage.

L'objectif est de comprendre le fonctionnement des JWT, leur sécurisation, ainsi que leur intégration côté client dans un environnement Single Page Application (SPA).

---

## ✨ Fonctionnalités

- Inscription des utilisateurs
- Connexion avec génération d’un JWT
- Accès sécurisé à une page protégée par JWT
- Déconnexion du client avec suppression du token
- Gestion des erreurs d'authentification (401, etc.)

---

## 🛡️ Sécurité mise en œuvre

- Hachage des mots de passe avec **bcrypt**
- Génération et vérification des **JWT signés côté serveur**
- Middleware Express pour protéger les routes privées
- Gestion sécurisée du token côté client (stockage local et renouvellement)
- Vérification d’identité via les entêtes `Authorization: Bearer`

---

## 📚 Technologies utilisées

- **Backend** : Node.js, Express.js, JWT (`jsonwebtoken`), Sequelize ORM
- **Frontend** : Vue.js 2, Vuex, Vue Router, Axios
- **Base de données** : PostgreSQL ou MySQL (via Sequelize)
- **Sécurité** : bcrypt, JWT

---

## 🧱 Structure du projet
```

│   .gitignore
│   README.md
│
├───back
│   │   .env
│   │   .env.example
│   │   app.js
│   │   Commandes.txt
│   │   package-lock.json
│   │   package.json
│   │
│   ├───config
│   ├───controller
│   │       user.controller.js
│   │
│   ├───middlewares
│   │       auth.middleware.js
│   │       cors.middleware.js
│   │
│   ├───models
│   │       createDatabase.js
│   │       seedUser.js
│   │       session.model.js
│   │       user.model.js
│   │
│   └───routes
│           user.router.js
│
└───front
    │   .browserslistrc
    │   .eslintrc.js
    │   .gitignore
    │   babel.config.js
    │   Commandes.txt
    │   jsconfig.json
    │   package-lock.json
    │   package.json
    │   README.md
    │   vue.config.js
    │
    ├───public
    │       favicon.ico
    │       index.html
    │
    └───src
        │   App.vue
        │   main.js
        │
        ├───assets
        │       logo.png
        │
        ├───components
        │       ErrorDialog.vue
        │       FooterContainer.vue
        │       HelloWorld.vue
        │       NavBar.vue
        │       SuccessDialog.vue
        │
        ├───router
        │       index.js
        │
        ├───services
        │       auth.service.js
        │       axios.service.js
        │
        ├───store
        │       index.js
        │
        └───views
                AboutView.vue
                HomePage.vue
                LoginPage.vue
                MonComptePage.vue
                RegisterPage.vue
```