import Vue from 'vue';
import VueRouter from 'vue-router';

import HomePage from '@/views/HomePage.vue';
import LoginPage from '@/views/LoginPage.vue';
import MonComptePage from '@/views/MonComptePage.vue';
import RegisterPage from '@/views/RegisterPage.vue';

Vue.use(VueRouter);


const routes = [
	{ path: '/', name: 'Home', component: HomePage },
	{ path: '/login', name: 'Login', component: LoginPage },
	{ path: '/register', name: 'Register', component: RegisterPage },
	{ 
		path: '/mon-compte', 
		name: 'MonCompte', 
		component: MonComptePage,
		meta: { requiresAuth: true }
	}
];
const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

//  Garde de navigation
router.beforeEach((to, from, next) => {
	const token = localStorage.getItem('token');
	if (to.matched.some(record => record.meta.requiresAuth)) {
		// Cette route nécessite d'être connecté
		if ( !token) {
			next({ name: 'Login' });
		} else {
			next();
		}
	} else {
		next();
	}
})

export default router;
