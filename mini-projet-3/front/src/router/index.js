import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/HomeView.vue';
import Dashboard from '../views/DashboardView.vue';
import Login from '../views/LoginView.vue';
import Register from '../views/RegisterView.vue';
import NotFound from '../views/NotFound.vue'; // à créer

import store from '../store'; // Assure-toi que ce chemin est correct

Vue.use(Router);

const router = new Router({
	mode: 'history',
	routes: [
		{ path: '/', name: 'Home', component: Home },
		{ path: '/dashboard', name: 'Dashboard', component: Dashboard },
		{ path: '/login', name: 'Login', component: Login },
		{ path: '/register', name: 'Register', component: Register },
		{ path: '*', name: 'NotFound', component: NotFound } // 🔒 Garde-fou 404
	]
});

router.beforeEach(async (to, from, next) => {
	if (store.state.user) return next();

	await store.dispatch('fetchUser');

	if (to.path === '/dashboard' && !store.state.user) {
		return next('/');
	}

	next();
});

export default router;
