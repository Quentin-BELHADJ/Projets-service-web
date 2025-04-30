<template>
  <div id="app">
    <NavBar :isLoggedIn="isLoggedIn" @logout-success="onLogoutSuccess" />

    <main class="main-content">
      <router-view @login-success="onLoginSuccess" @register-success="onRegisterSuccess"></router-view>
    </main>

    <FooterContainer />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import FooterContainer from '@/components/FooterContainer.vue';

export default {
  name: 'App',
  components: {
    NavBar,
    FooterContainer
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    }
  },
  async created() {
    if (!this.isLoggedIn) {
      await this.$store.dispatch('fetchUser');
    }
  },
  methods: {
    onLoginSuccess() {
      this.$store.dispatch('fetchUser');
    },
    onLogoutSuccess() {
      this.$store.commit('CLEAR_USER');
    },
    onRegisterSuccess() {
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
html, body {
	height: 100%;
	margin: 0;
}

#app {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
}

main {
	flex: 1;
}
</style>
