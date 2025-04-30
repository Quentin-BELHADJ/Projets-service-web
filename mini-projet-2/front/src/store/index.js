import Vue from 'vue';
import Vuex from 'vuex';
import { getMe, login as apiLogin, logout as apiLogout } from '@/services/auth.service.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    user: null
  },
  getters: {
    isAuthenticated: state => state.isLoggedIn,
    currentUser: state => state.user
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
      state.isLoggedIn = !!user;
    },
    CLEAR_USER(state) {
      state.user = null;
      state.isLoggedIn = false;
    }
  },
  actions: {
    async login({ commit }, credentials) {
      const response = await apiLogin(credentials);
      if (!response.error) {
        commit('SET_USER', response.user);
        return { success: true };
      } else {
        return { success: false, message: response.error };
      }
    },
    async logout({ commit }) {
      await apiLogout();
      commit('CLEAR_USER');
    },
    async fetchUser({ commit, state }) {
      if (state.isLoggedIn) return;
    
      try {
        const response = await getMe();
        if (!response.error) {
          commit('SET_USER', response.user);
        } else {
          commit('CLEAR_USER');
          localStorage.removeItem('token'); 
        }
      } catch (error) {
        commit('CLEAR_USER');
        localStorage.removeItem('token');
      }
    }
  },
  modules: {}
});
