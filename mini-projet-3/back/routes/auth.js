const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

//local
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/me", (req, res) => {
	if (!req.user) {
		return res.status(401).json({ message: "Non connecté" });
	}
	res.json(req.user);
});
// Auth Google
router.get("/google", authController.googleRedirect);
router.get("/google/callback", authController.googleCallback);

// Auth GitHub
router.get("/github", authController.githubRedirect);
router.get("/github/callback", authController.githubCallback);

// Logout & User
router.post("/logout", authController.logout);
router.get("/user", authController.getUser);
router.get("/failure", authController.failure);
router.get("/success", (req, res) => {
	res.send(`
		<html>
			<head>
				<meta http-equiv="refresh" content="0; URL='http://localhost:8080/dashboard'" />
			</head>
			<body>
				Authentification réussie, redirection en cours...
			</body>
		</html>
	`);
});

module.exports = router;
