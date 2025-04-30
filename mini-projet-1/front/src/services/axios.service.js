import axios from 'axios';

const axiosAgent = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true
});

export async function postRequest(url, label, body) {
  try {
    const response = await axiosAgent.post(url, body);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      // 🔥 Récupère le vrai message d'erreur envoyé par le serveur
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
