const passport = require("passport");

// ==== Google ====

exports.googleRedirect = passport.authenticate("google", {
	scope: ["profile", "email"]
});

exports.googleCallback = (req, res, next) => {
	passport.authenticate("google", (err, user, info) => {
		if (err || !user) {
			console.error("❌ Erreur ou utilisateur manquant :", err);
			return res.redirect("http://localhost:3000/auth/failure");
		}

		console.log("➡ Tentative req.logIn()");
		req.logIn(user, (err) => {
			if (err) {
				console.error("❌ Erreur logIn:", err);
				return next(err);
			}

			console.log("✅ Utilisateur logué :", user);
			console.log("🆔 Session ID:", req.sessionID);

			// Vérification que la session est bien définie
			console.log("🧪 Contenu session :", req.session);

			req.session.save((err) => {
				if (err) {
					console.error("❌ Erreur session.save:", err);
					return res.redirect("http://localhost:3000/auth/failure");
				}
				console.log("✅ Session sauvegardée !");
				res.redirect("http://localhost:3000/auth/success");
			});
		});
	})(req, res, next);
};

// ==== GitHub ====

exports.githubRedirect = passport.authenticate("github", {
	scope: ["user:email"]
});

exports.githubCallback = (req, res, next) => {
	passport.authenticate("github", (err, user, info) => {
		if (err || !user) {
			console.error("❌ Erreur ou utilisateur GitHub manquant :", err);
			return res.redirect("http://localhost:3000/auth/failure");
		}

		req.logIn(user, (err) => {
			if (err) {
				console.error("❌ Erreur logIn GitHub:", err);
				return next(err);
			}

			console.log("✅ Utilisateur GitHub logué :", user);

			req.session.save((err) => {
				if (err) {
					console.error("❌ Erreur session.save GitHub:", err);
					return res.redirect("http://localhost:3000/auth/failure");
				}
				console.log("✅ Session sauvegardée (GitHub) !");
				res.redirect("http://localhost:8080/dashboard");
			});
		});
	})(req, res, next);
};

// ==== GET user connecté ====

exports.getUser = (req, res) => {
	if (req.isAuthenticated()) {
		const { _id, name, email } = req.user;
		res.status(200).json({ _id, name, email });
	} else {
		res.status(401).json({ error: "Non authentifié" });
	}
};

// ==== Déconnexion ====

exports.logout = (req, res) => {
	req.logout(err => {
		if (err) return res.status(500).json({ error: "Erreur logout" });

		req.session.destroy(() => {
			res.clearCookie("connect.sid");
			res.status(200).json({ message: "Déconnecté" });
		});
	});
};

// ==== Auth échouée ====

exports.failure = (req, res) => {
	res.status(401).json({ error: "Échec de l'authentification" });
};

// ==== Redirection de succès vers frontend ====

exports.success = (req, res) => {
	res.send(`
		<html>
			<head>
				<meta http-equiv="refresh" content="0; URL='http://localhost:8080/dashboard'" />
			</head>
			<body>
				Authentification réussie... Redirection
			</body>
		</html>
	`);
};
