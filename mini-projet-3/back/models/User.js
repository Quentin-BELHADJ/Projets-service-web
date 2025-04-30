const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
	googleId: String,
	githubId: String,
	name: String,
	email: { type: String, unique: true },
	password: String // Hash du mot de passe pour l'auth locale
});

// Hash automatique avant enregistrement
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	this.password = await bcrypt.hash(this.password, 10);
	next();
});

// Méthode de comparaison de mot de passe
userSchema.methods.comparePassword = function (candidatePassword) {
	return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
