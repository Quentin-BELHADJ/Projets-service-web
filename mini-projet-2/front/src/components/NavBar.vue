<template>
  <nav class="navbar">
    <ul class="nav-list">
      <li><router-link to="/">Accueil</router-link></li>

      <template v-if="isLoggedIn">
        <li><router-link to="/mon-compte">Mon compte</router-link></li>
        <li><a href="#" @click.prevent="handleLogout">Déconnexion</a></li>
      </template>

      <template v-else>
        <li><router-link to="/login">Connexion</router-link></li>
        <li><router-link to="/register">Inscription</router-link></li>
      </template>
    </ul>
  </nav>
</template>

<script>
import { logout } from '@/services/auth.service.js'; 

export default {
  name: 'NavBar',
  props: {
    isLoggedIn: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    async handleLogout() {
      await logout();
      this.$emit('logout-success'); // On informe App.vue de se mettre à jour
      this.$router.push('/').catch(()=>{}); // Retour à l'accueil
    }
  }
}
</script>

<style scoped>
.navbar {
  background-color: #333;
  padding: 10px;
}
.nav-list {
  list-style: none;
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
}
.nav-list li {
  margin: 0 10px;
}
.nav-list a {
  color: white;
  text-decoration: none;
}
</style>
