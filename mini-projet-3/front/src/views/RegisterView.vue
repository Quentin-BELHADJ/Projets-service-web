<template>
	<div class="auth-container">
		<h2>Inscription</h2>
		<form @submit.prevent="handleRegister">
			<input v-model="name" type="text" placeholder="Nom complet" required />
			<input v-model="email" type="email" placeholder="Email" required />
			<input v-model="password" type="password" placeholder="Mot de passe" required />
			<button type="submit">Créer un compte</button>
		</form>
		<p class="redirect-msg">
			Déjà inscrit ? <router-link to="/login">Se connecter</router-link>
		</p>

		<SuccessDialog :show="!!success" :message="success" @close="success = null" />
		<ErrorDialog :show="!!error" :message="error" @close="error = null" />
	</div>
</template>

<script>
import { register } from "../services/auth.service";
import SuccessDialog from "../components/SuccessDialog.vue";
import ErrorDialog from "../components/ErrorDialog.vue";

export default {
	components: { SuccessDialog, ErrorDialog },
	data() {
		return {
			name: "",
			email: "",
			password: "",
			success: null,
			error: null
		};
	},
	methods: {
		async handleRegister() {
			const res = await register(this.name, this.email, this.password);
			if (res.message?.includes("succès")) {
				this.success = "Compte créé avec succès !";
				setTimeout(() => this.$router.push("/login"), 1500);
			} else {
				this.error = res.message || "Erreur lors de l'inscription.";
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
