const jwt = require('jsonwebtoken');
const { User } = require('../models/user.model');
const bcrypt = require('bcrypt');

const SECRET_KEY = process.env.JWT_SECRET || 'secretdev';

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
		const user = await User.create({ username, password: hashedPassword, email });

		res.status(201).json({success:true, message: "Utilisateur créé", user: { id: user.id, username: user.username } });
	} catch (err) {
		next(err);
	}
};

exports.login = async (req, res, next) => {
	try {
		const { username, password } = req.body;
		if (!username || !password) {
			return res.status(400).json({ message: "Email et mot de passe requis" });
		}

		const user = await User.findOne({ where: { email: username } });
		if (!user) {
			return res.status(401).json({ message: "Utilisateur non trouvé" });
		}

		const match = await bcrypt.compare(password, user.password);
		if (!match) {
			return res.status(401).json({ message: "Mot de passe incorrect" });
		}

		const payload = { id: user.id, username: user.username, email: user.email };
		const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '10m' });

		res.status(200).json({ success: true, message: "Connecté avec succès", token });
	} catch (err) {
		next(err);
	}
};

exports.getMe = (req, res) => {
	res.status(200).json({ user: req.user });
};

exports.logout = (req, res) => {
	// En JWT, il n'y a pas de "logout" serveur, c'est client-side.
	res.status(200).json({ success: true, message: "Déconnecté. Supprimez votre token côté client." });
};