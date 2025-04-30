<template>
	<div class="home">
		<h1>Bienvenue sur l'application de chat</h1>
		<h2> Site par Quentin Belhadj et Audrick Soltner</h2>
		<p v-if="!user">Connectez-vous pour commencer à discuter !</p>
		<router-link v-if="user" to="/dashboard">
			<button class="btn">Accéder au tableau de bord</button>
		</router-link>

		<LoginButtons v-if="!user" />
	</div>
</template>

<script>
import { mapState } from "vuex";
import LoginButtons from "../components/LoginButtons.vue";

export default {
	components: { LoginButtons },
	computed: {
		...mapState(["user"])
	}
};
</script>

<style scoped>
.home {
	text-align: center;
	margin-top: 5rem;
	padding: 2rem;
	background: white;
	border-radius: 8px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	max-width: 600px;
	margin-left: auto;
	margin-right: auto;
}

h1 {
	color: #2c3e50;
	margin-bottom: 1rem;
}

p {
	font-size: 1.2rem;
	color: #666;
}

.btn {
	background: linear-gradient(135deg, #6c5ce7, #a29bfe);
	border: none;
	color: white;
	padding: 0.75rem 1.5rem;
	font-size: 1rem;
	border-radius: 30px;
	cursor: pointer;
	transition: background 0.3s ease;
	margin-top: 2rem;
}

.btn:hover {
	background: linear-gradient(135deg, #a29bfe, #6c5ce7);
}
</style>
