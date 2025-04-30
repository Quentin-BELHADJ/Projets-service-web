const MessageThread = require("../models/Message");

exports.getMessagesBetweenUsers = async (req, res) => {
	const { user1, user2 } = req.params;
	const participants = [user1, user2].sort();

	try {
		const thread = await MessageThread.findOne({ participants: { $all: participants } });
		if (!thread) return res.status(200).json([]);
		return res.status(200).json(thread.messages);
	} catch (err) {
		console.error("❌ Erreur récupération messages :", err);
		res.status(500).json({ error: "Erreur serveur" });
	}
};
