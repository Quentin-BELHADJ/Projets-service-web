<template>
  <div class="login-container">
    <h2>Connexion</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Email :</label>
        <input type="email" id="email" v-model="loginForm.email" required />
      </div>

      <div class="form-group">
        <label for="password">Mot de passe :</label>
        <input type="password" id="password" v-model="loginForm.password" required />
      </div>

      <button type="submit" class="login-button">Se connecter</button>

      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
import { login } from '@/services/auth.service.js';

export default {
  name: 'LoginPage',
  data() {
    return {
      loginForm: {
        email: '',
        password: ''
      },
      errorMessage: ''
    }
  },
  methods: {
    async handleLogin() {
      this.errorMessage = '';

      const response = await login(this.loginForm);

      if (response.error) {
        this.errorMessage = response.error || "Erreur lors de la connexion.";
      } else {
        this.$emit('login-success'); // 💥 Émet un event vers App.vue
        this.$router.push('/'); // Redirige vers l'accueil (si tu as un router)
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}
.form-group {
  margin-bottom: 15px;
  text-align: left;
}
.login-button {
  width: 100%;
  padding: 10px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.error-message {
  color: red;
  margin-top: 10px;
}
</style>
