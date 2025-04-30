<template>
	<div id="app">
		<header class="navbar">
			<h1 class="logo">💬 Mini Chat App</h1>
			<nav>
				<router-link to="/" exact>Accueil</router-link>
				<router-link to="/dashboard">Tableau de bord</router-link>
				<router-link v-if="!user" to="/login">Connexion</router-link>
				<router-link v-if="!user" to="/register">Inscription</router-link>
				<span v-if="user">Bonjour, {{ user.name }}</span>
			</nav>
		</header>

		<main class="content">
			<router-view />
		</main>
	</div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
	name: "App",
	computed: {
		...mapState(["user"])
	},
	async created() {
		await this.fetchUser();
	},
	methods: {
		...mapActions(["fetchUser"]),

	}
};
</script>

<style scoped>
body {
	margin: 0;
	font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
	background-color: #f4f6f8;
	color: #333;
}

#app {
	min-height: 100vh;
	display: flex;
	flex-direction: column;
}

.navbar {
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: #2c3e50;
	color: white;
	padding: 1rem 2rem;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	position: sticky;
	top: 0;
	z-index: 1000;
}

.logo {
	margin: 0;
	font-size: 1.5rem;
	font-weight: bold;
}

nav {
	display: flex;
	gap: 1.5rem;
	align-items: center;
}

nav a {
	color: white;
	text-decoration: none;
	font-weight: 500;
	transition: color 0.3s ease;
}

nav a.router-link-exact-active {
	color: #f78fb3;
	font-weight: bold;
}

nav a:hover {
	color: #a29bfe;
}

button {
	background: none;
	border: none;
	color: white;
	cursor: pointer;
	font-weight: 500;
	transition: color 0.3s ease;
}

button:hover {
	color: #f8c291;
}

.content {
	padding: 2rem;
	flex: 1;
}
</style>
