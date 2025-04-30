import { getRequest, postRequest } from '@/services/axios.service.js';

const AUTH_API = '/user';

export async function login(loginForm) {
	try {
		const response = await postRequest(`${AUTH_API}/login`, "Login", {
			username: loginForm.email,
			password: loginForm.password
		});

		if (!response.error && response.token) {
			// Stocker token + utilisateur
			localStorage.setItem("token", response.token);
			localStorage.setItem("userInfo", JSON.stringify(response.user));
			return { user: response.user };
		} else {
			return { error: response.message || "Erreur de connexion" };
		}
	} catch (error) {
		return { error: error.message || "Erreur inconnue" };
	}
}

export async function logout() {
	try {
		localStorage.removeItem("userInfo");
		localStorage.removeItem("token");
	} catch (error) {
		console.error("Erreur lors de la déconnexion :", error.message);
	}
}

export function getCurrentUser() {
	const userInfo = localStorage.getItem("userInfo");
	if (!userInfo || userInfo === "undefined" || userInfo === undefined) {
		return null;
	}
	try {
		return JSON.parse(userInfo);
	} catch (error) {
		console.error("Erreur de parsing localStorage userInfo :", error);
		return null;
	}
}

export async function getMe() {
	try {
		const response = await getRequest(`${AUTH_API}/me`);
		return response;
	} catch (error) {
		return { error: error.message || "Erreur lors de la récupération de l'utilisateur" };
	}
}
