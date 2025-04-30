<template>
  <div class="account-container">
    <h1>Mon compte</h1>
    <p>Bienvenue sur votre page de compte !</p>

    <div class="user-info" v-if="user">
      <p><strong>Nom d'utilisateur :</strong> {{ user.username }}</p>
      <p><strong>Email :</strong> {{ user.email }}</p>
    </div>

    <div v-else>
      <p>Chargement de vos informations...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MonComptePage',
  computed: {
    user() {
      return this.$store.getters.currentUser;
    }
  }
}
</script>

<style scoped>
.account-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  text-align: center;
}
.user-info {
  margin-top: 30px;
  font-size: 18px;
  text-align: left;
}
.user-info p {
  margin: 10px 0;
}
</style>
