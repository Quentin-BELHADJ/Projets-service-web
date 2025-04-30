const { Pool } = require('pg');

const pool = new Pool({
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	database: process.env.DB_NAME,
});

async function initSessionTable() {
	const createTableQuery = `
		CREATE TABLE IF NOT EXISTS "session" (
			"sid" varchar NOT NULL PRIMARY KEY,
			"sess" json NOT NULL,
			"expire" timestamp(6) NOT NULL
		);
	`;

	try {
		await pool.query(createTableQuery);
		console.log('✅ Table "session" prête.');
	} catch (error) {
		console.error('❌ Erreur lors de la création de la table "session" :', error.message);
		throw error; // si besoin tu veux que l'app s'arrête
	}
}

module.exports = {
	initSessionTable
};
