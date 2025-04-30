<template>
	<div class="chatbox">
		<h3>💬 Conversation avec {{ selectedUser.name }}</h3>

		<div class="messages" ref="messageContainer">
			<div
				v-for="(msg, i) in messages"
				:key="i"
				:class="msg.sender === user._id ? 'me' : 'other'"
			>
				<p>{{ msg.content }}</p>
			</div>
		</div>

		<form @submit.prevent="send" class="message-form">
			<input v-model="newMessage" placeholder="Écris un message..." />
			<button type="submit">Envoyer</button>
		</form>
	</div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
	data() {
		return {
			newMessage: ""
		};
	},
	computed: {
		...mapState(["user", "selectedUser", "messages"])
	},
	methods: {
		...mapActions(["sendMessage", "fetchMessages"]),
		async send() {
			if (this.newMessage.trim() !== "") {
				this.sendMessage(this.newMessage.trim());
				this.newMessage = "";
			}
		},
		scrollToBottom() {
			this.$nextTick(() => {
				const container = this.$refs.messageContainer;
				if (container) {
					container.scrollTop = container.scrollHeight;
				}
			});
		}
	},
	watch: {
		messages() {
			this.scrollToBottom();
		},
		selectedUser: {
			immediate: true,
			handler(user) {
				if (user) this.fetchMessages(user._id);
			}
		}
	}
};
</script>

<style scoped>
.chatbox {
	border: 1px solid #ccc;
	padding: 1rem;
	max-width: 500px;
	background: white;
	border-radius: 8px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
	display: flex;
	flex-direction: column;
}

.messages {
	max-height: 300px;
	overflow-y: auto;
	background: #f9f9f9;
	padding: 1rem;
	border-radius: 4px;
	margin-bottom: 1rem;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
}

.me, .other {
	padding: 0.6rem 1rem;
	border-radius: 20px;
	color: white;
	max-width: 70%;
	word-wrap: break-word;
}

.me {
	align-self: flex-end;
	background-color: #f78fb3; /* rose pastel */
}

.other {
	align-self: flex-start;
	background-color: #a29bfe; /* violet pastel */
}

.message-form {
	display: flex;
	gap: 0.5rem;
}
</style>