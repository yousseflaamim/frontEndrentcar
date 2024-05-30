import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../components/HomePage.vue'
import OwnerLogin from '../components/Ownerlogin.vue'
import UserRegistration from '../components/OwnerRegistration.vue'
import RegisterRenter from '../components/RegisterRenter.vue'
import LoginRenter from '../components/LoginRenter.vue'

import ProfileOwner from '../components/ProfileOwner.vue'


Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' }, // Redirect '/' to '/home'
  { path: '/home', component: HomePage },
  { path: '/ownerRegister', component: UserRegistration },
  { path: '/registerRenter', component: RegisterRenter },
  { path: '/loginRenter', component: LoginRenter },

  { path: '/profilowner', component: ProfileOwner },
  { path: '/loginowner', component: OwnerLogin },

];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;


