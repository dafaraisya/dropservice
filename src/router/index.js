import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: () => import('../views/SignIn.vue')
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('../views/SignUp.vue')
  },
  {
    path: '/homeclient',
    name: 'Home Client',
    component: () => import('../views/client/HomeClient.vue')
  },
  {
    path: '/homedesigner',
    name: 'Home Designer',
    component: () => import('../views/designer/HomeDesigner.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
