# Mini-Projet 1 : Authentification avec Passport-Local et Sessions


## 👥 Membres du Groupe
- **Quentin BELHADJ** 
- **Audrick SOLTNER** 

---

## 🚀 Description du Projet

Ce mini-projet est une application web mettant en œuvre :

- Une authentification sécurisée basée sur **Passport-Local**.
- Une gestion des sessions utilisateur persistées en base de données PostgreSQL.
- Un frontend en **Vue.js 2** pour l'interface utilisateur.
- Un backend en **Node.js** avec **Express.js** pour le traitement des requêtes.
- Une base de données **PostgreSQL** interfacée avec **Sequelize ORM**.

---

## ✨ Fonctionnalités

- Inscription des utilisateurs
- Connexion avec création de session
- Gestion sécurisée des mots de passe (bcrypt)
- Stockage des sessions en base de données
- Déconnexion de l'utilisateur
- Gestion des erreurs et redirections

---

## 🛡️ Sécurité mise en œuvre

- Hachage des mots de passe côté serveur avec **bcrypt**.
- Protection des cookies via **HTTPOnly** et **SameSite**.
- Stockage sécurisé des sessions dans PostgreSQL.
- Gestion des statuts HTTP (401 Unauthorized, etc.) en cas de session expirée.

---

## 📚 Technologies utilisées

- **Backend** : Node.js, Express.js, Passport.js, Sequelize ORM
- **Frontend** : Vue.js 2, Vuex, Vue Router, Axios
- **Session Store** : connect-pg-simple (stockage sessions PostgreSQL)
- **Base de données** : PostgreSQL

---


## Structure du projet
```
Mini-Projet-1
│   
│   README.md
│
├───back
│   │   .env
│   │   .env.example
│   │   app.js
│   │   Commandes.txt
│   │   package-lock.json
│   │   package.json
│   │   tree.txt
│   │
│   ├───config
│   │       passport.js
│   │
│   ├───controller
│   │       user.controller.js
│   │
│   ├───middlewares
│   │       auth.middleware.js
│   │       cors.middleware.js
│   │       passport.middleware.js
│   │       session.middleware.js
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