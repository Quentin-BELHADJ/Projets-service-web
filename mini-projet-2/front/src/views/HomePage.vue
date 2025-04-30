<template>
  <div>
    <h1>Page d'accueil</h1>
    <h2> Site par Quentin Belhadj et Audrick Soltner</h2>

    <div v-if="isLoggedIn" class="status-message">
      Vous êtes connecté !
    </div>
    <div v-else class="status-message">
      Vous n'êtes pas connecté !
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    }
  }
}
</script>

<style scoped>
h1 {
  text-align: center;
  margin-top: 50px;
}

h2 {
  text-align: center;
  margin-top: 20px;
  font-size: 24px;
}

.status-message {
  text-align: center;
  margin-top: 20px;
  font-size: 18px;
}
</style>
