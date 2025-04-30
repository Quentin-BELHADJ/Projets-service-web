const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const User = require("../models/User");

// Sérialisation / Désérialisation utilisateur
passport.serializeUser((user, done) => {
	console.log('Sérialisation user:', user.id, 'Auth method:', 
	  user.googleId ? 'Google' : user.githubId ? 'GitHub' : 'Local');
	done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
	console.log('Désérialisation ID:', id);
	try {
		const user = await User.findById(id);
		done(null, user);
	} catch (err) {
		console.error("❌ Erreur de désérialisation :", err);
		done(err);
	}
});
// Stratégie Google OAuth2
passport.use(new GoogleStrategy({
	clientID: process.env.GOOGLE_CLIENT_ID,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
	callbackURL: "http://localhost:3000/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
	console.log("🔐 Token reçu :", accessToken);
	console.log("👤 Profil reçu :", profile);
	try {
		let user = await User.findOne({ googleId: profile.id });
		if (!user) {
			user = await User.create({
				googleId: profile.id,
				name: profile.displayName,
				email: profile.emails[0].value
			});
		}
		return done(null, user);
	} catch (err) {
		return done(err);
	}
}));

// Stratégie GitHub OAuth2
passport.use(new GitHubStrategy(
	{
		clientID: process.env.GITHUB_CLIENT_ID,
		clientSecret: process.env.GITHUB_CLIENT_SECRET,
		callbackURL: "http://localhost:3000/auth/github/callback"
	},
	async (accessToken, refreshToken, profile, done) => {
		try {
			let user = await User.findOne({ githubId: profile.id });

			if (!user) {
				// Fallbacks sûrs
				const name = profile.displayName || profile.username || "Utilisateur GitHub";
				const email = profile.emails?.[0]?.value || "";
				const avatar = profile.photos?.[0]?.value || "";

				// Si pas de nom DU TOUT (rare), on rejette
				if (!name || name.trim() === "") {
					console.warn("⚠️ Profil GitHub sans nom détecté :", profile);
					return done(null, false); // stop login
				}

				user = await User.create({
					githubId: profile.id,
					name,
					email,
					avatar
				});
			}

			return done(null, user);
		} catch (err) {
			console.error("❌ Erreur stratégie GitHub :", err);
			return done(err);
		}
	}
));

const LocalStrategy = require("passport-local").Strategy;

// Stratégie locale
passport.use(new LocalStrategy({
	usernameField: "email",
	passwordField: "password"
}, async (email, password, done) => {
	try {
		const user = await User.findOne({ email });
		if (!user || !user.password) {
			return done(null, false, { message: "Email ou mot de passe invalide" });
		}
		const isMatch = await user.comparePassword(password);
		if (!isMatch) {
			return done(null, false, { message: "Email ou mot de passe invalide" });
		}
		return done(null, user);
	} catch (err) {
		return done(err);
	}
}));


module.exports = passport;
