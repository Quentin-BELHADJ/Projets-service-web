require("dotenv").config();
const express = require("express");
const session = require("express-session");
const RedisStore = require("connect-redis")(session); // ✅ version 5
const passport = require("passport");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const redisClient = require("./config/redis"); // client brut, connecté ailleurs
require("./config/passport");

const app = express();

// Middleware CORS
app.use(cors({
	origin: "http://localhost:8080",
	credentials: true
}));

// Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// RedisStore (avec client déjà connecté depuis server.js)
const redisStore = new RedisStore({
	client: redisClient,
	prefix: "sess:"
});

// Sessions
app.use(session({
	store: redisStore,
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
	cookie: {
		httpOnly: true,
		secure: false,
		sameSite: "lax",
		maxAge: 1000 * 60 * 15
	}
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", require("./routes/auth"));
app.use("/chat", require("./routes/chat"));
app.use("/users", require("./routes/user"));

app.get("/", (req, res) => {
	res.send("Backend OAuth Chat API opérationnel 🚀");
});

module.exports = app;
