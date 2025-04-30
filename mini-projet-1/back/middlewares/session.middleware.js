const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const { Pool } = require('pg');

const pool = new Pool({
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	database: process.env.DB_NAME,
});

const sessionMiddleware = session({
	store: new pgSession({
		pool: pool,
		tableName: 'session'
	}),
	secret: process.env.SESSION_SECRET || 'monSuperSecret',
	resave: false,
	saveUninitialized: false,
	cookie: {
		secure: false, // HTTPS seulement en prod
		httpOnly: true,
		sameSite: 'lax',
		maxAge: 5 * 60 * 1000 // 5 minutes
	}
});

module.exports = sessionMiddleware;
