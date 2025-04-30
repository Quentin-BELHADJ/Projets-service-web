import Vue from "vue";
import Vuex from "vuex";
import { getRequest, postRequest } from "../services/axios.service";
import { io } from "socket.io-client";

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		user: null,
		users: [],
		onlineUsers: [],
		selectedUser: null,
		messages: [],
		socket: null
	},
	mutations: {
		setUser(state, user) {
			state.user = user;
		},
		clearUser(state) {
			state.user = null;
			state.socket?.disconnect();
			state.socket = null;
		},
		setUsers(state, users) {
			state.users = users;
		},
		setOnlineUsers(state, users) {
			state.onlineUsers = users;
		},
		setSelectedUser(state, user) {
			state.selectedUser = user;
		},
		setMessages(state, messages) {
			state.messages = messages;
		},
		addMessage(state, message) {
			state.messages.push(message);
		},
		setSocket(state, socket) {
			state.socket = socket;
		}
	},
	actions: {
		async fetchUser({ commit }) {
			const res = await getRequest("/auth/user");
			const user = res.user || res;
		
			if (user && user._id) {
				commit("setUser", user);
		
				const socket = io("http://localhost:3000", {
					withCredentials: true,
					autoConnect: false,
					transports: ["websocket"]
				});
		
				console.log("👉 Préparation socket avec user ID :", user._id);
		
				socket.on("connect", async () => {
					console.log("✅ Socket connecté (client)");
		
					// Vérifie l'utilisateur via la session
					try {
						const res = await getRequest("/auth/user");
						const sessionUser = res.user || res;
		
						if (sessionUser && sessionUser._id) {
							console.log("🔁 Register socket après /auth/user :", sessionUser._id);
							socket.emit("register", sessionUser._id);
						} else {
							console.warn("⚠️ /auth/user a échoué après connexion socket");
						}
					} catch (err) {
						console.error("❌ Erreur lors de l'appel /auth/user après socket connect :", err);
					}
				});
		
				// Events socket
				socket.on("newMessage", (msg) => {
					commit("addMessage", msg);
				});
		
				socket.on("onlineUsers", (users) => {
					commit("setOnlineUsers", users);
				});
		
				commit("setSocket", socket);
				socket.connect();
		
				// Fallback d'enregistrement au bout de 200ms si jamais le connect rate
				setTimeout(() => {
					if (socket.connected) {
						console.log("⏱️ Enregistrement fallback après délai");
						socket.emit("register", user._id);
					}
				}, 200);
			}
		},
		async logout({ commit }) {
			await postRequest("/auth/logout", "logout", {});
			commit("clearUser");
		},
		async fetchUsers({ commit }) {
			const res = await getRequest("/users");
			if (Array.isArray(res)) {
				commit("setUsers", res);
			}
		},
		async fetchMessages({ commit, state }, receiverId) {
			const sender = state.user._id;
			const res = await getRequest(`/chat/${sender}/${receiverId}`);
			if (Array.isArray(res)) {
				commit("setMessages", res);
			}
		},
		sendMessage({ state }, content) {
			if (
				state.socket &&
				state.selectedUser &&
				state.user &&
				content.trim()
			) {
				console.log("📤 Envoi du message via socket :", {
					sender: state.user._id,
					receiver: state.selectedUser._id,
					content: content.trim()
				});
				state.socket.emit("sendMessage", {
					sender: state.user._id,
					receiver: state.selectedUser._id,
					content: content.trim()
				});
			}
		}
	}
});

export default store;
