const Message = require("../models/Message");

const onlineUsers = new Map();

module.exports = (io) => {
	io.on("connection", (socket) => {
		console.log("🟢 Nouvelle connexion socket :", socket.id);
	
		// TEMP : affiche les cookies reçus
		console.log("🍪 Cookies bruts :", socket.handshake.headers.cookie);
	
		socket.on("register", (userId) => {
			console.log("📨 Reçu event register avec userId :", userId);
			if (!userId) return;
			onlineUsers.set(userId, socket.id);
			console.log(`📡 Utilisateur enregistré : ${userId}`);
		});
	// TEMP : affiche les cookies reçus
	console.log("🍪 Cookies bruts :", socket.handshake.headers.cookie);

	socket.on("register", (userId) => {
		console.log("📨 Reçu event register avec userId :", userId);
		if (!userId) return;
		onlineUsers.set(userId, socket.id);
		console.log(`📡 Utilisateur enregistré : ${userId}`);
	});
		// Envoi d'un message
		socket.on("sendMessage", async ({ sender, receiver, content }) => {
			if (!sender || !receiver || !content?.trim()) {
				console.warn("❌ Message invalide", { sender, receiver, content });
				return;
			}

			console.log("📨 Reçu dans backend :", { sender, receiver, content });

			try {
				// Stocker dans la BDD
				const newMsg = new Message({ sender, receiver, content });
				await newMsg.save();

				// Envoyer au destinataire s'il est connecté
				const receiverSocketId = onlineUsers.get(receiver);
				if (receiverSocketId) {
					io.to(receiverSocketId).emit("newMessage", newMsg);
					console.log(`📤 Message envoyé à ${receiver} via socket`);
				}

				// Renvoyer aussi à l'expéditeur (local)
				socket.emit("newMessage", newMsg);
			} catch (err) {
				console.error("❌ Erreur lors de l'enregistrement du message :", err);
			}
		});

		// Déconnexion
		socket.on("disconnect", () => {
			console.log("🔴 Socket déconnecté :", socket.id);
			for (const [userId, socketId] of onlineUsers.entries()) {
				if (socketId === socket.id) {
					onlineUsers.delete(userId);
					console.log(`❌ Utilisateur déconnecté : ${userId}`);
					break;
				}
			}
		});
	});
};
