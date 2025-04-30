# ⚙️ Prérequis et Installation (Backend)

## ✅ Prérequis techniques

- **Node.js** ≥ 18.x  
- **PostgreSQL** ≥ 13  
- Un fichier `.env` configuré avec les informations de connexion à votre base de données (voir `.env.example` ci-dessous)

## 📦 Dépendances à installer

Installez les dépendances nécessaires avec la commande suivante :

```bash
npm install bcrypt connect-pg-simple cors dotenv express express-session passport passport-local pg pg-hstore sequelize
```

## 🚀 Lancer le serveur

Démarrez le serveur avec :

```bash
node app.js
```

### 💡 Astuce développement

Pour faciliter le développement, vous pouvez installer et utiliser **nodemon** :

```bash
npm install -g nodemon
nodemon app.js
```
