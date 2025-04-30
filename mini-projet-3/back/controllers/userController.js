const User = require("../models/User");
const passport = require("passport");

exports.register = async (req, res) => {
	const { name, email, password } = req.body;
	if (!email || !password || !name) {
		return res.status(400).json({ message: "Champs requis manquants" });
	}
	try {
		const existing = await User.findOne({ email });
		if (existing) return res.status(400).json({ message: "Email déjà utilisé" });

		const newUser = new User({ name, email, password });
		await newUser.save();
		res.status(201).json({ message: "Compte créé avec succès" });
	} catch (err) {
		console.error("❌ Erreur inscription :", err);
		res.status(500).json({ message: "Erreur serveur" });
	}
};

exports.login = (req, res, next) => {
	passport.authenticate("local", (err, user, info) => {
		if (err) return next(err);
		if (!user) return res.status(401).json({ message: info?.message || "Échec de connexion" });

		req.login(user, (err) => {
			if (err) return next(err);

			req.session.save((err) => {
				if (err) {
					console.error("❌ Erreur session.save :", err);
					return res.status(500).json({ message: "Erreur session" });
				}

				const { _id, name, email } = user;
				console.log("✅ Session sauvegardée manuellement après login local");
				res.status(200).json({ message: "Connexion réussie", user: { _id, name, email } });
			});
		});
	})(req, res, next);
};

exports.getAllUsers = async (req, res) => {
	try {
		const users = await User.find({}, '_id name email'); // éviter les IDs OAuth
		res.status(200).json(users);
	} catch (e) {
		res.status(500).json({ error: "Erreur serveur" });
	}
};

