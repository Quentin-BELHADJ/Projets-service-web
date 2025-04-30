<template>
	<div class="login-buttons">
		<h3>Connexion</h3>
		<a href="http://localhost:3000/auth/google">
			<button class="google">Se connecter avec Google</button>
		</a>
		<a href="http://localhost:3000/auth/github">
			<button class="github">Se connecter avec GitHub</button>
		</a>
	</div>
</template>

<script>
export default {
	name: "LoginButtons"
};
</script>

<style scoped>
.login-buttons {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;
	margin-top: 2rem;
}

button {
	width: 260px;
	font-size: 1rem;
	padding: 0.7rem;
	border: none;
	border-radius: 30px;
	color: white;
	cursor: pointer;
	font-weight: 600;
	transition: background-color 0.3s ease;
}

.google {
	background: #db4437;
}

.google:hover {
	background: #c23321;
}

.github {
	background: #333;
}

.github:hover {
	background: #111;
}
</style>
