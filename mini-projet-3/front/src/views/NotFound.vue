<template>
	<div class="notfound-container">
		<h1>404</h1>
		<p>Oups ! La page que vous cherchez n'existe pas.</p>
		<router-link class="back-home" to="/">Retour à l'accueil</router-link>
	</div>
</template>

<script>
export default {
	name: "NotFound"
};
</script>

<style scoped>
.notfound-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
	min-height: 70vh;
	color: #2c3e50;
}

.notfound-container h1 {
	font-size: 6rem;
	margin-bottom: 0.5rem;
	color: #f78fb3; /* cohérence avec le rose pastel actif */
}

.notfound-container p {
	font-size: 1.5rem;
	margin-bottom: 2rem;
}

.back-home {
	background-color: #2c3e50;
	color: white;
	padding: 0.75rem 1.5rem;
	border-radius: 8px;
	text-decoration: none;
	transition: background-color 0.3s ease;
}

.back-home:hover {
	background-color: #34495e;
}
</style>
