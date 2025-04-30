const passport = require('passport');
const { User } = require('../models/user.model');
const bcrypt = require('bcrypt');

exports.register = async (req, res, next) => {
	try {
		const { username, password, email } = req.body;
		if (!username || !password) {
			return res.status(400).json({ success:false, message: "Nom d'utilisateur et mot de passe requis" });
		}
		const existingUserMail = await User.findOne({ where: { email } });
		if (existingUserMail) {
			return res.status(409).json({ success:false, message: "Mail déjà utilisé" });
		}
		const existingUsername = await User.findOne({ where: { username } });
		if (existingUsername) {
			return res.status(409).json({ success:false, message: "Nom d'utilisateur déjà utilisé" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await User.create({ username, password: hashedPassword , email });

		res.status(201).json({success:true, message: "Utilisateur créé", user: { id: user.id, username: user.username } });
	} catch (err) {
		next(err);
	}
};

exports.login = (req, res, next) => {
	const { username, password } = req.body;
	if (!username || !password) {
		return res.status(400).json({ message: "Email et mot de passe requis" });
	}
	passport.authenticate('local', (err, user, info) => {
		if (err) return next(err);
		if (!user) return res.status(401).json({ success:false, message: info.message });

		req.logIn(user, (err) => {
			if (err) return next(err);
			return res.status(200).json({ success:true,message: "Connecté avec succès", user: { id: user.id, username: user.username } });
		});
	})(req, res, next);
};

exports.getMe = (req, res) => {
	res.status(200).json({ user: { id: req.user.id, username: req.user.username, email: req.user.email } });
};

exports.logout = (req, res, next) => {
	req.logout(err => {
		if (err) return next(err);
		res.status(200).json({ success:true, message: "Déconnecté avec succès" });
	});
};
