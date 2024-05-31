import Vue from 'vue';
import App from './App.vue';
import router from './router'; // Import your router configuration

Vue.config.productionTip = false;

new Vue({
  router, // Inject the router into the Vue instance
  render: h => h(App),
}).$mount('#app');
