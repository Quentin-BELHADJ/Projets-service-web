<template>
	<div class="auth-container">
		<h2>Connexion</h2>
		<form @submit.prevent="handleLogin">
			<input v-model="email" type="email" placeholder="Email" required />
			<input v-model="password" type="password" placeholder="Mot de passe" required />
			<button type="submit">Se connecter</button>
		</form>
		<p class="redirect-msg">
			Pas encore de compte ? <router-link to="/register">Créer un compte</router-link>
		</p>
	</div>
</template>

<script>
import { login } from "../services/auth.service";

export default {
	data() {
		return {
			email: "",
			password: "",
			error: null
		};
	},
	methods: {
		async handleLogin() {
			try {
				const res = await login(this.email, this.password);
				console.log("Réponse login:", res);

				if (res.user && res.user._id) {
					await this.$store.dispatch("fetchUser");
					this.$router.push("/dashboard");
				} else {
					this.error = res.message || "Erreur de connexion.";
				}
			} catch (err) {
				console.error("Erreur lors du login :", err);
				this.error = "Erreur interne.";
			}
		}
	}
};
</script>


<style scoped>
.auth-container {
	max-width: 400px;
	margin: 4rem auto;
	padding: 2rem;
	background-color: white;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	border-radius: 8px;
	text-align: center;
}

.auth-container h2 {
	margin-bottom: 1.5rem;
	color: #2c3e50;
}

input {
	width: 100%;
	padding: 0.75rem;
	margin-bottom: 1rem;
	border: 1px solid #ccc;
	border-radius: 4px;
}

button {
	width: 100%;
	background-color: #2c3e50;
	color: white;
	padding: 0.75rem;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	font-weight: bold;
	transition: background-color 0.3s;
}

button:hover {
	background-color: #34495e;
}

.redirect-msg {
	margin-top: 1rem;
	font-size: 0.9rem;
}
</style>
