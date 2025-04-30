# Mini-Projet 3 : Authentification OAuth2 avec Google et Chat en temps réel

## 👥 Membres du Groupe
- **Quentin BELHADJ**
- **Audrick SOLTNER**

---

## 🚀 Description du Projet

Ce mini-projet est une application web permettant :

- Une authentification sécurisée via **OAuth2** (Google et un second fournisseur comme GitHub).
- Une interface de **messagerie instantanée** en temps réel entre utilisateurs connectés.
- Une gestion des sessions optimisée avec **Redis**.
- Le stockage des utilisateurs et des historiques de messages dans **MongoDB**.
- Une interface utilisateur développée avec **Vue.js**.

---

## ✨ Fonctionnalités

- Authentification via Google et GitHub OAuth2
- Stockage des utilisateurs et tokens dans MongoDB
- Mise en cache des sessions utilisateur avec Redis
- Chat en temps réel via WebSocket (Socket.io)
- Historique des messages stocké et consultable
- Notification des connexions/déconnexions en direct

---

## 🛡️ Sécurité mise en œuvre

- Authentification OAuth2 sécurisée avec Passport.js
- Sessions sécurisées via cookies signés ou JWT
- Utilisation de Redis pour le stockage rapide des sessions
- Gestion des accès aux routes via middlewares d’authentification
- Filtrage et échappement des messages pour éviter les injections

---

## 📚 Technologies utilisées

- **Backend** : Node.js, Express.js, Passport.js, Socket.io
- **Frontend** : Vue.js, Vue Router, Axios
- **Base de données** : MongoDB avec Mongoose
- **Sessions & Cache** : Redis
- **Authentification** : OAuth2 (Google, GitHub)
- **Communication Temps Réel** : Socket.io

---

## 🧱 Structure du projet

```
│   README.md
│
├───back
│   │   .env
│   │   .env.example
│   │   app.js
│   │   package-lock.json
│   │   package.json
│   │   server.js
│   │   testredis.js
│   │
│   ├───config
│   │       db.js
│   │       passport.js
│   │       redis.js
│   │
│   ├───controllers
│   │       authController.js
│   │       chatController.js
│   │       userController.js
│   │
│   ├───middlewares
│   │       isAuthenticated.js
│   │
│   ├───models
│   │       Message.js
│   │       User.js
│   │
│   ├───routes
│   │       auth.js
│   │       chat.js
│   │       user.js
│   │
│   └───sockets
│           chat.js
│
└───front
    │   .browserslistrc
    │   .eslintrc.js
    │   .gitignore
    │   babel.config.js
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
        │       ChatBox.vue
        │       HelloWorld.vue
        │       LoginButtons.vue
        │       UserList.vue
        │
        ├───router
        │       index.js
        │
        ├───services
        │       axios.service.js
        │
        ├───store
        │       index.js
        │
        └───views
                DashboardView.vue
                HomeView.vue
```