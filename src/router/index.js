import Vue from 'vue'
import VueRouter from 'vue-router'
import ProfileOwner from '../components/ProfileOwner.vue'
import OwnerLogin from '../components/Ownerlogin.vue'
import UserRegistration from '../components/OwnerRegistration.vue'
import LoginRenter from '../components/LoginRenter.vue'
import RegisterRenter from '../components/RegisterRenter.vue'
import AddCar from '../components/AddCar.vue'
import home from '../components/HomePage.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' }, 
  { path: '/home', component: home },
  { path: '/loginowner', component: OwnerLogin },
  { path: '/ownerRegister', component: UserRegistration },
  { path: '/profilowner', component: ProfileOwner },
  { path: '/addcar', component: AddCar },
  { path: '/registerRenter', component: RegisterRenter },
  { path: '/loginRenter', component: LoginRenter },
];

const router = new VueRouter({
  mode: 'history', 
  base: process.env.BASE_URL,
  routes 
});
export default router

