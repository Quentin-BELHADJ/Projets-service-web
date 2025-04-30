const express = require('express');
require('dotenv').config();

const { sequelize } = require('./models/user.model');
const createDatabaseIfNotExists = require('./models/createDatabase');
const seedUsers = require('./models/seedUser');

const userRoutes = require('./routes/user.router');
const corsMiddleware = require('./middlewares/cors.middleware');

const app = express();
const port = process.env.API_PORT || 3000;

// Middlewares
app.use(corsMiddleware);
app.use(express.json());

// Routes
app.use('/user', userRoutes);

// Routes catch-all
app.use("*", (req, res, next) => {
	const error = new Error("Route non trouvée");
	error.status = 404;
	next(error);
});
app.use((err, req, res, next) => {
	res.status(err.status || 500).send(err.message);
});

// Démarrage
(async () => {
	try {
		await createDatabaseIfNotExists();
		await sequelize.authenticate();
		console.log("✅ Connexion PostgreSQL réussie");

		await sequelize.sync({ alter: true });
		console.log("📦 Modèles synchronisés");

		await seedUsers();

		app.listen(port, () => {
			console.log(`🚀 API démarrée sur http://localhost:${port}`);
		});
	} catch (err) {
		console.error("❌ Erreur de lancement :", err.message);
		process.exit(1);
	}
})();

module.exports = app;
