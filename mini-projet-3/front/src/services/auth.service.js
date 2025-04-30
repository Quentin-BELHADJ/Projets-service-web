import { postRequest, getRequest } from "./axios.service";

export async function login(email, password) {
	return await postRequest("/auth/login", "login", { email, password });
}

export async function register(name, email, password) {
	return await postRequest("/auth/register", "register", { name, email, password });
}

export async function getCurrentUser() {
	return await getRequest("/auth/user");
}

export async function logout() {
	return await postRequest("/auth/logout", "logout", {});
}
