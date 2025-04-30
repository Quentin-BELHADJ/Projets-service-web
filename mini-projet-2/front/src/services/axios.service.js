import axios from 'axios';

const axiosAgent = axios.create({
	baseURL: 'http://localhost:3000',
	withCredentials: false // Cookies désactivez
});

//  Ajout automatique du token dans les headers Authorization
axiosAgent.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('token');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export async function postRequest(url, label, body) {
	try {
		const response = await axiosAgent.post(url, body);
		return response.data;
	} catch (error) {
		if (error.response && error.response.data) {
			return error.response.data;
		}
		return { success: false, message: error.message || "Erreur inconnue" };
	}
}

export async function getRequest(url) {
	try {
		const response = await axiosAgent.get(url);
		return response.data;
	} catch (error) {
		if (error.response && error.response.data) {
			return error.response.data;
		}
		return { success: false, message: error.message || "Erreur inconnue" };
	}
}
