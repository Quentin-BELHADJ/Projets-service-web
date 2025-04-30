const redis = require("redis");

const redisClient = redis.createClient({
	url: process.env.REDIS_URL || "redis://localhost:6379"
});

redisClient.on("connect", () => {
	console.log("✅ Redis connecté (v3)");
});

redisClient.on("error", (err) => {
	console.error("❌ Erreur Redis :", err);
});

module.exports = redisClient;