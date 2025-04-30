<template>
  <div class="register-container">
    <h2>Inscription</h2>
    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <label for="username">Nom d'utilisateur :</label>
        <input type="text" id="username" v-model="registerForm.username" required />
      </div>

      <div class="form-group">
        <label for="email">Email :</label>
        <input type="email" id="email" v-model="registerForm.email" required />
      </div>

      <div class="form-group">
        <label for="password">Mot de passe :</label>
        <input type="password" id="password" v-model="registerForm.password" required />
      </div>

      <button type="submit" class="register-button">S'inscrire</button>
    </form>

    <!-- Dialogs -->
    <ErrorDialog :show="showError" :message="errorMessage" @close="showError = false" />
    <SuccessDialog :show="showSuccess" :message="successMessage" @close="redirectToLogin" />
  </div>
</template>

<script>
import { postRequest } from '@/services/axios.service.js';
import ErrorDialog from '@/components/ErrorDialog.vue';
import SuccessDialog from '@/components/SuccessDialog.vue';

export default {
  name: 'RegisterPage',
  components: {
    ErrorDialog,
    SuccessDialog
  },
  data() {
    return {
      registerForm: {
        username: '',
        email: '',
        password: ''
      },
      showError: false,
      errorMessage: '',
      showSuccess: false,
      successMessage: ''
    }
  },
  methods: {
    async handleRegister() {
      this.showError = false;
      this.errorMessage = '';
      this.showSuccess = false;
      this.successMessage = '';

      const response = await postRequest('/user/register', "Register", this.registerForm);

      if (!response.success) {
        this.errorMessage = response.message || "Erreur lors de l'inscription.";
        this.showError = true;
      } else {
        this.successMessage = response.message || "Inscription réussie ! Vous pouvez vous connecter.";
        this.showSuccess = true;
      }
    },
    redirectToLogin() {
      this.showSuccess = false;
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
.register-container {
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
.register-button {
  width: 100%;
  padding: 10px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
