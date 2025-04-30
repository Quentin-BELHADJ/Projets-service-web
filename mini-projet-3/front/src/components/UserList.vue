<template>
	<div class="user-list">
		<h3>Utilisateurs</h3>
		<ul>
			<li v-for="u in filteredUsers" :key="u._id" @click="select(u)">
				<span :style="{ color: isOnline(u._id) ? 'green' : 'gray' }">●</span>
				{{ u.name }}
			</li>
		</ul>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: "UserList",
	computed: {
		...mapState(['users', 'onlineUsers', 'user']),
		filteredUsers() {
			if (!this.user || !this.user._id) return this.users;
			return this.users.filter(u => u._id !== this.user._id);
		},
		isOnline() {
			return (id) => this.onlineUsers.includes(id);
		}
	},
	methods: {
		select(user) {
			this.$emit('select', user);
		}
	}
};
</script>

<style scoped>
.user-list {
	width: 200px;
	border-right: 1px solid #ccc;
	padding: 1rem;
	background: white;
	border-radius: 8px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.user-list ul {
	list-style: none;
	padding: 0;
	margin: 0;
}

.user-list li {
	cursor: pointer;
	margin-bottom: 8px;
}
</style>