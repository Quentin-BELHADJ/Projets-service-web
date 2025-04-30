const mongoose = require("mongoose");

const singleMessageSchema = new mongoose.Schema({
	sender: { type: String, required: true },
	content: { type: String, required: true },
	timestamp: { type: Date, default: Date.now }
});

const messageSchema = new mongoose.Schema({
	participants: {
		type: [String],
		validate: {
			validator: arr => arr.length === 2,
			message: "Une conversation doit avoir exactement 2 participants"
		}
	},
	messages: [singleMessageSchema]
});

module.exports = mongoose.model("Message", messageSchema);
