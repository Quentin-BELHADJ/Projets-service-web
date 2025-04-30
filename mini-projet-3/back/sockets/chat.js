const Message = require("../models/Message");

const onlineUsers = new Map();

module.exports = (io) => {
	io.on("connection", (socket) => {
		console.log("🟢 Nouvelle connexion socket :", socket.id);

		// Affiche les cookies (debug)
		console.log("🍪 Cookies bruts :", socket.handshake.headers.cookie);

		socket.on("register", (userId) => {
			console.log("📨 Reçu event register avec userId :", userId);
			if (!userId) return;
			onlineUsers.set(userId, socket.id);
			console.log(`📡 Utilisateur enregistré : ${userId}`);
		});

		socket.on("sendMessage", async ({ sender, receiver, content }) => {
			if (!sender || !receiver || !content?.trim()) {
				console.warn("❌ Message invalide", { sender, receiver, content });
				return;
			}

			console.log("📨 Reçu dans backend :", { sender, receiver, content });

			try {
				// Tri les participants pour garantir l’unicité
				const participants = [sender, receiver].sort();

				let conversation = await Message.findOne({ participants });

				if (!conversation) {
					conversation = new Message({ participants, messages: [] });
				}

				const newMessage = {
					sender,
					content
				};

				conversation.messages.push(newMessage);
				await conversation.save();

				// Envoi au destinataire
				const receiverSocketId = onlineUsers.get(receiver);
				if (receiverSocketId) {
					io.to(receiverSocketId).emit("newMessage", newMessage);
					console.log(`📤 Message envoyé à ${receiver} via socket`);
				}

				// Envoi à l'expéditeur
				socket.emit("newMessage", newMessage);
			} catch (err) {
				console.error("❌ Erreur lors de l'enregistrement du message :", err);
			}
		});

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
