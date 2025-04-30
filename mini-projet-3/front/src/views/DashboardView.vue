<template>
	<div class="dashboard">
		<header class="header">
			<h2>👋 Bienvenue, {{ user.name }}</h2>
			<button class="logout-btn" @click="logout">Se déconnecter</button>
		</header>

		<div class="layout">
			<UserList @select="selectUser" />
			<ChatBox v-if="selectedUser" />
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import UserList from '../components/UserList.vue';
import ChatBox from '../components/ChatBox.vue';
import store from "../store";

export default {
	components: { UserList, ChatBox },
	computed: {
		...mapState(['user', 'selectedUser'])
	},
		mounted() {
		console.log("user Vuex:", this.$store.state.user);
	},
	methods: {
		selectUser(user) {
			this.$store.commit('setSelectedUser', user);
			this.$store.dispatch('fetchMessages', user._id);
		},
		async logout() {
			await store.dispatch("logout");
			this.$router.push("/");
		}
		
	},
	async created() {
		await this.$store.dispatch('fetchUser');
		if (!this.user) return this.$router.push('/');
		await this.$store.dispatch('fetchUsers');
	},
}


</script>

<style scoped>
.dashboard {
	padding: 2rem;
	max-width: 1200px;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	gap: 2rem;
}

.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: linear-gradient(135deg, #6c5ce7, #a29bfe);
	color: white;
	padding: 1rem 2rem;
	border-radius: 12px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.header h2 {
	margin: 0;
	font-size: 1.5rem;
}

.logout-btn {
	background: #ff7675;
	border: none;
	padding: 0.5rem 1rem;
	border-radius: 30px;
	color: white;
	cursor: pointer;
	font-weight: bold;
	transition: background 0.3s ease;
}

.logout-btn:hover {
	background: #d63031;
}

.layout {
	display: flex;
	flex-direction: row;
	gap: 2rem;
}

@media screen and (max-width: 768px) {
	.layout {
		flex-direction: column;
	}
}
</style>
