import Vue from 'vue'
import VueRouter from "vue-router";

import Home from './../Pages/Home/Home.vue'
import Project from './../Pages/Projects/Project.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/projects',
    name: 'Project',
    component: Project
  }
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;