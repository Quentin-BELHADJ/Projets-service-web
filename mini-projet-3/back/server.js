const http = require("http");
const { Server } = require("socket.io");
const app = require("./app");
const connectDB = require("./config/db");
const redisClient = require("./config/redis"); // client déjà prêt
const Message = require("./models/Message");
require("dotenv").config();

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: "http://localhost:8080",
		credentials: true
	}
});

require("./sockets/chat")(io);

connectDB()
	.then(async () => {
		console.log("✅ Redis connecté (v3)"); // déjà connecté via l'événement dans redis.js
		const PORT = process.env.PORT || 3000;
		server.listen(PORT, () => {
			console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
		});
	})
	.catch(err => {
		console.error("❌ Erreur au démarrage :", err);
		process.exit(1);
	});
